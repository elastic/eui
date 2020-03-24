import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiComment } from '../../../../src/components';

import Comment from './comment';
const commentSource = require('!!raw-loader!./comment');
const commentHtml = renderToHtml(Comment);

export const CommentExample = {
  title: 'Comment List',
  sections: [
    // {
    //   source: [
    //     {
    //       type: GuideSectionTypes.JS,
    //       code: suggestSource,
    //     },
    //     {
    //       type: GuideSectionTypes.HTML,
    //       code: suggestHtml,
    //     },
    //   ],
    //   text: (
    //     <div>
    //       <p>
    //         <EuiCode>EuiSuggest</EuiCode> is a text field component used to
    //         display suggestions. The status of the component is shown on its
    //         right side. The available <EuiCode>status</EuiCode> are:{' '}
    //         <EuiCode>unsaved</EuiCode>, <EuiCode>saved</EuiCode>,
    //         <EuiCode>unchanged</EuiCode> and <EuiCode>isLoading</EuiCode>.
    //       </p>
    //     </div>
    //   ),
    //   props: { EuiSuggest },
    //   snippet: suggestSnippet,
    //   demo: <Suggest />,
    // },
    {
      title: 'Comment',
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
        <p>
          Description needed: how to use the <EuiCode>EuiComment</EuiCode>{' '}
          component.
        </p>
      ),
      props: { EuiComment },
      demo: <Comment />,
    },
  ],
};
