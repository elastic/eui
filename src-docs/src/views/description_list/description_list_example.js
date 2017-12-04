import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
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

export const DescriptionListExample = {
  title: 'DescriptionList',
  sections: [{
    title: 'DescriptionList',
    source: [{
      type: GuideSectionTypes.JS,
      code: descriptionListSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: descriptionListHtml,
    }],
    text: (
      <p>
        <EuiCode>DescriptionList</EuiCode> is a component for listing pairs of
        information together. You can use the component on its own, passing
        in an object for the list, or use
        the <EuiCode>EuiDescriptionListTitle</EuiCode> and <EuiCode>EuiDescriptionListDescription</EuiCode>
        components separately to build a list manually.
      </p>
    ),
    demo: <DescriptionList />,
  }, {
    title: 'DescriptionList as columns',
    source: [{
      type: GuideSectionTypes.JS,
      code: descriptionListColumnSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: descriptionListColumnHtml,
    }],
    text: (
      <p>
        Using a prop <EuiCode>type</EuiCode> set to <EuiCode>column</EuiCode> description lists
        can be presented in an inline, column format.
      </p>
    ),
    demo: <DescriptionListColumn />,
  }, {
    title: 'Description lists can be inline',
    source: [{
      type: GuideSectionTypes.JS,
      code: descriptionListInlineSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: descriptionListInlineHtml,
    }],
    text: (
      <p>
        Using a prop <EuiCode>type</EuiCode> set to <EuiCode>inline</EuiCode> description lists
        can be presented in an inline, blob format. This is useful for JSON code blocks. Inline
        description lists are sized smaller then normal lists due to their compact nature.
      </p>
    ),
    demo: <DescriptionListInline />,
  }, {
    title: 'DescriptionLists can be centered and compressed',
    source: [{
      type: GuideSectionTypes.JS,
      code: descriptionListStylingSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: descriptionListStylingHtml,
    }],
    text: (
      <p>
        Using the <EuiCode>align</EuiCode> and <EuiCode>compressed</EuiCode> props you
        can further tailor the look of a description list. This works with column
        and inline types.
      </p>
    ),
    demo: <DescriptionListStyling />,
  }],
};
