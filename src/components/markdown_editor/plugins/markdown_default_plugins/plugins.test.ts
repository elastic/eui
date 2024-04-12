/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { getDefaultEuiMarkdownPlugins } from './plugins';

describe('default plugins', () => {
  test('no exclusions', () => {
    const { parsingPlugins, processingPlugins, uiPlugins } =
      getDefaultEuiMarkdownPlugins();

    expect(parsingPlugins).toHaveLength(7);
    expect(Object.keys(processingPlugins[1][1].components)).toHaveLength(8);
    expect(uiPlugins).toHaveLength(1);

    expect(processingPlugins[1][1].components.tooltipPlugin).toBeDefined();
    expect(processingPlugins[1][1].components.checkboxPlugin).toBeDefined();
  });

  test('exclude tooltips', () => {
    const { parsingPlugins, processingPlugins, uiPlugins } =
      getDefaultEuiMarkdownPlugins({
        exclude: ['tooltip'],
      });

    expect(parsingPlugins).toHaveLength(6);
    expect(processingPlugins[1][1].components.tooltipPlugin).toBeUndefined();
    expect(uiPlugins).toHaveLength(0);
  });

  test('exclude checkboxes', () => {
    const { parsingPlugins, processingPlugins, uiPlugins } =
      getDefaultEuiMarkdownPlugins({
        exclude: ['checkbox'],
      });

    expect(parsingPlugins).toHaveLength(6);
    expect(processingPlugins[1][1].components.checkboxPlugin).toBeUndefined();
    expect(uiPlugins).toHaveLength(1);
  });

  test('all exclusions', () => {
    const { parsingPlugins, processingPlugins, uiPlugins } =
      getDefaultEuiMarkdownPlugins({
        exclude: [
          'tooltip',
          'checkbox',
          'lineBreaks',
          'linkValidator',
          'emoji',
        ],
      });

    expect(parsingPlugins).toHaveLength(2);
    expect(Object.keys(processingPlugins[1][1].components)).toHaveLength(6);
    expect(uiPlugins).toHaveLength(0);
  });
});
