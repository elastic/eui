/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// Values sourced from @elastic/design-tokens — do not edit manually.
// To change a color, update the corresponding token in packages/design-tokens/
// and rebuild.
import tokens from '@elastic/design-tokens/dist/ts/light-all.json';

const c = tokens.color;

/** Convert a hex color (#RRGGBB) to an "R,G,B" string for rgba() construction. */
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

const _semantic_colors = {
  plainLight: c.plain.light,
  plainDark: c.plain.dark,

  primary10: c.primary['10'],
  primary20: c.primary['20'],
  primary30: c.primary['30'],
  primary40: c.primary['40'],
  primary50: c.primary['50'],
  primary60: c.primary['60'],
  primary70: c.primary['70'],
  primary80: c.primary['80'],
  primary90: c.primary['90'],
  primary100: c.primary['100'],
  primary110: c.primary['110'],
  primary120: c.primary['120'],
  primary130: c.primary['130'],
  primary140: c.primary['140'],

  accent10: c.accent['10'],
  accent20: c.accent['20'],
  accent30: c.accent['30'],
  accent40: c.accent['40'],
  accent50: c.accent['50'],
  accent60: c.accent['60'],
  accent70: c.accent['70'],
  accent80: c.accent['80'],
  accent90: c.accent['90'],
  accent100: c.accent['100'],
  accent110: c.accent['110'],
  accent120: c.accent['120'],
  accent130: c.accent['130'],
  accent140: c.accent['140'],

  accentSecondary10: c['accent-secondary']['10'],
  accentSecondary20: c['accent-secondary']['20'],
  accentSecondary30: c['accent-secondary']['30'],
  accentSecondary40: c['accent-secondary']['40'],
  accentSecondary50: c['accent-secondary']['50'],
  accentSecondary60: c['accent-secondary']['60'],
  accentSecondary70: c['accent-secondary']['70'],
  accentSecondary80: c['accent-secondary']['80'],
  accentSecondary90: c['accent-secondary']['90'],
  accentSecondary100: c['accent-secondary']['100'],
  accentSecondary110: c['accent-secondary']['110'],
  accentSecondary120: c['accent-secondary']['120'],
  accentSecondary130: c['accent-secondary']['130'],
  accentSecondary140: c['accent-secondary']['140'],

  neutral10: c.neutral['10'],
  neutral20: c.neutral['20'],
  neutral30: c.neutral['30'],
  neutral40: c.neutral['40'],
  neutral50: c.neutral['50'],
  neutral60: c.neutral['60'],
  neutral70: c.neutral['70'],
  neutral80: c.neutral['80'],
  neutral90: c.neutral['90'],
  neutral100: c.neutral['100'],
  neutral110: c.neutral['110'],
  neutral120: c.neutral['120'],
  neutral130: c.neutral['130'],
  neutral140: c.neutral['140'],

  success10: c.success['10'],
  success20: c.success['20'],
  success30: c.success['30'],
  success40: c.success['40'],
  success50: c.success['50'],
  success60: c.success['60'],
  success70: c.success['70'],
  success80: c.success['80'],
  success90: c.success['90'],
  success100: c.success['100'],
  success110: c.success['110'],
  success120: c.success['120'],
  success130: c.success['130'],
  success140: c.success['140'],

  warning10: c.warning['10'],
  warning20: c.warning['20'],
  warning30: c.warning['30'],
  warning40: c.warning['40'],
  warning50: c.warning['50'],
  warning60: c.warning['60'],
  warning70: c.warning['70'],
  warning80: c.warning['80'],
  warning90: c.warning['90'],
  warning100: c.warning['100'],
  warning110: c.warning['110'],
  warning120: c.warning['120'],
  warning130: c.warning['130'],
  warning140: c.warning['140'],

  danger10: c.danger['10'],
  danger20: c.danger['20'],
  danger30: c.danger['30'],
  danger40: c.danger['40'],
  danger50: c.danger['50'],
  danger60: c.danger['60'],
  danger70: c.danger['70'],
  danger80: c.danger['80'],
  danger90: c.danger['90'],
  danger100: c.danger['100'],
  danger110: c.danger['110'],
  danger120: c.danger['120'],
  danger130: c.danger['130'],
  danger140: c.danger['140'],

  risk10: c.risk['10'],
  risk20: c.risk['20'],
  risk30: c.risk['30'],
  risk40: c.risk['40'],
  risk50: c.risk['50'],
  risk60: c.risk['60'],
  risk70: c.risk['70'],
  risk80: c.risk['80'],
  risk90: c.risk['90'],
  risk100: c.risk['100'],
  risk110: c.risk['110'],
  risk120: c.risk['120'],
  risk130: c.risk['130'],
  risk140: c.risk['140'],

  assistance10: c.assistance['10'],
  assistance20: c.assistance['20'],
  assistance30: c.assistance['30'],
  assistance40: c.assistance['40'],
  assistance50: c.assistance['50'],
  assistance60: c.assistance['60'],
  assistance70: c.assistance['70'],
  assistance80: c.assistance['80'],
  assistance90: c.assistance['90'],
  assistance100: c.assistance['100'],
  assistance110: c.assistance['110'],
  assistance120: c.assistance['120'],
  assistance130: c.assistance['130'],
  assistance140: c.assistance['140'],

  shade10: c.shade['10'],
  shade15: c.shade['15'],
  shade20: c.shade['20'],
  shade25: c.shade['25'],
  shade30: c.shade['30'],
  shade35: c.shade['35'],
  shade40: c.shade['40'],
  shade45: c.shade['45'],
  shade50: c.shade['50'],
  shade55: c.shade['55'],
  shade60: c.shade['60'],
  shade65: c.shade['65'],
  shade70: c.shade['70'],
  shade75: c.shade['75'],
  shade80: c.shade['80'],
  shade85: c.shade['85'],
  shade90: c.shade['90'],
  shade95: c.shade['95'],
  shade100: c.shade['100'],
  shade105: c.shade['105'],
  shade110: c.shade['110'],
  shade115: c.shade['115'],
  shade120: c.shade['120'],
  shade125: c.shade['125'],
  shade130: c.shade['130'],
  shade135: c.shade['135'],
  shade140: c.shade['140'],
  shade145: c.shade['145'],
};

const _semantic_alpha_colors = {
  plainLightAlpha8: c.plain['light-alpha-8'],
  plainLightAlpha12: c.plain['light-alpha-12'],
  plainLightAlpha16: c.plain['light-alpha-16'],
  plainLightAlpha32: c.plain['light-alpha-32'],

  primary70Alpha12: c.primary['70-alpha-12'],
  primary70Alpha16: c.primary['70-alpha-16'],
  primary70Alpha20: c.primary['70-alpha-20'],

  primary100Alpha4: c.primary['100-alpha-4'],
  primary100Alpha8: c.primary['100-alpha-8'],
  primary100Alpha12: c.primary['100-alpha-12'],

  accent70Alpha12: c.accent['70-alpha-12'],
  accent70Alpha16: c.accent['70-alpha-16'],
  accent70Alpha20: c.accent['70-alpha-20'],

  accentSecondary70Alpha12: c['accent-secondary']['70-alpha-12'],
  accentSecondary70Alpha16: c['accent-secondary']['70-alpha-16'],
  accentSecondary70Alpha20: c['accent-secondary']['70-alpha-20'],

  neutral70Alpha12: c.neutral['70-alpha-12'],
  neutral70Alpha16: c.neutral['70-alpha-16'],
  neutral70Alpha20: c.neutral['70-alpha-20'],

  success70Alpha12: c.success['70-alpha-12'],
  success70Alpha16: c.success['70-alpha-16'],
  success70Alpha20: c.success['70-alpha-20'],

  warning60Alpha12: c.warning['60-alpha-12'],
  warning60Alpha16: c.warning['60-alpha-16'],
  warning60Alpha20: c.warning['60-alpha-20'],

  risk60Alpha12: c.risk['60-alpha-12'],
  risk60Alpha16: c.risk['60-alpha-16'],
  risk60Alpha20: c.risk['60-alpha-20'],

  danger70Alpha12: c.danger['70-alpha-12'],
  danger70Alpha16: c.danger['70-alpha-16'],
  danger70Alpha20: c.danger['70-alpha-20'],

  assistance70Alpha12: c.assistance['70-alpha-12'],

  shade100Alpha4: c.shade['100-alpha-4'],
  shade100Alpha16: c.shade['100-alpha-16'],
  shade100Alpha24: c.shade['100-alpha-24'],
  shade100Alpha70: c.shade['100-alpha-70'],

  shade120Alpha70: c.shade['120-alpha-70'],
};

// RGB strings are still needed by _components.ts for high contrast rgba() construction.
// Uses a simple hex parser instead of chroma-js.
const _semantic_rgb_colors = {
  plainLightRGB: hexToRgb(c.plain.light),
  primary70RGB: hexToRgb(c.primary['70']),
  primary100RGB: hexToRgb(c.primary['100']),
  accent70RGB: hexToRgb(c.accent['70']),
  accentSecondary70RGB: hexToRgb(c['accent-secondary']['70']),
  neutral70RGB: hexToRgb(c.neutral['70']),
  success70RGB: hexToRgb(c.success['70']),
  warning60RGB: hexToRgb(c.warning['60']),
  risk60RGB: hexToRgb(c.risk['60']),
  danger70RGB: hexToRgb(c.danger['70']),
  assistance70RGB: hexToRgb(c.assistance['70']),
  shade100RGB: hexToRgb(c.shade['100']),
  shade120RGB: hexToRgb(c.shade['120']),
  shade140RGB: hexToRgb(c.shade['140']),
};

export const SEMANTIC_COLORS = {
  ..._semantic_colors,
  ..._semantic_alpha_colors,
  ..._semantic_rgb_colors,
};
