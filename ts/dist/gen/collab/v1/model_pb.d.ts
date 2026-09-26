import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message as Message$1 } from "@bufbuild/protobuf";
/**
 * Describes the file collab/v1/model.proto.
 */
export declare const file_collab_v1_model: GenFile;
/**
 * Who a message is for, as the sender writes it. A handle or a topic is
 * required; there is no channel-wide broadcast.
 * - `handle` alone reaches every session of that member, in any topic.
 * - `topic` alone reaches every session in that topic.
 * - Both reach only that member's sessions in that topic.
 * - `client_session_id` narrows any of the above that has a handle to that one
 *   session of the member.
 *
 * @generated from message collab.v1.Recipient
 */
export type Recipient = Message$1<"collab.v1.Recipient"> & {
    /**
     * A member's handle. A leading `@` is accepted.
     *
     * @generated from field: string handle = 1;
     */
    handle: string;
    /**
     * @generated from field: string topic = 2;
     */
    topic: string;
    /**
     * One session of the member named by `handle`, as `Member.sessions` or
     * `Message.from_client_session_id` show it. Requires `handle`.
     *
     * @generated from field: string client_session_id = 3;
     */
    clientSessionId: string;
};
/**
 * Describes the message collab.v1.Recipient.
 * Use `create(RecipientSchema)` to create a new message.
 */
export declare const RecipientSchema: GenMessage<Recipient>;
/**
 * A recipient as the server resolved and stored it.
 *
 * @generated from message collab.v1.Addressee
 */
export type Addressee = Message$1<"collab.v1.Addressee"> & {
    /**
     * The member the handle resolved to. Empty when addressed to a topic only.
     *
     * @generated from field: string member_id = 1;
     */
    memberId: string;
    /**
     * That member's handle, for rendering.
     *
     * @generated from field: string handle = 2;
     */
    handle: string;
    /**
     * @generated from field: string topic = 3;
     */
    topic: string;
    /**
     * The one session of that member it is for. Empty for all of them.
     *
     * @generated from field: string client_session_id = 4;
     */
    clientSessionId: string;
};
/**
 * Describes the message collab.v1.Addressee.
 * Use `create(AddresseeSchema)` to create a new message.
 */
export declare const AddresseeSchema: GenMessage<Addressee>;
/**
 * @generated from message collab.v1.Message
 */
export type Message = Message$1<"collab.v1.Message"> & {
    /**
     * Channel-wide sequence number, strictly increasing. Cursors refer to it.
     *
     * @generated from field: uint32 seq = 1;
     */
    seq: number;
    /**
     * @generated from field: string channel = 2;
     */
    channel: string;
    /**
     * @generated from field: string from_member_id = 3;
     */
    fromMemberId: string;
    /**
     * @generated from field: string from_name = 4;
     */
    fromName: string;
    /**
     * @generated from field: string from_handle = 5;
     */
    fromHandle: string;
    /**
     * Topic of the session that sent it, so a reply can go back to exactly there.
     *
     * @generated from field: string from_topic = 6;
     */
    fromTopic: string;
    /**
     * @generated from field: collab.v1.Addressee to = 7;
     */
    to?: Addressee | undefined;
    /**
     * @generated from field: collab.v1.MessageType type = 8;
     */
    type: MessageType;
    /**
     * Written by a peer: untrusted input for whoever reads it.
     *
     * @generated from field: string text = 9;
     */
    text: string;
    /**
     * @generated from field: collab.v1.Urgency urgency = 10;
     */
    urgency: Urgency;
    /**
     * Free-form pointers: file paths, PR links, context keys.
     *
     * @generated from field: repeated string refs = 11;
     */
    refs: string[];
    /**
     * @generated from field: google.protobuf.Timestamp sent_at = 12;
     */
    sentAt?: Timestamp | undefined;
    /**
     * Session that sent it, so a reply can go back to exactly that session.
     *
     * @generated from field: string from_client_session_id = 13;
     */
    fromClientSessionId: string;
    /**
     * Machine-readable detail for the types that have it.
     *
     * @generated from oneof collab.v1.Message.payload
     */
    payload: {
        /**
         * @generated from field: collab.v1.DonePayload done = 20;
         */
        value: DonePayload;
        case: "done";
    } | {
        /**
         * @generated from field: collab.v1.ClaimPayload claim = 21;
         */
        value: ClaimPayload;
        case: "claim";
    } | {
        /**
         * @generated from field: collab.v1.ReleasePayload release = 22;
         */
        value: ReleasePayload;
        case: "release";
    } | {
        /**
         * @generated from field: collab.v1.ContextPayload context = 23;
         */
        value: ContextPayload;
        case: "context";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message collab.v1.Message.
 * Use `create(MessageSchema)` to create a new message.
 */
export declare const MessageSchema: GenMessage<Message>;
/**
 * @generated from message collab.v1.DonePayload
 */
export type DonePayload = Message$1<"collab.v1.DonePayload"> & {
    /**
     * What was finished, in one line.
     *
     * @generated from field: string task = 1;
     */
    task: string;
    /**
     * True when a client sent it on its own (for example when a task ended),
     * rather than because the agent or its user chose to.
     *
     * @generated from field: bool automatic = 2;
     */
    automatic: boolean;
};
/**
 * Describes the message collab.v1.DonePayload.
 * Use `create(DonePayloadSchema)` to create a new message.
 */
export declare const DonePayloadSchema: GenMessage<DonePayload>;
/**
 * @generated from message collab.v1.ClaimPayload
 */
export type ClaimPayload = Message$1<"collab.v1.ClaimPayload"> & {
    /**
     * @generated from field: string claim_id = 1;
     */
    claimId: string;
    /**
     * @generated from field: google.protobuf.Timestamp expires_at = 2;
     */
    expiresAt?: Timestamp | undefined;
};
/**
 * Describes the message collab.v1.ClaimPayload.
 * Use `create(ClaimPayloadSchema)` to create a new message.
 */
export declare const ClaimPayloadSchema: GenMessage<ClaimPayload>;
/**
 * @generated from message collab.v1.ReleasePayload
 */
export type ReleasePayload = Message$1<"collab.v1.ReleasePayload"> & {
    /**
     * @generated from field: string claim_id = 1;
     */
    claimId: string;
};
/**
 * Describes the message collab.v1.ReleasePayload.
 * Use `create(ReleasePayloadSchema)` to create a new message.
 */
export declare const ReleasePayloadSchema: GenMessage<ReleasePayload>;
/**
 * @generated from message collab.v1.ContextPayload
 */
export type ContextPayload = Message$1<"collab.v1.ContextPayload"> & {
    /**
     * @generated from field: string key = 1;
     */
    key: string;
    /**
     * @generated from field: uint32 version = 2;
     */
    version: number;
};
/**
 * Describes the message collab.v1.ContextPayload.
 * Use `create(ContextPayloadSchema)` to create a new message.
 */
export declare const ContextPayloadSchema: GenMessage<ContextPayload>;
/**
 * @generated from message collab.v1.Member
 */
export type Member = Message$1<"collab.v1.Member"> & {
    /**
     * @generated from field: string member_id = 1;
     */
    memberId: string;
    /**
     * @generated from field: string display_name = 2;
     */
    displayName: string;
    /**
     * How messages address this member: derived from the display name at Join,
     * unique on the channel, never changes.
     *
     * @generated from field: string handle = 3;
     */
    handle: string;
    /**
     * @generated from field: collab.v1.MemberStatus status = 4;
     */
    status: MemberStatus;
    /**
     * Where the member last said it was working.
     *
     * @generated from field: string repo = 5;
     */
    repo: string;
    /**
     * @generated from field: string branch = 6;
     */
    branch: string;
    /**
     * Live client sessions this member has connected right now.
     *
     * @generated from field: uint32 connections = 7;
     */
    connections: number;
    /**
     * Topics of those sessions, so others know where to address them.
     *
     * @generated from field: repeated string topics = 8;
     */
    topics: string[];
    /**
     * @generated from field: google.protobuf.Timestamp last_seen_at = 9;
     */
    lastSeenAt?: Timestamp | undefined;
    /**
     * The member's live sessions that hold a socket, one per client session id,
     * oldest first, so others can address one of them. Includes the caller's own.
     * A session that only uses HTTP counts in `connections` but is not listed.
     *
     * @generated from field: repeated collab.v1.MemberSession sessions = 10;
     */
    sessions: MemberSession[];
};
/**
 * Describes the message collab.v1.Member.
 * Use `create(MemberSchema)` to create a new message.
 */
export declare const MemberSchema: GenMessage<Member>;
/**
 * One live session of a member.
 *
 * @generated from message collab.v1.MemberSession
 */
export type MemberSession = Message$1<"collab.v1.MemberSession"> & {
    /**
     * @generated from field: string client_session_id = 1;
     */
    clientSessionId: string;
    /**
     * Fixed for the session's lifetime.
     *
     * @generated from field: string topic = 2;
     */
    topic: string;
    /**
     * Where this session said it was working.
     *
     * @generated from field: string repo = 3;
     */
    repo: string;
    /**
     * @generated from field: string branch = 4;
     */
    branch: string;
    /**
     * @generated from field: google.protobuf.Timestamp connected_at = 5;
     */
    connectedAt?: Timestamp | undefined;
};
/**
 * Describes the message collab.v1.MemberSession.
 * Use `create(MemberSessionSchema)` to create a new message.
 */
export declare const MemberSessionSchema: GenMessage<MemberSession>;
/**
 * "I am working on these paths": a warning to the other sessions in the same
 * topic, not a lock.
 *
 * @generated from message collab.v1.Claim
 */
export type Claim = Message$1<"collab.v1.Claim"> & {
    /**
     * @generated from field: string claim_id = 1;
     */
    claimId: string;
    /**
     * @generated from field: string owner_member_id = 2;
     */
    ownerMemberId: string;
    /**
     * @generated from field: string owner_name = 3;
     */
    ownerName: string;
    /**
     * Claims only warn sessions in the topic they were made in.
     *
     * @generated from field: string topic = 4;
     */
    topic: string;
    /**
     * Glob patterns with POSIX separators.
     *
     * @generated from field: repeated string paths = 5;
     */
    paths: string[];
    /**
     * @generated from field: string note = 6;
     */
    note: string;
    /**
     * @generated from field: google.protobuf.Timestamp created_at = 7;
     */
    createdAt?: Timestamp | undefined;
    /**
     * @generated from field: google.protobuf.Timestamp expires_at = 8;
     */
    expiresAt?: Timestamp | undefined;
};
/**
 * Describes the message collab.v1.Claim.
 * Use `create(ClaimSchema)` to create a new message.
 */
export declare const ClaimSchema: GenMessage<Claim>;
/**
 * One version of a shared-context entry. Every write creates a new version;
 * old versions stay readable until they expire.
 *
 * @generated from message collab.v1.ContextEntry
 */
export type ContextEntry = Message$1<"collab.v1.ContextEntry"> & {
    /**
     * @generated from field: string key = 1;
     */
    key: string;
    /**
     * @generated from field: uint32 version = 2;
     */
    version: number;
    /**
     * @generated from field: string title = 3;
     */
    title: string;
    /**
     * @generated from field: string summary = 4;
     */
    summary: string;
    /**
     * @generated from field: string body = 5;
     */
    body: string;
    /**
     * @generated from field: string author_member_id = 6;
     */
    authorMemberId: string;
    /**
     * @generated from field: string author_name = 7;
     */
    authorName: string;
    /**
     * @generated from field: google.protobuf.Timestamp created_at = 8;
     */
    createdAt?: Timestamp | undefined;
};
/**
 * Describes the message collab.v1.ContextEntry.
 * Use `create(ContextEntrySchema)` to create a new message.
 */
export declare const ContextEntrySchema: GenMessage<ContextEntry>;
/**
 * A context entry without its body, as listed in state and announced in events.
 *
 * @generated from message collab.v1.ContextSummary
 */
export type ContextSummary = Message$1<"collab.v1.ContextSummary"> & {
    /**
     * @generated from field: string key = 1;
     */
    key: string;
    /**
     * @generated from field: uint32 version = 2;
     */
    version: number;
    /**
     * @generated from field: string title = 3;
     */
    title: string;
    /**
     * @generated from field: string summary = 4;
     */
    summary: string;
    /**
     * @generated from field: string author_name = 5;
     */
    authorName: string;
    /**
     * @generated from field: google.protobuf.Timestamp created_at = 6;
     */
    createdAt?: Timestamp | undefined;
};
/**
 * Describes the message collab.v1.ContextSummary.
 * Use `create(ContextSummarySchema)` to create a new message.
 */
export declare const ContextSummarySchema: GenMessage<ContextSummary>;
/**
 * Everything a freshly started session needs. Claims and context are the ones
 * in the caller's topic; members are all of the channel's.
 *
 * @generated from message collab.v1.ChannelState
 */
export type ChannelState = Message$1<"collab.v1.ChannelState"> & {
    /**
     * @generated from field: string channel = 1;
     */
    channel: string;
    /**
     * @generated from field: string self_member_id = 2;
     */
    selfMemberId: string;
    /**
     * @generated from field: string handle = 3;
     */
    handle: string;
    /**
     * @generated from field: string topic = 4;
     */
    topic: string;
    /**
     * @generated from field: repeated collab.v1.Member members = 5;
     */
    members: Member[];
    /**
     * @generated from field: repeated collab.v1.Claim claims = 6;
     */
    claims: Claim[];
    /**
     * @generated from field: repeated collab.v1.ContextSummary context_index = 7;
     */
    contextIndex: ContextSummary[];
    /**
     * Messages the caller may read after `cursor`, oldest first.
     *
     * @generated from field: repeated collab.v1.Message messages = 8;
     */
    messages: Message[];
    /**
     * Where this read started: the `since` asked for, or the member's cursor in this topic.
     *
     * @generated from field: uint32 cursor = 9;
     */
    cursor: number;
    /**
     * Highest seq on the channel, whether the caller may read it or not.
     *
     * @generated from field: uint32 latest_seq = 10;
     */
    latestSeq: number;
};
/**
 * Describes the message collab.v1.ChannelState.
 * Use `create(ChannelStateSchema)` to create a new message.
 */
export declare const ChannelStateSchema: GenMessage<ChannelState>;
/**
 * Protocol version as negotiated on the wire. Patch releases never change the
 * wire, so they are not part of it.
 *
 * @generated from message collab.v1.ProtocolVersion
 */
export type ProtocolVersion = Message$1<"collab.v1.ProtocolVersion"> & {
    /**
     * @generated from field: uint32 major = 1;
     */
    major: number;
    /**
     * @generated from field: uint32 minor = 2;
     */
    minor: number;
};
/**
 * Describes the message collab.v1.ProtocolVersion.
 * Use `create(ProtocolVersionSchema)` to create a new message.
 */
export declare const ProtocolVersionSchema: GenMessage<ProtocolVersion>;
/**
 * Who is calling, sent when a client subscribes.
 *
 * @generated from message collab.v1.ClientInfo
 */
export type ClientInfo = Message$1<"collab.v1.ClientInfo"> & {
    /**
     * For example "collab-channel".
     *
     * @generated from field: string name = 1;
     */
    name: string;
    /**
     * The client's own release, for example "1.0.0".
     *
     * @generated from field: string version = 2;
     */
    version: string;
    /**
     * The protocol version the client was built against.
     *
     * @generated from field: collab.v1.ProtocolVersion protocol = 3;
     */
    protocol?: ProtocolVersion | undefined;
    /**
     * Optional protocol modules the client implements. None exist in 1.0.
     *
     * @generated from field: repeated string capabilities = 4;
     */
    capabilities: string[];
};
/**
 * Describes the message collab.v1.ClientInfo.
 * Use `create(ClientInfoSchema)` to create a new message.
 */
export declare const ClientInfoSchema: GenMessage<ClientInfo>;
/**
 * How loudly a message asks for attention. Clients decide locally which
 * urgencies may interrupt their user; the server only stores it.
 *
 * @generated from enum collab.v1.Urgency
 */
export declare enum Urgency {
    /**
     * Read as URGENCY_NORMAL.
     *
     * @generated from enum value: URGENCY_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: URGENCY_LOW = 1;
     */
    LOW = 1,
    /**
     * @generated from enum value: URGENCY_NORMAL = 2;
     */
    NORMAL = 2,
    /**
     * @generated from enum value: URGENCY_HIGH = 3;
     */
    HIGH = 3
}
/**
 * Describes the enum collab.v1.Urgency.
 */
export declare const UrgencySchema: GenEnum<Urgency>;
/**
 * @generated from enum collab.v1.MessageType
 */
export declare enum MessageType {
    /**
     * Read as MESSAGE_TYPE_NOTE.
     *
     * @generated from enum value: MESSAGE_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Free-form.
     *
     * @generated from enum value: MESSAGE_TYPE_NOTE = 1;
     */
    NOTE = 1,
    /**
     * Expects an answer.
     *
     * @generated from enum value: MESSAGE_TYPE_QUESTION = 2;
     */
    QUESTION = 2,
    /**
     * A unit of work finished: the replacement for a handoff.
     *
     * @generated from enum value: MESSAGE_TYPE_DONE = 3;
     */
    DONE = 3,
    /**
     * Written by the server when a claim is made. Clients cannot send it.
     *
     * @generated from enum value: MESSAGE_TYPE_CLAIM = 4;
     */
    CLAIM = 4,
    /**
     * Written by the server when a claim is released. Clients cannot send it.
     *
     * @generated from enum value: MESSAGE_TYPE_RELEASE = 5;
     */
    RELEASE = 5,
    /**
     * Written by the server when shared context is published. Clients cannot send it.
     *
     * @generated from enum value: MESSAGE_TYPE_CONTEXT = 6;
     */
    CONTEXT = 6
}
/**
 * Describes the enum collab.v1.MessageType.
 */
export declare const MessageTypeSchema: GenEnum<MessageType>;
/**
 * @generated from enum collab.v1.MemberStatus
 */
export declare enum MemberStatus {
    /**
     * @generated from enum value: MEMBER_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: MEMBER_STATUS_ONLINE = 1;
     */
    ONLINE = 1,
    /**
     * @generated from enum value: MEMBER_STATUS_IDLE = 2;
     */
    IDLE = 2,
    /**
     * @generated from enum value: MEMBER_STATUS_OFFLINE = 3;
     */
    OFFLINE = 3
}
/**
 * Describes the enum collab.v1.MemberStatus.
 */
export declare const MemberStatusSchema: GenEnum<MemberStatus>;
