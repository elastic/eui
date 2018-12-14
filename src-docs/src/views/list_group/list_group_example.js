import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

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

export const ListGroupExample = {
  title: 'List Group',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: listGroupSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: listGroupHtml,
    }],
    text: (
      <p>
        The <EuiCode>ListGroup</EuiCode> component is used to present
        &nbsp;<EuiCode>ListGroupItems</EuiCode> in a neatly formatted list. Use the
        &nbsp;<EuiCode>flush</EuiCode> prop for a full-width, borderless alternative.
      </p>
    ),
    props: { EuiListGroup, EuiListGroupItem },
    demo: <ListGroup />,
  }, {
    title: 'List of links',
    source: [{
      type: GuideSectionTypes.JS,
      code: listGroupLinksSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: listGroupLinksHtml,
    }],
    text: (
      <p>
        Present <EuiCode>ListGropuItems</EuiCode> as links by providing an
        &nbsp;<EuiCode>href</EuiCode> value. The <EuiCode>label</EuiCode>
        property also accepts EUI components such as <EuiCode>EuiText</EuiCode>,
        for more advanced use cases.
      </p>
    ),
    demo: <ListGroupLinks />,
  }, {
    title: 'Links with actions',
    source: [{
      type: GuideSectionTypes.JS,
      code: listGroupLinkActionsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: listGroupLinkActionsHtml,
    }],
    text: (
      <p>
        Add a secondary action by supplying an <EuiCode>EuiButtonIcon</EuiCode>
        to the <EuiCode>linkAction</EuiCode> property.
      </p>
    ),
    demo: <ListGroupLinkActions />,
  }],
};
