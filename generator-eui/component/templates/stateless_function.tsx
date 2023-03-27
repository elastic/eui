/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
import { useEuiTheme } from '../../services';
import { <%=cssClassName%>Styles } from './<%= baseName %>.styles';

export type <%= componentName %>Props = HTMLAttributes<HTMLDivElement> & CommonProps & {

};

export const <%= componentName %>: FunctionComponent<<%= componentName %>Props> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('<%= cssClassName %>', className);
  const theme = useEuiTheme();
  const styles = <%= cssClassName %>Styles(theme);
  const cssStyles = [styles.<%= cssClassName %>];

  return (
    <div
      className={classes}
      css={cssStyles}
      {...rest}
    >
      {children}
    </div>
  );
};
