/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { EuiFieldText, EuiFieldTextProps } from '../../form';
import {
  EuiButtonEmpty,
  CommonEuiButtonEmptyProps,
} from '../../button/button_empty/button_empty';
import { EuiInputPopover, EuiPopover } from '../../popover';

import { prettyInterval } from '../super_date_picker/pretty_interval';
import {
  EuiRefreshInterval,
  EuiRefreshIntervalProps,
} from './refresh_interval';

export type EuiAutoRefreshSharedProps = EuiRefreshIntervalProps & {
  isDisabled?: boolean;
};

export type EuiAutoRefreshProps = EuiAutoRefreshSharedProps & {
  /**
   * The input is `readOnly` by default becuase the input value is handled by the popover form.
   * If you need make the input `isInvalid`, you'll need to set `readOnly` to `false`.
   */
  readOnly?: EuiFieldTextProps['readOnly'];
} & Omit<EuiFieldTextProps, 'icon' | 'prepend' | 'controlOnly' | 'readOnly'>;

export const EuiAutoRefresh: FunctionComponent<EuiAutoRefreshProps> = ({
  className,
  onRefreshChange,
  isDisabled,
  isPaused = true,
  refreshInterval = 1000,
  readOnly = true,
  ...rest
}) => {
  const classes = classNames('euiAutoRefresh', className);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <EuiInputPopover
      className={classes}
      fullWidth={rest.fullWidth}
      input={
        <EuiFieldText
          onFocus={() => setIsPopoverOpen(true)}
          prepend={
            <EuiButtonEmpty
              className="euiFormControlLayout__prepend"
              onClick={() => setIsPopoverOpen((isOpen) => !isOpen)}
              size="s"
              color="text"
              iconType="timeRefresh"
              isDisabled={isDisabled}
            >
              <strong>
                <small>Auto refresh</small>
              </strong>
            </EuiButtonEmpty>
          }
          placeholder="Placeholder text"
          readOnly={readOnly}
          disabled={isDisabled}
          value={prettyInterval(Boolean(isPaused), refreshInterval)}
          {...rest}
        />
      }
      isOpen={isPopoverOpen}
      closePopover={() => {
        setIsPopoverOpen(false);
      }}
    >
      <EuiRefreshInterval
        onRefreshChange={onRefreshChange}
        isPaused={isPaused}
        refreshInterval={refreshInterval}
      />
    </EuiInputPopover>
  );
};

export type EuiAutoRefreshButtonProps = EuiAutoRefreshSharedProps & {
  /**
   * Reduces the time unit to a single letter
   */
  shortHand?: boolean;
} & Omit<
    CommonEuiButtonEmptyProps,
    'isSelected' | 'iconType' | 'iconSide' | 'iconSize' | 'onClick' | 'type'
  >;

export const EuiAutoRefreshButton: FunctionComponent<EuiAutoRefreshButtonProps> = ({
  className,
  onRefreshChange,
  isDisabled,
  isPaused = true,
  refreshInterval = 1000,
  shortHand = false,
  size = 's',
  color = 'text',
  ...rest
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const classes = classNames('euiAutoRefreshButton', className);

  return (
    <EuiPopover
      button={
        <EuiButtonEmpty
          onClick={() => setIsPopoverOpen((isOpen) => !isOpen)}
          className={classes}
          size={size}
          color={color}
          iconType="timeRefresh"
          title={
            isPaused
              ? 'Auto refresh is off'
              : `Auto refresh is on and set to ${prettyInterval(
                  Boolean(isPaused),
                  refreshInterval
                )}`
          }
          isDisabled={isDisabled}
          {...rest}
        >
          {prettyInterval(Boolean(isPaused), refreshInterval, shortHand)}
        </EuiButtonEmpty>
      }
      isOpen={isPopoverOpen}
      closePopover={() => {
        setIsPopoverOpen(false);
      }}
    >
      <EuiRefreshInterval
        onRefreshChange={onRefreshChange}
        isPaused={isPaused}
        refreshInterval={refreshInterval}
      />
    </EuiPopover>
  );
};
