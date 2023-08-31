import React from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiLink,
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
} from '../../../../src/components';

import { descriptionListConfig } from './playground';

import DescriptionList from './description_list';
const descriptionListSource = require('!!raw-loader!./description_list');
const descriptionListSnippet = [
  `<EuiDescriptionList
  listItems={[
    {
      title: 'The Elder Scrolls: Morrowind',
      description: 'The opening music alone evokes such strong memories.',
    },
  ]}
/>`,
];

import DescriptionListSeparate from './description_list_separate';
const descriptionListSeparateSource = require('!!raw-loader!./description_list_separate');
const descriptionListSeparateSnippet = [
  `<EuiDescriptionList>
  <EuiDescriptionListTitle>
    The Elder Scrolls: Morrowind
  </EuiDescriptionListTitle>
  <EuiDescriptionListDescription>
    The opening music alone evokes such strong memories.
  </EuiDescriptionListDescription>
  <EuiDescriptionListTitle>TIE Fighter</EuiDescriptionListTitle>
  <EuiDescriptionListDescription>
    The sequel to XWING, join the dark side and fly for the Emperor.
  </EuiDescriptionListDescription>
  <EuiDescriptionListTitle>Quake 2</EuiDescriptionListTitle>
    <EuiDescriptionListDescription>
      The game that made me drop out of college.
    </EuiDescriptionListDescription>
</EuiDescriptionList>`,
];

import DescriptionListColumn from './description_list_column';
const descriptionListColumnSource = require('!!raw-loader!./description_list_column');
const descriptionListColumnSnippet = `<EuiDescriptionList
  type="column"
  listItems={favoriteVideoGames}
/>`;

import DescriptionListResponsiveColumn from './description_list_column_responsive';
const descriptionListResponsiveColumnSource = require('!!raw-loader!./description_list_column_responsive');
const descriptionListResponsiveColumnSnippet = `<EuiDescriptionList
  type="responsiveColumn"
  listItems={favoriteVideoGames}
/>`;

import DescriptionListColumnWidths from './column_widths';
const descriptionListColumnWidthsSource = require('!!raw-loader!./column_widths');
const descriptionListColumnWidthsSnippet = `<EuiDescriptionList
  type="column"
  columnWidths={[1, 3]}
/>`;

import DescriptionListStyling from './description_list_styling';
const descriptionListStylingSource = require('!!raw-loader!./description_list_styling');
const descriptionListStylingSnippet = [
  `<EuiDescriptionList
  listItems={favoriteVideoGames}
  align="center"
  compressed
/>`,
];

import DescriptionListInline from './description_list_inline';
const descriptionListInlineSource = require('!!raw-loader!./description_list_inline');
const descriptionListInlineSnippet = [
  `<EuiDescriptionList
  type="inline"
  listItems={favoriteVideoGames}
/>`,
];

import DescriptionListReverse from './description_list_reverse';
const descriptionListReverseSource = require('!!raw-loader!./description_list_reverse');
const descriptionListReverseSnippet = [
  `<EuiDescriptionList
  textStyle="reverse"
  listItems={favoriteVideoGames}
/>`,
];

import DescriptionListClasses from './description_list_classes';
const descriptionListClassesSource = require('!!raw-loader!./description_list_classes');
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
      ],
      text: (
        <p>
          <strong>EuiDescriptionList</strong> is a component for listing pairs
          of information together. You can use the component on its own, passing
          in an object for the list.
        </p>
      ),
      props: {
        EuiDescriptionList,
        EuiDescriptionListTitle,
        EuiDescriptionListDescription,
      },
      snippet: descriptionListSnippet,
      demo: <DescriptionList />,
      playground: descriptionListConfig,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: descriptionListSeparateSource,
        },
      ],
      text: (
        <p>
          You can also use the <strong>EuiDescriptionListTitle</strong> and{' '}
          <strong>EuiDescriptionListDescription</strong> components separately
          to build a list manually.
        </p>
      ),
      props: {
        EuiDescriptionList,
        EuiDescriptionListTitle,
        EuiDescriptionListDescription,
      },
      snippet: descriptionListSeparateSnippet,
      demo: <DescriptionListSeparate />,
      playground: descriptionListConfig,
    },
    {
      title: 'Reverse style',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: descriptionListReverseSource,
        },
      ],
      text: (
        <>
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
        </>
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
      ],
      text: (
        <p>
          Using the prop <EuiCode>type</EuiCode> set to{' '}
          <EuiCode>column</EuiCode> description lists can be presented in an
          inline, column format.
        </p>
      ),
      snippet: descriptionListColumnSnippet,
      demo: <DescriptionListColumn />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: descriptionListResponsiveColumnSource,
        },
      ],
      text: (
        <p>
          To return to the typical row format on smaller screens set{' '}
          <EuiCode>type</EuiCode> to <EuiCode>responsiveColumn</EuiCode>. The
          following list will only show the column format on larger screens.
        </p>
      ),
      snippet: descriptionListResponsiveColumnSnippet,
      demo: <DescriptionListResponsiveColumn />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: descriptionListColumnWidthsSource,
        },
      ],
      text: (
        <>
          <p>
            The optional <EuiCode>columnWidths</EuiCode> prop allows customizing
            specific column widths (e.g.{' '}
            <EuiCode>{"['100px', '200px']"}</EuiCode>). The first array value
            applies to the title column, and the second applies to the
            description column.
          </p>
          <p>
            Passing numbers instead of CSS width strings will use a ratio of
            widths. For example, <EuiCode>[1, 3]</EuiCode> will render a
            description column 3x the width of the title column. In other words,
            titles will have a width of 25% descriptions will have a width of
            75%.
          </p>
          <p>
            For advanced usage, column width strings also accept{' '}
            <EuiLink
              href="https://css-tricks.com/snippets/css/complete-guide-grid/#aa-special-units-functions"
              target="_blank"
            >
              CSS grid special units, sizing, keywords, and sizing functions
            </EuiLink>
            .
          </p>
        </>
      ),
      snippet: descriptionListColumnWidthsSnippet,
      demo: <DescriptionListColumnWidths />,
    },
    {
      title: 'Inline',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: descriptionListInlineSource,
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
      title: 'Customizing appearance',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: descriptionListStylingSource,
        },
      ],
      text: (
        <>
          <h4>Alignment & Compression</h4>
          <p>
            Utilize the <EuiCode>align</EuiCode> and
            <EuiCode>compressed</EuiCode> props to refine the presentation of
            your description list. These are compatible with both column and
            inline types.
          </p>
          <h4>Vertical spacing</h4>
          <p>
            Modify the <EuiCode>rowGutterSize</EuiCode> prop to control the
            vertical spacing between <EuiCode>EuiDescriptionList</EuiCode>{' '}
            elements. This will not affect inline list types.
          </p>
          <h4>Horizontal spacing</h4>
          <p>
            Adjust the spacing between the title and description with the{' '}
            <EuiCode>columnGutterSize</EuiCode> prop. This will not affect
            inline or row types.
          </p>
        </>
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
