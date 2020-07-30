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

import { euiSize } from '../../global_styling/variables/sizes';
import { isColorDark, hexToRgb } from '../../services';

export interface StyleConfig {
  base: any;
  [key: string]: { [key: string]: any }; // Anything props
}

export const EuiMarkStyle = ({ colors, sizes }: any): StyleConfig => {
  return {
    base: {
      margin: euiSize(0.25),
      padding: sizes.euiSizeXS,
      backgroundColor: colors.euiColorHighlight,
      color: isColorDark(...hexToRgb(colors.euiColorHighlight))
        ? colors.euiColorGhost
        : colors.euiTextColor,

      // Test for handling nesting/pseudo-selectors
      ':hover': {
        textDecoration: 'underline',
      },
    },
    // Test for handling props
    size: {
      s: {
        padding: sizes.euiSizeXS,
      },
      m: {
        padding: sizes.euiSizeXL,
      },
    },
  };
};

export const EuiMarkAmsterdamStyle = ({
  theme,
  borders,
}: any): StyleConfig | undefined => {
  if (!theme.includes('amsterdam')) return;
  return {
    base: {
      borderRadius: borders.euiBorderRadius,
    },
  };
};
