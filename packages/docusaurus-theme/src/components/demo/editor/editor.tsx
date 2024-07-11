import { LiveEditor, LiveError } from 'react-live';
import { css } from '@emotion/react';
import { useEuiTheme, euiFontSize, euiBackgroundColor, UseEuiTheme } from '@elastic/eui';

const getEditorStyles = (euiTheme: UseEuiTheme) => ({
  editor: css`
    font-family: var(--ifm-font-family-monospace);
    border-radius: 0 0 var(--docs-demo-border-radius) var(--docs-demo-border-radius);

    & .prism-code {
      border-radius: 0 0 calc(var(--docs-demo-border-radius) - 1px) calc(var(--docs-demo-border-radius) - 1px);
    }
  `,
  error: css`
    // docusaurus overrides the default pre styles
    // forcing us to use higher specificity here
    && > pre {
      font-size: ${euiFontSize(euiTheme, 's')};
      background: ${euiBackgroundColor(euiTheme, 'danger')};
      color: ${euiTheme.euiTheme.colors.dangerText};
      padding: ${euiTheme.euiTheme.size.xs} ${euiTheme.euiTheme.size.s};
      margin: 0;
      border-radius: 0;
    }
  `,
});

export const DemoEditor = () => {
  const euiTheme = useEuiTheme();
  const styles = getEditorStyles(euiTheme);

  return (
    <div css={styles.editor}>
      <div css={styles.error}>
        <LiveError />
      </div>
      <div>
        <LiveEditor tabMode="focus" />
      </div>
    </div>
  );
}
