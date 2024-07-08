import {
  euiLineHeightFromBaseline,
  useEuiBackgroundColor,
  UseEuiTheme,
} from '@elastic/eui';

// override docusaurus variables as needed
export const getGlobalStyles = ({ euiTheme }: UseEuiTheme) => {
  const { font, base, colors, size } = euiTheme;
  const fontBodyScale = font.scale[font.body.scale];
  const fontBase = {
    fontFamily: font.family,
    fontSize: `${
      font.defaultUnits === 'px' ? fontBodyScale * base : fontBodyScale
    }${font.defaultUnits}`,
    fontWeight: font.weight[font.body.weight],
  };

  const lineHeightL = '1.75rem';
  const lineHeightM = euiLineHeightFromBaseline('s', euiTheme);
  const lineHeightS = euiLineHeightFromBaseline('xs', euiTheme);
  const lineHeightXS = '1.33rem';

  return `
      // color theme related variables
      :root,
      [data-theme='dark']:root {
        /* EUI theme variables */
        --eui-background-color-primary: ${useEuiBackgroundColor('primary')};
        --eui-background-color-success: ${useEuiBackgroundColor('success')};
        --eui-background-color-danger: ${useEuiBackgroundColor('danger')};
        --eui-background-color-warning: ${useEuiBackgroundColor('warning')};
  
        /* Docusaurus theme variables */
        --ifm-background-color: ${colors.body};
        --ifm-font-color-base: ${colors.text};
      }

      :root {
        /* EUI theme variables */
        --eui-line-height-base: ${lineHeightL};
        --eui-line-height-m: ${lineHeightM};
        --eui-line-height-s: ${lineHeightS};
        --eui-line-height-xs: ${lineHeightXS};

        /* Docusaurus theme variables */
        --ifm-font-family-base: ${fontBase.fontFamily};
        --ifm-font-size-base: ${fontBase.fontSize};
        --ifm-font-weight-base: ${fontBase.fontWeight};
        --ifm-line-height-base: var(--eui-line-height-base);

      }

      /* base styles & resets */
      h1, h2, h3, h4, h5, h6 {
        margin-block-start: ${size.l};
        margin-block-end: ${size.m};
        
        font-weight: ${font.weight.bold};
      }

      button {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        color: inherit;
        border-radius: 0;
        font-size: inherit;
      }
  `;
};
