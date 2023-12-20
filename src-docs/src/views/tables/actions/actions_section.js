import React from 'react';

import { EuiBasicTable, EuiCode } from '../../../../../src/components';

import { GuideSectionTypes } from '../../../components';

import { EuiTableActionsColumnType } from '!!prop-loader!../../../../../src/components/basic_table/table_types';
import { CustomItemAction } from '!!prop-loader!../../../../../src/components/basic_table/action_types';
import { DefaultItemActionProps as DefaultItemAction } from '../props/props';

import Table from './actions';
const source = require('!!raw-loader!./actions');

export const section = {
  title: 'Adding actions to table',
  source: [
    {
      type: GuideSectionTypes.TSX,
      code: source,
    },
  ],
  text: (
    <>
      <p>
        The following example demonstrates &quot;actions&quot; columns. These
        are special columns where you define per-row, item level actions. The
        most basic action you might define is a type <EuiCode>button</EuiCode>{' '}
        or <EuiCode>icon</EuiCode> though you can always make your own custom
        actions as well.
      </p>
      <p>Actions enforce some strict UI/UX guidelines:</p>
      <ul>
        <li>
          There can only be up to 2 actions visible per row. When more than two
          actions are defined, the first 2 <EuiCode>isPrimary</EuiCode> actions
          will stay visible, an ellipses icon button will hold all actions in a
          single popover.
        </li>
        <li>
          Actions change opacity when user hovers over the row with the mouse.
          When more than 2 actions are supplied, only the ellipses icon button
          stays visible at all times.
        </li>
        <li>
          When one or more table row(s) are selected, all item actions are
          disabled. Users should be expected to use some bulk action outside the
          individual table rows instead.
        </li>
      </ul>
    </>
  ),
  components: { EuiBasicTable },
  props: { EuiTableActionsColumnType, DefaultItemAction, CustomItemAction },
  demo: <Table />,
};
