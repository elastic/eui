/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
