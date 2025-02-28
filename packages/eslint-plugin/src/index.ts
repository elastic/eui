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
import { PreferCSSAttributeForEuiComponents } from './rules/prefer_css_attribute_for_eui_components';

const config = {
  rules: {
    'href-or-on-click': HrefOnClick,
    'no-restricted-eui-imports': NoRestrictedEuiImports,
    'no-css-color': NoCssColor,
    'prefer-css-attributes-for-eui-components':
      PreferCSSAttributeForEuiComponents,
  },
  configs: {
    recommended: {
      plugins: ['@elastic/eslint-plugin-eui'],
      rules: {
        '@elastic/eui/href-or-on-click': 'warn',
        '@elastic/eui/no-restricted-eui-imports': 'warn',
        '@elastic/eui/no-css-color': 'warn',
        '@elastic/eui/prefer-css-attributes-for-eui-components': 'warn',
      },
    },
  },
};

module.exports = config;
