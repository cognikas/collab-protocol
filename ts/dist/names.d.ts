/**
 * Names that address something on the channel: topics, member handles, context
 * keys and channel names. Every implementation must produce exactly these
 * results (vectors/names.json), or a name one side resolves is not the name the
 * other side accepts.
 */
/** Longest topic, handle and channel name. */
export declare const MAX_NAME_CHARS = 64;
export declare const MAX_CONTEXT_KEY_CHARS = 100;
/**
 * Lowercase letters, digits, `.`, `_` and `-`, starting with a letter or digit.
 * Accents are folded rather than dropped, so "José" is `jose` and not `jos`.
 * Empty when nothing usable is left.
 */
export declare function slug(value: unknown, max?: number): string;
export declare function isTopic(value: unknown): value is string;
/** How a member is addressed: derived from the display name chosen at Join, which never changes. */
export declare function handleOf(displayName: unknown): string;
/** Stable, URL-ish keys: the same alphabet as a slug, up to 100 characters. */
export declare function contextKey(key: unknown): string;
/** Claude Code session ids are UUIDs; scripts use short names like `smoke-ana`. */
export declare function isClientSessionId(value: unknown): value is string;
