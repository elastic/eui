/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { IframeHTMLAttributes, ImgHTMLAttributes, useMemo } from 'react';
import { useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export type FigmaAssetType = 'image' | 'embed';

type CommonProps = {
  /** Figma file/node URL (used for embed mode; kept as source reference for images). */
  url: string;
  /**
   * Image URL for `type="image"`. Prefer a colocated import, e.g.
   * `import asset from './assets/413-91091.webp'` then `src={asset}`.
   */
  src?: string;
  /** @default 'image' */
  type?: FigmaAssetType;
  /** iframe `title` / img `alt` */
  title?: string;
};

export type FigmaAssetProps = CommonProps &
  Omit<IframeHTMLAttributes<HTMLIFrameElement>, 'src' | 'title'> &
  Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'title' | 'alt'>;

const getFigmaAssetStyles = (euiTheme: UseEuiTheme) => ({
  wrapper: css`
    border: 1px solid ${euiTheme.euiTheme.colors.borderBasePlain};
    border-radius: ${euiTheme.euiTheme.size.s};
    margin: ${euiTheme.euiTheme.size.xl} 0;
    overflow: hidden;
    background-color:${euiTheme.euiTheme.colors.backgroundLightText};
  `,
  iframe: css`
    border-radius: ${euiTheme.euiTheme.size.s};
    display: block;
  `,
  image: css`
    display: block;
    width: 100%;
    height: auto;
  `,
});

export const FigmaAsset = ({
  url,
  src,
  type = 'image',
  title,
  ...rest
}: FigmaAssetProps) => {
  const baseUrl = useBaseUrl('/', { absolute: true });
  const baseImageSrc = useBaseUrl(src?.startsWith('/') ? src : '/');
  // Imported assets are already resolved URLs; only site-root paths need useBaseUrl.
  const imageSrc = src?.startsWith('/') ? baseImageSrc : (src ?? '');
  const styles = useEuiMemoizedStyles(getFigmaAssetStyles);

  const embedSrc = useMemo(() => {
    const params = new URLSearchParams({
      embed_host: 'eui.elastic.co',
      embed_origin: baseUrl,
      url,
    });

    return `https://www.figma.com/embed?${params.toString()}`;
  }, [url, baseUrl]);

  if (type === 'image') {
    if (!src) {
      throw new Error(
        'FigmaAsset: `src` is required when `type` is "image" (default). Import a colocated WebP, e.g. `import asset from \'./assets/table-selection_no-items-are-selected.webp\'` then `src={asset}`.'
      );
    }

    return (
      <div css={styles.wrapper}>
        <img
          {...(rest as ImgHTMLAttributes<HTMLImageElement>)}
          css={styles.image}
          src={imageSrc}
          alt={title ?? ''}
        />
      </div>
    );
  }

  return (
    <div css={styles.wrapper}>
      <iframe
        {...(rest as IframeHTMLAttributes<HTMLIFrameElement>)}
        css={styles.iframe}
        title={title}
        height="450"
        width="100%"
        src={embedSrc}
        allowFullScreen
      />
    </div>
  );
};
