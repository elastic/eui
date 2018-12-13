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
        &nbsp;<EuiCode>href</EuiCode> value. The <EuiCode>label</EuiCode> prop also
        accepts EUI components, such as <EuiCode>EuiText</EuiCode>, for more
        advanced use cases.
      </p>
    ),
    demo: <ListGroupLinks />,
  }],
};
