import { css } from '@emotion/react';
import { LivePreview } from 'react-live';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { ErrorBoundaryErrorMessageFallback } from '@docusaurus/theme-common';
import { UseEuiTheme, EuiFlexGroup, useEuiTheme } from '@elastic/eui';

const getPreviewStyles = (euiTheme: UseEuiTheme) => ({
  previewWrapper: css`
    padding: ${euiTheme.euiTheme.size.l};
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

export const DemoPreview = () => {
  const euiTheme = useEuiTheme();
  const styles = getPreviewStyles(euiTheme);

  return (
    <BrowserOnly fallback={<PreviewLoader />}>
      {() => (
        <>
          <ErrorBoundary fallback={(params: any) => <ErrorBoundaryErrorMessageFallback {...params} />}>
            <div css={styles.previewWrapper}>
              <LivePreview />
            </div>
          </ErrorBoundary>
        </>
      )}
    </BrowserOnly>
  );
};
