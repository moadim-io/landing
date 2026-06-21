/**
 * Serialize a value as a JSON-LD string safe to embed inside a `<script>` tag.
 *
 * `JSON.stringify` alone is **not** safe to drop into `dangerouslySetInnerHTML`:
 * the HTML parser ends the script at the first literal `</script` (or `<!--`),
 * regardless of JSON quoting. So a string value containing `</script>` would
 * break out of the element — a latent XSS sink the moment any JSON-LD field is
 * sourced from non-constant data.
 *
 * Escaping `<`, `>` and `&` to their `\uXXXX` forms (which JSON parsers decode
 * back to the original characters, so the structured data is unchanged) closes
 * that hole. U+2028 / U+2029 are also escaped: they are valid in JSON strings
 * but are line terminators in JavaScript, and some consumers parse the script
 * body as JS. This mirrors the escaping React/Next apply to inlined data.
 */
export function jsonLdHtml(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
