/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import breaks from 'remark-breaks';

import * as MarkdownTooltip from '../markdown_tooltip';
import { getDefaultEuiMarkdownPlugins } from './plugins';

import type { Pluggable, PluginTuple, Settings } from 'unified';
import type { EuiMarkdownEditorUiPlugin } from '../../markdown_types';

const excludableDefaultPlugins: Array<
  [
    'tooltip' | 'line-breaks',
    Pluggable<any[], Settings> | null,
    React.ComponentType<any> | null,
    EuiMarkdownEditorUiPlugin | null
  ]
> = [
  [
    'tooltip',
    MarkdownTooltip.parser,
    MarkdownTooltip.renderer,
    MarkdownTooltip.plugin,
  ],
  ['line-breaks', breaks, null, null],
];

describe('opt out of default plugins', () => {
  it('exclude nothing', () => {
    const { parsingPlugins, processingPlugins, uiPlugins } =
      getDefaultEuiMarkdownPlugins({});

    excludableDefaultPlugins.forEach(
      ([, parsingPlugin, processingPlugin, uiPlugin]) => {
        if (parsingPlugin !== null) {
          expect(
            parsingPlugins.find((p) => (p as PluginTuple)[0] === parsingPlugin)
          ).not.toBeUndefined();
        }

        if (processingPlugin !== null) {
          expect(Object.values(processingPlugins[1][1].components)).toContain(
            processingPlugin
          );
        }

        if (uiPlugin !== null) {
          expect(uiPlugins).toContain(uiPlugin);
        }
      }
    );
  });

  test.each(excludableDefaultPlugins)(
    'exclude %s',
    (plugin, parsingPlugin, processingPlugin, uiPlugin) => {
      const { parsingPlugins, processingPlugins, uiPlugins } =
        getDefaultEuiMarkdownPlugins({ exclude: [plugin] });

      if (parsingPlugin !== null) {
        expect(
          parsingPlugins.find((p) => (p as PluginTuple)[0] === parsingPlugin)
        ).toBeUndefined();
      }

      if (processingPlugin !== null) {
        expect(Object.values(processingPlugins[1][1].components)).not.toContain(
          processingPlugin
        );
      }

      if (uiPlugin !== null) {
        expect(uiPlugins).not.toContain(uiPlugin);
      }
    }
  );
});
