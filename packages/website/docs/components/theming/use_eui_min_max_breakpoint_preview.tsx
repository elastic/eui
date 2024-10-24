import { css } from '@emotion/react';
import { useEuiTheme, useEuiMinBreakpoint, useEuiMaxBreakpoint } from '@elastic/eui';

export const UseEuiMinMaxMaxBreakpointPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <p
      css={css`
        ${useEuiMaxBreakpoint('m')} {
          color: ${euiTheme.colors.dangerText};
        }
        ${useEuiMinBreakpoint('m')} {
          color: ${euiTheme.colors.successText};
        }
      `}
    >
      This text is red on screens below the medium breakpoint, and green
      on screens above.
    </p>
  );
};
