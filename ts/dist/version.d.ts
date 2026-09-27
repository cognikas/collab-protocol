import { type ProtocolVersion } from './gen/collab/v1/model_pb.js';
/** The protocol this package describes. The major is the `collab.v1` package suffix. */
export declare const PROTOCOL_MAJOR = 1;
export declare const PROTOCOL_MINOR = 0;
/** The release of this repo, patch and pre-release included. Never on the wire. */
export declare const PROTOCOL_RELEASE = "1.0.0-rc.4";
export declare const PROTOCOL: ProtocolVersion;
/**
 * The version both sides speak, or undefined when the server has no version
 * with the client's major. Minors are always compatible within a major: the
 * result is the lower of the two, and each side ignores fields it does not know.
 */
export declare function negotiate(client: ProtocolVersion | undefined, server: readonly ProtocolVersion[]): ProtocolVersion | undefined;
/** Modules both sides implement, in the server's order. */
export declare function sharedCapabilities(client: readonly string[], server: readonly string[]): string[];
export declare function formatVersion(version: ProtocolVersion): string;
/** "1.0" or "1" as sent in the HTTP binding's protocol header. */
export declare function parseVersion(value: unknown): ProtocolVersion | undefined;
