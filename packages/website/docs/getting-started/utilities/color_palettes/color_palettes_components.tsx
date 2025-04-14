import React, { ComponentProps } from 'react';
import { css } from '@emotion/react';

import {
  EuiFlexItem,
  EuiCopy,
  EuiCode,
  EuiLink,
  useEuiTheme,
} from '@elastic/eui';

interface Props extends ComponentProps<typeof EuiFlexItem> {
  hexCode: string;
}

export const ColorPaletteFlexItem = ({ hexCode, ...rest }: Props) => {
  const { euiTheme } = useEuiTheme();

  return (
    <EuiFlexItem
      css={css`
        span {
          height: ${euiTheme.size.base};
          width: ${euiTheme.size.l};
        }

        &--small span {
          width: auto;
          height: ${euiTheme.size.s};
        }
      `}
      key={hexCode}
      grow={false}
      {...rest}
    >
      <span title={hexCode} style={{ backgroundColor: hexCode }} />
    </EuiFlexItem>
  );
};

export const ColorPaletteCopyCode = ({ textToCopy, code }) => {
  return (
    <span>
      <EuiCopy
        beforeMessage="Click to copy palette config"
        textToCopy={textToCopy || code}
      >
        {(copy) => (
          <EuiLink onClick={copy}>
            <EuiCode>{code}</EuiCode>
          </EuiLink>
        )}
      </EuiCopy>
    </span>
  );
};
