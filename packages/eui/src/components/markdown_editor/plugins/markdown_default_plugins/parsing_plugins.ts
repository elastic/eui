/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// Importing seemingly unused types from `unified` because the definitions
// are exported for two versions of TypeScript (3.4, 4.0) and implicit
// imports during eui.d.ts generation default to the incorrect version (3.4).
// Explicit imports here resolve the version mismatch.
import {
  PluggableList,
  // @ts-ignore See above comment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Attacher,
  // @ts-ignore See above comment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Pluggable,
  // @ts-ignore See above comment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Settings,
} from 'unified';
import markdown from 'remark-parse-no-trim';
import emoji from 'remark-emoji';
import breaks from 'remark-breaks';
import highlight from '../remark/remark_prismjs';
import * as MarkdownTooltip from '../markdown_tooltip';
import * as MarkdownCheckbox from '../markdown_checkbox';
import {
  euiMarkdownLinkValidator,
  EuiMarkdownLinkValidatorOptions,
  DEFAULT_OPTIONS as LINK_VALIDATOR_DEFAULTS,
} from '../markdown_link_validator';
import type { ExcludableDefaultPlugins, DefaultPluginsConfig } from './plugins';

export type DefaultEuiMarkdownParsingPlugins = PluggableList;

export type DefaultParsingPluginsConfig = {
  /**
   * Allows enabling emoji rendering for emoticons such as :) and :(
   * @default { emoticon: false }
   */
  emoji?: { emoticon?: boolean };
  /**
   * Allows configuring the `allowRelative` and `allowProtocols` of
   * {@link EuiMarkdownLinkValidatorOptions}
   */
  linkValidator?: EuiMarkdownLinkValidatorOptions;
};

const DEFAULT_PARSING_PLUGINS: Record<
  ExcludableDefaultPlugins,
  DefaultEuiMarkdownParsingPlugins[0]
> = {
  emoji: [emoji, { emoticon: false }],
  lineBreaks: [breaks, {}],
  linkValidator: [euiMarkdownLinkValidator, LINK_VALIDATOR_DEFAULTS],
  checkbox: [MarkdownCheckbox.parser, {}],
  tooltip: [MarkdownTooltip.parser, {}],
};

export const getDefaultEuiMarkdownParsingPlugins = ({
  exclude,
  ...parsingConfig
}: DefaultPluginsConfig &
  DefaultParsingPluginsConfig = {}): DefaultEuiMarkdownParsingPlugins => {
  const parsingPlugins: PluggableList = [
    [markdown, {}],
    [highlight, {}],
  ];

  Object.entries(DEFAULT_PARSING_PLUGINS).forEach(([pluginName, plugin]) => {
    // Check for plugin exclusions
    if (!exclude?.includes(pluginName as ExcludableDefaultPlugins)) {
      // Check for plugin configuration overrides
      if (pluginName in parsingConfig) {
        parsingPlugins.push([
          (plugin as any[])[0],
          parsingConfig[pluginName as keyof DefaultParsingPluginsConfig],
        ]);
      } else {
        parsingPlugins.push(plugin);
      }
    }
  });

  return parsingPlugins;
};

export const defaultParsingPlugins = getDefaultEuiMarkdownParsingPlugins();
