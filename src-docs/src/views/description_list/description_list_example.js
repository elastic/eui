import React from 'react';

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

import DescriptionListColumn from './description_list_column';
const descriptionListColumnSource = require('!!raw-loader!./description_list_column');
const descriptionListColumnHtml = renderToHtml(DescriptionListColumn);

import DescriptionListStyling from './description_list_styling';
const descriptionListStylingSource = require('!!raw-loader!./description_list_styling');
const descriptionListStylingHtml = renderToHtml(DescriptionListStyling);

import DescriptionListInline from './description_list_inline';
const descriptionListInlineSource = require('!!raw-loader!./description_list_inline');
const descriptionListInlineHtml = renderToHtml(DescriptionListInline);

import DescriptionListReverse from './description_list_reverse';
const descriptionListReverseSource = require('!!raw-loader!./description_list_reverse');
const descriptionListReverseHtml = renderToHtml(DescriptionListReverse);

import DescriptionListClasses from './description_list_classes';
const descriptionListClassesSource = require('!!raw-loader!./description_list_classes');
const descriptionListClassesHtml = renderToHtml(DescriptionListClasses);

export const DescriptionListExample = {
  title: 'Description List',
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
          <EuiCode>DescriptionList</EuiCode> is a component for listing pairs of
          information together. You can use the component on its own, passing in
          an object for the list, or use the{' '}
          <EuiCode>EuiDescriptionListTitle</EuiCode> and{' '}
          <EuiCode>EuiDescriptionListDescription</EuiCode>
          components separately to build a list manually.
        </p>
      ),
      props: {
        EuiDescriptionList,
        EuiDescriptionListTitle,
        EuiDescriptionListDescription,
      },
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
        <p>
          Using a prop <EuiCode>type</EuiCode> set to <EuiCode>column</EuiCode>{' '}
          description lists can be presented in an inline, column format.
        </p>
      ),
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
          items and you need to also add <EuiCode>className</EuiCode>s (or other
          available props) to the individual pieces, you can use the{' '}
          <EuiCode>titleProps</EuiCode> and <EuiCode>descriptionProps</EuiCode>{' '}
          to do so.
        </p>
      ),
      demo: <DescriptionListClasses />,
    },
  ],
};
