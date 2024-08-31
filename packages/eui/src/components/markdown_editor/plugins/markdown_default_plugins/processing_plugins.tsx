/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Fragment, createElement } from 'react';
// Importing seemingly unused types from `unified` because the definitions
// are exported for two versions of TypeScript (3.4, 4.0) and implicit
// imports during eui.d.ts generation default to the incorrect version (3.4).
// Explicit imports here resolve the version mismatch.
import {
  Plugin,
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
import { Options as Remark2RehypeOptions, Handler } from 'mdast-util-to-hast';
import all from 'mdast-util-to-hast/lib/all';
import rehype2react from 'rehype-react';
import remark2rehype from 'remark-rehype';

import { EuiLink, EuiLinkProps } from '../../../link';
import { EuiCodeBlock, EuiCode } from '../../../code';
import { EuiHorizontalRule } from '../../../horizontal_rule';

import { FENCED_CLASS } from '../remark/remark_prismjs';
import * as MarkdownTooltip from '../markdown_tooltip';
import * as MarkdownCheckbox from '../markdown_checkbox';
import type { ExcludableDefaultPlugins, DefaultPluginsConfig } from './plugins';

const unknownHandler: Handler = (h, node) => {
  return h(node, node.type, node, all(h, node));
};

export interface Rehype2ReactOptions {
  components: { [key: string]: React.ComponentType<any> };
  [key: string]: any;
}

export type DefaultEuiMarkdownProcessingPlugins = [
  [Plugin, Remark2RehypeOptions], // first is well known
  [typeof rehype2react, Rehype2ReactOptions], // second is well known
  ...PluggableList // any additional are generic
];

export type DefaultProcessingPluginsConfig = {
  /**
   * Allows customizing all formatted links.
   * Accepts any prop that [EuiLink](/#/navigation/link) or any anchor link tag accepts.
   * Useful for, e.g. setting `target="_blank"` on all links
   */
  linkProps?: Partial<EuiLinkProps>;
};

const DEFAULT_COMPONENT_RENDERERS: Partial<
  Record<ExcludableDefaultPlugins, React.ComponentType<any>>
> = {
  checkbox: MarkdownCheckbox.renderer,
  tooltip: MarkdownTooltip.renderer,
};

export const getDefaultEuiMarkdownProcessingPlugins = ({
  exclude,
  linkProps,
}: DefaultPluginsConfig &
  DefaultProcessingPluginsConfig = {}): DefaultEuiMarkdownProcessingPlugins => {
  const componentPluginsWithExclusions: Rehype2ReactOptions['components'] = {};

  Object.entries(DEFAULT_COMPONENT_RENDERERS).forEach(
    ([excludeName, renderer]) => {
      if (!exclude?.includes(excludeName as ExcludableDefaultPlugins)) {
        const pluginName = `${excludeName}Plugin`;
        componentPluginsWithExclusions[pluginName] = renderer;
      }
    }
  );

  const plugins: DefaultEuiMarkdownProcessingPlugins = [
    [
      remark2rehype,
      {
        allowDangerousHtml: true,
        unknownHandler,
        handlers: {}, // intentionally empty, allows plugins to extend if they need to
      },
    ],
    [
      rehype2react,
      {
        createElement,
        Fragment,
        components: {
          a: (props: any) => {
            return <EuiLink {...props} {...linkProps} />;
          },
          code: (props: any) =>
            // If there are linebreaks use codeblock, otherwise code
            /\r|\n/.exec(props.children) ||
            (props.className && props.className.indexOf(FENCED_CLASS) > -1) ? (
              <EuiCodeBlock
                fontSize="m"
                paddingSize="s"
                isCopyable
                {...props}
              />
            ) : (
              <EuiCode {...props} />
            ),
          // When we use block code "fences" the code tag is replaced by the `EuiCodeBlock`.
          // But there's a `pre` tag wrapping all the `EuiCodeBlock`.
          // We want to replace this `pre` tag with a `div` because the `EuiCodeBlock` has its own children `pre` tag.
          pre: (props) => (
            <div {...props} className="euiMarkdownFormat__codeblockWrapper" />
          ),
          blockquote: (props) => (
            <blockquote {...props} className="euiMarkdownFormat__blockquote" />
          ),
          table: (props) => (
            <table className="euiMarkdownFormat__table" {...props} />
          ),
          hr: (props) => <EuiHorizontalRule {...props} />,
          ...componentPluginsWithExclusions,
        },
      },
    ],
  ];

  return plugins;
};

export const defaultProcessingPlugins =
  getDefaultEuiMarkdownProcessingPlugins();
