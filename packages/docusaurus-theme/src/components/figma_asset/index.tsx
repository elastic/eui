/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  IframeHTMLAttributes,
  ImgHTMLAttributes,
  useMemo,
} from 'react';
import { useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type FigmaAssetBase = {
  /** Figma file/node URL (used for embed mode; kept as source reference for images). */
  url: string;
  /** Required accessible text: iframe `title` / image `alt`. */
  title: string;
};

export type FigmaAssetImageProps = FigmaAssetBase &
  Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'title' | 'alt'> & {
    /**
     * Renders a static image (default). Pass any image URL string (SVG preferred;
     * WebP/PNG also work). Prefer a colocated URL import, e.g.
     * `import asset from '!url-loader!./assets/….svg'` then `src={asset}`.
     * (Plain `.svg` imports become React components via SVGR and are not valid `img` URLs.)
     */
    type?: 'image';
    src: string;
  };

export type FigmaAssetEmbedProps = FigmaAssetBase &
  Omit<IframeHTMLAttributes<HTMLIFrameElement>, 'src' | 'title'> & {
    /** Renders an interactive Figma iframe from `url`. */
    type: 'embed';
    src?: never;
  };

export type FigmaAssetProps = FigmaAssetImageProps | FigmaAssetEmbedProps;

const getFigmaAssetStyles = (euiTheme: UseEuiTheme) => ({
  wrapper: css`
    border: 1px solid ${euiTheme.euiTheme.colors.borderBasePlain};
    border-radius: ${euiTheme.euiTheme.size.s};
    margin: ${euiTheme.euiTheme.size.xl} 0;
    overflow: hidden;
    background-color: ${euiTheme.euiTheme.colors.backgroundLightText};
  `,
  iframe: css`
    border-radius: ${euiTheme.euiTheme.size.s};
    display: block;
  `,
  image: css`
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
  `,
});

export const FigmaAsset = (props: FigmaAssetProps) => {
  const { url, title } = props;
  const baseUrl = useBaseUrl('/', { absolute: true });
  const imageSrcProp = props.type === 'embed' ? undefined : props.src;
  const imageSrcString =
    typeof imageSrcProp === 'string' ? imageSrcProp : undefined;
  const baseImageSrc = useBaseUrl(
    imageSrcString?.startsWith('/') ? imageSrcString : '/'
  );
  // Imported assets are already resolved URLs; only site-root paths need useBaseUrl.
  const imageSrc = imageSrcString?.startsWith('/')
    ? baseImageSrc
    : (imageSrcString ?? '');
  const styles = useEuiMemoizedStyles(getFigmaAssetStyles);

  const embedSrc = useMemo(() => {
    const params = new URLSearchParams({
      embed_host: 'eui.elastic.co',
      embed_origin: baseUrl,
      url,
    });

    return `https://www.figma.com/embed?${params.toString()}`;
  }, [url, baseUrl]);

  if (props.type === 'embed') {
    const { url: _url, title: _title, type: _type, ...iframeRest } = props;

    return (
      <div css={styles.wrapper}>
        <iframe
          {...iframeRest}
          css={styles.iframe}
          title={title}
          height="450"
          width="100%"
          src={embedSrc}
          allowFullScreen
        />
      </div>
    );
  }

  const { url: _url, title: _title, type: _type, src: _src, ...imgRest } =
    props;

  if (typeof props.src !== 'string') {
    throw new Error(
      'FigmaAsset: `src` must be a URL string. Import SVGs with `!url-loader!` (e.g. `import asset from \'!url-loader!./assets/foo.svg\'`), not as a bare `.svg` module (SVGR returns a React component).'
    );
  }

  return (
    <div css={styles.wrapper}>
      <img {...imgRest} css={styles.image} src={imageSrc} alt={title} />
    </div>
  );
};
