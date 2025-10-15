/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ChangeEvent, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { hideStorybookControls } from '../../../../.storybook/utils';
import { useIsWithinMinBreakpoint } from '../../../services';
import { EuiForm } from '../form';
import { EuiFieldText } from '../field_text';
import { EuiIcon } from '../../icon';
import { EuiIconTip, EuiToolTip } from '../../tool_tip';
import { EuiInputPopover, EuiPopover } from '../../popover';
import { EuiButtonEmpty, EuiButtonIcon } from '../../button';
import { EuiText } from '../../text';
import { EuiFormRow } from '../form_row';
import { EuiSelectable, EuiSelectableOption } from '../../selectable';
import { EuiNotificationBadge } from '../../badge';

import { EuiFieldSearch } from '../field_search';
import {
  EuiFormControlButton,
  EuiFormControlButtonProps,
} from '../form_control_button';
import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from './form_control_layout';

const meta: Meta<EuiFormControlLayoutProps> = {
  title: 'Forms/EuiForm/EuiFormControlLayout',
  component: EuiFormControlLayout,
  argTypes: {
    append: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="faceHappy" />,
        text: 'Appended',
        undefined: undefined,
      },
    },
    prepend: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="faceHappy" />,
        text: 'Prepended',
        undefined: undefined,
      },
    },
  },
  args: {
    fullWidth: false,
    iconsPosition: 'absolute',
    // set up for easier testing/QA
    compressed: false,
    isDisabled: false,
    isDropdown: false,
    isInvalid: false,
    isLoading: false,
    readOnly: false,
    icon: '',
    inputId: '',
  },
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiFormControlLayoutProps>;

export const Playground: Story = {
  // Several props need to be manually applied to the child EuiFieldText as well to render correctly
  render: ({ children, ...args }) => {
    const { readOnly, isDisabled, fullWidth, compressed } = args;
    const childProps = {
      readOnly,
      isDisabled,
      fullWidth,
      compressed,
      isInvalid: args.isInvalid,
    };
    return (
      <EuiFormControlLayout {...args}>
        <EuiFieldText
          type="text"
          aria-label="EuiFormControlLayout demo"
          controlOnly
          {...childProps}
        />
      </EuiFormControlLayout>
    );
  },
};

export const IconShape: Story = {
  parameters: {
    controls: {
      include: [
        'icon',
        'isInvalid',
        'isLoading',
        'isDisabled',
        'iconsPosition',
        'clear',
      ],
    },
  },
  args: {
    children: (
      <EuiFieldText
        controlOnly
        aria-label="EuiFormControlLayout icon and clear API demo"
      />
    ),
    icon: {
      type: 'faceHappy',
      side: 'right',
    },
    clear: {
      size: 'm',
    },
  },
};

export const FormControlButton: Story = {
  parameters: {
    controls: {
      exclude: ['fullWidth', 'isDelimited', 'readOnly', 'wrapperProps'],
    },
  },
  render: function Render(args) {
    const { isInvalid, isDisabled, compressed } = args;

    return (
      <EuiForm>
        <EuiFormRow label="With EuiFormControlButton">
          <EuiFormControlLayout
            {...args}
            clear={{ onClick: action('onClear') }}
          >
            <EuiFormControlButton
              compressed={compressed}
              isDisabled={isDisabled}
              isInvalid={isInvalid}
              value={_options.map((opt) => opt.label).join(', ')}
              onClick={action('onClick')}
            >
              <EuiNotificationBadge color="success">
                {_options.length}
              </EuiNotificationBadge>
            </EuiFormControlButton>
          </EuiFormControlLayout>
        </EuiFormRow>

        <EuiFormRow label="With EuiFormControlButton and EuiPopover">
          <FormControlButtonWithPopover />
        </EuiFormRow>
      </EuiForm>
    );
  },
};

export const AppendPrepend: Story = {
  tags: ['vrt-only'],
  render: function Render() {
    const isDesktop = useIsWithinMinBreakpoint('xl');
    return (
      <EuiForm
        fullWidth={isDesktop}
        css={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        <EuiFieldText
          placeholder="String & text in a tooltip"
          prepend="String"
          append={
            <EuiToolTip content="content">
              <EuiText size="s">Tooltip</EuiText>
            </EuiToolTip>
          }
          autoFocus
        />
        <EuiFieldText
          placeholder="XS empty button in a popover & tooltip"
          prepend={
            <EuiPopover
              button={
                <EuiButtonEmpty size="xs" iconType="arrowDown" iconSide="right">
                  Popover
                </EuiButtonEmpty>
              }
              closePopover={() => {}}
            />
          }
          append={
            <EuiToolTip content="content">
              <EuiButtonEmpty size="xs">Tooltip</EuiButtonEmpty>
            </EuiToolTip>
          }
        />
        <EuiFieldText
          placeholder="XS empty buttons with icons"
          prepend={
            <EuiButtonEmpty
              role="button"
              size="xs"
              iconType="arrowDown"
              iconSide="right"
              aria-label="Calendar dropdown"
            >
              <EuiIcon type="calendar" />
            </EuiButtonEmpty>
          }
          append={
            <EuiButtonEmpty size="xs" iconType="gear">
              Tooltip
            </EuiButtonEmpty>
          }
        />
        <EuiFieldText
          placeholder="Icon & button icon"
          prepend={<EuiIcon type="vector" />}
          append={<EuiButtonIcon iconType="gear" aria-label="Gear this" />}
        />
        <EuiFieldText
          placeholder="Icons in buttons and popovers and tooltips"
          prepend={[
            <EuiIcon type="vector" />,
            <EuiButtonIcon iconType="gear" aria-label="Gear this" />,
          ]}
          append={[
            <EuiPopover
              button={<EuiButtonIcon iconType="gear" aria-label="Gear this" />}
              closePopover={() => {}}
            />,
            <EuiIconTip content="content" />,
          ]}
        />
        <EuiFieldText
          placeholder="Icon button in popover & tooltip"
          append={
            <EuiPopover
              button={
                <EuiButtonIcon iconType="arrowDown" aria-label="Popover" />
              }
              closePopover={() => {}}
            />
          }
          prepend={
            <EuiToolTip content="content">
              <EuiButtonIcon iconType="gear" aria-label="Gear this" />
            </EuiToolTip>
          }
        />
        <EuiFieldText
          placeholder="Icon and string & string and icon button"
          prepend={[<EuiIcon type="vector" />, 'String']}
          append={[
            'String',
            <EuiButtonIcon iconType="gear" aria-label="Gear this" />,
          ]}
        />
        <EuiFieldText
          placeholder="String and button icon in tooltip & button icon in popover and string"
          prepend={[
            'String',
            <EuiToolTip content="content">
              <EuiButtonIcon iconType="gear" aria-label="Gear this" />
            </EuiToolTip>,
          ]}
          append={[
            <EuiPopover
              button={<EuiButtonIcon iconType="gear" aria-label="Gear this" />}
              closePopover={() => {}}
            />,
            'String',
          ]}
        />
        <EuiFieldText
          compressed={true}
          placeholder="Compressed"
          prepend="String"
          append={[
            'String',
            <EuiButtonIcon iconType="gear" aria-label="Gear this" />,
          ]}
        />
        <EuiFieldText
          disabled={true}
          placeholder="Disabled"
          prepend="String"
          append={[
            <EuiPopover
              button={<EuiButtonIcon iconType="gear" aria-label="Gear this" />}
              closePopover={() => {}}
            />,
          ]}
        />
        <EuiFieldText
          readOnly={true}
          placeholder="Readonly"
          prepend={
            <EuiPopover
              button={<EuiButtonIcon iconType="gear" aria-label="Gear this" />}
              closePopover={() => {}}
            />
          }
          append="String"
        />

        <EuiFormControlLayout append="String" prepend="String">
          <EuiFormControlButton placeholder="EuiFormControlButton" />
        </EuiFormControlLayout>

        <FormControlButtonWithPopover
          placeholder="EuiFormControlButton with EuiPopover"
          append="String"
          prepend="String"
          fullWidth={isDesktop}
        />
      </EuiForm>
    );
  },
};

export const HighContrast: Story = {
  ...AppendPrepend,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};

export const HighContrastDarkMode: Story = {
  ...AppendPrepend,
  tags: ['vrt-only'],
  globals: { highContrastMode: true, colorMode: 'dark' },
};

/* components */

const _options: EuiSelectableOption[] = [
  {
    label: 'Titan',
  },
  {
    label: 'Enceladus',
  },
  {
    label: 'Mimas',
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
];

const FormControlButtonWithPopover = (
  args: EuiFormControlLayoutProps & EuiFormControlButtonProps
) => {
  const { isInvalid, isDisabled, compressed, placeholder, fullWidth } = args;

  const formControlButtonProps = {
    isInvalid,
    isDisabled,
    compressed,
  } as EuiFormControlButtonProps;

  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState(_options);
  const [selectedOptions, setSelectedOptions] = useState<EuiSelectableOption[]>(
    []
  );
  const [buttonLabel, setButtonLabel] = useState('');

  const panelTitle = 'Panel title';
  const popoverId = 'popover-id';

  const getSelectedOptions = (options: EuiSelectableOption[]) => {
    return options
      .map((option) => (option.checked === 'on' ? option : null))
      .filter((option) => option !== null);
  };

  const handleOnSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    const filteredOptions = _options.filter((opt) => {
      return opt.label.toLowerCase().includes(e.target.value);
    });

    setOptions(filteredOptions);
  };

  const handleOnChange = (options: EuiSelectableOption[]) => {
    setOptions(options);
    const _selectedOptions = getSelectedOptions(options);
    setSelectedOptions(_selectedOptions);
    setButtonLabel(_selectedOptions.map((opt) => opt.label).join(', '));
  };

  const handleOnClear = () => {
    setOptions(_options);
    setSelectedOptions([]);
    setButtonLabel('');
  };

  const formControlButton = (
    <EuiFormControlButton
      {...formControlButtonProps}
      value={buttonLabel ?? ''}
      placeholder={placeholder || 'Placeholder'}
      role="combobox"
      onClick={() => setPopoverOpen(!isPopoverOpen)}
      aria-expanded={isPopoverOpen}
      aria-controls={popoverId}
    >
      {(selectedOptions.length > 0 || options.length > 0) && (
        <EuiNotificationBadge
          color={
            selectedOptions.length > 0 && !isDisabled ? 'success' : 'subdued'
          }
        >
          {selectedOptions.length > 0 ? selectedOptions.length : options.length}
        </EuiNotificationBadge>
      )}
    </EuiFormControlButton>
  );

  return (
    <EuiFormControlLayout {...args} clear={{ onClick: handleOnClear }}>
      <EuiInputPopover
        ownFocus
        input={formControlButton}
        hasArrow={false}
        repositionOnScroll
        isOpen={isPopoverOpen}
        panelPaddingSize="none"
        panelMinWidth={200}
        initialFocus="#panel-search-input"
        closePopover={() => setPopoverOpen(false)}
        panelProps={{
          title: panelTitle,
          'aria-label': panelTitle,
        }}
        fullWidth={fullWidth}
      >
        <EuiFormRow fullWidth>
          <EuiFieldSearch
            fullWidth
            onChange={handleOnSearch}
            value={searchValue}
            id="panel-search-input"
            placeholder="search field"
          />
        </EuiFormRow>

        <EuiSelectable
          options={options}
          onChange={handleOnChange}
          id={popoverId}
        >
          {(list, search) => (
            <>
              {search}
              {list}
            </>
          )}
        </EuiSelectable>
      </EuiInputPopover>
    </EuiFormControlLayout>
  );
};
