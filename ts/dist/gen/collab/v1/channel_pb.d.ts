import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { ChannelState, Claim, ClientInfo, ContextEntry, ContextSummary, DonePayload, Member, MemberStatus, Message as Message$1, MessageType, ProtocolVersion, Recipient, Urgency } from "./model_pb.js";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file collab/v1/channel.proto.
 */
export declare const file_collab_v1_channel: GenFile;
/**
 * @generated from message collab.v1.SubscribeRequest
 */
export type SubscribeRequest = Message<"collab.v1.SubscribeRequest"> & {
    /**
     * @generated from field: collab.v1.ClientInfo client = 1;
     */
    client?: ClientInfo | undefined;
    /**
     * Replay starts after this seq. Unset: at the member's cursor in this topic.
     *
     * @generated from field: optional uint32 since = 2;
     */
    since?: number | undefined;
    /**
     * @generated from field: string repo = 3;
     */
    repo: string;
    /**
     * @generated from field: string branch = 4;
     */
    branch: string;
};
/**
 * Describes the message collab.v1.SubscribeRequest.
 * Use `create(SubscribeRequestSchema)` to create a new message.
 */
export declare const SubscribeRequestSchema: GenMessage<SubscribeRequest>;
/**
 * One event on the live stream.
 *
 * @generated from message collab.v1.SubscribeResponse
 */
export type SubscribeResponse = Message<"collab.v1.SubscribeResponse"> & {
    /**
     * @generated from oneof collab.v1.SubscribeResponse.event
     */
    event: {
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
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message collab.v1.SubscribeResponse.
 * Use `create(SubscribeResponseSchema)` to create a new message.
 */
export declare const SubscribeResponseSchema: GenMessage<SubscribeResponse>;
/**
 * @generated from message collab.v1.HelloEvent
 */
export type HelloEvent = Message<"collab.v1.HelloEvent"> & {
    /**
     * @generated from field: collab.v1.ChannelState state = 1;
     */
    state?: ChannelState | undefined;
    /**
     * The version both sides now speak: the client's major, and the lower of the two minors.
     *
     * @generated from field: collab.v1.ProtocolVersion protocol = 2;
     */
    protocol?: ProtocolVersion | undefined;
    /**
     * Modules both sides implement.
     *
     * @generated from field: repeated string capabilities = 3;
     */
    capabilities: string[];
    /**
     * @generated from field: string server_version = 4;
     */
    serverVersion: string;
};
/**
 * Describes the message collab.v1.HelloEvent.
 * Use `create(HelloEventSchema)` to create a new message.
 */
export declare const HelloEventSchema: GenMessage<HelloEvent>;
/**
 * The whole member list, channel-wide, every time anyone's presence changes.
 *
 * @generated from message collab.v1.PresenceEvent
 */
export type PresenceEvent = Message<"collab.v1.PresenceEvent"> & {
    /**
     * @generated from field: repeated collab.v1.Member members = 1;
     */
    members: Member[];
};
/**
 * Describes the message collab.v1.PresenceEvent.
 * Use `create(PresenceEventSchema)` to create a new message.
 */
export declare const PresenceEventSchema: GenMessage<PresenceEvent>;
/**
 * The whole claim list of one topic, every time it changes. Only sessions in
 * that topic receive it.
 *
 * @generated from message collab.v1.ClaimsEvent
 */
export type ClaimsEvent = Message<"collab.v1.ClaimsEvent"> & {
    /**
     * @generated from field: string topic = 1;
     */
    topic: string;
    /**
     * @generated from field: repeated collab.v1.Claim claims = 2;
     */
    claims: Claim[];
};
/**
 * Describes the message collab.v1.ClaimsEvent.
 * Use `create(ClaimsEventSchema)` to create a new message.
 */
export declare const ClaimsEventSchema: GenMessage<ClaimsEvent>;
/**
 * @generated from message collab.v1.GetStateRequest
 */
export type GetStateRequest = Message<"collab.v1.GetStateRequest"> & {
    /**
     * @generated from field: optional uint32 since = 1;
     */
    since?: number | undefined;
    /**
     * At most this many messages. Unset or 0: 100.
     *
     * @generated from field: uint32 limit = 2;
     */
    limit: number;
};
/**
 * Describes the message collab.v1.GetStateRequest.
 * Use `create(GetStateRequestSchema)` to create a new message.
 */
export declare const GetStateRequestSchema: GenMessage<GetStateRequest>;
/**
 * @generated from message collab.v1.GetStateResponse
 */
export type GetStateResponse = Message<"collab.v1.GetStateResponse"> & {
    /**
     * @generated from field: collab.v1.ChannelState state = 1;
     */
    state?: ChannelState | undefined;
};
/**
 * Describes the message collab.v1.GetStateResponse.
 * Use `create(GetStateResponseSchema)` to create a new message.
 */
export declare const GetStateResponseSchema: GenMessage<GetStateResponse>;
/**
 * @generated from message collab.v1.SendRequest
 */
export type SendRequest = Message<"collab.v1.SendRequest"> & {
    /**
     * NOTE, QUESTION or DONE. The other types are the server's.
     *
     * @generated from field: collab.v1.MessageType type = 1;
     */
    type: MessageType;
    /**
     * @generated from field: string text = 2;
     */
    text: string;
    /**
     * @generated from field: collab.v1.Recipient to = 3;
     */
    to?: Recipient | undefined;
    /**
     * @generated from field: collab.v1.Urgency urgency = 4;
     */
    urgency: Urgency;
    /**
     * @generated from field: repeated string refs = 5;
     */
    refs: string[];
    /**
     * Only with type DONE.
     *
     * @generated from field: collab.v1.DonePayload done = 6;
     */
    done?: DonePayload | undefined;
};
/**
 * Describes the message collab.v1.SendRequest.
 * Use `create(SendRequestSchema)` to create a new message.
 */
export declare const SendRequestSchema: GenMessage<SendRequest>;
/**
 * @generated from message collab.v1.SendResponse
 */
export type SendResponse = Message<"collab.v1.SendResponse"> & {
    /**
     * @generated from field: uint32 seq = 1;
     */
    seq: number;
    /**
     * Live sessions it reached. Zero is fine: it waits in history.
     *
     * @generated from field: uint32 delivered = 2;
     */
    delivered: number;
    /**
     * True when no other member was connected at all, so it also went out as an
     * offline notification.
     *
     * @generated from field: bool delivered_offline = 3;
     */
    deliveredOffline: boolean;
};
/**
 * Describes the message collab.v1.SendResponse.
 * Use `create(SendResponseSchema)` to create a new message.
 */
export declare const SendResponseSchema: GenMessage<SendResponse>;
/**
 * @generated from message collab.v1.AckRequest
 */
export type AckRequest = Message<"collab.v1.AckRequest"> & {
    /**
     * @generated from field: uint32 cursor = 1;
     */
    cursor: number;
};
/**
 * Describes the message collab.v1.AckRequest.
 * Use `create(AckRequestSchema)` to create a new message.
 */
export declare const AckRequestSchema: GenMessage<AckRequest>;
/**
 * @generated from message collab.v1.AckResponse
 */
export type AckResponse = Message<"collab.v1.AckResponse"> & {};
/**
 * Describes the message collab.v1.AckResponse.
 * Use `create(AckResponseSchema)` to create a new message.
 */
export declare const AckResponseSchema: GenMessage<AckResponse>;
/**
 * @generated from message collab.v1.ClaimRequest
 */
export type ClaimRequest = Message<"collab.v1.ClaimRequest"> & {
    /**
     * @generated from field: repeated string paths = 1;
     */
    paths: string[];
    /**
     * @generated from field: string note = 2;
     */
    note: string;
    /**
     * Unset or 0: the default of 2 hours. Capped at 24 hours.
     *
     * @generated from field: uint32 ttl_seconds = 3;
     */
    ttlSeconds: number;
};
/**
 * Describes the message collab.v1.ClaimRequest.
 * Use `create(ClaimRequestSchema)` to create a new message.
 */
export declare const ClaimRequestSchema: GenMessage<ClaimRequest>;
/**
 * @generated from message collab.v1.ClaimResponse
 */
export type ClaimResponse = Message<"collab.v1.ClaimResponse"> & {
    /**
     * @generated from field: collab.v1.Claim claim = 1;
     */
    claim?: Claim | undefined;
};
/**
 * Describes the message collab.v1.ClaimResponse.
 * Use `create(ClaimResponseSchema)` to create a new message.
 */
export declare const ClaimResponseSchema: GenMessage<ClaimResponse>;
/**
 * A claim can be released from any of its owner's sessions.
 *
 * @generated from message collab.v1.ReleaseRequest
 */
export type ReleaseRequest = Message<"collab.v1.ReleaseRequest"> & {
    /**
     * @generated from field: string claim_id = 1;
     */
    claimId: string;
};
/**
 * Describes the message collab.v1.ReleaseRequest.
 * Use `create(ReleaseRequestSchema)` to create a new message.
 */
export declare const ReleaseRequestSchema: GenMessage<ReleaseRequest>;
/**
 * @generated from message collab.v1.ReleaseResponse
 */
export type ReleaseResponse = Message<"collab.v1.ReleaseResponse"> & {
    /**
     * False when there was no such claim of the caller's.
     *
     * @generated from field: bool released = 1;
     */
    released: boolean;
};
/**
 * Describes the message collab.v1.ReleaseResponse.
 * Use `create(ReleaseResponseSchema)` to create a new message.
 */
export declare const ReleaseResponseSchema: GenMessage<ReleaseResponse>;
/**
 * Writes a new version of `key` in the caller's topic.
 *
 * @generated from message collab.v1.PutContextRequest
 */
export type PutContextRequest = Message<"collab.v1.PutContextRequest"> & {
    /**
     * @generated from field: string key = 1;
     */
    key: string;
    /**
     * @generated from field: string title = 2;
     */
    title: string;
    /**
     * @generated from field: string summary = 3;
     */
    summary: string;
    /**
     * @generated from field: string body = 4;
     */
    body: string;
};
/**
 * Describes the message collab.v1.PutContextRequest.
 * Use `create(PutContextRequestSchema)` to create a new message.
 */
export declare const PutContextRequestSchema: GenMessage<PutContextRequest>;
/**
 * @generated from message collab.v1.PutContextResponse
 */
export type PutContextResponse = Message<"collab.v1.PutContextResponse"> & {
    /**
     * @generated from field: collab.v1.ContextEntry entry = 1;
     */
    entry?: ContextEntry | undefined;
};
/**
 * Describes the message collab.v1.PutContextResponse.
 * Use `create(PutContextResponseSchema)` to create a new message.
 */
export declare const PutContextResponseSchema: GenMessage<PutContextResponse>;
/**
 * @generated from message collab.v1.GetContextRequest
 */
export type GetContextRequest = Message<"collab.v1.GetContextRequest"> & {
    /**
     * @generated from field: string key = 1;
     */
    key: string;
    /**
     * Unset: the latest version.
     *
     * @generated from field: optional uint32 version = 2;
     */
    version?: number | undefined;
    /**
     * Another topic's context, read-only. Empty: the caller's topic.
     *
     * @generated from field: string topic = 3;
     */
    topic: string;
};
/**
 * Describes the message collab.v1.GetContextRequest.
 * Use `create(GetContextRequestSchema)` to create a new message.
 */
export declare const GetContextRequestSchema: GenMessage<GetContextRequest>;
/**
 * @generated from message collab.v1.GetContextResponse
 */
export type GetContextResponse = Message<"collab.v1.GetContextResponse"> & {
    /**
     * @generated from field: collab.v1.ContextEntry entry = 1;
     */
    entry?: ContextEntry | undefined;
};
/**
 * Describes the message collab.v1.GetContextResponse.
 * Use `create(GetContextResponseSchema)` to create a new message.
 */
export declare const GetContextResponseSchema: GenMessage<GetContextResponse>;
/**
 * @generated from message collab.v1.SetPresenceRequest
 */
export type SetPresenceRequest = Message<"collab.v1.SetPresenceRequest"> & {
    /**
     * ONLINE or IDLE. OFFLINE is the server's to set, when the last session goes.
     *
     * @generated from field: collab.v1.MemberStatus status = 1;
     */
    status: MemberStatus;
    /**
     * @generated from field: string repo = 2;
     */
    repo: string;
    /**
     * @generated from field: string branch = 3;
     */
    branch: string;
};
/**
 * Describes the message collab.v1.SetPresenceRequest.
 * Use `create(SetPresenceRequestSchema)` to create a new message.
 */
export declare const SetPresenceRequestSchema: GenMessage<SetPresenceRequest>;
/**
 * @generated from message collab.v1.SetPresenceResponse
 */
export type SetPresenceResponse = Message<"collab.v1.SetPresenceResponse"> & {};
/**
 * Describes the message collab.v1.SetPresenceResponse.
 * Use `create(SetPresenceResponseSchema)` to create a new message.
 */
export declare const SetPresenceResponseSchema: GenMessage<SetPresenceResponse>;
/**
 * The newest `limit` readable messages after `since`, oldest first.
 *
 * @generated from message collab.v1.HistoryRequest
 */
export type HistoryRequest = Message<"collab.v1.HistoryRequest"> & {
    /**
     * @generated from field: uint32 since = 1;
     */
    since: number;
    /**
     * Unset or 0: 100. Capped at 200.
     *
     * @generated from field: uint32 limit = 2;
     */
    limit: number;
};
/**
 * Describes the message collab.v1.HistoryRequest.
 * Use `create(HistoryRequestSchema)` to create a new message.
 */
export declare const HistoryRequestSchema: GenMessage<HistoryRequest>;
/**
 * @generated from message collab.v1.HistoryResponse
 */
export type HistoryResponse = Message<"collab.v1.HistoryResponse"> & {
    /**
     * @generated from field: repeated collab.v1.Message messages = 1;
     */
    messages: Message$1[];
};
/**
 * Describes the message collab.v1.HistoryResponse.
 * Use `create(HistoryResponseSchema)` to create a new message.
 */
export declare const HistoryResponseSchema: GenMessage<HistoryResponse>;
/**
 * @generated from message collab.v1.HeartbeatRequest
 */
export type HeartbeatRequest = Message<"collab.v1.HeartbeatRequest"> & {};
/**
 * Describes the message collab.v1.HeartbeatRequest.
 * Use `create(HeartbeatRequestSchema)` to create a new message.
 */
export declare const HeartbeatRequestSchema: GenMessage<HeartbeatRequest>;
/**
 * @generated from message collab.v1.HeartbeatResponse
 */
export type HeartbeatResponse = Message<"collab.v1.HeartbeatResponse"> & {
    /**
     * @generated from field: google.protobuf.Timestamp server_time = 1;
     */
    serverTime?: Timestamp | undefined;
};
/**
 * Describes the message collab.v1.HeartbeatResponse.
 * Use `create(HeartbeatResponseSchema)` to create a new message.
 */
export declare const HeartbeatResponseSchema: GenMessage<HeartbeatResponse>;
/**
 * @generated from service collab.v1.ChannelService
 */
export declare const ChannelService: GenService<{
    /**
     * Opens the live stream. The first event is always `hello`, with the state
     * and the negotiated protocol; after it, events arrive as they happen.
     *
     * @generated from rpc collab.v1.ChannelService.Subscribe
     */
    subscribe: {
        methodKind: "server_streaming";
        input: typeof SubscribeRequestSchema;
        output: typeof SubscribeResponseSchema;
    };
    /**
     * The same state `hello` carries, without subscribing.
     *
     * @generated from rpc collab.v1.ChannelService.GetState
     */
    getState: {
        methodKind: "unary";
        input: typeof GetStateRequestSchema;
        output: typeof GetStateResponseSchema;
    };
    /**
     * @generated from rpc collab.v1.ChannelService.Send
     */
    send: {
        methodKind: "unary";
        input: typeof SendRequestSchema;
        output: typeof SendResponseSchema;
    };
    /**
     * Moves the member's cursor in the caller's topic.
     *
     * @generated from rpc collab.v1.ChannelService.Ack
     */
    ack: {
        methodKind: "unary";
        input: typeof AckRequestSchema;
        output: typeof AckResponseSchema;
    };
    /**
     * @generated from rpc collab.v1.ChannelService.Claim
     */
    claim: {
        methodKind: "unary";
        input: typeof ClaimRequestSchema;
        output: typeof ClaimResponseSchema;
    };
    /**
     * @generated from rpc collab.v1.ChannelService.Release
     */
    release: {
        methodKind: "unary";
        input: typeof ReleaseRequestSchema;
        output: typeof ReleaseResponseSchema;
    };
    /**
     * @generated from rpc collab.v1.ChannelService.PutContext
     */
    putContext: {
        methodKind: "unary";
        input: typeof PutContextRequestSchema;
        output: typeof PutContextResponseSchema;
    };
    /**
     * @generated from rpc collab.v1.ChannelService.GetContext
     */
    getContext: {
        methodKind: "unary";
        input: typeof GetContextRequestSchema;
        output: typeof GetContextResponseSchema;
    };
    /**
     * @generated from rpc collab.v1.ChannelService.SetPresence
     */
    setPresence: {
        methodKind: "unary";
        input: typeof SetPresenceRequestSchema;
        output: typeof SetPresenceResponseSchema;
    };
    /**
     * @generated from rpc collab.v1.ChannelService.History
     */
    history: {
        methodKind: "unary";
        input: typeof HistoryRequestSchema;
        output: typeof HistoryResponseSchema;
    };
    /**
     * Keeps the member "online" and re-sends the member list to the channel:
     * presence goes stale without it.
     *
     * @generated from rpc collab.v1.ChannelService.Heartbeat
     */
    heartbeat: {
        methodKind: "unary";
        input: typeof HeartbeatRequestSchema;
        output: typeof HeartbeatResponseSchema;
    };
}>;
