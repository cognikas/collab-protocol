import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file collab/v1/membership.proto.
 */
export declare const file_collab_v1_membership: GenFile;
/**
 * @generated from message collab.v1.JoinRequest
 */
export type JoinRequest = Message<"collab.v1.JoinRequest"> & {
    /**
     * @generated from field: string invite = 1;
     */
    invite: string;
    /**
     * Shown to the other members. The handle is derived from it.
     *
     * @generated from field: string display_name = 2;
     */
    displayName: string;
};
/**
 * Describes the message collab.v1.JoinRequest.
 * Use `create(JoinRequestSchema)` to create a new message.
 */
export declare const JoinRequestSchema: GenMessage<JoinRequest>;
/**
 * @generated from message collab.v1.JoinResponse
 */
export type JoinResponse = Message<"collab.v1.JoinResponse"> & {
    /**
     * @generated from field: string member_id = 1;
     */
    memberId: string;
    /**
     * The only time the secret is ever sent. The server keeps only its hash.
     *
     * @generated from field: string secret = 2;
     */
    secret: string;
    /**
     * @generated from field: string channel = 3;
     */
    channel: string;
    /**
     * @generated from field: string display_name = 4;
     */
    displayName: string;
    /**
     * @generated from field: string handle = 5;
     */
    handle: string;
    /**
     * Where to open the WebSocket binding.
     *
     * @generated from field: string ws_endpoint = 6;
     */
    wsEndpoint: string;
};
/**
 * Describes the message collab.v1.JoinResponse.
 * Use `create(JoinResponseSchema)` to create a new message.
 */
export declare const JoinResponseSchema: GenMessage<JoinResponse>;
/**
 * @generated from service collab.v1.MembershipService
 */
export declare const MembershipService: GenService<{
    /**
     * Redeems a one-time invite and creates a member. Needs no credential: the
     * invite is the credential, and it is spent here.
     *
     * @generated from rpc collab.v1.MembershipService.Join
     */
    join: {
        methodKind: "unary";
        input: typeof JoinRequestSchema;
        output: typeof JoinResponseSchema;
    };
}>;
