/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  HTMLAttributes,
  Fragment,
  FunctionComponent,
  ReactNode,
} from 'react';
import { EuiScreenReaderOnly } from '../accessibility';
import { useEuiI18n } from '../i18n';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { useEuiTheme } from '../../services';
import { euiMarkStyles } from './mark.styles';
export type EuiMarkProps = HTMLAttributes<HTMLElement> &
  CommonProps & {
    /**
     * ReactNode to render as this component's content
     */
    children: ReactNode;
  };

export const EuiMark: FunctionComponent<EuiMarkProps> = ({
  children,
  className,
  ...rest
}) => {
  const useTheme = useEuiTheme();
  const styles = euiMarkStyles(useTheme);
  const classes = classNames('euiMark', className);

  return (
    <Fragment>
      <EuiScreenReaderOnly>
        <span>{useEuiI18n('euiMark.highlightStart', 'highlight start')}</span>
      </EuiScreenReaderOnly>
      <mark css={[styles]} className={classes} {...rest}>
        {children}
      </mark>
      <EuiScreenReaderOnly>
        <span>{useEuiI18n('euiMark.highlightEnd', 'highlight end')}</span>
      </EuiScreenReaderOnly>
    </Fragment>
  );
};
