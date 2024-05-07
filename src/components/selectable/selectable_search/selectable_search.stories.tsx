/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import {
  disableStorybookControls,
  enableFunctionToggleControls,
} from '../../../../.storybook/utils';
import { EuiSelectableOption } from '../selectable_option';
import { createPartialStringEqualityOptionMatcher } from '../matching_options';
import {
  EuiSelectableSearch,
  _EuiSelectableSearchProps as EuiSelectableSearchProps,
} from './selectable_search';

const options: EuiSelectableOption[] = [
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
];

const meta: Meta<EuiSelectableSearchProps<{}>> = {
  title: 'Forms/EuiSelectable/EuiSelectableSearch',
  component: EuiSelectableSearch,
  argTypes: {
    name: { control: 'text' },
    placeholder: { control: 'text' },
    prepend: { control: 'text' },
    append: { control: 'text' },
  },
  args: {
    // set up for easier testing/QA
    name: '',
    placeholder: '',
    prepend: '',
    append: '',
    isPreFiltered: false,
    compressed: false,
    fullWidth: true,
    isClearable: true,
    isInvalid: false,
    isLoading: false,
  },
};
disableStorybookControls(meta, ['optionMatcher']);
enableFunctionToggleControls(meta, ['onChange']);

export default meta;
type Story = StoryObj<EuiSelectableSearchProps<{}>>;

export const Playground: Story = {
  args: {
    options,
    optionMatcher: createPartialStringEqualityOptionMatcher(),
  },
};
