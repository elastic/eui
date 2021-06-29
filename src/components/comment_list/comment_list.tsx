/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
import { EuiComment, EuiCommentProps } from './comment';

export type EuiCommentListProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /**
     * List of comments to render. See #EuiComment
     */
    comments?: EuiCommentProps[];
  };

export const EuiCommentList: FunctionComponent<EuiCommentListProps> = ({
  children,
  className,
  comments,
  ...rest
}) => {
  const classes = classNames('euiCommentList', className);

  let commentElements = null;

  if (comments) {
    commentElements = comments.map((item, index) => (
      <EuiComment key={index} {...item} />
    ));
  }

  return (
    <div className={classes} {...rest}>
      {commentElements}
      {children}
    </div>
  );
};
