import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiSelectable, EuiText, EuiSpacer } from '../../../../src/components';

import Selectable from './selectable';
const selectableSource = require('!!raw-loader!./selectable');
const selectableHtml = renderToHtml(Selectable);

import SelectablePopover from './selectable_popover';
const selectablePopoverSource = require('!!raw-loader!./selectable_popover');
const selectablePopoverHtml = renderToHtml(SelectablePopover);

export const SelectableExample = {
  title: 'Selectable',
  intro: (
    <EuiText>
      <p>
        EuiSelectable aims to ___ the pattern of a selectable list with or without
        search. It is the same concept used in EuiComboBox and EuiFilterGroup.
        This is not for use primarily with navigation but can be used to simplify
        the construction of popover navigational menus.
      </p>
      <EuiSpacer />
    </EuiText>
  ),
  sections: [
    {
      title: 'Selectable',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableHtml,
        },
      ],
      text: (
        <p>
          Description needed: how to use the <EuiCode>EuiSelectable</EuiCode>{' '}
          component.
        </p>
      ),
      props: { EuiSelectable },
      demo: <Selectable />,
    },
    {
      title: 'Selectable list in a popover',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectablePopoverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectablePopoverHtml,
        },
      ],
      text: (
        <p>
          Description needed: how to use the <EuiCode>EuiSelectable</EuiCode>{' '}
          component.
        </p>
      ),
      props: { EuiSelectable },
      demo: <SelectablePopover />,
    },
  ],
};
