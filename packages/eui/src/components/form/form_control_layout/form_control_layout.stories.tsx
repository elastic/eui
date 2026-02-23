/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ChangeEvent, useState } from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { hideStorybookControls } from '../../../../.storybook/utils';
import { useIsWithinMinBreakpoint } from '../../../services';
import { EuiForm } from '../form';
import { EuiFieldText } from '../field_text';
import { EuiIcon } from '../../icon';
import { EuiToolTip } from '../../tool_tip';
import { EuiInputPopover, EuiPopover } from '../../popover';
import { EuiButtonEmpty, EuiButtonIcon } from '../../button';
import { EuiText } from '../../text';
import { EuiFormRow } from '../form_row';
import { EuiSelectable, EuiSelectableOption } from '../../selectable';
import { EuiNotificationBadge } from '../../badge';
import { EuiCopy } from '../../copy';
import { EuiFlexGroup } from '../../flex';
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
} from '../../drag_and_drop';
import { EuiFormLabel } from '../form_label';
import { EuiFilterButton } from '../../filter_group';

import { EuiFieldSearch } from '../field_search';
import {
  EuiFormControlButton,
  EuiFormControlButtonProps,
} from '../form_control_button';
import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from './form_control_layout';
import { EuiFormAppend, EuiFormPrepend } from './append_prepend';
import { mathWithUnits, UseEuiTheme } from '@elastic/eui-theme-common';

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
      disabled: isDisabled,
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
    return (
      <EuiForm>
        <EuiFormRow label="With EuiFormControlButton">
          <EuiFormControlLayout
            {...args}
            clear={{ onClick: action('onClear') }}
          >
            <EuiFormControlButton
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
          <FormControlButtonWithPopover
            {...(args as FormControlButtonWithPopoverProps)}
          />
        </EuiFormRow>
      </EuiForm>
    );
  },
};

export const FormControlButtonKitchensink: Story = {
  tags: ['vrt-only'],
  parameters: {
    controls: {
      exclude: ['fullWidth', 'isDelimited', 'readOnly', 'wrapperProps'],
    },
  },
  render: function Render(args) {
    const isDesktop = useIsWithinMinBreakpoint('xl');

    const renderContent = (compressed: boolean) => {
      const commonProps = {
        ...args,
        compressed,
      };

      return (
        <EuiForm
          fullWidth={isDesktop}
          css={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <EuiFormControlLayout
            {...commonProps}
            append="String"
            prepend="String"
          >
            <EuiFormControlButton placeholder="EuiFormControlButton" />
          </EuiFormControlLayout>

          <EuiFormControlLayout
            {...commonProps}
            append="String"
            prepend="String"
          >
            <EuiFormControlButton
              placeholder="EuiFormControlButton"
              autoFocus // forcing focus styles for VRT
            />
          </EuiFormControlLayout>

          <EuiFormControlLayout
            {...commonProps}
            append="String"
            prepend="String"
            isDisabled
          >
            <EuiFormControlButton placeholder="EuiFormControlButton" />
          </EuiFormControlLayout>

          <EuiFormControlLayout
            {...commonProps}
            append="String"
            prepend="String"
            readOnly
          >
            <EuiFormControlButton placeholder="EuiFormControlButton" />
          </EuiFormControlLayout>

          <EuiFormControlLayout
            {...commonProps}
            append="String"
            prepend="String"
            isInvalid
          >
            <EuiFormControlButton placeholder="EuiFormControlButton" />
          </EuiFormControlLayout>
        </EuiForm>
      );
    };

    return (
      <EuiFlexGroup>
        {renderContent(false)}
        {renderContent(true)}
      </EuiFlexGroup>
    );
  },
};

export const AppendPrepend: Story = {
  parameters: {
    controls: {
      include: ['isDisabled', 'isInvalid', 'isLoading', 'readOnly'],
    },
  },
  render: function Render(args) {
    const isDesktop = useIsWithinMinBreakpoint('xl');

    const renderContent = (compressed: boolean = false) => {
      const idBase = `input-${compressed ? 'compressed' : ''}`;

      const commonProps = {
        ...args,
        disabled: args.isDisabled ?? false,
        compressed: compressed ?? args.compressed,
      };

      return (
        <EuiForm
          fullWidth={isDesktop}
          css={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <EuiFieldText
            {...commonProps}
            placeholder="Text field"
            id={`${idBase}-0`}
            prepend="String"
            append={<EuiFormAppend label="String" iconLeft="gear" inputId="" />}
            autoFocus
          />

          <EuiFieldText
            {...commonProps}
            placeholder="Text field"
            id={`${idBase}-1`}
            prepend={<EuiFormPrepend label="String" iconRight="gear" />}
            append={
              <EuiFormAppend
                element="button"
                label="String"
                iconLeft="gear"
                onClick={action('onClick')}
              />
            }
          />

          <EuiFieldText
            {...commonProps}
            placeholder="Text field"
            id={`${idBase}-2`}
            prepend={
              <EuiFormPrepend
                label="String"
                iconLeft="vectorSquare"
                iconRight="gear"
              />
            }
            append={
              <EuiFormAppend
                element="button"
                label="String"
                iconLeft="gear"
                iconRight="vectorSquare"
                onClick={action('onClick')}
              />
            }
          />

          <EuiFieldText
            placeholder="Text field"
            id={`${idBase}-3`}
            {...commonProps}
            prepend={
              <EuiFormPrepend
                label="String"
                iconLeft="vectorSquare"
                iconRight="gear"
              >
                <EuiNotificationBadge color="subdued">1</EuiNotificationBadge>
              </EuiFormPrepend>
            }
            append={
              <EuiFormAppend
                element="button"
                label="String"
                iconLeft="gear"
                iconRight="vectorSquare"
                onClick={action('onClick')}
              >
                <EuiNotificationBadge>1</EuiNotificationBadge>
              </EuiFormAppend>
            }
          />

          <EuiFieldText
            {...commonProps}
            placeholder="Text field"
            id={`${idBase}-4`}
            prepend={
              <EuiToolTip content="Tooltip content">
                <EuiFormPrepend label="Tooltip" />
              </EuiToolTip>
            }
            append={
              <EuiToolTip content="content">
                <EuiFormAppend
                  element="button"
                  label="Tooltip"
                  onClick={action('onClick')}
                />
              </EuiToolTip>
            }
          />

          <EuiFieldText
            {...commonProps}
            placeholder="Text field"
            id={`${idBase}-5`}
            prepend={
              <EuiFormPrepend
                element="button"
                iconLeft="calendar"
                iconRight="chevronSingleDown"
                onClick={action('onClick')}
              />
            }
            append={
              <EuiPopover
                button={
                  <EuiFormAppend
                    element="button"
                    iconRight="chevronSingleDown"
                    label="Popover"
                    onClick={action('onClick')}
                  />
                }
              />
            }
          />

          <EuiFieldText
            {...commonProps}
            placeholder="Text field"
            id={`${idBase}-6`}
            prepend={<EuiFormPrepend iconLeft="vectorSquare" />}
            append={
              <EuiFormAppend
                element="button"
                iconLeft="gear"
                onClick={action('onClick')}
              />
            }
          />

          <EuiFieldText
            {...commonProps}
            disabled={true}
            placeholder="Disabled text field"
            id={`${idBase}-7`}
            prepend="String"
            append={
              <EuiFormAppend
                element="button"
                iconLeft="gear"
                onClick={action('onClick')}
              />
            }
          />
          <EuiFieldText
            {...commonProps}
            readOnly={true}
            placeholder="ReadOnly text field"
            id={`${idBase}-8`}
            prepend={
              <EuiFormPrepend
                element="button"
                iconLeft="gear"
                onClick={action('onClick')}
              />
            }
            append="String"
          />
        </EuiForm>
      );
    };

    return (
      <EuiFlexGroup>
        {renderContent(false)}
        {renderContent(true)}
      </EuiFlexGroup>
    );
  },
};

export const AppendPrependAPIKitchenSink: Story = {
  tags: ['vrt-only'],
  parameters: {
    codeSnippet: {
      skip: true,
    },
  },
  render: function Render(args) {
    const { readOnly, isDisabled, fullWidth, compressed } = args;
    const isDesktop = useIsWithinMinBreakpoint('xl');

    const [isPopoverOpenA, setPopoverOpenA] = useState(false);
    const [isPopoverOpenB, setPopoverOpenB] = useState(false);

    const formStyles = ({ euiTheme }: UseEuiTheme) => css`
      display: flex;
      flex-direction: column;
      gap: ${euiTheme.size.m};
    `;

    const childProps = {
      readOnly,
      disabled: isDisabled,
      fullWidth,
      compressed,
      isInvalid: args.isInvalid,
      ...args,
    };

    return (
      <EuiFlexGroup>
        <EuiForm fullWidth={isDesktop} css={formStyles}>
          <EuiText size="s">
            <p>Styled wrapper API</p>
          </EuiText>

          <EuiFieldText
            {...childProps}
            id="textField-0"
            placeholder="Text field"
            append="Appended"
            prepend="Prepended"
            onClick={action('onClick')}
          />

          <EuiFieldText
            {...childProps}
            id="textField-1"
            placeholder="Text field"
            prepend={
              <EuiFormPrepend
                inputId="textField-1"
                label="Prepended"
                iconLeft="faceHappy"
                iconRight="faceSad"
              >
                <EuiNotificationBadge color="subdued">1</EuiNotificationBadge>
              </EuiFormPrepend>
            }
          />

          <EuiFieldText
            {...childProps}
            placeholder="Text field"
            prepend={<EuiFormPrepend iconLeft="vectorSquare" />}
            append={
              <EuiToolTip content="content">
                <EuiFormAppend label="Tooltip" />
              </EuiToolTip>
            }
          />

          <EuiFieldText
            {...childProps}
            id="textField-2"
            placeholder="Text field"
            append={
              <EuiFormAppend
                label="Appended"
                iconLeft="faceHappy"
                iconRight="faceSad"
                element="button"
                onClick={action('onClick')}
              >
                <EuiNotificationBadge color="subdued">1</EuiNotificationBadge>
              </EuiFormAppend>
            }
          />

          <EuiFieldText
            {...childProps}
            id="textField-3"
            placeholder="Text field"
            append={
              <EuiCopy textToCopy="meow meow">
                {(copy) => (
                  <EuiFormAppend
                    iconRight="copy"
                    label="Copy"
                    element="button"
                    onClick={copy}
                  />
                )}
              </EuiCopy>
            }
          />

          <EuiFieldText
            {...childProps}
            id="textField-3"
            placeholder="Text field"
            append={
              <EuiCopy textToCopy="meow meow">
                {(copy) => (
                  <EuiFormAppend
                    iconRight="copy"
                    label="Copy"
                    element="button"
                    onClick={copy}
                    isDisabled
                  />
                )}
              </EuiCopy>
            }
          />

          <EuiFieldText
            {...childProps}
            id="textField-4"
            placeholder="Text field"
            prepend={
              <EuiPopover
                isOpen={isPopoverOpenA}
                closePopover={() => setPopoverOpenA(false)}
                button={
                  <EuiFormPrepend
                    iconLeft="calendar"
                    iconRight="chevronSingleDown"
                    element="button"
                    onClick={() => setPopoverOpenA(!isPopoverOpenA)}
                  />
                }
              >
                Popover content
              </EuiPopover>
            }
            append={
              <EuiToolTip content="Tooltip content" display="block">
                <EuiFormAppend
                  label="Tooltip"
                  element="button"
                  onClick={action('onClick')}
                />
              </EuiToolTip>
            }
          />

          <EuiFieldText
            {...childProps}
            placeholder="Text field"
            id="textField-5"
            append={
              <EuiPopover
                isOpen={isPopoverOpenA}
                button={
                  <EuiFormAppend
                    element="button"
                    iconLeft="filter"
                    onClick={action('onClick')}
                  >
                    <EuiNotificationBadge color="subdued">
                      1
                    </EuiNotificationBadge>
                  </EuiFormAppend>
                }
                closePopover={() => setPopoverOpenA(false)}
              >
                Popover content
              </EuiPopover>
            }
          />

          <EuiFieldText
            {...childProps}
            id="textField-6"
            placeholder="Text field"
            append={
              <EuiFormAppend
                iconLeft="faceHappy"
                element="button"
                onClick={action('onClick')}
              />
            }
          />

          <EuiFieldText
            {...childProps}
            id="textField-7"
            placeholder="Text field"
            prepend={
              <EuiFormPrepend
                label="String"
                inputId="textField-7"
                iconRight="gear"
              />
            }
            append={
              <EuiFormAppend
                label="String"
                iconLeft="gear"
                element="button"
                onClick={action('onClick')}
              />
            }
          />

          {/* Drag examples */}

          <EuiText size="s">
            <p>
              Drag example - With custom styles (reduce spacing and hover
              styles)
            </p>
          </EuiText>

          <EuiDragDropContext onDragEnd={() => {}}>
            <EuiDroppable droppableId="droppableArea">
              <EuiDraggable
                index={0}
                draggableId="draggable-item-1"
                customDragHandle="custom"
              >
                {(provided) => (
                  <EuiFieldText
                    {...childProps}
                    placeholder="Text field"
                    prepend={
                      <>
                        {/* NOTE: only works properly for nested text content with div element,
                        the dragHandleProps apply correct attributes to create a custom button */}
                        <div
                          className="euiFormAppendPrepend__dragHandle"
                          {...provided.dragHandleProps}
                          aria-label="Drag handle"
                          css={({ euiTheme }) => css`
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            z-index: 1;
                            color: ${euiTheme.colors.textDisabled};

                            &:is(:hover, :active) {
                              .euiIcon {
                                color: ${euiTheme.colors.textParagraph};
                              }
                            }

                            .euiFormPrepend {
                              gap: 0;
                            }

                            .euiIcon {
                              margin-inline: -${euiTheme.size.xs};
                            }

                            .euiFormLabel {
                              color: ${euiTheme.colors.textParagraph};
                              cursor: grab;
                            }
                          `}
                        >
                          <EuiFormPrepend iconLeft="dragHorizontal">
                            <EuiToolTip
                              content="String"
                              anchorProps={{
                                css: css`
                                  display: flex;
                                `,
                              }}
                            >
                              <EuiFormLabel>String</EuiFormLabel>
                            </EuiToolTip>
                          </EuiFormPrepend>
                        </div>
                      </>
                    }
                  />
                )}
              </EuiDraggable>
            </EuiDroppable>
          </EuiDragDropContext>
        </EuiForm>

        {/* split here */}

        <EuiForm fullWidth={isDesktop} css={formStyles}>
          <EuiText size="s">
            <p>Custom content API</p>
          </EuiText>

          <EuiFieldText
            {...childProps}
            id="textField-100"
            placeholder="Text field"
            append="Appended"
            prepend="Prepended"
          />

          <EuiFieldText
            {...childProps}
            id="textField-101"
            placeholder="Text field"
            prepend={[
              <EuiIcon type="faceHappy" />,
              'Prepended',
              <EuiIcon type="faceSad" />,
              <EuiNotificationBadge color="subdued">1</EuiNotificationBadge>,
            ]}
          />

          <EuiFieldText
            {...childProps}
            id="textField-102"
            placeholder="Text field"
            prepend={<EuiIcon type="vectorSquare" />}
            append={
              <EuiToolTip content="content">
                <EuiText size="s">Tooltip</EuiText>
              </EuiToolTip>
            }
          />

          <EuiFieldText
            {...childProps}
            placeholder="Text field"
            id="textField-103"
            append={
              <EuiButtonEmpty
                size="xs"
                iconSide="left"
                iconType="faceHappy"
                onClick={action('onClick')}
              >
                <EuiFlexGroup gutterSize="s" alignItems="center">
                  Appended
                  <EuiIcon type="faceSad" size="s" />
                  <EuiNotificationBadge color="subdued">1</EuiNotificationBadge>
                </EuiFlexGroup>
              </EuiButtonEmpty>
            }
          />

          <EuiFieldText
            {...childProps}
            placeholder="Text field"
            id="textField-104"
            append={
              <EuiCopy textToCopy="meow meow">
                {(copy) => (
                  <EuiButtonEmpty
                    iconType="copy"
                    size="xs"
                    iconSide="right"
                    onClick={copy}
                  >
                    Copy
                  </EuiButtonEmpty>
                )}
              </EuiCopy>
            }
          />

          <EuiFieldText
            {...childProps}
            placeholder="Text field"
            id="textField-104"
            append={
              <EuiCopy textToCopy="meow meow">
                {(copy) => (
                  <EuiButtonEmpty
                    iconType="copy"
                    size="xs"
                    iconSide="right"
                    onClick={copy}
                    isDisabled
                  >
                    Copy
                  </EuiButtonEmpty>
                )}
              </EuiCopy>
            }
          />

          <EuiFieldText
            {...childProps}
            placeholder="Text field"
            id="textField-105"
            prepend={
              <EuiPopover
                isOpen={isPopoverOpenB}
                button={
                  <EuiButtonEmpty
                    size="xs"
                    iconType="chevronSingleDown"
                    iconSide="right"
                    onClick={() => setPopoverOpenB(!isPopoverOpenB)}
                  >
                    <EuiIcon type="calendar" />
                  </EuiButtonEmpty>
                }
                closePopover={() => setPopoverOpenB(false)}
              >
                Popover content
              </EuiPopover>
            }
            append={
              <EuiToolTip content="content">
                <EuiButtonEmpty size="xs">Tooltip</EuiButtonEmpty>
              </EuiToolTip>
            }
          />

          <EuiFieldText
            {...childProps}
            placeholder="Text field"
            id="textField-106"
            append={
              <EuiPopover
                isOpen={isPopoverOpenB}
                button={
                  <EuiFilterButton
                    numActiveFilters={1}
                    onClick={() => setPopoverOpenB(!isPopoverOpenB)}
                  >
                    <EuiIcon type="filter" />
                  </EuiFilterButton>
                }
                closePopover={() => setPopoverOpenB(false)}
              >
                Popover content
              </EuiPopover>
            }
          />

          <EuiFieldText
            {...childProps}
            id="textField-107"
            placeholder="Text field"
            append={<EuiButtonIcon iconType="faceHappy" />}
          />

          <EuiFieldText
            {...childProps}
            id="textField-108"
            placeholder="Text field"
            prepend={[
              'String',
              <EuiToolTip content="content">
                <EuiButtonIcon iconType="gear" aria-label="Gear this" />
              </EuiToolTip>,
            ]}
            append={[
              <EuiPopover
                button={
                  <EuiButtonIcon iconType="gear" aria-label="Gear this" />
                }
                closePopover={() => {}}
              >
                Popover content
              </EuiPopover>,
              'String',
            ]}
          />

          {/* Drag examples */}

          <EuiText size="s">
            <p>
              Drag example - With custom styles (reduce spacing and hover
              styles)
            </p>
          </EuiText>

          <EuiDragDropContext onDragEnd={() => {}}>
            <EuiDroppable droppableId="droppableArea">
              <EuiDraggable
                index={0}
                draggableId="draggable-item-1"
                customDragHandle="custom"
              >
                {(provided) => (
                  <EuiFieldText
                    {...childProps}
                    id="textField-11"
                    placeholder="Text field"
                    prepend={
                      <EuiFlexGroup
                        gutterSize="none"
                        alignItems="center"
                        css={({ euiTheme }) => css`
                          position: relative;
                          border-radius: ${mathWithUnits(
                            euiTheme.border.radius.small,
                            (x) => x / 2
                          )};
                          overflow: hidden;

                          &:is(:hover, :active) {
                            .euiFormAppendPrepend__dragHandle {
                              color: ${euiTheme.colors.textParagraph};
                            }
                          }

                          .euiFormLabel {
                            margin-inline-start: -${euiTheme.size.xs};
                            cursor: grab;

                            /* increased specificity to override form layout overrides */
                            & {
                              color: ${euiTheme.colors.textParagraph};
                            }
                          }
                        `}
                      >
                        <div
                          className="euiFormAppendPrepend__dragHandle"
                          {...provided.dragHandleProps}
                          aria-label="Drag handle"
                          css={({ euiTheme }) => css`
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            z-index: 1;
                            color: ${euiTheme.colors.textDisabled};
                          `}
                        >
                          <EuiIcon type="dragHorizontal" />

                          <EuiToolTip
                            content="String"
                            anchorProps={{
                              css: css`
                                display: flex;
                              `,
                            }}
                          >
                            <EuiFormLabel>String</EuiFormLabel>
                          </EuiToolTip>
                        </div>
                      </EuiFlexGroup>
                    }
                  />
                )}
              </EuiDraggable>
            </EuiDroppable>
          </EuiDragDropContext>
        </EuiForm>
      </EuiFlexGroup>
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

type FormControlButtonWithPopoverProps = EuiFormControlLayoutProps &
  EuiFormControlButtonProps;

const FormControlButtonWithPopover = (
  args: FormControlButtonWithPopoverProps
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
    <EuiFormControlLayout
      {...args}
      fullWidth={fullWidth}
      clear={{ onClick: handleOnClear }}
    >
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
