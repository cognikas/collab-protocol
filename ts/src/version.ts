import { create } from '@bufbuild/protobuf';
import { ProtocolVersionSchema, type ProtocolVersion } from './gen/collab/v1/model_pb.js';

/** The protocol this package describes. The major is the `collab.v1` package suffix. */
export const PROTOCOL_MAJOR = 1;
export const PROTOCOL_MINOR = 0;
/** The release of this repo, patch and pre-release included. Never on the wire. */
export const PROTOCOL_RELEASE = '1.0.0-rc.4';

export const PROTOCOL: ProtocolVersion = create(ProtocolVersionSchema, { major: PROTOCOL_MAJOR, minor: PROTOCOL_MINOR });

/**
 * The version both sides speak, or undefined when the server has no version
 * with the client's major. Minors are always compatible within a major: the
 * result is the lower of the two, and each side ignores fields it does not know.
 */
export function negotiate(client: ProtocolVersion | undefined, server: readonly ProtocolVersion[]): ProtocolVersion | undefined {
  if (!client) return undefined;
  const match = server.find((version) => version.major === client.major);
  if (!match) return undefined;
  return create(ProtocolVersionSchema, { major: client.major, minor: Math.min(client.minor, match.minor) });
}

/** Modules both sides implement, in the server's order. */
export function sharedCapabilities(client: readonly string[], server: readonly string[]): string[] {
  const offered = new Set(client);
  return server.filter((capability) => offered.has(capability));
}

export function formatVersion(version: ProtocolVersion): string {
  return `${version.major}.${version.minor}`;
}

/** "1.0" or "1" as sent in the HTTP binding's protocol header. */
export function parseVersion(value: unknown): ProtocolVersion | undefined {
  if (typeof value !== 'string') return undefined;
  const match = /^(\d{1,4})(?:\.(\d{1,4}))?$/.exec(value.trim());
  if (!match) return undefined;
  return create(ProtocolVersionSchema, { major: Number(match[1]), minor: Number(match[2] ?? 0) });
}
