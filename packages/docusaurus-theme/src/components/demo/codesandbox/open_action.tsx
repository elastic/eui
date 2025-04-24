/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useMemo } from 'react';
import { getParameters } from 'codesandbox/lib/api/define';
import dedent from 'dedent';
import { EuiButtonIcon, EuiToolTip } from '@elastic/eui';
import type { ActionComponent } from '../../../theme/Demo/actions';
import { CodeSandboxIcon } from '../../codesandbox_icon';
import { findExternalDependencies } from './find_external_dependencies';

const indexTsxSource = dedent`
  import React from 'react';
  import { createRoot } from 'react-dom/client';
  import createCache from '@emotion/cache';
  import { EuiProvider, euiStylisPrefixer } from '@elastic/eui';

  import Demo from './demo';

  const cache = createCache({
    key: 'codesandbox',
    stylisPlugins: [euiStylisPrefixer],
    container: document.querySelector('meta[name="emotion-styles"]')!,
  });
  cache.compat = true;

  const root = createRoot(document.getElementById('root')!);
  root.render(
    <EuiProvider cache={cache}>
      <Demo />
    </EuiProvider>
  );`;

const publicIndexHtmlSource = dedent`
  <head>
    <title>@elastic/eui component demo</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Roboto+Mono:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
    <meta name="emotion-styles">
  </head>
  <body>
    <div id="root" />
  </body>
`;

export const defaultCodeSandboxParameters = {
  files: {
    'index.tsx': {
      content: indexTsxSource,
    },
    'public/index.html': {
      content: publicIndexHtmlSource,
    },
  },
};

export type Options = {
  files?: Record<string, string>;
  dependencies: Record<string, string>;
};

const processTsxSource = (source: string) => {
  // jsxImportSource pragma is needed in CodeSandbox as it doesn't seem
  // to support that setting via tsconfig.json
  return `/** @jsxImportSource @emotion/react */\n${source}`;
};

export const createOpenInCodeSandboxAction =
  ({ files = {}, dependencies }: Options): ActionComponent =>
  ({ activeSource }) => {
    const parameters: string = useMemo(() => {
      const source = activeSource?.code || '';

      // Compute list of extra files that may be passed
      const extraFiles = Object.entries(files).reduce(
        (acc, [file, content]) => {
          acc[file] = { content };
          return acc;
        },
        {} as Record<string, { content: string }>
      );

      return getParameters({
        files: {
          ...defaultCodeSandboxParameters.files,
          'demo.tsx': {
            content: processTsxSource(source),
          },
          'package.json': {
            content: {
              dependencies: {
                ...findExternalDependencies(source),
                ...dependencies,
              },
            },
          },
          ...extraFiles,
        },
      } as any);
    }, [activeSource]);

    return (
      <form
        action="https://codesandbox.io/api/v1/sandboxes/define"
        method="POST"
        target="_blank"
      >
        <input type="hidden" name="parameters" value={parameters} />
        <input
          type="hidden"
          name="query"
          value={`module=/demo.tsx&view=split`}
        />
        <EuiToolTip content="Open in CodeSandbox">
          <EuiButtonIcon
            type="submit"
            size="s"
            iconType={CodeSandboxIcon}
            color="text"
            aria-label="Open in CodeSandbox"
          />
        </EuiToolTip>
      </form>
    );
  };
