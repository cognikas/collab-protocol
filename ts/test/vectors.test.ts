import { describe, expect, it } from 'vitest';
import { cleanLine, cleanText, contextKey, isClientSessionId, isTopic, slug, taskListKey, visibleTo } from '../src/index.js';
import names from '../../vectors/names.json';
import sanitize from '../../vectors/sanitize.json';
import visibility from '../../vectors/visibility.json';

describe('vectors/names.json', () => {
  it.each(names.slug)('slug($input)', ({ input, output }) => expect(slug(input)).toBe(output));
  it.each(names.contextKey)('contextKey($input)', ({ input, output }) => expect(contextKey(input)).toBe(output));
  it.each(names.taskListKey)('taskListKey($input)', ({ input, output }) => expect(taskListKey(input)).toBe(output));
  it.each(names.isTopic)('isTopic($input)', ({ input, output }) => expect(isTopic(input)).toBe(output));
  it.each(names.isClientSessionId)('isClientSessionId($input)', ({ input, output }) => expect(isClientSessionId(input)).toBe(output));
});

describe('vectors/sanitize.json', () => {
  it.each(sanitize.cleanLine)('cleanLine($input, $max)', ({ input, max, output }) => expect(cleanLine(input, max)).toBe(output));
  it.each(sanitize.cleanText)('cleanText($input)', ({ input, output }) => expect(cleanText(input)).toBe(output));
});

describe('vectors/visibility.json', () => {
  it.each(visibility.cases)('$name', ({ message, visible }) => expect(visibleTo(visibility.viewer, message)).toBe(visible));
});
