/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  enableFunctionToggleControls,
  moveStorybookControlsToCategory,
} from '../../../../.storybook/utils';
import { euiTextTruncate } from '../../../global_styling';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiIcon } from '../../icon';
import { EuiText } from '../../text';
import { EuiBadge } from '../../badge';
import { EuiButtonIcon } from '../../button';
import { EuiSelectableOption } from '../selectable_option';

import { EuiSelectableList, EuiSelectableListProps } from './selectable_list';

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

const meta: Meta<EuiSelectableListProps<{}>> = {
  title: 'Forms/EuiSelectable/Subcomponents/EuiSelectableList',
  component: EuiSelectableList,
  argTypes: {
    height: { control: 'number' },
    isPreFiltered: { control: 'boolean' },
    singleSelection: { control: 'boolean' },
  },
  args: {
    textWrap: 'truncate',
    onFocusBadge: false,
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
moveStorybookControlsToCategory(
  meta,
  ['allowExclusions', 'onFocusBadge', 'searchable', 'showIcons', 'textWrap'],
  'EuiSelectableListItem props'
);

export default meta;
type Story = StoryObj<EuiSelectableListProps<{}>>;

export const Playground: Story = {
  args: {
    options,
    activeOptionIndex: 0,
    makeOptionId: (index) => `selectable_list_item-${index}`,
  },
  render: (args: EuiSelectableListProps<{}>) => (
    <StatefulSelectableList {...args} />
  ),
};

export const ScrollableWithoutVirtualization: Story = {
  args: {
    options,
    activeOptionIndex: 0,
    makeOptionId: (index) => `selectable_list_item-${index}`,
    height: 200,
  },
  render: (args: EuiSelectableListProps<{}>) => (
    <StatefulSelectableList {...args} />
  ),
};

export const ScrollableWithVirtualization: Story = {
  args: {
    options,
    activeOptionIndex: 0,
    makeOptionId: (index) => `selectable_list_item-${index}`,
    isVirtualized: true,
    rowHeight: 32,
  },
  render: (args: EuiSelectableListProps<{}>) => (
    <StatefulSelectableList {...args} />
  ),
};

export const MultiSelection: Story = {
  parameters: {
    controls: {
      include: ['singleSelection', 'allowExclusions', 'showIcons'],
    },
  },
  args: {
    options: [
      { ...options[0], checked: 'on' },
      ...options.slice(1, options.length - 1),
    ],
    activeOptionIndex: 0,
    makeOptionId: (index) => `selectable_list_item-${index}`,
    singleSelection: false,
  },
  render: (args: EuiSelectableListProps<{}>) => (
    <StatefulSelectableList {...args} />
  ),
};

export const Groups: Story = {
  parameters: {
    controls: {
      include: ['options'],
    },
  },
  args: {
    options: [
      { label: 'Group 1', isGroupLabel: true },
      ...[...options].splice(0, 4),
      {
        label: 'Group 2',
        isGroupLabel: true,
        prepend: (
          <EuiIcon
            type="warning"
            css={({ euiTheme }) => ({ marginRight: euiTheme.size.s })}
          />
        ),
        append: (
          <EuiFlexItem css={{ alignItems: 'flex-end' }}>(append)</EuiFlexItem>
        ),
      },
      ...[...options].splice(4, options.length),
    ],
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

interface MoonOptionData {
  description?: string;
}

type OptionAsRendered = Omit<EuiSelectableOption<MoonOptionData>, 'data'> &
  MoonOptionData;

const sharedOptionProps = {
  prepend: <EuiIcon type="info" />,
  append: (
    <>
      <EuiBadge color="hollow">Badge</EuiBadge>
      <EuiButtonIcon color="text" iconType="arrowRight" />
    </>
  ),
};

const optionsWithCustomData: Array<EuiSelectableOption<MoonOptionData>> = [
  {
    label: 'Titan Titan Titan Titan Titan Titan Titan',
    ...sharedOptionProps,
    data: {
      description: 'Largest moon of Saturn, dense atmosphere.',
    },
  },
  {
    label: 'Enceladus',
    ...sharedOptionProps,
    data: {
      description: 'Ice-covered; geysers at south pole.',
    },
    checked: 'on',
  },
  {
    label: 'Mimas',
    ...sharedOptionProps,
    data: {
      description: 'Small, heavily cratered; “Death Star” moon.',
    },
  },
  {
    label: 'Dione',
    ...sharedOptionProps,
    data: {
      description: 'Icy surface, wispy streaks.',
    },
  },
  {
    label: 'Iapetus',
    ...sharedOptionProps,
    data: {
      description: 'Two-tone coloration, equatorial ridge.',
    },
  },
];

const customListItemRenderOption = (
  option: OptionAsRendered,
  _searchValue: string
) => (
  <>
    <EuiText
      size="s"
      css={css`
        ${euiTextTruncate()}
      `}
    >
      {option.label}
    </EuiText>
    {option.description != null && (
      <EuiText
        size="xs"
        color="subdued"
        css={css`
          ${euiTextTruncate()}
        `}
      >
        {option.description}
      </EuiText>
    )}
  </>
);

export const CustomContentListItems: Story = {
  parameters: {
    controls: {
      include: ['allowExclusions', 'showIcons'],
    },
    codeSnippet: {
      skip: true,
    },
  },
  args: {
    options: optionsWithCustomData,
    activeOptionIndex: 0,
    makeOptionId: (index) => `selectable_list_item-${index}`,
    showIcons: true,
    // Adjusts height for custom content
    // See: https://eui.elastic.co/docs/components/forms/selection/selectable/#custom-content
    rowHeight: 52,
  },
  render: function Render(args: EuiSelectableListProps<{}>) {
    return (
      <EuiFlexGroup direction="column" gutterSize="l">
        <StatefulSelectableList
          {...args}
          singleSelection={true}
          renderOption={customListItemRenderOption}
        />
        <StatefulSelectableList
          {...args}
          singleSelection={false}
          renderOption={customListItemRenderOption}
        />
      </EuiFlexGroup>
    );
  },
};

const StatefulSelectableList = (args: EuiSelectableListProps<{}>) => {
  const [optionsState, setOptionsState] = useState<EuiSelectableOption[]>(
    () => [...args.options]
  );
  const [activeOptionIndex, setActiveOptionIndexState] = useState(
    args.activeOptionIndex ?? 0
  );

  return (
    <EuiSelectableList
      {...args}
      options={optionsState}
      activeOptionIndex={activeOptionIndex}
      makeOptionId={(index) => `selectable_list_item-${index}`}
      listId={args.listId ?? ''}
      searchValue={args.searchValue ?? ''}
      onOptionClick={(updatedOptions, event, changedOption) => {
        setOptionsState(updatedOptions);
        action('onOptionClick')(updatedOptions, event, changedOption);
      }}
      setActiveOptionIndex={(index, callback) => {
        setActiveOptionIndexState(index);
        callback?.();
        action('setActiveOptionIndex')(index);
      }}
    />
  );
};
