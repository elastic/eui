import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
} from '../../../../src/components';

import DescriptionList from './description_list';
const descriptionListSource = require('!!raw-loader!./description_list');
const descriptionListHtml = renderToHtml(DescriptionList);
const descriptionListSnippet = [
  `<EuiDescriptionList
  listItems={[
    {
      title: 'The Elder Scrolls: Morrowind',
      description: 'The opening music alone evokes such strong memories.',
    },
  ]}
/>`,
  `<EuiDescriptionList>
  <EuiDescriptionListTitle>Dota 2</EuiDescriptionListTitle>
  <EuiDescriptionListDescription>
    A videogame that I have spent way too much time on over the years.
  </EuiDescriptionListDescription>
</EuiDescriptionList>`,
];

import DescriptionListColumn from './description_list_column';
const descriptionListColumnSource = require('!!raw-loader!./description_list_column');
const descriptionListColumnHtml = renderToHtml(DescriptionListColumn);
const descriptionListColumnSnippet = [
  `<EuiDescriptionList
  type="column"
  listItems={favoriteVideoGames}
/>`,
  `<EuiDescriptionList
  type="responsiveColumn"
  listItems={favoriteVideoGames}
/>`,
];

import DescriptionListStyling from './description_list_styling';
const descriptionListStylingSource = require('!!raw-loader!./description_list_styling');
const descriptionListStylingHtml = renderToHtml(DescriptionListStyling);
const descriptionListStylingSnippet = [
  `<EuiDescriptionList
  listItems={favoriteVideoGames}
  align="center"
  compressed
/>`,
];

import DescriptionListInline from './description_list_inline';
const descriptionListInlineSource = require('!!raw-loader!./description_list_inline');
const descriptionListInlineHtml = renderToHtml(DescriptionListInline);
const descriptionListInlineSnippet = [
  `<EuiDescriptionList
  type="inline"
  listItems={favoriteVideoGames}
/>`,
];

import DescriptionListReverse from './description_list_reverse';
const descriptionListReverseSource = require('!!raw-loader!./description_list_reverse');
const descriptionListReverseHtml = renderToHtml(DescriptionListReverse);
const descriptionListReverseSnippet = [
  `<EuiDescriptionList
  textStyle="reverse"
  listItems={favoriteVideoGames}
/>`,
];

import DescriptionListClasses from './description_list_classes';
const descriptionListClassesSource = require('!!raw-loader!./description_list_classes');
const descriptionListClassesHtml = renderToHtml(DescriptionListClasses);
const descriptionListClassesSnippet = [
  `<EuiDescriptionList
  titleProps={{ className: 'eui-textTruncate' }}
  descriptionProps={{ className: 'eui-textTruncate' }}
  listItems={favoriteVideoGames}
/>`,
];

export const DescriptionListExample = {
  title: 'Description list',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: descriptionListSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: descriptionListHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiDescriptionList</strong> is a component for listing pairs
          of information together. You can use the component on its own, passing
          in an object for the list, or use the{' '}
          <strong>EuiDescriptionListTitle</strong> and{' '}
          <strong>EuiDescriptionListDescription</strong> components separately
          to build a list manually.
        </p>
      ),
      props: {
        EuiDescriptionList,
        EuiDescriptionListTitle,
        EuiDescriptionListDescription,
      },
      snippet: descriptionListSnippet,
      demo: <DescriptionList />,
    },
    {
      title: 'Reverse style',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: descriptionListReverseSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: descriptionListReverseHtml,
        },
      ],
      text: (
        <div>
          <p>
            Setting the <EuiCode>textStyle</EuiCode> prop to{' '}
            <EuiCode>reverse</EuiCode> will reverse the text styles of the{' '}
            <EuiCode>title</EuiCode> and <EuiCode>description</EuiCode> elements
            so that the description is more prominent. This works best for
            key/value type content.
          </p>
          <p>
            Adding this property to the <EuiCode>inline</EuiCode> type will not
            change anything.
          </p>
        </div>
      ),
      snippet: descriptionListReverseSnippet,
      demo: <DescriptionListReverse />,
    },
    {
      title: 'As columns',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: descriptionListColumnSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: descriptionListColumnHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Using the prop <EuiCode>type</EuiCode> set to{' '}
            <EuiCode>column</EuiCode> description lists can be presented in an
            inline, column format.
          </p>
          <p>
            To return to the typical row format on smaller screens set{' '}
            <EuiCode>type</EuiCode> to <EuiCode>responsiveColumn</EuiCode>.
          </p>
        </Fragment>
      ),
      snippet: descriptionListColumnSnippet,
      demo: <DescriptionListColumn />,
    },
    {
      title: 'Inline',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: descriptionListInlineSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: descriptionListInlineHtml,
        },
      ],
      text: (
        <p>
          Using a prop <EuiCode>type</EuiCode> set to <EuiCode>inline</EuiCode>{' '}
          description lists can be presented in an inline, blob format. This is
          useful for JSON code blocks. Inline description lists are sized
          smaller than normal lists due to their compact nature.
        </p>
      ),
      snippet: descriptionListInlineSnippet,
      demo: <DescriptionListInline />,
    },
    {
      title: 'Centered and compressed',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: descriptionListStylingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: descriptionListStylingHtml,
        },
      ],
      text: (
        <p>
          Using the <EuiCode>align</EuiCode> and <EuiCode>compressed</EuiCode>{' '}
          props you can further tailor the look of a description list. This
          works with column and inline types.
        </p>
      ),
      snippet: descriptionListStylingSnippet,
      demo: <DescriptionListStyling />,
    },
    {
      title: 'Passing className',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: descriptionListClassesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: descriptionListClassesHtml,
        },
      ],
      text: (
        <p>
          When using the <EuiCode>listItems</EuiCode> prop to pass an object of
          items and you need to also add a <EuiCode>className</EuiCode> (or
          other available prop) to the individual pieces, you can use the{' '}
          <EuiCode>titleProps</EuiCode> and <EuiCode>descriptionProps</EuiCode>{' '}
          to do so.
        </p>
      ),
      snippet: descriptionListClassesSnippet,
      demo: <DescriptionListClasses />,
    },
  ],
};
