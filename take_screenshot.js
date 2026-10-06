import http from 'node:http';
import fs from 'node:fs';

/**
 * Capture screenshot of any Figma node by ID for visual design audits.
 * Communicates with the Figma MCP bridge at http://localhost:38451/exec.
 *
 * CLI Usage:
 *   node take_screenshot.js <nodeId> [outFile=screenshot.png] [scale=0.5]
 *
 * Example:
 *   node take_screenshot.js "102:458" "audit_result.png" 1
 */
export async function captureScreenshot(nodeId, outFile = 'screenshot.png', scale = 0.5) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      operation: 'screenshot',
      params: { id: nodeId, scale: Number(scale) || 0.5 }
    });

    const req = http.request({
      hostname: 'localhost',
      port: 38451,
      path: '/exec',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      }
    }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(raw);
          if (parsed.success && parsed.data) {
            let base64 = '';
            if (parsed.data.image) {
              base64 = parsed.data.image;
            } else if (parsed.data.dataUrl) {
              base64 = parsed.data.dataUrl.replace(/^data:image\/\w+;base64,/, '');
            }

            if (base64) {
              const buf = Buffer.from(base64, 'base64');
              fs.writeFileSync(outFile, buf);
              console.log(`[Audit Screenshot] Saved "${outFile}" (${buf.length} bytes) for node ${parsed.data.nodeId || nodeId} (scale: ${scale})`);
              resolve({ success: true, outFile, size: buf.length, nodeId });
            } else {
              const errMsg = 'No image data returned from Figma bridge';
              console.error(`[Audit Screenshot Error] ${errMsg}`);
              reject(new Error(errMsg));
            }
          } else {
            const errMsg = parsed.error || 'Failed to capture screenshot';
            console.error(`[Audit Screenshot Error] ${errMsg}`);
            reject(new Error(errMsg));
          }
        } catch (e) {
          console.error(`[Audit Screenshot Error] Invalid bridge response:`, e.message);
          reject(e);
        }
      });
    });

    req.on('error', (err) => {
      console.error(`[Audit Screenshot Error] Bridge connection error:`, err.message);
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

// CLI execution
if (process.argv[1]?.endsWith('take_screenshot.js')) {
  const nodeId = process.argv[2];
  const outFile = process.argv[3] || 'screenshot.png';
  const scale = process.argv[4] ? parseFloat(process.argv[4]) : 0.5;

  if (!nodeId) {
    console.log(`
Usage: node take_screenshot.js <nodeId> [outFile=screenshot.png] [scale=0.5]

Options:
  nodeId   : ID of the Figma frame or component (e.g. "102:458" or "3274:12125")
  outFile  : Target file path to save PNG image (default: "screenshot.png")
  scale    : Export scale factor (default: 0.5, use 1.0 or 2.0 for higher resolution)

Example:
  node take_screenshot.js "3274:12125" "audit_homepage.png" 0.75
`);
    process.exit(1);
  }

  captureScreenshot(nodeId, outFile, scale)
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
