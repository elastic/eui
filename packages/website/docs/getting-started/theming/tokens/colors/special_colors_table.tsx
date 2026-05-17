import React from 'react';
import { useEuiTheme } from '@elastic/eui';
import { ColorsTable } from './colors_table';

export const SpecialColorsTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ColorsTable
      colors={[
        {
          value: euiTheme.colors.body,
          token: 'colors.body',
          description: (
            <>
              @deprecated — Use <code>backgroundBasePlain</code> for content
              backgrounds or <code>backgroundBaseSubdued</code> for the page
              background.
            </>
          ),
        },
        {
          value: euiTheme.colors.highlight,
          token: 'colors.highlight',
          description: (
            <>
              Used to <strong>highlight text</strong> when matching against
              search strings.
            </>
          ),
        },
        {
          value: euiTheme.colors.disabled,
          token: 'colors.disabled',
          description: (
            <>
              @deprecated — Use <code>backgroundBaseDisabled</code> for disabled
              backgrounds or <code>borderBaseDisabled</code> for disabled
              borders.
            </>
          ),
        },
        {
          value: euiTheme.colors.disabledText,
          token: 'colors.disabledText',
          description: (
            <>
              @deprecated — Use <code>textDisabled</code> instead.
            </>
          ),
        },
        {
          value: euiTheme.colors.shadow,
          token: 'colors.shadow',
          description: (
            <>
              Base color for box shadows. Automatically adjusted for{' '}
              <code>colorMode</code>.
            </>
          ),
        },
      ]}
    />
  );
};
