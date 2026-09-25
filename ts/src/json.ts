import { fromJson, fromJsonString, toJson, toJsonString, type DescMessage, type JsonValue, type MessageShape } from '@bufbuild/protobuf';

/**
 * How every implementation reads and writes protobuf JSON. Readers ignore
 * fields and enum values they do not know, which is what makes a minor version
 * compatible in both directions. Writers leave out fields at their default
 * value, so a missing field and a zero one mean the same.
 */
const READ = { ignoreUnknownFields: true } as const;

export function encode<Desc extends DescMessage>(schema: Desc, message: MessageShape<Desc>): string {
  return toJsonString(schema, message);
}

export function decode<Desc extends DescMessage>(schema: Desc, text: string): MessageShape<Desc> {
  return fromJsonString(schema, text, READ);
}

/** For a body that is already parsed, such as one from a JSON HTTP framework. */
export function encodeValue<Desc extends DescMessage>(schema: Desc, message: MessageShape<Desc>): JsonValue {
  return toJson(schema, message);
}

export function decodeValue<Desc extends DescMessage>(schema: Desc, value: JsonValue): MessageShape<Desc> {
  return fromJson(schema, value, READ);
}
