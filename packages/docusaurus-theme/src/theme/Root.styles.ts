import { UseEuiTheme } from '@elastic/eui';

// override docusaurus variables as needed
export const getGlobalStyles = ({ euiTheme }: UseEuiTheme) => {
  const { colors } = euiTheme;

  // overriding Docusaurus variables:
  // since EUI handles the token value updates, we can override both
  // color modes at the same time (Docusaurus separates based on `data-theme`)
  return `
      :root,
      [data-theme='dark']:root {  
        // base
        --ifm-background-color: ${colors.body};
        --ifm-font-color-base: ${colors.text};
      }
  `;
};
