import React from 'react';

import {
  EuiBasicTable,
  EuiCode,
  EuiControlBar,
} from '../../../../src/components';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import ControlBar from './control_bar';
import { ControlBarWithTabs } from './tabs';

const controlBarSource = require('!!raw-loader!./control_bar');
const controlBarHtml = renderToHtml(ControlBar);
const controlBarSnippet = '<EuiControlBar controls={items}/>';

const tabsBarSource = require('!!raw-loader!./tabs');
const tabsBarHtml = renderToHtml(ControlBarWithTabs);
const tabsBarSnippet = '<EuiControlBar controls={items} size="m"/>';

const buttonPropsTable = [
  {
    prop: 'id',
    type: 'string',
    description: 'Provide a unique id for the element',
  },
  {
    prop: 'color (optional)',
    type: 'props of EuiButton["color"]',
    description: 'Set the button color. Defaults to "ghost."',
  },
  {
    prop: 'label',
    type: 'string',
    description: 'Displays the button label',
  },
  {
    prop: 'classNames (optional)',
    type: 'string',
    description: 'Optionally pass additional classes.',
  },
  {
    prop: 'onClick',
    type: 'function',
    description: 'Handle the click event',
  },
];

const tabPropsTable = [
  {
    prop: 'id',
    type: 'string',
    description: 'Provide a unique id for the element',
  },
  {
    prop: 'label',
    type: 'string',
    description: 'Displays the Tab label',
  },
  {
    prop: 'onClick',
    type: 'function',
    description:
      'Handle the tab click. Most likely this will be used to set ' +
      'something like the active tab on your state.',
  },
];

const breadcrumbsPropsTable = [
  {
    prop: 'id',
    type: 'string',
    description: 'Provide a unique id for the element',
  },
  {
    prop: 'responsive (optional)',
    type: 'boolean',
    description: 'Hides left most breadcrumbs as window gets smaller',
  },
  {
    prop: 'truncate (optional)',
    type: 'boolean',
    description:
      'Forces all breadcrumbs to single line and' +
      'truncates each breadcrumb to a particular width, except for the last item',
  },
  {
    prop: 'max (optional)',
    type: 'number',
    description:
      'Condenses the inner items past the maximum set into a single ellipses item',
  },
  {
    prop: 'breadcrumbs',
    type: 'array',
    description: 'An array of items for the breadcrumbs',
  },
];

const textPropsTable = [
  {
    prop: 'id',
    type: 'string',
    description: 'Provide a unique id for the element',
  },
  {
    prop: 'label',
    type: 'string',
    description: 'Displays the Text label',
  },
  {
    prop: 'color (optional)',
    type: 'props of EuiText["color"]',
    description: 'Sets the color of the text. Defaults to "ghost."',
  },
  {
    prop: 'onClick (optional)',
    type: 'function',
    description: 'Handle the click event',
  },
];

const iconPropsTable = [
  {
    prop: 'id',
    type: 'string',
    description: 'Provide a unique id for the element.',
  },
  {
    prop: 'iconType',
    type: 'string',
    description: 'Which icon to render',
  },
  {
    prop: 'label',
    type: 'string',
    description: 'For accessibility',
  },
  {
    prop: 'classNames (optional)',
    type: 'string',
    description: 'Optionally pass additional classes.',
  },
  {
    prop: 'color (optional)',
    type: 'props of EuiButtonIcon["color"]',
    description: 'Sets the color of the icon. Defaults to "ghost."',
  },
  {
    prop: 'onClick (optional)',
    type: 'function',
    description: 'Handle the click event',
  },
];

const tableColumns = [
  {
    field: 'prop',
    name: 'Prop',
    sortable: false,
    'data-test-subj': 'propCell',
  },
  {
    field: 'type',
    name: 'Type',
    sortable: false,
    'data-test-subj': 'typeCell',
  },
  {
    field: 'description',
    name: 'Description',
    sortable: false,
    'data-test-subj': 'descriptionCell',
  },
];

export const ControlBarExample = {
  title: 'Control Bar',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: controlBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: controlBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            <EuiCode>ControlBar</EuiCode> is a bottom positioned container and
            content well intended to provide additional view controls and
            actions.
          </p>
          <h2>Mobile Usage</h2>
          The <EuiCode>ControlBar</EuiCode> is responsive in the sense that it
          utilizes flexbox. However, it makes no attempts to reorganize the
          controls you provide. By default the <EuiCode>ControlBar</EuiCode> is
          hidden on mobile devices, but this can be overridden with the
          <EuiCode>showOnMobile</EuiCode> prop. You&apos;ll need to take smaller
          screens into consideration when choosing to display on smaller
          screens.
        </div>
      ),
      props: { EuiControlBar },
      snippet: controlBarSnippet,
      demo: <ControlBar />,
    },
    {
      title: 'Using Tabs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tabsBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: tabsBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            This example deomnstrates the use of tabs and uses the size
            <EuiCode>size=&quot;m&quot;</EuiCode>.
          </p>
        </div>
      ),
      props: { EuiControlBar },
      snippet: tabsBarSnippet,
      demo: <ControlBarWithTabs />,
    },
    {
      title: 'ControlTypes',
      text: (
        <div>
          <p>
            The <EuiCode>ControlBar</EuiCode> accepts an array of
            <EuiCode>controlTypes</EuiCode> that can be arranged virtually any
            way you&apos;d like by using any of following
            <EuiCode>controlTypes</EuiCode>. The controlTypes will be ordered
            the same way they are in the array you provide.
          </p>
          <h3>Button Control</h3>
          <EuiBasicTable items={buttonPropsTable} columns={tableColumns} />
          <h3>Tab Control</h3>
          <EuiBasicTable items={tabPropsTable} columns={tableColumns} />
          <h3>Breadcrumbs Control</h3>
          <p>
            View the documentation on <EuiCode>EuiBreadcrumbs</EuiCode> for
            additional information on their usage.
          </p>
          <EuiBasicTable items={breadcrumbsPropsTable} columns={tableColumns} />
          <h3>Text Control</h3>
          <EuiBasicTable items={textPropsTable} columns={tableColumns} />
          <h3>Icon Control</h3>
          <EuiBasicTable items={iconPropsTable} columns={tableColumns} />
          <h3>Spacer & Divider Control</h3>
          <h4>Spacers</h4>
          <p>
            Spacers can be used to provide horizontal spaces between your
            <EuiCode>controlTypes</EuiCode>. Spacers do not need{' '}
            <EuiCode>ids</EuiCode>.
          </p>
          <h4>Dividers</h4>
          <p>
            Dividers provide <EuiCode>1px</EuiCode> wide colored breaks between
            your <EuiCode>controlTypes</EuiCode>. Useful when additional visual
            separation is needed. Dividers do not need <EuiCode>ids</EuiCode>.
          </p>
          <h3>Rendering content to the control bar drawer</h3>
          <p>
            Optional children of the <EuiCode>EuiControlBar</EuiCode> are
            rendered in the control bar drawer. You can toggle the visibility of
            the content with the <EuiCode>showContent</EuiCode> prop. When you
            want to display tab content, this is where you&apos;ll do it.
          </p>
        </div>
      ),
    },
  ],
};
