import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiListGroup,
  EuiListGroupItem,
  EuiPinnableListGroup,
  EuiCode,
} from '../../../../src/components';
import { EuiPinnableListGroupItem } from './props';

import ListGroup from './list_group';
const listGroupSource = require('!!raw-loader!./list_group');
const listGroupHtml = renderToHtml(ListGroup);

import ListGroupLinks from './list_group_links';
const listGroupLinksSource = require('!!raw-loader!./list_group_links');
const listGroupLinksHtml = renderToHtml(ListGroupLinks);

import ListGroupLinkActions from './list_group_link_actions';
const listGroupLinkActionsSource = require('!!raw-loader!./list_group_link_actions');
const listGroupLinkActionsHtml = renderToHtml(ListGroupLinkActions);

import ListGroupExtra from './list_group_extra';
const listGroupExtraSource = require('!!raw-loader!./list_group_extra');
const listGroupExtraHtml = renderToHtml(ListGroupExtra);

import ListGroupItemColor from './list_group_item_color';
const listGroupItemColorSource = require('!!raw-loader!./list_group_item_color');
const listGroupItemColorHtml = renderToHtml(ListGroupItemColor);

import PinnableListGroup from './pinnable_list_group';
const pinnableListGroupSource = require('!!raw-loader!./pinnable_list_group');
const pinnableListGroupHtml = renderToHtml(PinnableListGroup);

export const ListGroupExample = {
  title: 'List group',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: listGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: listGroupHtml,
        },
      ],
      text: (
        <>
          <p>
            The <strong>EuiListGroup</strong> component is used to present{' '}
            <strong>EuiListGroupItems</strong> in a neatly formatted list. Use
            the <EuiCode>flush</EuiCode> and <EuiCode>bordered</EuiCode>{' '}
            properties for full-width and bordered presentations, respectively.
          </p>
          <p>
            Adjust the <EuiCode>gutterSize</EuiCode> prop to increase or
            decrease the spacing between items.
          </p>
        </>
      ),
      props: { EuiListGroup, EuiListGroupItem },
      demo: <ListGroup />,
      snippet: `<EuiListGroup flush={true} bordered={true}>
  <EuiListGroupItem onClick={handleOnClick} label="Item" />
</EuiListGroup>`,
    },
    {
      title: 'List of links',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: listGroupLinksSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: listGroupLinksHtml,
        },
      ],
      text: (
        <>
          <p>
            Display <strong>EuiListGroupItems</strong> as links by providing an{' '}
            <EuiCode>href</EuiCode> value and change their state with the{' '}
            <EuiCode>isActive</EuiCode> and <EuiCode>isDisabled</EuiCode>{' '}
            properties.
          </p>
          <p>
            As is done in this example, the <strong>EuiListGroup</strong>{' '}
            component can also accept an array of items via the{' '}
            <EuiCode>listItems</EuiCode> property.
          </p>
        </>
      ),
      demo: <ListGroupLinks />,
      snippet: `<EuiListGroup
  listItems={[
    {
      label: 'First link',
      href: '#',
      iconType: 'calendar',
    },
    {
      label: 'Second link',
      href: '#,
      isActive: true,
      iconType: 'clock',
    }]
  }
/>`,
    },
    {
      title: 'Secondary link actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: listGroupLinkActionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: listGroupLinkActionsHtml,
        },
      ],
      text: (
        <p>
          The <EuiCode>extraAction</EuiCode> property adds a secondary icon
          button to any list item. It accepts several properties of its own,
          including <EuiCode>color</EuiCode>, <EuiCode>onClick</EuiCode>,{' '}
          <EuiCode>iconType</EuiCode>, and <EuiCode>alwaysShow</EuiCode>, and
          can be used for actions such as pinning, favoriting, or deleting an
          item.
        </p>
      ),
      demo: <ListGroupLinkActions />,
      snippet: `<EuiListGroupItem
  label="EUI button link"
  extraAction={{
    color: 'primary',
    onClick: this.clicked,
    iconType: 'pin',
    iconSize: 's',
    'aria-label': 'Pin link',
    alwaysShow: pinned,
  }}
/>`,
    },
    {
      title: 'Text wrapping and tooltips',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: listGroupExtraSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: listGroupExtraHtml,
        },
      ],
      text: (
        <p>
          Optional props <EuiCode>showToolTip</EuiCode> and{' '}
          <EuiCode>wrapLines</EuiCode> can be used to augment the display of
          list items. Use these when lists are inside small containers where it
          is likely that the content will be truncated.
        </p>
      ),
      demo: <ListGroupExtra />,
      snippet: `<EuiListGroup showToolTips>
  <EuiListGroupItem
    wrapText
    label="A very long label"
  />
</EuiListGroup>`,
    },
    {
      title: 'List item color and size',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: listGroupItemColorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: listGroupItemColorHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiListGroupItems</strong> will inherit the color from their
            element type whether it is a <EuiCode>button</EuiCode>,{' '}
            <EuiCode>anchor</EuiCode>, or <EuiCode>span</EuiCode>. You can
            enforce a different color of <EuiCode>primary</EuiCode>,{' '}
            <EuiCode>text</EuiCode>, or <EuiCode>subdued</EuiCode> with the{' '}
            <EuiCode>color</EuiCode> prop. Or provide the prop directly to{' '}
            <strong>EuiListGroup</strong>.
          </p>
          <p>
            They also accept options for text size;{' '}
            <EuiCode language="ts">{"'xs' | 's' | 'm' | 'l'"}</EuiCode>.
          </p>
        </>
      ),
      demo: <ListGroupItemColor />,
      snippet: `<EuiListGroupItem
  label="Primary"
  color="primary"
  size="s"
/>`,
    },
    {
      title: 'Pinnable list group',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pinnableListGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: pinnableListGroupHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiPinnableListGroup</strong> is simply an extra wrapper
            around an{' '}
            <Link to="/display/list-group">
              <strong>EuiListGroup</strong>
            </Link>{' '}
            that provides visual indicators for <strong>pinning</strong>.
          </p>
          <p>
            Pinning is the concept that users can click a pin icon and add it to
            a subset of links (most likely shown in different list group). By
            providing an <EuiCode>onPinClick</EuiCode> handler, the component
            will automatically add the pin action to the item. However, the
            consuming application must manage the <EuiCode>listItems</EuiCode>
            and their <EuiCode>pinned</EuiCode> state.
          </p>
          <p>
            In order to get the full benefit of using{' '}
            <strong>EuiPinnableListGroup</strong>, the component only supports
            providing list items via the <EuiCode>listItem</EuiCode> prop and
            does not support <EuiCode>children</EuiCode>.
          </p>
        </>
      ),
      props: { EuiPinnableListGroup, EuiPinnableListGroupItem },
      demo: <PinnableListGroup />,
      snippet: `<EuiPinnableListGroup
  onPinClick={item => {}}
  listItems={[
    {
      label: 'A link',
      href: '#',
      pinned: true,
      isActive: true,
    },
  ]}
/>`,
    },
  ],
};
