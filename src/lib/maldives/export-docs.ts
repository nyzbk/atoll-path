import type { DocFile } from "./docs-types";

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function safeName(title: string, ext: string) {
  const base = title.replace(/[^\w\u0400-\u04FF\- ]+/g, "").trim() || "atoll-document";
  return `${base}.${ext}`;
}

function escapeText(s: string) {
  return s
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/"/g, "&" + "quot;");
}

/** Print/export only. Does not execute. Strips script/iframe/handlers from user HTML. */
function forPrint(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[\s\S]*?>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}

function htmlToText(html: string) {
  const d = document.createElement("div");
  d.innerHTML = forPrint(html);
  return (d.innerText || d.textContent || "").replace(/\n{3,}/g, "\n\n").trim();
}

const PRINT_CSS = `
  @page { size: A4; margin: 16mm; }
  body { font-family: Georgia, "Times New Roman", serif; color: #202124; font-size: 12pt; line-height: 1.45; }
  h1 { font-size: 20pt; margin: 0 0 8pt; }
  h2 { font-size: 12pt; letter-spacing: .08em; text-transform: uppercase; margin: 16pt 0 6pt; }
  p, li { margin: 0 0 8pt; }
  .muted { color: #5f6368; font-size: 10.5pt; }
  .ph { background: #fff4cc; }
  .fine { color: #80868b; font-size: 9pt; margin-top: 24pt; }
  .cv-head h1 { font-size: 22pt; }
  .role { font-size: 12pt; margin: 0 0 4pt; }
  table { border-collapse: collapse; width: 100%; font-size: 10pt; }
  th, td { border: 1px solid #dadce0; padding: 6pt 8pt; text-align: left; }
`;

export function exportHtml(file: DocFile) {
  const doc = `<!doctype html><html><head><meta charset="utf-8"/><title>${escapeText(file.title)}</title><style>${PRINT_CSS}</style></head><body>${forPrint(file.html)}</body></html>`;
  downloadBlob(new Blob([doc], { type: "text/html;charset=utf-8" }), safeName(file.title, "html"));
}

export function exportTxt(file: DocFile) {
  downloadBlob(new Blob([htmlToText(file.html)], { type: "text/plain;charset=utf-8" }), safeName(file.title, "txt"));
}

export function exportJson(file: DocFile, extra?: unknown) {
  const payload = {
    exportedAt: new Date().toISOString(),
    file,
    extra,
    notice: "Local backup from Atoll Path. Not a government form.",
  };
  downloadBlob(
    new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }),
    safeName(file.title, "json"),
  );
}

export function exportCsv(rows: { [k: string]: string | boolean }[], filename: string) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [keys.join(","), ...rows.map((r) => keys.map((k) => esc(r[k])).join(","))].join("\n");
  downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8" }), filename);
}

export function exportXls(rows: Record<string, string | boolean>[], sheetName: string, filename: string) {
  const keys = rows.length ? Object.keys(rows[0]) : ["col"];
  const cell = (v: unknown) =>
    `<Cell><Data ss:Type="String">${String(v ?? "")
      .replace(/&/g, "&" + "amp;")
      .replace(/</g, "&" + "lt;")}</Data></Cell>`;
  const header = `<Row>${keys.map((k) => cell(k)).join("")}</Row>`;
  const body = rows.map((r) => `<Row>${keys.map((k) => cell(r[k])).join("")}</Row>`).join("");
  const xml = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="${escapeText(sheetName)}"><Table>${header}${body}</Table></Worksheet>
</Workbook>`;
  downloadBlob(new Blob([xml], { type: "application/vnd.ms-excel" }), filename);
}

export function printPdf(file: DocFile) {
  const w = window.open("", "_blank", "noopener,noreferrer,width=900,height=1100");
  if (!w) return;
  w.document.write(
    `<!doctype html><html><head><title>${escapeText(file.title)}</title><style>${PRINT_CSS}</style></head><body>${forPrint(file.html)}</body></html>`,
  );
  w.document.close();
  w.focus();
  setTimeout(() => {
    w.print();
  }, 250);
}

function htmlToParagraphs(html: string): string[] {
  const d = document.createElement("div");
  d.innerHTML = forPrint(html);
  const out: string[] = [];
  const walk = (el: Element) => {
    const tag = el.tagName;
    if (["H1", "H2", "H3", "P", "LI"].includes(tag)) {
      const t = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (t) out.push((tag === "H1" ? "# " : tag === "H2" ? "## " : tag === "LI" ? "• " : "") + t);
      return;
    }
    el.childNodes.forEach((n) => {
      if (n.nodeType === 1) walk(n as Element);
    });
  };
  walk(d);
  return out.length ? out : [htmlToText(html)];
}

export async function exportDocx(file: DocFile) {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import("docx");
  const paras = htmlToParagraphs(file.html).map((line) => {
    if (line.startsWith("# ")) {
      return new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: line.slice(2), font: "Calibri" })],
        spacing: { after: 200 },
      });
    }
    if (line.startsWith("## ")) {
      return new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: line.slice(3), bold: true, font: "Calibri", size: 24 })],
        spacing: { before: 240, after: 120 },
      });
    }
    return new Paragraph({
      children: [new TextRun({ text: line.replace(/^• /, ""), font: "Calibri", size: 22 })],
      spacing: { after: 120 },
      bullet: line.startsWith("• ") ? { level: 0 } : undefined,
    });
  });
  const doc = new Document({
    sections: [
      {
        properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } },
        children: paras,
      },
    ],
  });
  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, safeName(file.title, "docx"));
}
