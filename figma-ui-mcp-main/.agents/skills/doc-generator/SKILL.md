---
name: doc-generator
description: "Generate professionally styled Microsoft Word (.docx) documents, presentation decks, and reports from Markdown, prompts, or text inputs. Supports headings, styled zebra tables, code blocks, callouts, lists, themes, and slide page-breaks. Triggers on 'tạo file doc', 'xuất docx', 'input ra file doc', 'convert to docx', 'generate doc', 'export to word'."
---

# Doc Generator — Professional Word Document & Presentation Exporter

Generate high-quality, beautifully formatted Microsoft Word documents (`.docx`) from Markdown files, structured presentation notes, reports, and prompts.

## Key Features

- **Typography & Layout**: Clean typography (Segoe UI / Calibri), 0.8" balanced margins, distinct heading hierarchies (H1–H4).
- **Zebra Tables**: Automatically formats markdown tables with colored header bars, contrasting bold text, alternating row fills, and padded cells.
- **Presentation & Slido Support**: Converts `<!-- slide -->` markers into clean page breaks for slide deck printouts.
- **Code & Callouts**: Formatted monospace Consolas code blocks and styled indented blockquotes.
- **Themes**:
  - `modern-blue`: Deep Navy `#0F172A`, Royal Blue `#1E3A8A`, Cobalt `#2563EB` (Ideal for technical & business presentations).
  - `warm-artisan`: Charcoal `#1C1917`, Vermilion Red `#DA291C`, Amber Gold `#C59B58` (Ideal for food, culture, and creative pitches).
  - `slate-minimal`: Dark Slate `#111827`, Cool Gray `#374151` (Ideal for executive summaries and minimalist docs).

---

## When to Apply

Use this skill whenever:
1. The user asks to:
   - *"tạo file doc cho tôi"*
   - *"input ra một file doc"*
   - *"xuất sang Word / docx"*
   - *"export markdown to docx"*
   - *"tạo báo cáo / slide dạng tài liệu doc"*
2. You need to export a presentation deck, PRD, design review checklist, or architecture report to a `.docx` file for offline review, printing, or client delivery.

---

## Usage

### 1. Convert Markdown file to DOCX
```bash
python .agents/skills/doc-generator/scripts/md_to_docx.py "path/to/input.md" -o "path/to/output.docx"
```

### 2. Choose a Color Theme
```bash
# Modern Blue (Default)
python .agents/skills/doc-generator/scripts/md_to_docx.py "input.md" -t modern-blue

# Warm Artisan (Food, Creative, Fast-Food, Japanese)
python .agents/skills/doc-generator/scripts/md_to_docx.py "input.md" -t warm-artisan

# Slate Minimal
python .agents/skills/doc-generator/scripts/md_to_docx.py "input.md" -t slate-minimal
```

### 3. Exclude Page Breaks (Continuous Document)
If the document is a continuous article or technical spec rather than a slide presentation:
```bash
python .agents/skills/doc-generator/scripts/md_to_docx.py "input.md" --no-slide-breaks
```

---

## Workflow

1. **Prepare or Identify Markdown Source**:
   - Verify if a markdown document already exists (e.g. `SLIDO-PRESENTATION-FIGMA-AI.md`).
   - If generating from scratch, draft the structured markdown first with proper headings, lists, tables, and `<!-- slide -->` breaks.

2. **Run Converter**:
   - Execute `python .agents/skills/doc-generator/scripts/md_to_docx.py <input.md> -o <output.docx> -t <theme>`.

3. **Verify Output**:
   - Check that the output `.docx` file is created and has non-zero byte size.
   - Present a clickable file link `[output.docx](file:///path/to/output.docx)` to the user.
