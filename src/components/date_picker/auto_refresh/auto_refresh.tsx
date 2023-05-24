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
import { useEuiI18n } from '../../i18n';

import { usePrettyInterval } from '../super_date_picker/pretty_interval';
import {
  EuiRefreshInterval,
  EuiRefreshIntervalProps,
} from './refresh_interval';

export type EuiAutoRefreshSharedProps = EuiRefreshIntervalProps & {
  isDisabled?: boolean;
};

export type EuiAutoRefreshProps = EuiAutoRefreshSharedProps & {
  /**
   * The input is `readOnly` by default because the input value is handled by the popover form.
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

  const autoRefeshLabel = useEuiI18n(
    'euiAutoRefresh.autoRefreshLabel',
    'Auto refresh'
  );

  return (
    <EuiInputPopover
      className={classes}
      fullWidth={rest.fullWidth}
      input={
        <EuiFieldText
          aria-label={autoRefeshLabel}
          onClick={() => setIsPopoverOpen((isOpen) => !isOpen)}
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
                <small>{autoRefeshLabel}</small>
              </strong>
            </EuiButtonEmpty>
          }
          readOnly={readOnly}
          disabled={isDisabled}
          value={usePrettyInterval(Boolean(isPaused), refreshInterval)}
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

export const EuiAutoRefreshButton: FunctionComponent<
  EuiAutoRefreshButtonProps
> = ({
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

  const autoRefeshLabelOff = useEuiI18n(
    'euiAutoRefresh.buttonLabelOff',
    'Auto refresh is off'
  );
  const autoRefeshLabelOn = useEuiI18n(
    'euiAutoRefresh.buttonLabelOn',
    'Auto refresh is on and set to {prettyInterval}',
    { prettyInterval: usePrettyInterval(Boolean(isPaused), refreshInterval) }
  );

  return (
    <EuiPopover
      button={
        <EuiButtonEmpty
          onClick={() => setIsPopoverOpen((isOpen) => !isOpen)}
          className={classes}
          size={size}
          color={color}
          iconType="timeRefresh"
          title={isPaused ? autoRefeshLabelOff : autoRefeshLabelOn}
          isDisabled={isDisabled}
          {...rest}
        >
          {usePrettyInterval(Boolean(isPaused), refreshInterval, shortHand)}
        </EuiButtonEmpty>
      }
      isOpen={isPopoverOpen}
      closePopover={() => {
        setIsPopoverOpen(false);
      }}
      popoverScreenReaderText={
        isPaused ? autoRefeshLabelOff : autoRefeshLabelOn
      }
    >
      <EuiRefreshInterval
        onRefreshChange={onRefreshChange}
        isPaused={isPaused}
        refreshInterval={refreshInterval}
      />
    </EuiPopover>
  );
};
