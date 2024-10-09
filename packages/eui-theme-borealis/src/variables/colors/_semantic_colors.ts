/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { PRIMITIVE_COLORS } from './_primitive_colors';

export const SEMANTIC_COLORS = {
  plainLight: PRIMITIVE_COLORS.white,
  plainDark: PRIMITIVE_COLORS.mutedBlack,

  primary10: PRIMITIVE_COLORS.blue['10'],
  primary20: PRIMITIVE_COLORS.blue['20'],
  primary30: PRIMITIVE_COLORS.blue['30'],
  primary40: PRIMITIVE_COLORS.blue['40'],
  primary50: PRIMITIVE_COLORS.blue['50'],
  primary60: PRIMITIVE_COLORS.blue['60'],
  primary70: PRIMITIVE_COLORS.blue['70'],
  primary80: PRIMITIVE_COLORS.blue['80'],
  primary90: PRIMITIVE_COLORS.blue['90'],
  primary100: PRIMITIVE_COLORS.blue['100'],
  primary110: PRIMITIVE_COLORS.blue['110'],
  primary120: PRIMITIVE_COLORS.blue['120'],
  primary130: PRIMITIVE_COLORS.blue['130'],
  primary140: PRIMITIVE_COLORS.blue['140'],

  accent10: PRIMITIVE_COLORS.pink['10'],
  accent20: PRIMITIVE_COLORS.pink['20'],
  accent30: PRIMITIVE_COLORS.pink['30'],
  accent40: PRIMITIVE_COLORS.pink['40'],
  accent50: PRIMITIVE_COLORS.pink['50'],
  accent60: PRIMITIVE_COLORS.pink['60'],
  accent70: PRIMITIVE_COLORS.pink['70'],
  accent80: PRIMITIVE_COLORS.pink['80'],
  accent90: PRIMITIVE_COLORS.pink['90'],
  accent100: PRIMITIVE_COLORS.pink['100'],
  accent110: PRIMITIVE_COLORS.pink['110'],
  accent120: PRIMITIVE_COLORS.pink['120'],
  accent130: PRIMITIVE_COLORS.pink['130'],
  accent140: PRIMITIVE_COLORS.pink['140'],

  accentSecondary10: PRIMITIVE_COLORS.teal['10'],
  accentSecondary20: PRIMITIVE_COLORS.teal['20'],
  accentSecondary30: PRIMITIVE_COLORS.teal['30'],
  accentSecondary40: PRIMITIVE_COLORS.teal['40'],
  accentSecondary50: PRIMITIVE_COLORS.teal['50'],
  accentSecondary60: PRIMITIVE_COLORS.teal['60'],
  accentSecondary70: PRIMITIVE_COLORS.teal['70'],
  accentSecondary80: PRIMITIVE_COLORS.teal['80'],
  accentSecondary90: PRIMITIVE_COLORS.teal['90'],
  accentSecondary100: PRIMITIVE_COLORS.teal['100'],
  accentSecondary110: PRIMITIVE_COLORS.teal['110'],
  accentSecondary120: PRIMITIVE_COLORS.teal['120'],
  accentSecondary130: PRIMITIVE_COLORS.teal['130'],
  accentSecondary140: PRIMITIVE_COLORS.teal['140'],

  success10: PRIMITIVE_COLORS.green['10'],
  success20: PRIMITIVE_COLORS.green['20'],
  success30: PRIMITIVE_COLORS.green['30'],
  success40: PRIMITIVE_COLORS.green['40'],
  success50: PRIMITIVE_COLORS.green['50'],
  success60: PRIMITIVE_COLORS.green['60'],
  success70: PRIMITIVE_COLORS.green['70'],
  success80: PRIMITIVE_COLORS.green['80'],
  success90: PRIMITIVE_COLORS.green['90'],
  success100: PRIMITIVE_COLORS.green['100'],
  success110: PRIMITIVE_COLORS.green['110'],
  success120: PRIMITIVE_COLORS.green['120'],
  success130: PRIMITIVE_COLORS.green['130'],
  success140: PRIMITIVE_COLORS.green['140'],

  warning10: PRIMITIVE_COLORS.yellow['10'],
  warning20: PRIMITIVE_COLORS.yellow['20'],
  warning30: PRIMITIVE_COLORS.yellow['30'],
  warning40: PRIMITIVE_COLORS.yellow['40'],
  warning50: PRIMITIVE_COLORS.yellow['50'],
  warning60: PRIMITIVE_COLORS.yellow['60'],
  warning70: PRIMITIVE_COLORS.yellow['70'],
  warning80: PRIMITIVE_COLORS.yellow['80'],
  warning90: PRIMITIVE_COLORS.yellow['90'],
  warning100: PRIMITIVE_COLORS.yellow['100'],
  warning110: PRIMITIVE_COLORS.yellow['110'],
  warning120: PRIMITIVE_COLORS.yellow['120'],
  warning130: PRIMITIVE_COLORS.yellow['130'],
  warning140: PRIMITIVE_COLORS.yellow['140'],

  danger10: PRIMITIVE_COLORS.red['10'],
  danger20: PRIMITIVE_COLORS.red['20'],
  danger30: PRIMITIVE_COLORS.red['30'],
  danger40: PRIMITIVE_COLORS.red['40'],
  danger50: PRIMITIVE_COLORS.red['50'],
  danger60: PRIMITIVE_COLORS.red['60'],
  danger70: PRIMITIVE_COLORS.red['70'],
  danger80: PRIMITIVE_COLORS.red['80'],
  danger90: PRIMITIVE_COLORS.red['90'],
  danger100: PRIMITIVE_COLORS.red['100'],
  danger110: PRIMITIVE_COLORS.red['110'],
  danger120: PRIMITIVE_COLORS.red['120'],
  danger130: PRIMITIVE_COLORS.red['130'],
  danger140: PRIMITIVE_COLORS.red['140'],

  assistance10: PRIMITIVE_COLORS.purple['10'],
  assistance20: PRIMITIVE_COLORS.purple['20'],
  assistance30: PRIMITIVE_COLORS.purple['30'],
  assistance40: PRIMITIVE_COLORS.purple['40'],
  assistance50: PRIMITIVE_COLORS.purple['50'],
  assistance60: PRIMITIVE_COLORS.purple['60'],
  assistance70: PRIMITIVE_COLORS.purple['70'],
  assistance80: PRIMITIVE_COLORS.purple['80'],
  assistance90: PRIMITIVE_COLORS.purple['90'],
  assistance100: PRIMITIVE_COLORS.purple['100'],
  assistance110: PRIMITIVE_COLORS.purple['110'],
  assistance120: PRIMITIVE_COLORS.purple['120'],
  assistance130: PRIMITIVE_COLORS.purple['130'],
  assistance140: PRIMITIVE_COLORS.purple['140'],

  shade10: PRIMITIVE_COLORS.mutedGrey['10'],
  shade15: PRIMITIVE_COLORS.mutedGrey['15'],
  shade20: PRIMITIVE_COLORS.mutedGrey['20'],
  shade25: PRIMITIVE_COLORS.mutedGrey['25'],
  shade30: PRIMITIVE_COLORS.mutedGrey['30'],
  shade35: PRIMITIVE_COLORS.mutedGrey['35'],
  shade40: PRIMITIVE_COLORS.mutedGrey['40'],
  shade45: PRIMITIVE_COLORS.mutedGrey['45'],
  shade50: PRIMITIVE_COLORS.mutedGrey['50'],
  shade55: PRIMITIVE_COLORS.mutedGrey['55'],
  shade60: PRIMITIVE_COLORS.mutedGrey['60'],
  shade65: PRIMITIVE_COLORS.mutedGrey['65'],
  shade70: PRIMITIVE_COLORS.mutedGrey['70'],
  shade75: PRIMITIVE_COLORS.mutedGrey['75'],
  shade80: PRIMITIVE_COLORS.mutedGrey['80'],
  shade85: PRIMITIVE_COLORS.mutedGrey['85'],
  shade90: PRIMITIVE_COLORS.mutedGrey['90'],
  shade95: PRIMITIVE_COLORS.mutedGrey['95'],
  shade100: PRIMITIVE_COLORS.mutedGrey['100'],
  shade105: PRIMITIVE_COLORS.mutedGrey['105'],
  shade110: PRIMITIVE_COLORS.mutedGrey['110'],
  shade115: PRIMITIVE_COLORS.mutedGrey['115'],
  shade120: PRIMITIVE_COLORS.mutedGrey['120'],
  shade125: PRIMITIVE_COLORS.mutedGrey['125'],
  shade130: PRIMITIVE_COLORS.mutedGrey['130'],
  shade135: PRIMITIVE_COLORS.mutedGrey['135'],
  shade140: PRIMITIVE_COLORS.mutedGrey['140'],
  shade145: PRIMITIVE_COLORS.mutedGrey['145'],
};
