/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ColorModeSwitch } from '../../services/theme/types';

export type _EuiThemeForm = {
  maxWidth: string;
};

export type _EuiThemeFormColors = {
  background: ColorModeSwitch;
  backgroundDisabled: ColorModeSwitch;
  backgroundReadOnly: ColorModeSwitch;
  backgroundFocused: ColorModeSwitch;
  backgroundAutofilled: ColorModeSwitch;
  prependBackground: ColorModeSwitch;
  border: ColorModeSwitch;
  borderAutofilled: ColorModeSwitch;
  controlBorder: ColorModeSwitch;
  controlBorderSelected: ColorModeSwitch;
  controlBorderDisabled: ColorModeSwitch;
  controlBackgroundUnselected: ColorModeSwitch;
  controlBackgroundDisabled: ColorModeSwitch;
  colorHasPlaceholder: ColorModeSwitch;
  colorDisabled: ColorModeSwitch;
  iconDisabled: ColorModeSwitch;
};
