/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma from 'chroma-js';
import { PRIMITIVE_COLORS } from './_primitive_colors';

const _semantic_colors = {
  plainLight: PRIMITIVE_COLORS.white,
  plainDark: PRIMITIVE_COLORS.blueBlack,

  primary10: PRIMITIVE_COLORS.blue10,
  primary20: PRIMITIVE_COLORS.blue20,
  primary30: PRIMITIVE_COLORS.blue30,
  primary40: PRIMITIVE_COLORS.blue40,
  primary50: PRIMITIVE_COLORS.blue50,
  primary60: PRIMITIVE_COLORS.blue60,
  primary70: PRIMITIVE_COLORS.blue70,
  primary80: PRIMITIVE_COLORS.blue80,
  primary90: PRIMITIVE_COLORS.blue90,
  primary100: PRIMITIVE_COLORS.blue100,
  primary110: PRIMITIVE_COLORS.blue110,
  primary120: PRIMITIVE_COLORS.blue120,
  primary130: PRIMITIVE_COLORS.blue130,
  primary140: PRIMITIVE_COLORS.blue140,

  accent10: PRIMITIVE_COLORS.pink10,
  accent20: PRIMITIVE_COLORS.pink20,
  accent30: PRIMITIVE_COLORS.pink30,
  accent40: PRIMITIVE_COLORS.pink40,
  accent50: PRIMITIVE_COLORS.pink50,
  accent60: PRIMITIVE_COLORS.pink60,
  accent70: PRIMITIVE_COLORS.pink70,
  accent80: PRIMITIVE_COLORS.pink80,
  accent90: PRIMITIVE_COLORS.pink90,
  accent100: PRIMITIVE_COLORS.pink100,
  accent110: PRIMITIVE_COLORS.pink110,
  accent120: PRIMITIVE_COLORS.pink120,
  accent130: PRIMITIVE_COLORS.pink130,
  accent140: PRIMITIVE_COLORS.pink140,

  accentSecondary10: PRIMITIVE_COLORS.teal10,
  accentSecondary20: PRIMITIVE_COLORS.teal20,
  accentSecondary30: PRIMITIVE_COLORS.teal30,
  accentSecondary40: PRIMITIVE_COLORS.teal40,
  accentSecondary50: PRIMITIVE_COLORS.teal50,
  accentSecondary60: PRIMITIVE_COLORS.teal60,
  accentSecondary70: PRIMITIVE_COLORS.teal70,
  accentSecondary80: PRIMITIVE_COLORS.teal80,
  accentSecondary90: PRIMITIVE_COLORS.teal90,
  accentSecondary100: PRIMITIVE_COLORS.teal100,
  accentSecondary110: PRIMITIVE_COLORS.teal110,
  accentSecondary120: PRIMITIVE_COLORS.teal120,
  accentSecondary130: PRIMITIVE_COLORS.teal130,
  accentSecondary140: PRIMITIVE_COLORS.teal140,

  success10: PRIMITIVE_COLORS.green10,
  success20: PRIMITIVE_COLORS.green20,
  success30: PRIMITIVE_COLORS.green30,
  success40: PRIMITIVE_COLORS.green40,
  success50: PRIMITIVE_COLORS.green50,
  success60: PRIMITIVE_COLORS.green60,
  success70: PRIMITIVE_COLORS.green70,
  success80: PRIMITIVE_COLORS.green80,
  success90: PRIMITIVE_COLORS.green90,
  success100: PRIMITIVE_COLORS.green100,
  success110: PRIMITIVE_COLORS.green110,
  success120: PRIMITIVE_COLORS.green120,
  success130: PRIMITIVE_COLORS.green130,
  success140: PRIMITIVE_COLORS.green140,

  warning10: PRIMITIVE_COLORS.yellow10,
  warning20: PRIMITIVE_COLORS.yellow20,
  warning30: PRIMITIVE_COLORS.yellow30,
  warning40: PRIMITIVE_COLORS.yellow40,
  warning50: PRIMITIVE_COLORS.yellow50,
  warning60: PRIMITIVE_COLORS.yellow60,
  warning70: PRIMITIVE_COLORS.yellow70,
  warning80: PRIMITIVE_COLORS.yellow80,
  warning90: PRIMITIVE_COLORS.yellow90,
  warning100: PRIMITIVE_COLORS.yellow100,
  warning110: PRIMITIVE_COLORS.yellow110,
  warning120: PRIMITIVE_COLORS.yellow120,
  warning130: PRIMITIVE_COLORS.yellow130,
  warning140: PRIMITIVE_COLORS.yellow140,

  danger10: PRIMITIVE_COLORS.red10,
  danger20: PRIMITIVE_COLORS.red20,
  danger30: PRIMITIVE_COLORS.red30,
  danger40: PRIMITIVE_COLORS.red40,
  danger50: PRIMITIVE_COLORS.red50,
  danger60: PRIMITIVE_COLORS.red60,
  danger70: PRIMITIVE_COLORS.red70,
  danger80: PRIMITIVE_COLORS.red80,
  danger90: PRIMITIVE_COLORS.red90,
  danger100: PRIMITIVE_COLORS.red100,
  danger110: PRIMITIVE_COLORS.red110,
  danger120: PRIMITIVE_COLORS.red120,
  danger130: PRIMITIVE_COLORS.red130,
  danger140: PRIMITIVE_COLORS.red140,

  assistance10: PRIMITIVE_COLORS.purple10,
  assistance20: PRIMITIVE_COLORS.purple20,
  assistance30: PRIMITIVE_COLORS.purple30,
  assistance40: PRIMITIVE_COLORS.purple40,
  assistance50: PRIMITIVE_COLORS.purple50,
  assistance60: PRIMITIVE_COLORS.purple60,
  assistance70: PRIMITIVE_COLORS.purple70,
  assistance80: PRIMITIVE_COLORS.purple80,
  assistance90: PRIMITIVE_COLORS.purple90,
  assistance100: PRIMITIVE_COLORS.purple100,
  assistance110: PRIMITIVE_COLORS.purple110,
  assistance120: PRIMITIVE_COLORS.purple120,
  assistance130: PRIMITIVE_COLORS.purple130,
  assistance140: PRIMITIVE_COLORS.purple140,

  shade10: PRIMITIVE_COLORS.blueGrey10,
  shade15: PRIMITIVE_COLORS.blueGrey15,
  shade20: PRIMITIVE_COLORS.blueGrey20,
  shade25: PRIMITIVE_COLORS.blueGrey25,
  shade30: PRIMITIVE_COLORS.blueGrey30,
  shade35: PRIMITIVE_COLORS.blueGrey35,
  shade40: PRIMITIVE_COLORS.blueGrey40,
  shade45: PRIMITIVE_COLORS.blueGrey45,
  shade50: PRIMITIVE_COLORS.blueGrey50,
  shade55: PRIMITIVE_COLORS.blueGrey55,
  shade60: PRIMITIVE_COLORS.blueGrey60,
  shade65: PRIMITIVE_COLORS.blueGrey65,
  shade70: PRIMITIVE_COLORS.blueGrey70,
  shade75: PRIMITIVE_COLORS.blueGrey75,
  shade80: PRIMITIVE_COLORS.blueGrey80,
  shade85: PRIMITIVE_COLORS.blueGrey85,
  shade90: PRIMITIVE_COLORS.blueGrey90,
  shade95: PRIMITIVE_COLORS.blueGrey95,
  shade100: PRIMITIVE_COLORS.blueGrey100,
  shade105: PRIMITIVE_COLORS.blueGrey105,
  shade110: PRIMITIVE_COLORS.blueGrey110,
  shade115: PRIMITIVE_COLORS.blueGrey115,
  shade120: PRIMITIVE_COLORS.blueGrey120,
  shade125: PRIMITIVE_COLORS.blueGrey125,
  shade130: PRIMITIVE_COLORS.blueGrey130,
  shade135: PRIMITIVE_COLORS.blueGrey135,
  shade140: PRIMITIVE_COLORS.blueGrey140,
  shade145: PRIMITIVE_COLORS.blueGrey145,
};

const plainLightRGB = chroma(_semantic_colors.plainLight).rgb().join();
const primary70RGB = chroma(_semantic_colors.primary70).rgb().join();
const primary100RGB = chroma(_semantic_colors.primary100).rgb().join();
const accent70RGB = chroma(_semantic_colors.accent70).rgb().join();
const accentSecondary70RGB = chroma(_semantic_colors.accentSecondary70)
  .rgb()
  .join();
const success70RGB = chroma(_semantic_colors.success70).rgb().join();
const warning40RGB = chroma(_semantic_colors.warning40).rgb().join();
const danger70RGB = chroma(_semantic_colors.danger70).rgb().join();
const shade100RGB = chroma(_semantic_colors.shade100).rgb().join();
const shade120RGB = chroma(_semantic_colors.shade120).rgb().join();

const _semantic_alpha_colors = {
  plainLightAlpha8: `rgba(${plainLightRGB}, 0.08)`,
  plainLightAlpha12: `rgba(${plainLightRGB}, 0.12)`,
  plainLightAlpha16: `rgba(${plainLightRGB}, 0.16)`,
  plainLightAlpha32: `rgba(${plainLightRGB}, 0.32)`,

  primary70Alpha12: `rgba(${primary70RGB}, 0.12)`,
  primary70Alpha16: `rgba(${primary70RGB}, 0.16)`,

  primary100Alpha4: `rgba(${primary100RGB}, 0.04)`,
  primary100Alpha8: `rgba(${primary100RGB}, 0.08)`,
  primary100Alpha12: `rgba(${primary100RGB}, 0.12)`,

  accent70Alpha12: `rgba(${accent70RGB}, 0.12)`,
  accent70Alpha16: `rgba(${accent70RGB}, 0.16)`,

  accentSecondary70Alpha12: `rgba(${accentSecondary70RGB}, 0.12)`,
  accentSecondary70Alpha16: `rgba(${accentSecondary70RGB}, 0.16)`,

  success70Alpha12: `rgba(${success70RGB}, 0.12)`,
  success70Alpha16: `rgba(${success70RGB}, 0.16)`,

  warning40Alpha12: `rgba(${warning40RGB}, 0.12)`,
  warning40Alpha24: `rgba(${warning40RGB}, 0.24)`,

  danger70Alpha12: `rgba(${danger70RGB}, 0.12)`,
  danger70Alpha16: `rgba(${danger70RGB}, 0.16)`,

  shade100Alpha4: `rgba(${shade100RGB}, 0.04)`,
  shade100Alpha16: `rgba(${shade100RGB}, 0.16)`,
  shade100Alpha24: `rgba(${shade100RGB}, 0.24)`,
  shade100Alpha70: `rgba(${shade100RGB}, 0.7)`,

  shade120Alpha70: `rgba(${shade120RGB}, 0.7)`,
};

export const SEMANTIC_COLORS = {
  ..._semantic_colors,
  ..._semantic_alpha_colors,
};
