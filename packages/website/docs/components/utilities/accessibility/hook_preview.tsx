import React from 'react';
import { css } from '@emotion/react';

import { EuiText, EuiCode, useEuiFocusRing, useEuiTheme } from '@elastic/eui';

export const HookPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <EuiText size="s">
      <p>
        <button>
          I am an unstyled <EuiCode>button</EuiCode> with inherited outline
        </button>
      </p>
      <p>
        <button
          css={css`
            &:focus {
              ${useEuiFocusRing('outset', euiTheme.colors.accent)}
            }
          `}
        >
          I am an unstyled <EuiCode>button</EuiCode> with an{' '}
          <EuiCode>outset, accent</EuiCode> outline
        </button>
      </p>
    </EuiText>
  );
};
