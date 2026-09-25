import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file collab/v1/admin.proto.
 */
export declare const file_collab_v1_admin: GenFile;
/**
 * @generated from message collab.v1.CreateInviteRequest
 */
export type CreateInviteRequest = Message<"collab.v1.CreateInviteRequest"> & {
    /**
     * @generated from field: string channel = 1;
     */
    channel: string;
    /**
     * So you can tell invites apart before they are redeemed.
     *
     * @generated from field: string label = 2;
     */
    label: string;
    /**
     * Unset or 0: 24 hours. Capped at 7 days.
     *
     * @generated from field: uint32 ttl_seconds = 3;
     */
    ttlSeconds: number;
};
/**
 * Describes the message collab.v1.CreateInviteRequest.
 * Use `create(CreateInviteRequestSchema)` to create a new message.
 */
export declare const CreateInviteRequestSchema: GenMessage<CreateInviteRequest>;
/**
 * @generated from message collab.v1.CreateInviteResponse
 */
export type CreateInviteResponse = Message<"collab.v1.CreateInviteResponse"> & {
    /**
     * @generated from field: string invite = 1;
     */
    invite: string;
    /**
     * @generated from field: string channel = 2;
     */
    channel: string;
    /**
     * @generated from field: google.protobuf.Timestamp expires_at = 3;
     */
    expiresAt?: Timestamp | undefined;
    /**
     * Where the invited member's client should point.
     *
     * @generated from field: string api_endpoint = 4;
     */
    apiEndpoint: string;
};
/**
 * Describes the message collab.v1.CreateInviteResponse.
 * Use `create(CreateInviteResponseSchema)` to create a new message.
 */
export declare const CreateInviteResponseSchema: GenMessage<CreateInviteResponse>;
/**
 * @generated from message collab.v1.RevokeMemberRequest
 */
export type RevokeMemberRequest = Message<"collab.v1.RevokeMemberRequest"> & {
    /**
     * @generated from field: string member_id = 1;
     */
    memberId: string;
};
/**
 * Describes the message collab.v1.RevokeMemberRequest.
 * Use `create(RevokeMemberRequestSchema)` to create a new message.
 */
export declare const RevokeMemberRequestSchema: GenMessage<RevokeMemberRequest>;
/**
 * @generated from message collab.v1.RevokeMemberResponse
 */
export type RevokeMemberResponse = Message<"collab.v1.RevokeMemberResponse"> & {
    /**
     * @generated from field: bool revoked = 1;
     */
    revoked: boolean;
    /**
     * @generated from field: string member_id = 2;
     */
    memberId: string;
    /**
     * @generated from field: string channel = 3;
     */
    channel: string;
    /**
     * @generated from field: uint32 closed_connections = 4;
     */
    closedConnections: number;
};
/**
 * Describes the message collab.v1.RevokeMemberResponse.
 * Use `create(RevokeMemberResponseSchema)` to create a new message.
 */
export declare const RevokeMemberResponseSchema: GenMessage<RevokeMemberResponse>;
/**
 * @generated from service collab.v1.AdminService
 */
export declare const AdminService: GenService<{
    /**
     * @generated from rpc collab.v1.AdminService.CreateInvite
     */
    createInvite: {
        methodKind: "unary";
        input: typeof CreateInviteRequestSchema;
        output: typeof CreateInviteResponseSchema;
    };
    /**
     * Revokes a member and closes every connection it still holds.
     *
     * @generated from rpc collab.v1.AdminService.RevokeMember
     */
    revokeMember: {
        methodKind: "unary";
        input: typeof RevokeMemberRequestSchema;
        output: typeof RevokeMemberResponseSchema;
    };
}>;
