/**
 * Force a real download (not just open in a tab).
 *
 * The <a download> attribute is ignored for cross-origin URLs, so we fetch the
 * file as a blob (same-origin blob URL honors `download`). Falls back to opening
 * in a new tab if the fetch is blocked (e.g. CORS).
 */
export async function downloadFile(url: string, filename: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch file (${res.status})`);

    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(objectUrl);
  } catch {
    // Fetch blocked (CORS) or failed — at least open the file.
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
