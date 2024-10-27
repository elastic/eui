import { useEuiBackgroundColorCSS, useEuiPaddingCSS } from '@elastic/eui';
import { useEuiBackgroundColor } from '@elastic/eui/src/global_styling/mixins/_color';

export const UseEuiBackgroundColorCSSPreview = () => {
  const accentStyles = useEuiBackgroundColorCSS().accent;

  return (
    <div css={[accentStyles, useEuiPaddingCSS().s]}>
      background-color: {useEuiBackgroundColor('accent')}
    </div>
  )
}
