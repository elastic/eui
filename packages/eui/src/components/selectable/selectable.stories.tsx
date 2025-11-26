/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  enableFunctionToggleControls,
  hideStorybookControls,
} from '../../../.storybook/utils';

import { EuiSelectableOption } from './selectable_option';
import {
  EuiSelectable,
  EuiSelectableOnChangeEvent,
  EuiSelectableProps,
} from './selectable';

const toolTipProps = {
  toolTipContent: 'This is a tooltip!',
  toolTipProps: { position: 'left' as const },
  value: 4,
};

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

const meta: Meta<EuiSelectableProps> = {
  title: 'Forms/EuiSelectable',
  component: EuiSelectable,
  parameters: {
    codeSnippet: {
      // TODO: enable once render functions are supported
      skip: true,
    },
  },
  argTypes: {
    singleSelection: { control: 'radio', options: [true, false, 'always'] },
    emptyMessage: { control: 'text' },
    loadingMessage: { control: 'text' },
    noMatchesMessage: { control: 'text' },
    selectableScreenReaderText: { control: 'text' },
  },
  args: {
    searchable: false,
    singleSelection: false,
    isPreFiltered: false,
  },
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiSelectableProps>;

export const Playground: Story = {
  args: {
    options,
    // setting up for easier testing/QA
    allowExclusions: false,
    isLoading: false,
    emptyMessage: '',
    loadingMessage: '',
    noMatchesMessage: '',
    selectableScreenReaderText: '',
    listProps: {
      bordered: true,
    },
    searchable: false, // required for typing
  },
  render: ({ ...args }: EuiSelectableProps) => <StatefulSelectable {...args} />,
};
enableFunctionToggleControls(Playground, ['onChange', 'onActiveOptionChange']);

export const WithSearch: Story = {
  args: {
    options,
    searchable: true,
    // setting up for easier testing/QA
    searchProps: {
      'data-test-subj': 'selectableSearchHere',
      'aria-label': 'Filter options',
    },
  },
  render: ({ ...args }: EuiSelectableProps) => <StatefulSelectable {...args} />,
};

export const WithTooltip: Story = {
  parameters: {
    controls: {
      include: ['options', 'singleSelection', 'searchable'],
    },
  },
  args: {
    options: options.map((option, idx) => ({
      ...option,
      ...toolTipProps,
      value: idx,
    })),
    searchable: false,
  },
  render: ({ ...args }: EuiSelectableProps) => <StatefulSelectable {...args} />,
};

const StatefulSelectable = ({
  options,
  onChange,
  ...rest
}: EuiSelectableProps) => {
  const [selectableOptions, setOptions] = useState(options);

  const handleOnChange = (
    options: EuiSelectableOption[],
    event: EuiSelectableOnChangeEvent,
    changedOption: EuiSelectableOption
  ) => {
    setOptions(options);
    onChange?.(options, event, changedOption);
  };

  return (
    <EuiSelectable
      {...rest}
      options={selectableOptions}
      onChange={handleOnChange}
    >
      {(list, search) => (
        <>
          {search}
          {list}
        </>
      )}
    </EuiSelectable>
  );
};
