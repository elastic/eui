/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { IframeHTMLAttributes, useMemo } from 'react';
import { useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export interface FigmaEmbedProps
  extends IframeHTMLAttributes<HTMLIFrameElement> {
  url: string;
}

const getFigmaEmbedStyles = (euiTheme: UseEuiTheme) => ({
  wrapper: css`
    border: 1px solid ${euiTheme.euiTheme.colors.lightShade};
    border-radius: ${euiTheme.euiTheme.size.s};
    margin: ${euiTheme.euiTheme.size.xl} 0;
  `,
  iframe: css`
    border-radius: ${euiTheme.euiTheme.size.s};
    display: block;
  `,
});

export const FigmaEmbed = ({ url, ...rest }: FigmaEmbedProps) => {
  const baseUrl = useBaseUrl('/', { absolute: true });
  const styles = useEuiMemoizedStyles(getFigmaEmbedStyles);

  const src = useMemo(() => {
    const params = new URLSearchParams({
      embed_host: 'eui.elastic.co',
      embed_origin: baseUrl,
      url,
    });

    return `https://www.figma.com/embed?${params.toString()}`;
  }, [url, baseUrl]);

  return (
    <div css={styles.wrapper}>
      <iframe
        {...rest}
        css={styles.iframe}
        height="450"
        width="100%"
        src={src}
        allowFullScreen
      />
    </div>
  );
};
