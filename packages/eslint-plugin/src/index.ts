/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */


import { AccessibleInteractiveElements } from './rules/a11y/accessible_interactive_element';
import { CallOutAnnounceOnMount } from './rules/a11y/callout_announce_on_mount';
import { ConsistentIsInvalidProps } from './rules/a11y/consistent_is_invalid_props';
import { HrefOnClick } from './rules/href_or_on_click';
import { NoCssColor } from './rules/no_css_color';
import { NoRestrictedEuiImports } from './rules/no_restricted_eui_imports';
import { NoStaticZIndex } from './rules/no_static_z_index';
import { NoUnnamedInteractiveElement } from './rules/a11y/no_unnamed_interactive_element';
import { NoUnnamedRadioGroup } from './rules/a11y/no_unnamed_radio_group';
import { PreferEuiIconTip } from './rules/a11y/prefer_eui_icon_tip';
import { RequireAriaLabelForModals } from './rules/a11y/require_aria_label_for_modals';
import { RequireTableCaption } from './rules/a11y/require_table_caption';
import { ScreenReaderOutputDisabledTooltip } from './rules/a11y/sr_output_disabled_tooltip';
import { TooltipFocusableAnchor } from './rules/a11y/tooltip_focusable_anchor';

const config = {
  rules: {
    'accessible-interactive-element': AccessibleInteractiveElements,
    'callout-announce-on-mount': CallOutAnnounceOnMount,
    'consistent-is-invalid-props': ConsistentIsInvalidProps,
    'href-or-on-click': HrefOnClick,
    'no-css-color': NoCssColor,
    'no-restricted-eui-imports': NoRestrictedEuiImports,
    'no-static-z-index': NoStaticZIndex,
    'no-unnamed-interactive-element': NoUnnamedInteractiveElement,
    'no-unnamed-radio-group' : NoUnnamedRadioGroup,
    'prefer-eui-icon-tip': PreferEuiIconTip,
    'require-aria-label-for-modals': RequireAriaLabelForModals,
    'require-table-caption': RequireTableCaption,
    'sr-output-disabled-tooltip': ScreenReaderOutputDisabledTooltip,
    'tooltip-focusable-anchor': TooltipFocusableAnchor,
  },
  configs: {
    recommended: {
      plugins: ['@elastic/eslint-plugin-eui'],
      rules: {
        '@elastic/eui/accessible-interactive-element': 'warn',
        '@elastic/eui/callout-announce-on-mount': 'warn',
        '@elastic/eui/consistent-is-invalid-props': 'warn',
        '@elastic/eui/href-or-on-click': 'warn',
        '@elastic/eui/no-css-color': 'warn',
        '@elastic/eui/no-restricted-eui-imports': 'warn',
        '@elastic/eui/no-static-z-index': 'warn',
        '@elastic/eui/no-unnamed-interactive-element': 'warn',
        '@elastic/eui/no-unnamed-radio-group': 'warn',
        '@elastic/eui/prefer-eui-icon-tip': 'warn',
        '@elastic/eui/require-aria-label-for-modals': 'warn',
        '@elastic/eui/require-table-caption': 'warn',
        '@elastic/eui/sr-output-disabled-tooltip': 'warn',
        '@elastic/eui/tooltip-focusable-anchor': 'warn',
      },
    },
  },
};

module.exports = config;
