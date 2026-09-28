import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { ChannelState, Claim, ClientInfo, ContextEntry, ContextSummary, DonePayload, Member, MemberStatus, Message as Message$1, MessageType, ProtocolVersion, Recipient, Task, TaskList, Urgency } from "./model_pb.js";
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
    /**
     * Read as the member rather than as the calling session: also what the
     * member's own sessions sent, the calling one included, and what was
     * addressed to any of its sessions. The caller's topic still applies. For a
     * client that shows a member's whole conversation, such as a dashboard.
     *
     * @generated from field: bool as_member = 3;
     */
    asMember: boolean;
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
    /**
     * True when the server read as the member. A server that predates
     * `HistoryRequest.as_member` ignores that field and leaves this false.
     *
     * @generated from field: bool as_member = 2;
     */
    asMember: boolean;
    /**
     * True when readable messages after `since` may have been left out: more
     * than `limit` of them, or older than what the server reads at once. The
     * ones returned are still the newest.
     *
     * @generated from field: bool truncated = 3;
     */
    truncated: boolean;
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
 * Creates a task list in the caller's topic.
 *
 * @generated from message collab.v1.CreateTaskListRequest
 */
export type CreateTaskListRequest = Message<"collab.v1.CreateTaskListRequest"> & {
    /**
     * Goes through taskListKey().
     *
     * @generated from field: string key = 1;
     */
    key: string;
    /**
     * Empty: the key.
     *
     * @generated from field: string title = 2;
     */
    title: string;
};
/**
 * Describes the message collab.v1.CreateTaskListRequest.
 * Use `create(CreateTaskListRequestSchema)` to create a new message.
 */
export declare const CreateTaskListRequestSchema: GenMessage<CreateTaskListRequest>;
/**
 * @generated from message collab.v1.CreateTaskListResponse
 */
export type CreateTaskListResponse = Message<"collab.v1.CreateTaskListResponse"> & {
    /**
     * @generated from field: collab.v1.TaskList list = 1;
     */
    list?: TaskList | undefined;
    /**
     * False when the topic already had a list with that key: it is returned
     * as it is, title included.
     *
     * @generated from field: bool created = 2;
     */
    created: boolean;
};
/**
 * Describes the message collab.v1.CreateTaskListResponse.
 * Use `create(CreateTaskListResponseSchema)` to create a new message.
 */
export declare const CreateTaskListResponseSchema: GenMessage<CreateTaskListResponse>;
/**
 * @generated from message collab.v1.NewTask
 */
export type NewTask = Message<"collab.v1.NewTask"> & {
    /**
     * @generated from field: string title = 1;
     */
    title: string;
    /**
     * @generated from field: repeated string refs = 2;
     */
    refs: string[];
};
/**
 * Describes the message collab.v1.NewTask.
 * Use `create(NewTaskSchema)` to create a new message.
 */
export declare const NewTaskSchema: GenMessage<NewTask>;
/**
 * Adds tasks to a list in the caller's topic, numbered in the order given.
 *
 * @generated from message collab.v1.AddTasksRequest
 */
export type AddTasksRequest = Message<"collab.v1.AddTasksRequest"> & {
    /**
     * The list's key.
     *
     * @generated from field: string list = 1;
     */
    list: string;
    /**
     * @generated from field: repeated collab.v1.NewTask tasks = 2;
     */
    tasks: NewTask[];
};
/**
 * Describes the message collab.v1.AddTasksRequest.
 * Use `create(AddTasksRequestSchema)` to create a new message.
 */
export declare const AddTasksRequestSchema: GenMessage<AddTasksRequest>;
/**
 * @generated from message collab.v1.AddTasksResponse
 */
export type AddTasksResponse = Message<"collab.v1.AddTasksResponse"> & {
    /**
     * @generated from field: repeated collab.v1.Task tasks = 1;
     */
    tasks: Task[];
    /**
     * @generated from field: collab.v1.TaskList list = 2;
     */
    list?: TaskList | undefined;
};
/**
 * Describes the message collab.v1.AddTasksResponse.
 * Use `create(AddTasksResponseSchema)` to create a new message.
 */
export declare const AddTasksResponseSchema: GenMessage<AddTasksResponse>;
/**
 * Takes a task: an open one, or one of the caller's own (which moves it to
 * the calling session). One someone else holds only with `takeover`, and
 * only once its holder has not updated it for TASK_STALE_SECONDS.
 *
 * @generated from message collab.v1.TaskCheckout
 */
export type TaskCheckout = Message<"collab.v1.TaskCheckout"> & {
    /**
     * @generated from field: bool takeover = 1;
     */
    takeover: boolean;
};
/**
 * Describes the message collab.v1.TaskCheckout.
 * Use `create(TaskCheckoutSchema)` to create a new message.
 */
export declare const TaskCheckoutSchema: GenMessage<TaskCheckout>;
/**
 * A progress report from the holder.
 *
 * @generated from message collab.v1.TaskProgress
 */
export type TaskProgress = Message<"collab.v1.TaskProgress"> & {
    /**
     * @generated from field: string text = 1;
     */
    text: string;
    /**
     * 0 to 100.
     *
     * @generated from field: optional uint32 percent = 2;
     */
    percent?: number | undefined;
};
/**
 * Describes the message collab.v1.TaskProgress.
 * Use `create(TaskProgressSchema)` to create a new message.
 */
export declare const TaskProgressSchema: GenMessage<TaskProgress>;
/**
 * Gives a task back: the holder's, and it goes back to open.
 *
 * @generated from message collab.v1.TaskRelease
 */
export type TaskRelease = Message<"collab.v1.TaskRelease"> & {
    /**
     * @generated from field: string note = 1;
     */
    note: string;
};
/**
 * Describes the message collab.v1.TaskRelease.
 * Use `create(TaskReleaseSchema)` to create a new message.
 */
export declare const TaskReleaseSchema: GenMessage<TaskRelease>;
/**
 * Finishes a task: an open one, which the caller takes and finishes in one
 * step, or one the caller holds.
 *
 * @generated from message collab.v1.TaskFinish
 */
export type TaskFinish = Message<"collab.v1.TaskFinish"> & {
    /**
     * What was done, in one line.
     *
     * @generated from field: string summary = 1;
     */
    summary: string;
};
/**
 * Describes the message collab.v1.TaskFinish.
 * Use `create(TaskFinishSchema)` to create a new message.
 */
export declare const TaskFinishSchema: GenMessage<TaskFinish>;
/**
 * Closes a task as something that will not be done. Its creator or its
 * holder can; the reason is required.
 *
 * @generated from message collab.v1.TaskDismiss
 */
export type TaskDismiss = Message<"collab.v1.TaskDismiss"> & {
    /**
     * @generated from field: string reason = 1;
     */
    reason: string;
};
/**
 * Describes the message collab.v1.TaskDismiss.
 * Use `create(TaskDismissSchema)` to create a new message.
 */
export declare const TaskDismissSchema: GenMessage<TaskDismiss>;
/**
 * @generated from message collab.v1.UpdateTaskRequest
 */
export type UpdateTaskRequest = Message<"collab.v1.UpdateTaskRequest"> & {
    /**
     * The list's topic. Empty: the caller's topic.
     *
     * @generated from field: string topic = 1;
     */
    topic: string;
    /**
     * @generated from field: string list = 2;
     */
    list: string;
    /**
     * @generated from field: uint32 number = 3;
     */
    number: number;
    /**
     * @generated from oneof collab.v1.UpdateTaskRequest.change
     */
    change: {
        /**
         * @generated from field: collab.v1.TaskCheckout checkout = 10;
         */
        value: TaskCheckout;
        case: "checkout";
    } | {
        /**
         * @generated from field: collab.v1.TaskProgress progress = 11;
         */
        value: TaskProgress;
        case: "progress";
    } | {
        /**
         * @generated from field: collab.v1.TaskRelease release = 12;
         */
        value: TaskRelease;
        case: "release";
    } | {
        /**
         * @generated from field: collab.v1.TaskFinish finish = 13;
         */
        value: TaskFinish;
        case: "finish";
    } | {
        /**
         * @generated from field: collab.v1.TaskDismiss dismiss = 14;
         */
        value: TaskDismiss;
        case: "dismiss";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message collab.v1.UpdateTaskRequest.
 * Use `create(UpdateTaskRequestSchema)` to create a new message.
 */
export declare const UpdateTaskRequestSchema: GenMessage<UpdateTaskRequest>;
/**
 * @generated from message collab.v1.UpdateTaskResponse
 */
export type UpdateTaskResponse = Message<"collab.v1.UpdateTaskResponse"> & {
    /**
     * @generated from field: collab.v1.Task task = 1;
     */
    task?: Task | undefined;
    /**
     * @generated from field: collab.v1.TaskList list = 2;
     */
    list?: TaskList | undefined;
};
/**
 * Describes the message collab.v1.UpdateTaskResponse.
 * Use `create(UpdateTaskResponseSchema)` to create a new message.
 */
export declare const UpdateTaskResponseSchema: GenMessage<UpdateTaskResponse>;
/**
 * @generated from message collab.v1.ListTasksRequest
 */
export type ListTasksRequest = Message<"collab.v1.ListTasksRequest"> & {
    /**
     * Empty: the caller's topic.
     *
     * @generated from field: string topic = 1;
     */
    topic: string;
    /**
     * One list's key. Empty: every list in the topic.
     *
     * @generated from field: string list = 2;
     */
    list: string;
    /**
     * @generated from field: collab.v1.TaskFilter filter = 3;
     */
    filter: TaskFilter;
    /**
     * At most this many tasks. Unset or 0: 100. Capped at 500.
     *
     * @generated from field: uint32 limit = 4;
     */
    limit: number;
};
/**
 * Describes the message collab.v1.ListTasksRequest.
 * Use `create(ListTasksRequestSchema)` to create a new message.
 */
export declare const ListTasksRequestSchema: GenMessage<ListTasksRequest>;
/**
 * @generated from message collab.v1.ListTasksResponse
 */
export type ListTasksResponse = Message<"collab.v1.ListTasksResponse"> & {
    /**
     * The lists asked for, most recently changed first: with the open filter,
     * only those with open tasks.
     *
     * @generated from field: repeated collab.v1.TaskList lists = 1;
     */
    lists: TaskList[];
    /**
     * Open tasks by list, then number. Closed tasks after them, most recently
     * closed first.
     *
     * @generated from field: repeated collab.v1.Task tasks = 2;
     */
    tasks: Task[];
    /**
     * True when `limit` left tasks out.
     *
     * @generated from field: bool truncated = 3;
     */
    truncated: boolean;
};
/**
 * Describes the message collab.v1.ListTasksResponse.
 * Use `create(ListTasksResponseSchema)` to create a new message.
 */
export declare const ListTasksResponseSchema: GenMessage<ListTasksResponse>;
/**
 * Which tasks ListTasks returns.
 *
 * @generated from enum collab.v1.TaskFilter
 */
export declare enum TaskFilter {
    /**
     * Read as TASK_FILTER_OPEN.
     *
     * @generated from enum value: TASK_FILTER_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Open and in progress.
     *
     * @generated from enum value: TASK_FILTER_OPEN = 1;
     */
    OPEN = 1,
    /**
     * Done and dismissed.
     *
     * @generated from enum value: TASK_FILTER_CLOSED = 2;
     */
    CLOSED = 2,
    /**
     * @generated from enum value: TASK_FILTER_ALL = 3;
     */
    ALL = 3
}
/**
 * Describes the enum collab.v1.TaskFilter.
 */
export declare const TaskFilterSchema: GenEnum<TaskFilter>;
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
    /**
     * Task lists. Every change is announced to the list's topic with a TASK
     * message, so no separate event exists for them.
     *
     * @generated from rpc collab.v1.ChannelService.CreateTaskList
     */
    createTaskList: {
        methodKind: "unary";
        input: typeof CreateTaskListRequestSchema;
        output: typeof CreateTaskListResponseSchema;
    };
    /**
     * @generated from rpc collab.v1.ChannelService.AddTasks
     */
    addTasks: {
        methodKind: "unary";
        input: typeof AddTasksRequestSchema;
        output: typeof AddTasksResponseSchema;
    };
    /**
     * @generated from rpc collab.v1.ChannelService.UpdateTask
     */
    updateTask: {
        methodKind: "unary";
        input: typeof UpdateTaskRequestSchema;
        output: typeof UpdateTaskResponseSchema;
    };
    /**
     * HTTP only, like GetState: a whole list can outgrow a WebSocket message.
     *
     * @generated from rpc collab.v1.ChannelService.ListTasks
     */
    listTasks: {
        methodKind: "unary";
        input: typeof ListTasksRequestSchema;
        output: typeof ListTasksResponseSchema;
    };
}>;
