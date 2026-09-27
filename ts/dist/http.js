import { ErrorCode } from './gen/collab/v1/errors_pb.js';
/**
 * The HTTP binding (bindings/http.md): every unary RPC is
 * `POST /<package>.<Service>/<Method>` with the request as a JSON body.
 */
export function rpcPath(method) {
    return `/${method.parent.typeName}/${method.name}`;
}
/** The member credential, on every member call. */
export const HEADER_MEMBER_ID = 'x-collab-member';
export const HEADER_MEMBER_SECRET = 'x-collab-secret';
/** The call context: which session is calling, and in which topic. */
export const HEADER_TOPIC = 'x-collab-topic';
export const HEADER_CLIENT_SESSION = 'x-collab-client-session';
/** The client's protocol version, "major.minor", on every call. */
export const HEADER_PROTOCOL = 'x-collab-protocol';
/** Admin calls only. Separate from every member credential. */
export const HEADER_ADMIN_KEY = 'x-collab-admin-key';
/** The HTTP status that goes with each error code, so clients and servers agree on both. */
export function httpStatusOf(code) {
    switch (code) {
        case ErrorCode.UNAUTHENTICATED:
            return 401;
        case ErrorCode.REVOKED:
        case ErrorCode.INVALID_INVITE:
        case ErrorCode.NOT_TASK_HOLDER:
            return 403;
        case ErrorCode.NOT_FOUND:
        case ErrorCode.UNKNOWN_HANDLE:
            return 404;
        case ErrorCode.NAME_TAKEN:
        case ErrorCode.TASK_TAKEN:
        case ErrorCode.TASK_CLOSED:
            return 409;
        case ErrorCode.UNSUPPORTED_PROTOCOL:
            return 426;
        case ErrorCode.INTERNAL:
        case ErrorCode.UNSPECIFIED:
            return 500;
        default:
            return 400;
    }
}
