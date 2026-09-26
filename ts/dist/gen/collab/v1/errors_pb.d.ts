import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file collab/v1/errors.proto.
 */
export declare const file_collab_v1_errors: GenFile;
/**
 * @generated from message collab.v1.ErrorDetail
 */
export type ErrorDetail = Message<"collab.v1.ErrorDetail"> & {
    /**
     * @generated from field: collab.v1.ErrorCode code = 1;
     */
    code: ErrorCode;
    /**
     * For people. May change between releases; do not parse it.
     *
     * @generated from field: string message = 2;
     */
    message: string;
    /**
     * Set when the error answers a request that carried one.
     *
     * @generated from field: string request_id = 3;
     */
    requestId: string;
};
/**
 * Describes the message collab.v1.ErrorDetail.
 * Use `create(ErrorDetailSchema)` to create a new message.
 */
export declare const ErrorDetailSchema: GenMessage<ErrorDetail>;
/**
 * Every error any operation can return. Clients branch on the code, never on
 * the message text. Adding a code is a minor change; readers treat a code
 * they do not know as ERROR_CODE_INTERNAL.
 *
 * @generated from enum collab.v1.ErrorCode
 */
export declare enum ErrorCode {
    /**
     * @generated from enum value: ERROR_CODE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ERROR_CODE_INTERNAL = 1;
     */
    INTERNAL = 1,
    /**
     * The frame or body could not be parsed, or names no known operation.
     *
     * @generated from enum value: ERROR_CODE_BAD_REQUEST = 2;
     */
    BAD_REQUEST = 2,
    /**
     * @generated from enum value: ERROR_CODE_NOT_FOUND = 3;
     */
    NOT_FOUND = 3,
    /**
     * Missing or wrong credentials (member secret, admin key or ticket).
     *
     * @generated from enum value: ERROR_CODE_UNAUTHENTICATED = 4;
     */
    UNAUTHENTICATED = 4,
    /**
     * The member was revoked. Retrying cannot help.
     *
     * @generated from enum value: ERROR_CODE_REVOKED = 5;
     */
    REVOKED = 5,
    /**
     * The server does not speak the client's protocol major. The message says which ones it does.
     *
     * @generated from enum value: ERROR_CODE_UNSUPPORTED_PROTOCOL = 6;
     */
    UNSUPPORTED_PROTOCOL = 6,
    /**
     * A WebSocket frame arrived on a connection the server no longer knows. Reconnect.
     *
     * @generated from enum value: ERROR_CODE_UNKNOWN_CONNECTION = 7;
     */
    UNKNOWN_CONNECTION = 7,
    /**
     * The invite is unknown, expired or already used.
     *
     * @generated from enum value: ERROR_CODE_INVALID_INVITE = 8;
     */
    INVALID_INVITE = 8,
    /**
     * @generated from enum value: ERROR_CODE_INVALID_NAME = 9;
     */
    INVALID_NAME = 9,
    /**
     * Another member already has the handle this display name produces. The invite is still good.
     *
     * @generated from enum value: ERROR_CODE_NAME_TAKEN = 10;
     */
    NAME_TAKEN = 10,
    /**
     * @generated from enum value: ERROR_CODE_INVALID_CHANNEL = 11;
     */
    INVALID_CHANNEL = 11,
    /**
     * @generated from enum value: ERROR_CODE_INVALID_TOPIC = 12;
     */
    INVALID_TOPIC = 12,
    /**
     * A client session id that is malformed, or one in a recipient without the handle of its member.
     *
     * @generated from enum value: ERROR_CODE_INVALID_CLIENT_SESSION = 13;
     */
    INVALID_CLIENT_SESSION = 13,
    /**
     * @generated from enum value: ERROR_CODE_INVALID_MEMBER = 14;
     */
    INVALID_MEMBER = 14,
    /**
     * A message named neither a handle nor a topic.
     *
     * @generated from enum value: ERROR_CODE_NO_RECIPIENT = 15;
     */
    NO_RECIPIENT = 15,
    /**
     * No member has that handle. The message lists the ones that exist.
     *
     * @generated from enum value: ERROR_CODE_UNKNOWN_HANDLE = 16;
     */
    UNKNOWN_HANDLE = 16,
    /**
     * @generated from enum value: ERROR_CODE_EMPTY_MESSAGE = 17;
     */
    EMPTY_MESSAGE = 17,
    /**
     * @generated from enum value: ERROR_CODE_MESSAGE_TOO_LONG = 18;
     */
    MESSAGE_TOO_LONG = 18,
    /**
     * A type clients may not send (claim, release, context), or a payload that does not match the type.
     *
     * @generated from enum value: ERROR_CODE_INVALID_TYPE = 19;
     */
    INVALID_TYPE = 19,
    /**
     * @generated from enum value: ERROR_CODE_NO_PATHS = 20;
     */
    NO_PATHS = 20,
    /**
     * @generated from enum value: ERROR_CODE_TOO_MANY_PATHS = 21;
     */
    TOO_MANY_PATHS = 21,
    /**
     * @generated from enum value: ERROR_CODE_INVALID_KEY = 22;
     */
    INVALID_KEY = 22,
    /**
     * @generated from enum value: ERROR_CODE_CONTEXT_TOO_LARGE = 23;
     */
    CONTEXT_TOO_LARGE = 23
}
/**
 * Describes the enum collab.v1.ErrorCode.
 */
export declare const ErrorCodeSchema: GenEnum<ErrorCode>;
