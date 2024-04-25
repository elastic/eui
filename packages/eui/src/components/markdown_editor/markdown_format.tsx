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
import classNames from 'classnames';
import { CommonProps } from '../common';
import { EuiText, EuiTextProps } from '../text/text';
import { _isNamedColor } from '../text/text_color';
import { useEuiMemoizedStyles } from '../../services';
import { euiMarkdownFormatStyles } from './markdown_format.styles';
import {
  defaultProcessingPlugins,
  defaultParsingPlugins,
} from './plugins/markdown_default_plugins';

export type EuiMarkdownFormatProps = CommonProps &
  Omit<EuiTextProps, 'size'> & {
    children: string;
    /** array of unified plugins to parse content into an AST */
    parsingPluginList?: PluggableList;
    /** array of unified plugins to convert the AST into a ReactNode */
    processingPluginList?: PluggableList;
    /**
     * Determines the text size. Choose `relative` to control the `font-size` based on the value of a parent container.
     */
    textSize?: EuiTextProps['size'];
  };

export const EuiMarkdownFormat: FunctionComponent<EuiMarkdownFormatProps> = ({
  children,
  className,
  parsingPluginList = defaultParsingPlugins,
  processingPluginList = defaultProcessingPlugins,
  textSize = 'm',
  color = 'default',
  ...rest
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

  const styles = useEuiMemoizedStyles(euiMarkdownFormatStyles);
  const cssStyles = [
    styles.euiMarkdownFormat,
    styles[textSize],
    _isNamedColor(color) ? styles.colors[color] : styles.colors.custom,
  ];

  const classes = classNames('euiMarkdownFormat', className);

  return (
    <EuiText
      size={textSize}
      css={cssStyles}
      className={classes}
      color={color}
      {...rest}
    >
      {result}
    </EuiText>
  );
};
