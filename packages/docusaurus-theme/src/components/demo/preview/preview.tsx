/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { LivePreview } from 'react-live';
import {
  ComponentType,
  CSSProperties,
  Fragment,
  PropsWithChildren,
} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { ErrorBoundaryErrorMessageFallback } from '@docusaurus/theme-common';
import {
  UseEuiTheme,
  useEuiTheme,
  EuiPaddingSize,
  euiPaddingSize,
} from '@elastic/eui';

export interface DemoPreviewProps {
  padding?: EuiPaddingSize;
  wrapperComponent?: ComponentType<PropsWithChildren>;
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
const PreviewLoader = () => <div>Loading...</div>;

export const DemoPreview = ({
  padding = 'l',
  wrapperComponent: WrapperComponent = Fragment,
}: DemoPreviewProps) => {
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
          <ErrorBoundary
            fallback={(params: any) => (
              <ErrorBoundaryErrorMessageFallback {...params} />
            )}
          >
            <div css={styles.previewWrapper} style={style}>
              <WrapperComponent>
                <LivePreview />
              </WrapperComponent>
            </div>
          </ErrorBoundary>
        </>
      )}
    </BrowserOnly>
  );
};
