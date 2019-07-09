import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiListGroup,
  EuiListGroupItem,
  EuiCode,
} from '../../../../src/components';

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

export const ListGroupExample = {
  title: 'List Group',
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
        <p>
          The <EuiCode>ListGroup</EuiCode> component is used to present &nbsp;
          <EuiCode>ListGroupItems</EuiCode> in a neatly formatted list. Use the
          &nbsp;<EuiCode>flush</EuiCode> and <EuiCode>bordered</EuiCode>{' '}
          properties for full-width and bordered presentations, respectively.
        </p>
      ),
      props: { EuiListGroup, EuiListGroupItem },
      demo: <ListGroup />,
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
        <p>
          Present <EuiCode>ListGroupItems</EuiCode> as links by providing an
          &nbsp;<EuiCode>href</EuiCode> value and change their appearance with
          the <EuiCode>size</EuiCode>, <EuiCode>isActive</EuiCode>, and
          <EuiCode>isDisabled</EuiCode> properties. As done in this example, the
          &nbsp;<EuiCode>ListGroup</EuiCode> component can also accept an array
          of items via the <EuiCode>listItems</EuiCode> property.
        </p>
      ),
      demo: <ListGroupLinks />,
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
          including <EuiCode>color</EuiCode>, <EuiCode>onClick</EuiCode>, &nbsp;
          <EuiCode>iconType</EuiCode>, and <EuiCode>alwaysShow</EuiCode>, and
          can be used for actions such as pinning, favoriting, or deleting an
          item.
        </p>
      ),
      demo: <ListGroupLinkActions />,
    },
    {
      title: 'Text truncation and wrapping ',
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
          By default, truncation occurs for long list items. In such cases a{' '}
          <EuiCode>title</EuiCode> attribute with a value matching the text
          content of the item is added for readability and accessibility. If{' '}
          <EuiCode>showToolTip</EuiCode> or <EuiCode>wrapLines</EuiCode> are
          used, the attribute will not be added.
        </p>
      ),
      demo: <ListGroupExtra />,
    },
  ],
};
