/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { HrefOnClick } from './rules/href_or_on_click';
import { NoRestrictedEuiImports } from './rules/no_restricted_eui_imports';
import { NoCssColor } from './rules/no_css_color';

import { RequireAriaLabelForModals } from './rules/a11y/require_aria_label_for_modals';
import { ConsistentIsInvalidProps } from './rules/a11y/consistent_is_invalid_props';
import { ScreenReaderOutputDisabledTooltip } from './rules/a11y/sr_output_disabled_tooltip';

const config = {
  rules: {
    'href-or-on-click': HrefOnClick,
    'no-restricted-eui-imports': NoRestrictedEuiImports,
    'no-css-color': NoCssColor,
    'require-aria-label-for-modals': RequireAriaLabelForModals,
    'consistent-is-invalid-props': ConsistentIsInvalidProps,
    'sr_output_disabled_tooltip': ScreenReaderOutputDisabledTooltip,
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
        '@elastic/eui/sr_output_disabled_tooltip': 'warn',
      },
    },
  },
};

module.exports = config;
