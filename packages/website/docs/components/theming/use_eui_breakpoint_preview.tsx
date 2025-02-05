import { css } from '@emotion/react';
import { useEuiTheme, useEuiBreakpoint } from '@elastic/eui';

export const UseEuiBreakpointPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <p
      css={css`
        ${useEuiBreakpoint(['s', 'l'])} {
          font-weight: ${euiTheme.font.weight.bold};
        }
        ${useEuiBreakpoint(['xs', 's'])} {
          color: ${euiTheme.colors.textDanger};
        }
        ${useEuiBreakpoint(['m'])} {
          color: ${euiTheme.colors.textWarning};
        }
        ${useEuiBreakpoint(['l', 'xl'])} {
          color: ${euiTheme.colors.textSuccess};
        }
      `}
    >
      This text is bold on small to large screens, red on small and below
      screens, yellow on medium screens, and green on large and above screens.
    </p>
  );
};
