import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { AckRequest, AckResponse, ClaimRequest, ClaimResponse, ClaimsEvent, GetContextRequest, GetContextResponse, HeartbeatRequest, HeartbeatResponse, HelloEvent, HistoryRequest, HistoryResponse, PresenceEvent, PutContextRequest, PutContextResponse, ReleaseRequest, ReleaseResponse, SendRequest, SendResponse, SetPresenceRequest, SetPresenceResponse, SubscribeRequest } from "./channel_pb.js";
import type { ErrorDetail } from "./errors_pb.js";
import type { ContextSummary, Message as Message$1 } from "./model_pb.js";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file collab/v1/websocket.proto.
 */
export declare const file_collab_v1_websocket: GenFile;
/**
 * @generated from message collab.v1.IssueTicketRequest
 */
export type IssueTicketRequest = Message<"collab.v1.IssueTicketRequest"> & {};
/**
 * Describes the message collab.v1.IssueTicketRequest.
 * Use `create(IssueTicketRequestSchema)` to create a new message.
 */
export declare const IssueTicketRequestSchema: GenMessage<IssueTicketRequest>;
/**
 * @generated from message collab.v1.IssueTicketResponse
 */
export type IssueTicketResponse = Message<"collab.v1.IssueTicketResponse"> & {
    /**
     * Opaque, single use, valid for 60 seconds.
     *
     * @generated from field: string ticket = 1;
     */
    ticket: string;
    /**
     * @generated from field: string ws_endpoint = 2;
     */
    wsEndpoint: string;
    /**
     * @generated from field: google.protobuf.Timestamp expires_at = 3;
     */
    expiresAt?: Timestamp | undefined;
};
/**
 * Describes the message collab.v1.IssueTicketResponse.
 * Use `create(IssueTicketResponseSchema)` to create a new message.
 */
export declare const IssueTicketResponseSchema: GenMessage<IssueTicketResponse>;
/**
 * Client to server. Field numbers match ServerFrame.result so a response
 * lands in the same numbered case as its request.
 *
 * @generated from message collab.v1.ClientFrame
 */
export type ClientFrame = Message<"collab.v1.ClientFrame"> & {
    /**
     * Echoed in the Result or Error that answers this frame. Without it, no
     * Result is sent (errors still are).
     *
     * @generated from field: string request_id = 1;
     */
    requestId: string;
    /**
     * @generated from oneof collab.v1.ClientFrame.request
     */
    request: {
        /**
         * Must be the first frame on a socket; answered with a `hello` event.
         *
         * @generated from field: collab.v1.SubscribeRequest subscribe = 10;
         */
        value: SubscribeRequest;
        case: "subscribe";
    } | {
        /**
         * @generated from field: collab.v1.SendRequest send = 11;
         */
        value: SendRequest;
        case: "send";
    } | {
        /**
         * @generated from field: collab.v1.AckRequest ack = 12;
         */
        value: AckRequest;
        case: "ack";
    } | {
        /**
         * @generated from field: collab.v1.ClaimRequest claim = 13;
         */
        value: ClaimRequest;
        case: "claim";
    } | {
        /**
         * @generated from field: collab.v1.ReleaseRequest release = 14;
         */
        value: ReleaseRequest;
        case: "release";
    } | {
        /**
         * @generated from field: collab.v1.PutContextRequest put_context = 15;
         */
        value: PutContextRequest;
        case: "putContext";
    } | {
        /**
         * @generated from field: collab.v1.GetContextRequest get_context = 16;
         */
        value: GetContextRequest;
        case: "getContext";
    } | {
        /**
         * @generated from field: collab.v1.SetPresenceRequest set_presence = 17;
         */
        value: SetPresenceRequest;
        case: "setPresence";
    } | {
        /**
         * @generated from field: collab.v1.HistoryRequest history = 18;
         */
        value: HistoryRequest;
        case: "history";
    } | {
        /**
         * @generated from field: collab.v1.HeartbeatRequest heartbeat = 19;
         */
        value: HeartbeatRequest;
        case: "heartbeat";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message collab.v1.ClientFrame.
 * Use `create(ClientFrameSchema)` to create a new message.
 */
export declare const ClientFrameSchema: GenMessage<ClientFrame>;
/**
 * Server to client. Cases 1-5 are SubscribeResponse's, with the same numbers.
 *
 * @generated from message collab.v1.ServerFrame
 */
export type ServerFrame = Message<"collab.v1.ServerFrame"> & {
    /**
     * @generated from oneof collab.v1.ServerFrame.frame
     */
    frame: {
        /**
         * @generated from field: collab.v1.HelloEvent hello = 1;
         */
        value: HelloEvent;
        case: "hello";
    } | {
        /**
         * @generated from field: collab.v1.Message message = 2;
         */
        value: Message$1;
        case: "message";
    } | {
        /**
         * @generated from field: collab.v1.PresenceEvent presence = 3;
         */
        value: PresenceEvent;
        case: "presence";
    } | {
        /**
         * @generated from field: collab.v1.ClaimsEvent claims = 4;
         */
        value: ClaimsEvent;
        case: "claims";
    } | {
        /**
         * @generated from field: collab.v1.ContextSummary context = 5;
         */
        value: ContextSummary;
        case: "context";
    } | {
        /**
         * @generated from field: collab.v1.Result result = 6;
         */
        value: Result;
        case: "result";
    } | {
        /**
         * @generated from field: collab.v1.ErrorDetail error = 7;
         */
        value: ErrorDetail;
        case: "error";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message collab.v1.ServerFrame.
 * Use `create(ServerFrameSchema)` to create a new message.
 */
export declare const ServerFrameSchema: GenMessage<ServerFrame>;
/**
 * The answer to a ClientFrame that carried a request_id.
 *
 * @generated from message collab.v1.Result
 */
export type Result = Message<"collab.v1.Result"> & {
    /**
     * @generated from field: string request_id = 1;
     */
    requestId: string;
    /**
     * @generated from oneof collab.v1.Result.response
     */
    response: {
        /**
         * @generated from field: collab.v1.SendResponse send = 11;
         */
        value: SendResponse;
        case: "send";
    } | {
        /**
         * @generated from field: collab.v1.AckResponse ack = 12;
         */
        value: AckResponse;
        case: "ack";
    } | {
        /**
         * @generated from field: collab.v1.ClaimResponse claim = 13;
         */
        value: ClaimResponse;
        case: "claim";
    } | {
        /**
         * @generated from field: collab.v1.ReleaseResponse release = 14;
         */
        value: ReleaseResponse;
        case: "release";
    } | {
        /**
         * @generated from field: collab.v1.PutContextResponse put_context = 15;
         */
        value: PutContextResponse;
        case: "putContext";
    } | {
        /**
         * @generated from field: collab.v1.GetContextResponse get_context = 16;
         */
        value: GetContextResponse;
        case: "getContext";
    } | {
        /**
         * @generated from field: collab.v1.SetPresenceResponse set_presence = 17;
         */
        value: SetPresenceResponse;
        case: "setPresence";
    } | {
        /**
         * @generated from field: collab.v1.HistoryResponse history = 18;
         */
        value: HistoryResponse;
        case: "history";
    } | {
        /**
         * @generated from field: collab.v1.HeartbeatResponse heartbeat = 19;
         */
        value: HeartbeatResponse;
        case: "heartbeat";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message collab.v1.Result.
 * Use `create(ResultSchema)` to create a new message.
 */
export declare const ResultSchema: GenMessage<Result>;
/**
 * @generated from service collab.v1.WebSocketService
 */
export declare const WebSocketService: GenService<{
    /**
     * Over HTTP, with the member credential. The ticket opens one socket and
     * carries the topic and client session id, so the long-lived secret never
     * appears in a WebSocket URL (which ends up in access logs).
     *
     * @generated from rpc collab.v1.WebSocketService.IssueTicket
     */
    issueTicket: {
        methodKind: "unary";
        input: typeof IssueTicketRequestSchema;
        output: typeof IssueTicketResponseSchema;
    };
}>;
