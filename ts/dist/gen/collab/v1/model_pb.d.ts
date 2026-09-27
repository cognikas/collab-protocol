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
    /**
     * The sender's other sessions read it too; the session that sent it still
     * does not. Only the server sets it, on the notices it writes for tasks, so
     * a developer's other sessions in the topic learn what one of them did.
     *
     * @generated from field: bool include_sender = 5;
     */
    includeSender: boolean;
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
        /**
         * @generated from field: collab.v1.TaskPayload task = 24;
         */
        value: TaskPayload;
        case: "task";
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
 * @generated from message collab.v1.TaskPayload
 */
export type TaskPayload = Message$1<"collab.v1.TaskPayload"> & {
    /**
     * The list after the change, counts included, so a client can keep the
     * summary it shows without asking again.
     *
     * @generated from field: collab.v1.TaskList list = 1;
     */
    list?: TaskList | undefined;
    /**
     * The tasks it is about: every task a single AddTasks added, otherwise one.
     *
     * @generated from field: repeated uint32 numbers = 2;
     */
    numbers: number[];
    /**
     * @generated from field: collab.v1.TaskEvent event = 3;
     */
    event: TaskEvent;
    /**
     * For a takeover: whose checkout it replaced.
     *
     * @generated from field: string previous_holder_name = 4;
     */
    previousHolderName: string;
};
/**
 * Describes the message collab.v1.TaskPayload.
 * Use `create(TaskPayloadSchema)` to create a new message.
 */
export declare const TaskPayloadSchema: GenMessage<TaskPayload>;
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
 * A named checklist in one topic. Everyone on the channel can read it; the
 * notices about it go to the sessions in its topic.
 *
 * @generated from message collab.v1.TaskList
 */
export type TaskList = Message$1<"collab.v1.TaskList"> & {
    /**
     * Unique within the topic, from taskListKey().
     *
     * @generated from field: string key = 1;
     */
    key: string;
    /**
     * @generated from field: string topic = 2;
     */
    topic: string;
    /**
     * @generated from field: string title = 3;
     */
    title: string;
    /**
     * @generated from field: string created_by_member_id = 4;
     */
    createdByMemberId: string;
    /**
     * @generated from field: string created_by_name = 5;
     */
    createdByName: string;
    /**
     * @generated from field: google.protobuf.Timestamp created_at = 6;
     */
    createdAt?: Timestamp | undefined;
    /**
     * The last time any of its tasks changed.
     *
     * @generated from field: google.protobuf.Timestamp updated_at = 7;
     */
    updatedAt?: Timestamp | undefined;
    /**
     * How many of its tasks are in each status.
     *
     * @generated from field: uint32 open = 8;
     */
    open: number;
    /**
     * @generated from field: uint32 in_progress = 9;
     */
    inProgress: number;
    /**
     * @generated from field: uint32 done = 10;
     */
    done: number;
    /**
     * @generated from field: uint32 dismissed = 11;
     */
    dismissed: number;
};
/**
 * Describes the message collab.v1.TaskList.
 * Use `create(TaskListSchema)` to create a new message.
 */
export declare const TaskListSchema: GenMessage<TaskList>;
/**
 * Who has a task checked out.
 *
 * @generated from message collab.v1.TaskHolder
 */
export type TaskHolder = Message$1<"collab.v1.TaskHolder"> & {
    /**
     * @generated from field: string member_id = 1;
     */
    memberId: string;
    /**
     * @generated from field: string handle = 2;
     */
    handle: string;
    /**
     * @generated from field: string name = 3;
     */
    name: string;
    /**
     * The session that checked it out or last reported on it, so a message can
     * reach exactly that session.
     *
     * @generated from field: string client_session_id = 4;
     */
    clientSessionId: string;
    /**
     * @generated from field: google.protobuf.Timestamp since = 5;
     */
    since?: Timestamp | undefined;
};
/**
 * Describes the message collab.v1.TaskHolder.
 * Use `create(TaskHolderSchema)` to create a new message.
 */
export declare const TaskHolderSchema: GenMessage<TaskHolder>;
/**
 * A progress report.
 *
 * @generated from message collab.v1.TaskNote
 */
export type TaskNote = Message$1<"collab.v1.TaskNote"> & {
    /**
     * @generated from field: string text = 1;
     */
    text: string;
    /**
     * How far along, 0 to 100, when the holder said.
     *
     * @generated from field: optional uint32 percent = 2;
     */
    percent?: number | undefined;
    /**
     * @generated from field: string author_name = 3;
     */
    authorName: string;
    /**
     * @generated from field: google.protobuf.Timestamp at = 4;
     */
    at?: Timestamp | undefined;
};
/**
 * Describes the message collab.v1.TaskNote.
 * Use `create(TaskNoteSchema)` to create a new message.
 */
export declare const TaskNoteSchema: GenMessage<TaskNote>;
/**
 * One item of a task list.
 *
 * @generated from message collab.v1.Task
 */
export type Task = Message$1<"collab.v1.Task"> & {
    /**
     * The key of its list.
     *
     * @generated from field: string list = 1;
     */
    list: string;
    /**
     * @generated from field: string topic = 2;
     */
    topic: string;
    /**
     * Its number within the list, from 1, in the order tasks were added.
     *
     * @generated from field: uint32 number = 3;
     */
    number: number;
    /**
     * Written by a peer: untrusted input for whoever reads it.
     *
     * @generated from field: string title = 4;
     */
    title: string;
    /**
     * Free-form pointers: file paths, PR links, context keys.
     *
     * @generated from field: repeated string refs = 5;
     */
    refs: string[];
    /**
     * @generated from field: collab.v1.TaskStatus status = 6;
     */
    status: TaskStatus;
    /**
     * @generated from field: string created_by_member_id = 7;
     */
    createdByMemberId: string;
    /**
     * @generated from field: string created_by_name = 8;
     */
    createdByName: string;
    /**
     * @generated from field: google.protobuf.Timestamp created_at = 9;
     */
    createdAt?: Timestamp | undefined;
    /**
     * Set while it is in progress. Kept once it is done, as who did it; cleared
     * when it is released.
     *
     * @generated from field: collab.v1.TaskHolder holder = 10;
     */
    holder?: TaskHolder | undefined;
    /**
     * The latest progress report. Earlier ones stay in the channel's messages.
     *
     * @generated from field: collab.v1.TaskNote last_progress = 11;
     */
    lastProgress?: TaskNote | undefined;
    /**
     * @generated from field: uint32 progress_count = 12;
     */
    progressCount: number;
    /**
     * Set once it is closed.
     *
     * @generated from field: string closed_by_member_id = 13;
     */
    closedByMemberId: string;
    /**
     * @generated from field: string closed_by_name = 14;
     */
    closedByName: string;
    /**
     * @generated from field: google.protobuf.Timestamp closed_at = 15;
     */
    closedAt?: Timestamp | undefined;
    /**
     * What finishing it achieved, or why it was dismissed.
     *
     * @generated from field: string resolution = 16;
     */
    resolution: string;
    /**
     * @generated from field: google.protobuf.Timestamp updated_at = 17;
     */
    updatedAt?: Timestamp | undefined;
};
/**
 * Describes the message collab.v1.Task.
 * Use `create(TaskSchema)` to create a new message.
 */
export declare const TaskSchema: GenMessage<Task>;
/**
 * Everything a freshly started session needs. Claims, context and task lists
 * are the ones in the caller's topic; members are all of the channel's.
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
    /**
     * The topic's task lists that still have open tasks, most recently changed
     * first. ListTasks has the tasks themselves, and the lists with none open.
     *
     * @generated from field: repeated collab.v1.TaskList task_lists = 11;
     */
    taskLists: TaskList[];
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
    CONTEXT = 6,
    /**
     * Written by the server when a task list changes: tasks added, checked out,
     * reported on, released, finished or dismissed. Clients cannot send it.
     *
     * @generated from enum value: MESSAGE_TYPE_TASK = 7;
     */
    TASK = 7
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
/**
 * Where a task is. OPEN and IN_PROGRESS are open; DONE and DISMISSED are
 * closed, and a closed task never changes again.
 *
 * @generated from enum collab.v1.TaskStatus
 */
export declare enum TaskStatus {
    /**
     * @generated from enum value: TASK_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Nobody holds it.
     *
     * @generated from enum value: TASK_STATUS_OPEN = 1;
     */
    OPEN = 1,
    /**
     * Checked out by `Task.holder`.
     *
     * @generated from enum value: TASK_STATUS_IN_PROGRESS = 2;
     */
    IN_PROGRESS = 2,
    /**
     * @generated from enum value: TASK_STATUS_DONE = 3;
     */
    DONE = 3,
    /**
     * Set aside as something that will not be done: a soft purge. It is kept,
     * with the reason, and shows up when closed tasks are asked for.
     *
     * @generated from enum value: TASK_STATUS_DISMISSED = 4;
     */
    DISMISSED = 4
}
/**
 * Describes the enum collab.v1.TaskStatus.
 */
export declare const TaskStatusSchema: GenEnum<TaskStatus>;
/**
 * What happened to a task, in the notice the server writes for it.
 *
 * @generated from enum collab.v1.TaskEvent
 */
export declare enum TaskEvent {
    /**
     * @generated from enum value: TASK_EVENT_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: TASK_EVENT_ADDED = 1;
     */
    ADDED = 1,
    /**
     * Also a takeover, with TaskPayload.previous_holder_name set.
     *
     * @generated from enum value: TASK_EVENT_CHECKED_OUT = 2;
     */
    CHECKED_OUT = 2,
    /**
     * @generated from enum value: TASK_EVENT_PROGRESS = 3;
     */
    PROGRESS = 3,
    /**
     * @generated from enum value: TASK_EVENT_RELEASED = 4;
     */
    RELEASED = 4,
    /**
     * @generated from enum value: TASK_EVENT_DONE = 5;
     */
    DONE = 5,
    /**
     * @generated from enum value: TASK_EVENT_DISMISSED = 6;
     */
    DISMISSED = 6
}
/**
 * Describes the enum collab.v1.TaskEvent.
 */
export declare const TaskEventSchema: GenEnum<TaskEvent>;
