import { useEuiBackgroundColorCSS, useEuiPaddingCSS, useEuiBackgroundColor } from '@elastic/eui';

export const UseEuiBackgroundColorCSSPreview = () => {
  const accentStyles = useEuiBackgroundColorCSS().accent;

  return (
    <div css={[accentStyles, useEuiPaddingCSS().s]}>
      background-color: {useEuiBackgroundColor('accent')}
    </div>
  )
}
