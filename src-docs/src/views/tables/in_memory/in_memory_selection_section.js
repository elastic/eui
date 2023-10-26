import React from 'react';
import { EuiCode, EuiSpacer } from '../../../../../src/components';

import { ConditionallyControlledDemo } from '../../tables/selection/selection_section';

import Controlled from './in_memory_selection_controlled';
const controlledSource = require('!!raw-loader!./in_memory_selection_controlled');

import Uncontrolled from './in_memory_selection_uncontrolled';
const uncontrolledSource = require('!!raw-loader!./in_memory_selection_uncontrolled');

export const selectionSection = {
  title: 'In-memory table selection',
  text: (
    <>
      <p>
        To enable selection, both the <EuiCode>itemId</EuiCode> and{' '}
        <EuiCode>selection</EuiCode> props must be passed. The following example
        shows how to use <strong>EuiInMemoryTable</strong> with both controlled
        and uncontrolled item selection. It also shows how you can display
        messages, errors and show loading indication.
      </p>
      <p>
        For uncontrolled usage, where selection changes are determined entirely
        by the user, you can set items to be selected initially by passing an
        array of items to an array of items to{' '}
        <EuiCode>selection.initialSelected</EuiCode>. You can also use{' '}
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
        controlledDemo={<Controlled />}
        uncontrolledDemo={<Uncontrolled />}
        controlledSource={controlledSource}
        uncontrolledSource={uncontrolledSource}
      />
    </>
  ),
};
