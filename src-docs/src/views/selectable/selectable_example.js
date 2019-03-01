import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiSelectable,
} from '../../../../src/components';

import Selectable from './selectable';
const selectableSource = require('!!raw-loader!./selectable');
const selectableHtml = renderToHtml(Selectable);

export const SelectableExample = {
  title: 'Selectable',
  sections: [{
    title: 'Selectable',
    source: [{
      type: GuideSectionTypes.JS,
      code: selectableSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: selectableHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiSelectable</EuiCode> component.
      </p>
    ),
    props: { EuiSelectable },
    demo: <Selectable />,
  }],
};
