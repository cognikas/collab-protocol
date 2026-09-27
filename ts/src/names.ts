/**
 * Names that address something on the channel: topics, member handles, context
 * keys and channel names. Every implementation must produce exactly these
 * results (vectors/names.json), or a name one side resolves is not the name the
 * other side accepts.
 */

const TOPIC = /^[a-z0-9][a-z0-9._-]{0,63}$/;
const CLIENT_SESSION_ID = /^[A-Za-z0-9._-]{1,64}$/;

/** Longest topic, handle and channel name. */
export const MAX_NAME_CHARS = 64;
export const MAX_CONTEXT_KEY_CHARS = 100;

/**
 * Lowercase letters, digits, `.`, `_` and `-`, starting with a letter or digit.
 * Accents are folded rather than dropped, so "José" is `jose` and not `jos`.
 * Empty when nothing usable is left.
 */
export function slug(value: unknown, max = MAX_NAME_CHARS): string {
  if (typeof value !== 'string') return '';
  return value
    .normalize('NFKD')
    .replace(/\p{M}+/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^[._-]+/, '')
    .slice(0, max)
    .replace(/-+$/, '');
}

export function isTopic(value: unknown): value is string {
  return typeof value === 'string' && TOPIC.test(value);
}

/** How a member is addressed: derived from the display name chosen at Join, which never changes. */
export function handleOf(displayName: unknown): string {
  return slug(displayName);
}

/** Stable, URL-ish keys: the same alphabet as a slug, up to 100 characters. */
export function contextKey(key: unknown): string {
  return slug(key, MAX_CONTEXT_KEY_CHARS);
}

/** A task list's key within its topic: a slug, like a topic name. */
export function taskListKey(key: unknown): string {
  return slug(key, MAX_NAME_CHARS);
}

/** Claude Code session ids are UUIDs; scripts use short names like `smoke-ana`. */
export function isClientSessionId(value: unknown): value is string {
  return typeof value === 'string' && CLIENT_SESSION_ID.test(value);
}
