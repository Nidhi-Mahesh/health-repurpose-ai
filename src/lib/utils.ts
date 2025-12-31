import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Export an array of objects to a CSV file and trigger a browser download.
 * - filename: suggested filename, e.g. "hypotheses.csv"
 * - rows: array of records (objects) with identical keys
 * - title: optional single-line title inserted above the CSV header
 */
export function exportToCsv(filename: string, rows: Record<string, any>[], title?: string) {
  if (!rows || rows.length === 0) return;

  const headerKeys = Object.keys(rows[0]);
  const csvRows: string[] = [];

  if (title) {
    // Add the title as a single quoted line, then an empty line for separation
    csvRows.push(`"${String(title).replace(/"/g, '""')}"`);
    csvRows.push("");
  }

  // Header row
  csvRows.push(headerKeys.map((h) => `"${String(h).replace(/"/g, '""')}"`).join(","));

  // Data rows
  for (const row of rows) {
    const values = headerKeys.map((k) => {
      const v = row[k] ?? "";
      // Wrap in quotes and escape existing quotes
      return `"${String(v).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\r\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}
