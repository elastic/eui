import { css } from '@emotion/react';
import { useEuiTheme, isColorDark } from '@elastic/eui';

export const IsColorDarkPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
            padding: ${euiTheme.size.base};
            color: ${isColorDark(0, 179, 164)
        ? euiTheme.colors.ghost
        : euiTheme.colors.ink};
            background: rgb(0, 179, 164);
          `}
    >
      {isColorDark(0, 179, 164) ? 'Dark' : 'Light'}
    </div>
  );
}
