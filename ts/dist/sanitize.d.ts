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
/** One line, no control characters, at most `max` characters. Empty when nothing is left. */
export declare function cleanLine(value: unknown, max: number): string;
/** Keeps newlines and tabs, drops the other control characters and the bidi controls. */
export declare function cleanText(value: unknown): string;
