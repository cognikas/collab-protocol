import { describe, expect, it } from 'vitest';
import { create } from '@bufbuild/protobuf';
import { negotiate, parseVersion, ProtocolVersionSchema, sharedCapabilities } from '../src/index.js';
import vectors from '../../vectors/negotiation.json';

const version = (v: { major: number; minor: number } | null) => (v ? create(ProtocolVersionSchema, v) : undefined);

describe('vectors/negotiation.json', () => {
  it.each(vectors.negotiate)('$name', ({ client, server, result }) => {
    expect(negotiate(version(client), server.map((s) => version(s)!))).toEqual(version(result));
  });
  it.each(vectors.sharedCapabilities)('capabilities $client × $server', ({ client, server, result }) => {
    expect(sharedCapabilities(client, server)).toEqual(result);
  });
  it.each(vectors.parseVersion)('parseVersion($input)', ({ input, result }) => {
    expect(parseVersion(input)).toEqual(version(result));
  });
});
