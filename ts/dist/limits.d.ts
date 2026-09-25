/**
 * Limits every server enforces and every client may check before sending.
 * Changing one is a protocol change: lowering a limit breaks senders that
 * relied on it, so it needs a new major; raising one is a minor change.
 */
/** A WebSocket ticket is short lived on purpose: it stands in for the secret in a URL. */
export declare const WS_TICKET_TTL_SECONDS = 60;
/** How long messages survive before the server drops them. */
export declare const MESSAGE_TTL_SECONDS: number;
/** Shared context versions expire on their own, like messages, only later. */
export declare const CONTEXT_TTL_SECONDS: number;
export declare const INVITE_TTL_SECONDS: number;
/** An admin can ask for a longer-lived invite, but not an open-ended one. */
export declare const MAX_INVITE_TTL_SECONDS: number;
/** Claims expire on their own so a crashed session never holds a path forever. */
export declare const CLAIM_DEFAULT_TTL_SECONDS: number;
export declare const CLAIM_MAX_TTL_SECONDS: number;
/** A member without a heartbeat for this long is shown as offline. */
export declare const PRESENCE_STALE_SECONDS = 90;
/** How often a connected client sends Heartbeat. */
export declare const HEARTBEAT_SECONDS = 30;
/** Rejected when longer, never silently truncated. */
export declare const MAX_MESSAGE_CHARS = 8000;
export declare const MAX_CONTEXT_BODY_CHARS = 200000;
export declare const MAX_CLAIM_PATHS = 50;
/** Short fields rendered inline: cut to one line and to these lengths on the way in. */
export declare const MAX_DISPLAY_NAME_CHARS = 60;
export declare const MAX_LOCATION_CHARS = 200;
export declare const MAX_CLAIM_PATH_CHARS = 300;
export declare const MAX_CLAIM_NOTE_CHARS = 500;
export declare const MAX_REF_CHARS = 300;
export declare const MAX_REFS = 20;
export declare const MAX_CONTEXT_TITLE_CHARS = 200;
export declare const MAX_CONTEXT_SUMMARY_CHARS = 500;
export declare const MAX_DONE_TASK_CHARS = 500;
export declare const DEFAULT_HISTORY_LIMIT = 100;
export declare const MAX_HISTORY_LIMIT = 200;
export declare const MAX_STATE_LIMIT = 500;
