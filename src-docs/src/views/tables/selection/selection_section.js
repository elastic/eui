import React, { useState } from 'react';
import {
  EuiSplitPanel,
  EuiCode,
  EuiSwitch,
  EuiSpacer,
} from '../../../../../src/components';

import { GuideSectionTypes } from '../../../components';
import { GuideSectionCodeTypesMap } from '../../../components/guide_section/guide_section';
import { GuideSectionExampleTabs } from '../../../components/guide_section/guide_section_parts/guide_section_tabs';

import { EuiTableSelectionType } from '!!prop-loader!../../../../../src/components/basic_table/table_types';

import Uncontrolled from './selection_uncontrolled';
const uncontrolledSource = require('!!raw-loader!./selection_uncontrolled');

import Controlled from './selection_controlled';
const controlledSource = require('!!raw-loader!./selection_controlled');

// Reused by EuiInMemoryTable
export const ConditionallyControlledDemo = ({
  controlledDemo,
  uncontrolledDemo,
  controlledSource,
  uncontrolledSource,
}) => {
  const [isControlled, setIsControlled] = useState(false);

  return (
    <EuiSplitPanel.Outer hasBorder>
      <EuiSplitPanel.Inner color="subdued">
        <EuiSwitch
          label="Controlled selection"
          checked={isControlled}
          onChange={() => setIsControlled(!isControlled)}
        />
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner>
        {isControlled ? controlledDemo : uncontrolledDemo}
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner color="subdued" paddingSize="none">
        <GuideSectionExampleTabs
          tabs={[
            {
              ...GuideSectionCodeTypesMap.TSX,
              code: isControlled ? controlledSource : uncontrolledSource,
              type: GuideSectionTypes.TSX,
            },
            {
              ...GuideSectionCodeTypesMap.PROPS,
              props: { EuiTableSelectionType },
            },
          ]}
        />
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  );
};

export const section = {
  title: 'Adding selection to a table',
  text: (
    <>
      <p>
        The following example shows how to configure selection via the{' '}
        <EuiCode>selection</EuiCode> property. For uncontrolled usage, where
        selection changes are determined entirely by the user, you can set items
        to be selected initially by passing an array of items to an array of
        items to <EuiCode>selection.initialSelected</EuiCode>. You can also use{' '}
        <EuiCode>selected.onSelectionChange</EuiCode> to track or respond to the
        items that users select.
      </p>
      <p>
        To completely control table selection, use{' '}
        <EuiCode>selection.selected</EuiCode> instead (which requires passing{' '}
        <EuiCode>selected.onSelectionChange</EuiCode>). This can be useful if
        you want to handle selection in table based on user interaction with
        another part of the UI.
      </p>
    </>
  ),
  children: (
    <>
      <EuiSpacer />
      <ConditionallyControlledDemo
        uncontrolledDemo={<Uncontrolled />}
        uncontrolledSource={uncontrolledSource}
        controlledDemo={<Controlled />}
        controlledSource={controlledSource}
      />
    </>
  ),
};
