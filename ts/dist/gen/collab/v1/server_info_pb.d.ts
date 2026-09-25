import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { ProtocolVersion } from "./model_pb.js";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file collab/v1/server_info.proto.
 */
export declare const file_collab_v1_server_info: GenFile;
/**
 * @generated from message collab.v1.GetServerInfoRequest
 */
export type GetServerInfoRequest = Message<"collab.v1.GetServerInfoRequest"> & {};
/**
 * Describes the message collab.v1.GetServerInfoRequest.
 * Use `create(GetServerInfoRequestSchema)` to create a new message.
 */
export declare const GetServerInfoRequestSchema: GenMessage<GetServerInfoRequest>;
/**
 * @generated from message collab.v1.GetServerInfoResponse
 */
export type GetServerInfoResponse = Message<"collab.v1.GetServerInfoResponse"> & {
    /**
     * The server's own release, for example "1.0.0".
     *
     * @generated from field: string server_version = 1;
     */
    serverVersion: string;
    /**
     * One entry per major the server speaks, with the highest minor of each.
     *
     * @generated from field: repeated collab.v1.ProtocolVersion protocols = 2;
     */
    protocols: ProtocolVersion[];
    /**
     * Optional modules the server implements. None exist in 1.0.
     *
     * @generated from field: repeated string capabilities = 3;
     */
    capabilities: string[];
};
/**
 * Describes the message collab.v1.GetServerInfoResponse.
 * Use `create(GetServerInfoResponseSchema)` to create a new message.
 */
export declare const GetServerInfoResponseSchema: GenMessage<GetServerInfoResponse>;
/**
 * @generated from service collab.v1.ServerInfoService
 */
export declare const ServerInfoService: GenService<{
    /**
     * Public: needs no credential. Lets a client check compatibility before it
     * joins or connects.
     *
     * @generated from rpc collab.v1.ServerInfoService.GetServerInfo
     */
    getServerInfo: {
        methodKind: "unary";
        input: typeof GetServerInfoRequestSchema;
        output: typeof GetServerInfoResponseSchema;
    };
}>;
