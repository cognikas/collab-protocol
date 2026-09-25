/**
 * What the server does to peer-chosen text before storing it, so every reader
 * can rely on it (vectors/sanitize.json). Clients still treat all peer text as
 * untrusted: these rules stop layout tricks, not instructions.
 *
 * Message text and context bodies keep their newlines, since a multi-line
 * summary is legitimate. Short fields are rendered inline (a name, a branch, a
 * claimed path), so they are cut to one line: a newline in them could otherwise
 * pose as a line of the block they are rendered in.
 */
const C0 = [0x00, 0x1f];
const C0_EXCEPT_TAB_LF_CR = [[0x00, 0x08], [0x0b, 0x0c], [0x0e, 0x1f]];
const DEL_AND_C1 = [0x7f, 0x9f];
const LINE_AND_PARAGRAPH_SEPARATORS = [0x2028, 0x2029];
/** Bidirectional overrides and isolates: they make text read differently from the order it is stored in. */
const BIDI_OVERRIDES = [0x202a, 0x202e];
const BIDI_ISOLATES = [0x2066, 0x2069];
/** A character class built from code points, so this file stays plain ASCII. */
function charClass(ranges) {
    const char = (n) => String.fromCharCode(n);
    return new RegExp(`[${ranges.map(([from, to]) => `${char(from)}-${char(to)}`).join("")}]+`, "g");
}
const UNSAFE = charClass([C0, DEL_AND_C1, LINE_AND_PARAGRAPH_SEPARATORS, BIDI_OVERRIDES, BIDI_ISOLATES]);
const UNSAFE_IN_TEXT = charClass([...C0_EXCEPT_TAB_LF_CR, DEL_AND_C1, BIDI_OVERRIDES, BIDI_ISOLATES]);
/** One line, no control characters, at most `max` characters. Empty when nothing is left. */
export function cleanLine(value, max) {
    if (typeof value !== 'string')
        return '';
    const line = value.replace(UNSAFE, ' ').replace(/\s{2,}/g, ' ').trim();
    return line.slice(0, max);
}
/** Keeps newlines and tabs, drops the other control characters and the bidi controls. */
export function cleanText(value) {
    if (typeof value !== 'string')
        return '';
    return value.replace(UNSAFE_IN_TEXT, '');
}
