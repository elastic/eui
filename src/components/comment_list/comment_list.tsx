/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { EuiComment, EuiCommentProps } from './comment';
import { EuiTimeline, EuiTimelineProps } from '../timeline';

export type EuiCommentListProps = EuiTimelineProps & {
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
  let commentElements = null;

  if (comments) {
    commentElements = comments.map((item, index) => (
      <EuiComment key={index} {...item} />
    ));
  }

  return (
    <EuiTimeline className="euiCommentList" {...rest}>
      {commentElements}
      {children}
    </EuiTimeline>
  );
};
