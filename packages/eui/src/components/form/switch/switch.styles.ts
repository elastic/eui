/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme } from '../../../services';
import { mathWithUnits } from '../../../global_styling';
import { euiFormCustomControlVariables } from '../form.styles';

const euiSwitchVars = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const formVars = euiFormCustomControlVariables(euiThemeContext);

  const colors = {
    on: formVars.colors.selected,
    off: formVars.colors.unselectedBorder,
    disabled: formVars.colors.disabled,
    thumb: formVars.colors.selectedIcon,
    thumbBorder: formVars.colors.unselectedBorder,
    thumbBorderDisabled: formVars.colors.unselectedBorder,
  };

  const sizes = {
    uncompressed: {
      height: mathWithUnits(euiTheme.size.base, (x) => x * 1.25),
      width: mathWithUnits(
        [euiTheme.size.xxl, euiTheme.size.xs],
        (x, y) => x + y
      ),
    },
    compressed: {
      height: euiTheme.size.base,
      width: mathWithUnits(euiTheme.size.base, (x) => x * 1.75),
    },
    get mini() {
      return {
        height: mathWithUnits(this.uncompressed.height, (x) => x / 2),
        width: mathWithUnits(this.uncompressed.width, (x) => x / 2),
      };
    },
  };

  const animation = {
    speed: euiTheme.animation.normal,
    easing: euiTheme.animation.bounce,
  };

  const label = {
    disabled: formVars.colors.disabledLabel,
    gap: formVars.sizes.labelGap,
  };

  return { sizes, colors, animation, label };
};
type EuiSwitchVars = ReturnType<typeof euiSwitchVars>;
