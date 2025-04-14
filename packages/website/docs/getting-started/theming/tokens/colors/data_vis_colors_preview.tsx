import { useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';

export const DataVisColorsPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        padding: ${euiTheme.size.s};
        color: ${euiTheme.colors.plainDark};
        background-color: ${euiTheme.colors.vis.euiColorVis0};
      `}
    >
      <strong>background: {euiTheme.colors.vis.euiColorVis0}</strong>
    </div>
  );
};
