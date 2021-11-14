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
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../../button';
import { EuiInputPopover, EuiPopover } from '../../popover';

import { ApplyRefreshInterval } from '../types';
import { prettyInterval } from '../super_date_picker/pretty_interval';
import { EuiRefreshInterval } from '../super_date_picker/quick_select_popover/refresh_interval';

export type EuiAutoRefreshSharedProps = {
  onRefreshChange?: ApplyRefreshInterval;
  isDisabled?: boolean;
  isPaused?: boolean;
  refreshInterval: number;
};

export type EuiAutoRefreshProps = EuiFieldTextProps & EuiAutoRefreshSharedProps;

export const EuiAutoRefresh: FunctionComponent<EuiAutoRefreshProps> = ({
  className,
  onRefreshChange,
  isDisabled,
  isPaused = true,
  refreshInterval = 1,
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
            >
              <strong>
                <small>Auto refresh</small>
              </strong>
            </EuiButtonEmpty>
          }
          placeholder="Placeholder text"
          readOnly
          disabled={isDisabled}
          value={prettyInterval(Boolean(isPaused), refreshInterval)}
          {...rest}
        />
      }
      isOpen={isPopoverOpen}
      closePopover={() => {
        setIsPopoverOpen(false);
      }}
      panelStyle={{ minWidth: 300 }}
    >
      <EuiRefreshInterval
        applyRefreshInterval={onRefreshChange}
        isPaused={isPaused}
        refreshInterval={refreshInterval}
      />
    </EuiInputPopover>
  );
};

export type EuiAutoRefreshButtonProps = EuiButtonEmptyProps &
  EuiAutoRefreshSharedProps & {
    shortHand?: boolean;
  };

export const EuiAutoRefreshButton: FunctionComponent<EuiAutoRefreshButtonProps> = ({
  className,
  onRefreshChange,
  isDisabled,
  isPaused = true,
  refreshInterval = 1,
  shortHand = false,
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
          size="s"
          color="text"
          iconType="timeRefresh"
          title={
            isPaused
              ? 'Auto refresh is off'
              : `Auto refresh is on and set to ${prettyInterval(
                  Boolean(isPaused),
                  refreshInterval
                )}`
          }
          {...rest}
        >
          <strong>
            <small>
              {prettyInterval(Boolean(isPaused), refreshInterval, shortHand)}
            </small>
          </strong>
        </EuiButtonEmpty>
      }
      isOpen={isPopoverOpen}
      closePopover={() => {
        setIsPopoverOpen(false);
      }}
    >
      <EuiRefreshInterval
        applyRefreshInterval={onRefreshChange}
        isPaused={isPaused}
        refreshInterval={refreshInterval}
      />
    </EuiPopover>
  );
};
