// ─── NEW WRITE OPERATIONS ────────────────────────────────────────────────────

// clone — duplicate a node
handlers.clone = async function(params) {
  var node = await resolveNode(params);
  if (!node) throw new Error("Node not found for cloning");
  var clone = node.clone();
  if (params.x !== undefined) clone.x = params.x;
  if (params.y !== undefined) clone.y = params.y;
  if (params.name) clone.name = params.name;
  if (params.parentId) {
    var parent = await findNodeByIdAsync(params.parentId);
    if (parent) parent.appendChild(clone);
  }
  return nodeToInfo(clone);
};

// group — group selected or specified nodes
handlers.group = async function(params) {
  var nodeIds = params.nodeIds || [];
  var nodes = [];
  for (var i = 0; i < nodeIds.length; i++) {
    var n = await findNodeByIdAsync(nodeIds[i]);
    if (n) nodes.push(n);
  }
  if (nodes.length < 1) throw new Error("Need at least 1 node to group");
  var parent = nodes[0].parent || figma.currentPage;
  var group = figma.group(nodes, parent);
  if (params.name) group.name = params.name;
  return nodeToInfo(group);
};

// ungroup — ungroup a group node
handlers.ungroup = async function(params) {
  var node = await resolveNode(params);
  if (!node) throw new Error("Node not found for ungrouping");
  if (node.removed) throw new Error("Node was already deleted");
  if (node.type !== "GROUP" && node.type !== "FRAME") throw new Error("Node must be GROUP or FRAME to ungroup");
  if (!node.children || node.children.length === 0) {
    node.remove();
    return { ungrouped: [] };
  }
  var children = [];
  var parent = node.parent || figma.currentPage;
  if (parent.removed) parent = figma.currentPage;
  var nodeChildren = [].concat(node.children);
  for (var i = 0; i < nodeChildren.length; i++) {
    parent.appendChild(nodeChildren[i]);
    children.push(nodeToInfo(nodeChildren[i]));
  }
  node.remove();
  return { ungrouped: children };
};

// flatten — flatten a node (merge vectors)
handlers.flatten = async function(params) {
  var node = await resolveNode(params);
  if (!node) throw new Error("Node not found for flatten");
  var flat = figma.flatten([node]);
  return nodeToInfo(flat);
};

// resize — resize a node with constraints
handlers.resize = async function(params) {
  var node = await resolveNode(params);
  if (!node) throw new Error("Node not found for resize");
  if (!("resize" in node)) throw new Error("Node type does not support resize");
  var w = params.width !== undefined ? params.width : node.width;
  var h = params.height !== undefined ? params.height : node.height;
  node.resize(w, h);
  return nodeToInfo(node);
};

// set_selection — programmatically select nodes
handlers.set_selection = async function(params) {
  var nodeIds = params.nodeIds || [];
  var nodes = [];
  for (var i = 0; i < nodeIds.length; i++) {
    var n = await findNodeByIdAsync(nodeIds[i]);
    if (n) nodes.push(n);
  }
  // BUG-08: nodes may belong to a different page than currentPage.
  // Find the page of the first node and switch to it before setting selection.
  if (nodes.length > 0) {
    var targetPage = null;
    var candidate = nodes[0];
    while (candidate && candidate.type !== "PAGE") candidate = candidate.parent;
    if (candidate && candidate.type === "PAGE" && candidate !== figma.currentPage) {
      await figma.setCurrentPageAsync(candidate);
    }
  }
  figma.currentPage.selection = nodes;
  return { selected: nodes.map(nodeToInfo) };
};

// ─── PROTOTYPE REACTIONS ────────────────────────────────────────────────────

// The public MCP API uses concise action names (NAVIGATE, OVERLAY, SWAP,
// SCROLL_TO). Figma's Plugin API represents those as a NODE action with a
// separate navigation field. Keep the MCP surface backwards-compatible while
// writing the canonical Figma shape.
function normalizePrototypeAction(action) {
  if (!action || !action.type) throw new Error("Reaction action requires a type");
  var navigationTypes = ["NAVIGATE", "OVERLAY", "SWAP", "SCROLL_TO", "CHANGE_TO"];
  if (navigationTypes.indexOf(action.type) !== -1) {
    return {
      type: "NODE",
      navigation: action.type,
      destinationId: action.destinationId || null,
      transition: action.transition === undefined ? null : action.transition,
      preserveScrollPosition: action.preserveScrollPosition === true,
      resetScrollPosition: action.resetScrollPosition === true,
      resetInteractiveComponents: action.resetInteractiveComponents === true,
    };
  }
  return action;
}

function normalizePrototypeReaction(reaction) {
  if (!reaction || !reaction.trigger) throw new Error("Reaction requires a trigger");
  var sourceActions = reaction.actions || (reaction.action ? [reaction.action] : []);
  if (!sourceActions.length) throw new Error("Reaction requires at least one action");
  return {
    trigger: reaction.trigger,
    actions: sourceActions.map(normalizePrototypeAction),
  };
}

handlers.setReactions = async function(params) {
  var node = await resolveNode(params);
  if (!node) throw new Error("Node not found for setReactions");
  if (typeof node.setReactionsAsync !== "function") {
    throw new Error("Node type " + node.type + " does not support prototype reactions");
  }
  var reactions = params.reactions || [];
  var normalized = reactions.map(normalizePrototypeReaction);
  await node.setReactionsAsync(normalized);
  return { id: node.id, name: node.name, reactions: sanitizeForPostMessage(node.reactions) };
};

handlers.getReactions = async function(params) {
  var node = await resolveNode(params);
  if (!node) throw new Error("Node not found for getReactions");
  return { id: node.id, name: node.name, reactions: sanitizeForPostMessage(node.reactions || []) };
};

handlers.removeReactions = async function(params) {
  var node = await resolveNode(params);
  if (!node) throw new Error("Node not found for removeReactions");
  if (typeof node.setReactionsAsync !== "function") {
    throw new Error("Node type " + node.type + " does not support prototype reactions");
  }
  await node.setReactionsAsync([]);
  return { id: node.id, name: node.name, reactions: [] };
};

// batch — execute multiple operations in one call
// Supported operations: create, modify, delete (single or batch ids), append, clone
handlers.batch = async function(params) {
  // Support both figma.batch([...]) (array) and figma.batch({ operations: [...] })
  var operations = Array.isArray(params) ? params : (params.operations || []);
  if (!operations.length) throw new Error("No operations provided");
  if (operations.length > 50) throw new Error("Max 50 operations per batch");

  var results = [];
  for (var i = 0; i < operations.length; i++) {
    var op = operations[i];
    var handler = handlers[op.operation];
    if (!handler) {
      results.push({ index: i, operation: op.operation, success: false, error: "Unknown operation" });
      continue;
    }
    try {
      var data = await handler(op.params || {});
      results.push({ index: i, operation: op.operation, success: true, data: data });
    } catch(e) {
      results.push({ index: i, operation: op.operation, success: false, error: e.message });
    }
  }
  return { results: results, total: operations.length, succeeded: results.filter(function(r) { return r.success; }).length };
};
