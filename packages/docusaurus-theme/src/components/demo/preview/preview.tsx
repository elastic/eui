import { css } from '@emotion/react';
import { LivePreview } from 'react-live';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { ErrorBoundaryErrorMessageFallback } from '@docusaurus/theme-common';
import { UseEuiTheme, useEuiTheme, EuiPaddingSize, euiPaddingSize } from '@elastic/eui';
import { CSSProperties } from 'react';

export interface DemoPreviewProps {
  padding?: EuiPaddingSize;
}

const getPreviewStyles = (euiTheme: UseEuiTheme) => ({
  previewWrapper: css`
    padding: var(--docs-demo-preview-padding);
    border-radius: var(--docs-demo-border-radius);
  `,
});

/**
 * PreviewLoader provides a fallback content for the server-side render
 * of the live component preview component.
 * Due to the limitations of react-live the demo is only rendered client-side.
 */
const PreviewLoader = () => (
  <div>Loading...</div>
);

export const DemoPreview = ({ padding = 'l' }: DemoPreviewProps) => {
  const euiTheme = useEuiTheme();
  const styles = getPreviewStyles(euiTheme);
  const paddingSize = euiPaddingSize(euiTheme, padding);

  const style = {
    '--docs-demo-preview-padding': paddingSize,
  } as CSSProperties;

  return (
    <BrowserOnly fallback={<PreviewLoader />}>
      {() => (
        <>
          <ErrorBoundary fallback={(params: any) => <ErrorBoundaryErrorMessageFallback {...params} />}>
            <div css={styles.previewWrapper} style={style}>
              <LivePreview />
            </div>
          </ErrorBoundary>
        </>
      )}
    </BrowserOnly>
  );
};
