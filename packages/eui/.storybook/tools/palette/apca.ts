/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { APCAcontrast as apcaContrast, sRGBtoY } from 'apca-w3';
import chroma from 'chroma-js';

export const getApcaContrast = (
  textColor: string,
  backgroundColor: string
): number | null => {
  if (!chroma.valid(textColor) || !chroma.valid(backgroundColor)) return null;

  const textRgb = chroma(textColor).rgb();
  const backgroundRgb = chroma(backgroundColor).rgb();
  const result = apcaContrast(sRGBtoY(textRgb), sRGBtoY(backgroundRgb));
  if (typeof result !== 'number') return null;
  return result;
};
