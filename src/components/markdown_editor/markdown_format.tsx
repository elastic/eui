/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useMemo } from 'react';
import unified, { PluggableList } from 'unified';
import { VFileContents } from 'vfile';
import {
  defaultProcessingPlugins,
  defaultParsingPlugins,
} from './plugins/markdown_default_plugins';

export interface EuiMarkdownFormatProps {
  children: string;
  /** array of unified plugins to parse content into an AST */
  parsingPluginList?: PluggableList;
  /** array of unified plugins to convert the AST into a ReactNode */
  processingPluginList?: PluggableList;
}

export const EuiMarkdownFormat: FunctionComponent<EuiMarkdownFormatProps> = ({
  children,
  parsingPluginList = defaultParsingPlugins,
  processingPluginList = defaultProcessingPlugins,
}) => {
  const processor = useMemo(
    () => unified().use(parsingPluginList).use(processingPluginList),
    [parsingPluginList, processingPluginList]
  );
  const result = useMemo(() => {
    try {
      const processed = processor.processSync(children);
      // `.result` is intentionally `unknown` (https://github.com/vfile/vfile/pull/53)
      // cast to something expected.
      return (processed.result as VFileContents) ?? processed.contents;
    } catch (e) {
      return children;
    }
  }, [children, processor]);
  return <div className="euiMarkdownFormat">{result}</div>;
};
