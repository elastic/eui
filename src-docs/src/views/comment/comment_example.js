import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiComment,
} from '../../../../src/components';

import Comment from './comment';
const commentSource = require('!!raw-loader!./comment');
const commentHtml = renderToHtml(Comment);

export const CommentExample = {
  title: 'Comment',
  sections: [{
    title: 'Comment',
    source: [{
      type: GuideSectionTypes.JS,
      code: commentSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: commentHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiComment</EuiCode> component.
      </p>
    ),
    props: { EuiComment },
    demo: <Comment />,
  }],
};
