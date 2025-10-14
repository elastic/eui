/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CallOutAnnounceOnMount } from './rules/a11y/callout_announce_on_mount';
import { HrefOnClick } from './rules/href_or_on_click';
import { NoRestrictedEuiImports } from './rules/no_restricted_eui_imports';
import { NoCssColor } from './rules/no_css_color';

import { RequireAriaLabelForModals } from './rules/a11y/require_aria_label_for_modals';
import { ConsistentIsInvalidProps } from './rules/a11y/consistent_is_invalid_props';
import { ScreenReaderOutputDisabledTooltip } from './rules/a11y/sr_output_disabled_tooltip';
import { PreferEuiIconTip } from './rules/a11y/prefer_eui_icon_tip';
import { NoUnnamedRadioGroup } from './rules/a11y/no_unnamed_radio_group';
import { NoUnnamedInteractiveElement } from './rules/a11y/no_unnamed_interactive_element';
import { TooltipFocusableAnchor } from './rules/a11y/tooltip_focusable_anchor';

const config = {
  rules: {
    'href-or-on-click': HrefOnClick,
    'no-restricted-eui-imports': NoRestrictedEuiImports,
    'no-css-color': NoCssColor,
    'require-aria-label-for-modals': RequireAriaLabelForModals,
    'consistent-is-invalid-props': ConsistentIsInvalidProps,
    'sr-output-disabled-tooltip': ScreenReaderOutputDisabledTooltip,
    'prefer-eui-icon-tip': PreferEuiIconTip,
    'no-unnamed-radio-group' : NoUnnamedRadioGroup,
    'callout-announce-on-mount': CallOutAnnounceOnMount,
    'no-unnamed-interactive-element': NoUnnamedInteractiveElement,
    'tooltip-focusable-anchor': TooltipFocusableAnchor,
  },
  configs: {
    recommended: {
      plugins: ['@elastic/eslint-plugin-eui'],
      rules: {
        '@elastic/eui/href-or-on-click': 'warn',
        '@elastic/eui/no-restricted-eui-imports': 'warn',
        '@elastic/eui/no-css-color': 'warn',
        '@elastic/eui/require-aria-label-for-modals': 'warn',
        '@elastic/eui/consistent-is-invalid-props': 'warn',
        '@elastic/eui/sr-output-disabled-tooltip': 'warn',
        '@elastic/eui/prefer-eui-icon-tip': 'warn',
        '@elastic/eui/no-unnamed-radio-group': 'warn',
        '@elastic/eui/callout-announce-on-mount': 'warn',
        '@elastic/eui/no-unnamed-interactive-element': 'warn',
        '@elastic/eui/tooltip-focusable-anchor': 'warn',
      },
    },
  },
};

module.exports = config;
