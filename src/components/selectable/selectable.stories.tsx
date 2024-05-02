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
import { ToolTipPositions } from '../tool_tip';
import { EuiSelectableOption } from './selectable_option';
import {
  EuiSelectable,
  EuiSelectableOnChangeEvent,
  EuiSelectableProps,
} from './selectable';

const toolTipProps = {
  toolTipContent: 'This is a tooltip!',
  toolTipProps: { position: 'left' as ToolTipPositions },
  value: 4,
};

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

const meta: Meta<EuiSelectableProps> = {
  title: 'Forms/EuiSelectable',
  component: EuiSelectable,
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
enableFunctionToggleControls(meta, ['onChange', 'onActiveOptionChange']);
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiSelectableProps>;

export const Playground: Story = {
  args: {
    options,
    // cast as any to align with earier teasing/QA
    children: 'list' as any,
    searchProps: {
      'data-test-subj': 'selectableSearchHere',
    },
    // setting up for easier testing/QA
    allowExclusions: false,
    isLoading: false,
    emptyMessage: '',
    loadingMessage: '',
    noMatchesMessage: '',
    selectableScreenReaderText: '',
  },
  render: ({ ...args }: EuiSelectableProps) => <StatefulSelectable {...args} />,
};

export const WithTooltip: Story = {
  args: {
    options: options.map((option) => ({ ...option, ...toolTipProps })),
    searchable: false,
  },
  render: ({ ...args }: EuiSelectableProps) => <StatefulSelectable {...args} />,
};
// hide props as they are not relevant for testing the story args
hideStorybookControls(WithTooltip, [
  'allowExclusions',
  'children',
  'onChange',
  'isLoading',
  'renderOption',
  'emptyMessage',
  'errorMessage',
  'height',
  'isPreFiltered',
  'listProps',
  'loadingMessage',
  'noMatchesMessage',
  'onActiveOptionChange',
  'selectableScreenReaderText',
  'searchProps',
]);

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
