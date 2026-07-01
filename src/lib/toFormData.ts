/**
 * Convert a plain object into FormData for APIs that only accept form-data.
 *
 * - Skips `undefined` / `null` (optional fields aren't sent).
 * - Arrays become `key[0]`, `key[1]`, … (the format Laravel expects).
 * - Files/Blobs are appended as-is (for uploads).
 * - Everything else is stringified.
 */
export function toFormData(obj: object): FormData {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (value instanceof Blob) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, i) => formData.append(`${key}[${i}]`, String(item)));
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
}
