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

import chroma from 'chroma-js';
import { Theme, StyleConfig } from '../../services/propagate/create_style';

const $euiCallOutTypes = {
  primary: 'euiColorPrimary',
  success: 'euiColorSuccess',
  warning: 'euiColorWarning',
  danger: 'euiColorDanger',
};

function euiCallOutColor(
  colors: any,
  type: keyof typeof $euiCallOutTypes = 'primary',
  returnBackgroundOrForeground: string = 'background'
) {
  const $color = colors[$euiCallOutTypes[type]];
  // const $backgroundColor = tintOrShade($color, 90%, 70%);
  const $backgroundColor = chroma($color)
    .luminance(0.9)
    .hex();
  // const $foregroundColor = shadeOrTint(makeHighContrastColor($color, $backgroundColor), 0, 20%);
  const $foregroundColor = $color;

  if (returnBackgroundOrForeground === 'background') {
    return $backgroundColor;
  } else if (returnBackgroundOrForeground === 'foreground') {
    return $foregroundColor;
  }
}

export const EuiCallOutStyle = ({
  colors,
  sizes,
  borders,
}: Theme): StyleConfig => {
  return {
    base: {
      borderLeft: `${borders.euiBorderWidthThick} solid transparent`,
    },
    size: {
      s: {
        padding: sizes.euiSizeS,
      },
      m: {
        padding: sizes.euiSize,
      },
    },
    color: Object.keys($euiCallOutTypes).reduce((styles, color) => {
      return {
        ...styles,
        [color]: {
          borderColor: colors[$euiCallOutTypes[color]],
          backgroundColor: euiCallOutColor(colors, color, 'background'),
        },
      };
    }, {}),
  };
};

export const EuiCallOutAmsterdamStyle = ({
  theme,
  borders,
}: Theme): StyleConfig | undefined => {
  if (!theme.includes('amsterdam')) return;
  return {
    base: {
      borderRadius: borders.euiBorderRadius,
      borderLeftWidth: 0,
    },
  };
};

/**
 * 1. Align icon with first line of title text if it wraps.
 * 2. If content exists under the header, space it appropriately.
 * 3. Apply margin to all but last item in the flex.
 */
export const EuiCallOutHeader = ({ sizes }: Theme): StyleConfig => {
  return {
    base: {
      display: 'flex',
      alignItems: 'baseline' /* 1 */,

      '+ *': {
        marginTop: sizes.euiSize /* 2 */,
      },

      '> * + *': {
        marginLeft: sizes.euiSize /* 3 */,
      },
    },
  };
};

export const EuiCallOutHeaderIcon = ({ colors }): StyleConfig => {
  return {
    base: {
      flex: '0 0 auto',
      /* Vertically center icon with first line of title */
      transform: 'translateY(2px)',
    },
    color: Object.keys($euiCallOutTypes).reduce((styles, color) => {
      return {
        ...styles,
        [color]: {
          fill: euiCallOutColor(colors, color, 'foreground'),
        },
      };
    }, {}),
  };
};

export const euiCallOutTitleStyles = ({
  theme,
  colors,
  typography,
}: Theme): StyleConfig => {
  return {
    base: {
      fontWeight: theme.includes('amsterdam')
        ? typography.euiFontWeightMedium
        : typography.euiFontWeightRegular,
      marginBottom: 0,
    },
    size: {
      // The following won't work because it returns a string
      s: typography.euiTitleXXS,
      m: typography.euiTitleXS,
    },
    color: Object.keys($euiCallOutTypes).reduce((styles, color) => {
      return {
        ...styles,
        [color]: {
          color: euiCallOutColor(colors, color, 'foreground'),
        },
      };
    }, {}),
  };
};
