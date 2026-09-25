import { fromJson, fromJsonString, toJson, toJsonString } from '@bufbuild/protobuf';
/**
 * How every implementation reads and writes protobuf JSON. Readers ignore
 * fields and enum values they do not know, which is what makes a minor version
 * compatible in both directions. Writers leave out fields at their default
 * value, so a missing field and a zero one mean the same.
 */
const READ = { ignoreUnknownFields: true };
export function encode(schema, message) {
    return toJsonString(schema, message);
}
export function decode(schema, text) {
    return fromJsonString(schema, text, READ);
}
/** For a body that is already parsed, such as one from a JSON HTTP framework. */
export function encodeValue(schema, message) {
    return toJson(schema, message);
}
export function decodeValue(schema, value) {
    return fromJson(schema, value, READ);
}
