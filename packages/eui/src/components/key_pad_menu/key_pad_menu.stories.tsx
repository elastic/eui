/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EuiKeyPadMenu, EuiKeyPadMenuProps } from './key_pad_menu';
import { EuiKeyPadMenuItem, EuiKeyPadMenuItemProps } from './key_pad_menu_item';
import { EuiIcon } from '../icon';

const meta: Meta<EuiKeyPadMenuProps> = {
  title: 'Navigation/EuiKeyPadMenu/EuiKeyPadMenu',
  component: EuiKeyPadMenu,
};

export default meta;
type Story = StoryObj<EuiKeyPadMenuProps>;

const onChange = action('onChange');

const StatefulKeyPadMenu = (
  props: EuiKeyPadMenuProps & { checkableType: 'single' | 'multi' }
) => {
  const { children, checkableType, ...rest } = props;
  const firstItem = Array.isArray(children) ? children[0] : children;
  const firstItemId: string = firstItem.props?.id ?? '';

  const [selectedItem, setSelectedItem] = useState(firstItemId);
  const [selectedItems, setSelectedItems] = useState([firstItemId]);

  const handleOnChange = (id: string) => {
    if (checkableType === 'single') {
      setSelectedItem(id);
    } else {
      setSelectedItems((selectedItems): string[] => {
        if (selectedItems.includes(id)) {
          return selectedItems.filter((itemId) => itemId !== id);
        }

        return [...selectedItems, id];
      });
    }
  };

  return (
    <EuiKeyPadMenu {...rest}>
      {React.Children.map(children, (child) => {
        if (!child) return null;

        return (
          React.isValidElement(child) &&
          React.cloneElement(child, {
            onChange: (args: any) => {
              handleOnChange(child.props.id);
              onChange(args);
            },
            isSelected:
              checkableType === 'single'
                ? selectedItem === child.props.id
                : selectedItems.includes(child.props.id),
          } as Partial<EuiKeyPadMenuItemProps>)
        );
      })}
    </EuiKeyPadMenu>
  );
};

export const Playground: Story = {
  args: {
    children: [
      <EuiKeyPadMenuItem label="Dashboard">
        <EuiIcon type="dashboardApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem label="Canvas">
        <EuiIcon type="canvasApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem label="Lens">
        <EuiIcon type="lensApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem label="Visualize">
        <EuiIcon type="visualizeApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem label="Graph">
        <EuiIcon type="graphApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem label="Advanced Settings">
        <EuiIcon type="advancedSettingsApp" size="l" />
      </EuiKeyPadMenuItem>,
    ],
  },
};

export const CheckableSingle: Story = {
  args: {
    children: [
      <EuiKeyPadMenuItem
        id="keyPadMenuItem-0"
        label="Dashboard"
        checkable="single"
        name="single-checkable-radio"
        onChange={onChange}
      >
        <EuiIcon type="dashboardApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        id="keyPadMenuItem-1"
        label="Canvas"
        checkable="single"
        name="single-checkable-radio"
        onChange={onChange}
        isSelected
      >
        <EuiIcon type="canvasApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        id="keyPadMenuItem-2"
        label="Lens"
        checkable="single"
        name="single-checkable-radio"
        onChange={onChange}
      >
        <EuiIcon type="lensApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        id="keyPadMenuItem-3"
        label="Visualize"
        checkable="single"
        name="single-checkable-radio"
        isDisabled
        onChange={onChange}
      >
        <EuiIcon type="visualizeApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        id="keyPadMenuItem-4"
        label="Graph"
        checkable="single"
        name="single-checkable-radio"
        onChange={onChange}
      >
        <EuiIcon type="graphApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        id="keyPadMenuItem-5"
        label="Advanced Settings"
        checkable="single"
        name="single-checkable-radio"
        onChange={onChange}
      >
        <EuiIcon type="advancedSettingsApp" size="l" />
      </EuiKeyPadMenuItem>,
    ],
    checkable: {
      legend: 'Single checkable EuiKeyPadMenu',
    },
  },
  render: (args) => <StatefulKeyPadMenu {...args} checkableType="single" />,
};

export const CheckableMulti: Story = {
  args: {
    children: [
      <EuiKeyPadMenuItem
        id="keyPadMenuItem-0"
        label="Dashboard"
        checkable="multi"
        onChange={onChange}
      >
        <EuiIcon type="dashboardApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        id="keyPadMenuItem-1"
        label="Canvas"
        checkable="multi"
        onChange={onChange}
        isSelected
      >
        <EuiIcon type="canvasApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        id="keyPadMenuItem-2"
        label="Lens"
        checkable="multi"
        onChange={onChange}
      >
        <EuiIcon type="lensApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        id="keyPadMenuItem-3"
        label="Visualize"
        checkable="multi"
        isDisabled
        onChange={onChange}
      >
        <EuiIcon type="visualizeApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        id="keyPadMenuItem-4"
        label="Graph"
        checkable="multi"
        onChange={onChange}
      >
        <EuiIcon type="graphApp" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        id="keyPadMenuItem-5"
        label="Advanced Settings"
        checkable="multi"
        onChange={onChange}
      >
        <EuiIcon type="advancedSettingsApp" size="l" />
      </EuiKeyPadMenuItem>,
    ],
    checkable: {
      legend: 'Multi checkable EuiKeyPadMenu',
    },
  },
  render: (args) => <StatefulKeyPadMenu {...args} checkableType="multi" />,
};

export const HighContrast: Story = {
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
  args: {
    children: [
      <EuiKeyPadMenuItem label="Button" autoFocus>
        <EuiIcon type="grid" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem label="Link" href="#">
        <EuiIcon type="link" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        label="Badge"
        betaBadgeLabel="External"
        betaBadgeTooltipContent="This module is an external app."
        betaBadgeIconType="popout"
      >
        <EuiIcon type="beta" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem label="Selected" isSelected>
        <EuiIcon type="faceHappy" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem label="Disabled" isDisabled>
        <EuiIcon type="faceSad" size="l" />
      </EuiKeyPadMenuItem>,
      <EuiKeyPadMenuItem
        label="Selected and disabled"
        isSelected
        isDisabled
        href="#"
      >
        <EuiIcon type="faceNeutral" size="l" />
      </EuiKeyPadMenuItem>,
    ],
  },
};
