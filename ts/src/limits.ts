/**
 * Limits every server enforces and every client may check before sending.
 * Changing one is a protocol change: lowering a limit breaks senders that
 * relied on it, so it needs a new major; raising one is a minor change.
 */

/** A WebSocket ticket is short lived on purpose: it stands in for the secret in a URL. */
export const WS_TICKET_TTL_SECONDS = 60;

/** How long messages survive before the server drops them. */
export const MESSAGE_TTL_SECONDS = 30 * 24 * 60 * 60;
/** Shared context versions expire on their own, like messages, only later. */
export const CONTEXT_TTL_SECONDS = 180 * 24 * 60 * 60;

export const INVITE_TTL_SECONDS = 24 * 60 * 60;
/** An admin can ask for a longer-lived invite, but not an open-ended one. */
export const MAX_INVITE_TTL_SECONDS = 7 * 24 * 60 * 60;

/** Claims expire on their own so a crashed session never holds a path forever. */
export const CLAIM_DEFAULT_TTL_SECONDS = 2 * 60 * 60;
export const CLAIM_MAX_TTL_SECONDS = 24 * 60 * 60;

/** A member without a heartbeat for this long is shown as offline. */
export const PRESENCE_STALE_SECONDS = 90;
/** How often a connected client sends Heartbeat. */
export const HEARTBEAT_SECONDS = 30;

/** Rejected when longer, never silently truncated. */
export const MAX_MESSAGE_CHARS = 8_000;
export const MAX_CONTEXT_BODY_CHARS = 200_000;
export const MAX_CLAIM_PATHS = 50;

/** Short fields rendered inline: cut to one line and to these lengths on the way in. */
export const MAX_DISPLAY_NAME_CHARS = 60;
export const MAX_LOCATION_CHARS = 200;
export const MAX_CLAIM_PATH_CHARS = 300;
export const MAX_CLAIM_NOTE_CHARS = 500;
export const MAX_REF_CHARS = 300;
export const MAX_REFS = 20;
export const MAX_CONTEXT_TITLE_CHARS = 200;
export const MAX_CONTEXT_SUMMARY_CHARS = 500;
export const MAX_DONE_TASK_CHARS = 500;
export const MAX_TASK_LIST_TITLE_CHARS = 200;
export const MAX_TASK_TITLE_CHARS = 300;
/** Progress reports, finish summaries, dismissal reasons and release notes. */
export const MAX_TASK_NOTE_CHARS = 500;
export const MAX_TASK_REFS = 5;

/** Tasks one AddTasks may add, and tasks one list may ever hold. */
export const MAX_TASKS_PER_ADD = 25;
export const MAX_TASKS_PER_LIST = 500;
/** A checkout nobody has updated for this long can be taken over. */
export const TASK_STALE_SECONDS = 2 * 60 * 60;

export const DEFAULT_HISTORY_LIMIT = 100;
export const MAX_HISTORY_LIMIT = 200;
export const MAX_STATE_LIMIT = 500;
export const DEFAULT_TASK_LIMIT = 100;
export const MAX_TASK_LIMIT = 500;
/** Task lists in ChannelState. */
export const MAX_STATE_TASK_LISTS = 50;
