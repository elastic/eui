/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { compile, serialize, stringify } from 'stylis';

type EmotionStyle =
  | string
  | { styles?: string }
  | Array<string | { styles?: string } | undefined>
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

/**
 * Convert Emotion style to CSS rule using Stylis.
 *
 * @param selector - CSS selector
 * @param value - Emotion style
 * @returns CSS
 */
export const rule = (selector: string, value: EmotionStyle): string => {
  const body = emotionBody(value)
    .replace(/label:[^;{]+;/g, '')
    .replace(/[\w-]+\s*:\s*undefined;?/g, '')
    .trim();
  if (!body) return '';

  return serialize(compile(`${selector}{${body}}`), stringify);
};
