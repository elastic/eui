/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useMemo, FunctionComponent } from 'react';
import { highlight, RefractorNode } from 'refractor';
import classNames from 'classnames';
import {
  EuiCodeSharedProps,
  DEFAULT_LANGUAGE,
  checkSupportedLanguage,
  getHtmlContent,
} from './utils';
import { useEuiTheme } from '../../services';
import { euiCodeStyles } from './code.styles';

export type EuiCodeProps = EuiCodeSharedProps;

export const EuiCode: FunctionComponent<EuiCodeProps> = ({
  transparentBackground = false,
  language: _language = DEFAULT_LANGUAGE,
  children,
  className,
  ...rest
}) => {
  const language = useMemo(() => checkSupportedLanguage(_language), [
    _language,
  ]);

  const data: RefractorNode[] = useMemo(() => {
    if (typeof children !== 'string') {
      return [];
    }
    return highlight(children, language);
  }, [children, language]);

  const content = useMemo(() => getHtmlContent(data, children), [
    data,
    children,
  ]);

  const classes = classNames('euiCode', className);

  const euiTheme = useEuiTheme();
  const styles = euiCodeStyles(euiTheme);
  const cssStyles = [
    styles.euiCode,
    transparentBackground && styles.transparentBackground,
  ];

  return (
    <code
      className={classes}
      css={cssStyles}
      data-code-language={language}
      {...rest}
    >
      {content}
    </code>
  );
};
