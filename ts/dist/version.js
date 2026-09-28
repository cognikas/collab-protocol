import { create } from '@bufbuild/protobuf';
import { ProtocolVersionSchema } from './gen/collab/v1/model_pb.js';
/** The protocol this package describes. The major is the `collab.v1` package suffix. */
export const PROTOCOL_MAJOR = 1;
export const PROTOCOL_MINOR = 0;
/** The release of this repo, patch and pre-release included. Never on the wire. */
export const PROTOCOL_RELEASE = '1.0.0-rc.5';
export const PROTOCOL = create(ProtocolVersionSchema, { major: PROTOCOL_MAJOR, minor: PROTOCOL_MINOR });
/**
 * The version both sides speak, or undefined when the server has no version
 * with the client's major. Minors are always compatible within a major: the
 * result is the lower of the two, and each side ignores fields it does not know.
 */
export function negotiate(client, server) {
    if (!client)
        return undefined;
    const match = server.find((version) => version.major === client.major);
    if (!match)
        return undefined;
    return create(ProtocolVersionSchema, { major: client.major, minor: Math.min(client.minor, match.minor) });
}
/** Modules both sides implement, in the server's order. */
export function sharedCapabilities(client, server) {
    const offered = new Set(client);
    return server.filter((capability) => offered.has(capability));
}
export function formatVersion(version) {
    return `${version.major}.${version.minor}`;
}
/** "1.0" or "1" as sent in the HTTP binding's protocol header. */
export function parseVersion(value) {
    if (typeof value !== 'string')
        return undefined;
    const match = /^(\d{1,4})(?:\.(\d{1,4}))?$/.exec(value.trim());
    if (!match)
        return undefined;
    return create(ProtocolVersionSchema, { major: Number(match[1]), minor: Number(match[2] ?? 0) });
}
