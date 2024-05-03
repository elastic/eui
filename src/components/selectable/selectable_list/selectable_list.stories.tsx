/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  enableFunctionToggleControls,
  moveStorybookControlsToCategory,
} from '../../../../.storybook/utils';
import { EuiSelectableOption } from '../selectable_option';
import { EuiSelectableList, EuiSelectableListProps } from './selectable_list';

const options = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
  },
  {
    label: 'Enceladus is disabled',
    disabled: true,
  },
  {
    label: 'Mimas',
    checked: 'on',
  },
  {
    label: 'Dione',
  },
  {
    label: 'Iapetus',
    checked: 'on',
  },
  {
    label: 'Phoebe',
  },
  {
    label: 'Rhea',
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
  },
  {
    label: 'Tethys',
  },
  {
    label: 'Hyperion',
  },
] as EuiSelectableOption[];

const meta: Meta<EuiSelectableListProps<{}>> = {
  title: 'Forms/EuiSelectable/EuiSelectableList/EuiSelectableList',
  component: EuiSelectableList,
  argTypes: {
    height: { control: 'number' },
    isPreFiltered: { control: 'boolean' },
    singleSelection: { control: 'boolean' },
  },
  args: {
    textWrap: 'truncate',
    paddingSize: 's',
    onFocusBadge: true,
    showIcons: true,
    // set up for easier testing/QA
    listId: '',
    allowExclusions: false,
    bordered: false,
    isPreFiltered: false,
    isVirtualized: false,
    searchable: false,
    singleSelection: true,
  },
};
enableFunctionToggleControls(meta, ['onOptionClick', 'setActiveOptionIndex']);
moveStorybookControlsToCategory(meta, [
  'allowExclusions',
  'onFocusBadge',
  'paddingSize',
  'searchable',
  'showIcons',
  'textWrap',
]);

export default meta;
type Story = StoryObj<EuiSelectableListProps<{}>>;

export const Playground: Story = {
  args: {
    options,
    activeOptionIndex: 0,
    makeOptionId: (index) => `selectable_list_item-${index}`,
    // ensuring that onOptionClick triggers an action as it's
    // only called through setActiveOptionIndex callback
    setActiveOptionIndex: (index, callback) => {
      callback?.();
      action('setActiveOptionIndex')(index);
    },
  },
};
