/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { EuiComment, EuiCommentProps } from './comment';
import { EuiTimeline, EuiTimelineProps } from '../timeline';

export type EuiCommentListProps = Omit<
  EuiTimelineProps,
  'items' | 'gutterSize'
> & {
  /**
   * List of comments to render. See {@link EuiComment}
   */
  comments?: EuiCommentProps[];
  /**
   * Sets the size of the vertical space between each comment
   */
  gutterSize?: EuiTimelineProps['gutterSize'];
};

export const EuiCommentList: FunctionComponent<EuiCommentListProps> = ({
  children,
  className,
  comments,
  gutterSize = 'l',
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
    <EuiTimeline className={classes} gutterSize={gutterSize} {...rest}>
      {commentElements}
      {children}
    </EuiTimeline>
  );
};
