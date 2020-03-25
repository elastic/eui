import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiComment } from '../../../../src/components';

import Comment from './comment';
const commentSource = require('!!raw-loader!./comment');
const commentHtml = renderToHtml(Comment);

export const CommentExample = {
  title: 'Comment',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: commentHtml,
        },
      ],
      text: (
        <div>
          <p>
            Use <EuiCode>EuiComment</EuiCode> for displaying comment threads
            with <EuiCode>EuiCommentList</EuiCode>. There are two different
            types of comments <EuiCode>regular</EuiCode> and{' '}
            <EuiCode>update</EuiCode> available through the{' '}
            <EuiCode>type</EuiCode> prop. Use comments of type{' '}
            <EuiCode>update</EuiCode> to display comments that generally do not
            have a body and are logging actions that either the user or the
            system has performed (e.g. &ldquo;jsmith edited a case&rdquo; or
            &ldquo;kibanamachine added the backport missing label&rdquo;).
          </p>
          <p>
            The <EuiCode>timelineIcon</EuiCode> can be customized as needed. It
            is recommended to use an element of dimensions 40x40. The default{' '}
            <EuiCode>timelineIcon</EuiCode> is a user icon.
          </p>
          <p>
            Use <EuiCode>children</EuiCode> to pass the body of the comment.
          </p>
        </div>
      ),
      props: { EuiComment },
      demo: <Comment />,
    },
  ],
};
