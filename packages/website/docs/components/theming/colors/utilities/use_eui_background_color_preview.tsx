import { useEuiBackgroundColor } from '@elastic/eui/src/global_styling/mixins/_color';
import { css } from '@emotion/react';
import { useEuiPaddingCSS } from '@elastic/eui/src/global_styling/mixins/_padding';

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
