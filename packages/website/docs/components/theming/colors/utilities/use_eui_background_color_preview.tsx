import { useEuiBackgroundColor, useEuiPaddingCSS } from '@elastic/eui';
import { css } from '@emotion/react';

export const UseEuiBackgroundColorPreview = () => {
  return (
    <div
      css={[
        css`
          background: ${useEuiBackgroundColor('subdued')};
        `,
        useEuiPaddingCSS().s,
      ]}
    >
      {useEuiBackgroundColor('subdued')}
    </div>
  )
}
