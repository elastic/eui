/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { compile, serialize, stringify } from 'stylis';

type SerializedStyle = {
  styles?: string;
  next?: SerializedStyle;
};

type EmotionStyle =
  | string
  | SerializedStyle
  | Array<string | SerializedStyle | undefined>
  | undefined;

/**
 * Convert Emotion style to CSS.
 *
 * @param value - Emotion style
 * @returns CSS
 */
const emotionBody = (value: EmotionStyle): string => {
  if (!value) return '';
  if (Array.isArray(value)) return value.map(emotionBody).join('');
  if (typeof value === 'string') return value;
  return value.styles ?? '';
};

const emotionGlobals = (value: EmotionStyle): string => {
  if (!value || typeof value === 'string') return '';
  if (Array.isArray(value)) return value.map(emotionGlobals).join('');

  let next = value.next;
  let globals = '';

  while (next) {
    globals += next.styles ?? '';
    next = next.next;
  }

  return globals;
};

const clean = (value: string): string =>
  value
    .replace(/^\s*\/\/.*$/gm, '')
    .replace(/label:[^;{]+;/g, '')
    .replace(/[\w-]+\s*:\s*undefined;?/g, '')
    .trim();

/**
 * Convert Emotion style to CSS rule using Stylis.
 *
 * @param selector - CSS selector
 * @param value - Emotion style
 * @returns CSS
 */
export const rule = (selector: string, value: EmotionStyle): string => {
  const body = clean(emotionBody(value));
  if (!body) return '';

  const scoped = serialize(compile(`${selector}{${body}}`), stringify);
  const globals = clean(emotionGlobals(value));

  return globals
    ? `${scoped}${serialize(compile(globals), stringify)}`
    : scoped;
};
