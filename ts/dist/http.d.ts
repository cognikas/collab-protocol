import type { DescMethod } from '@bufbuild/protobuf';
import { ErrorCode } from './gen/collab/v1/errors_pb.js';
/**
 * The HTTP binding (bindings/http.md): every unary RPC is
 * `POST /<package>.<Service>/<Method>` with the request as a JSON body.
 */
export declare function rpcPath(method: DescMethod): string;
/** The member credential, on every member call. */
export declare const HEADER_MEMBER_ID = "x-collab-member";
export declare const HEADER_MEMBER_SECRET = "x-collab-secret";
/** The call context: which session is calling, and in which topic. */
export declare const HEADER_TOPIC = "x-collab-topic";
export declare const HEADER_CLIENT_SESSION = "x-collab-client-session";
/** The client's protocol version, "major.minor", on every call. */
export declare const HEADER_PROTOCOL = "x-collab-protocol";
/** Admin calls only. Separate from every member credential. */
export declare const HEADER_ADMIN_KEY = "x-collab-admin-key";
/** The HTTP status that goes with each error code, so clients and servers agree on both. */
export declare function httpStatusOf(code: ErrorCode): number;
