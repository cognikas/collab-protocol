import { type DescMessage, type JsonValue, type MessageShape } from '@bufbuild/protobuf';
export declare function encode<Desc extends DescMessage>(schema: Desc, message: MessageShape<Desc>): string;
export declare function decode<Desc extends DescMessage>(schema: Desc, text: string): MessageShape<Desc>;
/** For a body that is already parsed, such as one from a JSON HTTP framework. */
export declare function encodeValue<Desc extends DescMessage>(schema: Desc, message: MessageShape<Desc>): JsonValue;
export declare function decodeValue<Desc extends DescMessage>(schema: Desc, value: JsonValue): MessageShape<Desc>;
