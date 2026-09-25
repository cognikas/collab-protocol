import { describe, expect, it } from 'vitest';
import { createRegistry, fromJson, toJson, type JsonValue } from '@bufbuild/protobuf';
import { decodeValue, encodeValue, file_collab_v1_websocket } from '../src/index.js';
import frames from '../../vectors/frames.json';

const registry = createRegistry(file_collab_v1_websocket);

function schemaOf(typeName: string) {
  const schema = registry.getMessage(typeName);
  if (!schema) throw new Error(`No schema ${typeName}`);
  return schema;
}

describe('vectors/frames.json', () => {
  it.each(frames.cases)('$name is canonical', ({ schema, json }) => {
    const desc = schemaOf(schema);
    // Strict read: a canonical frame has nothing a reader would need to ignore.
    const message = fromJson(desc, json as unknown as JsonValue);
    expect(toJson(desc, message)).toEqual(json);
  });

  it.each(frames.tolerated)('$name', ({ schema, json, reads_as }) => {
    const desc = schemaOf(schema);
    expect(encodeValue(desc, decodeValue(desc, json as unknown as JsonValue))).toEqual(reads_as);
  });
});
