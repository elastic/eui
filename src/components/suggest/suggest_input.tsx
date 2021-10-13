/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState, FunctionComponent, KeyboardEvent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
import { keys } from '../../services';
import { EuiFieldText, EuiFieldTextProps } from '../form';
import { EuiToolTip } from '../tool_tip';
import { EuiIcon } from '../icon';
import { EuiInputPopover } from '../popover';

export const ALL_STATUS = ['unsaved', 'saved', 'unchanged', 'loading'] as const;
type StatusTuple = typeof ALL_STATUS;
export type EuiSuggestStatus = StatusTuple[number];

export type EuiSuggestInputProps = CommonProps &
  EuiFieldTextProps & {
    tooltipContent?: string;

    /**
     * Status of the current query 'unsaved', 'saved', 'unchanged' or 'loading'.
     */
    status?: EuiSuggestStatus;

    /**
     * Element to be appended to the input bar.
     */
    append?: JSX.Element;

    /**
     * List element to show when open.
     */
    suggestions?: JSX.Element;

    /**
     * Callback function called when the input changes.
     */
    sendValue?: (value: string) => void;
    onListOpen?: (isOpen: boolean) => void;
  };

interface Status {
  icon?: string;
  color?: string;
  tooltip?: string;
}

interface StatusMap {
  unsaved: Status;
  saved: Status;
  unchanged: Status;
  loading: Status;
}

const statusMap: StatusMap = {
  unsaved: {
    icon: 'dot',
    color: 'accent',
    tooltip: 'Changes have not been saved.',
  },
  saved: {
    icon: 'checkInCircleFilled',
    color: 'success',
    tooltip: 'Saved.',
  },
  unchanged: {
    icon: '',
    color: 'success',
  },
  loading: {},
};

export const EuiSuggestInput: FunctionComponent<EuiSuggestInputProps> = ({
  className,
  status = 'unchanged',
  append,
  tooltipContent,
  suggestions,
  sendValue,
  onListOpen,
  ...rest
}) => {
  const [value, setValue] = useState<string>('');
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const onFieldChange = (e: any) => {
    setValue(e.target.value);
    e.target.value !== '' ? openPopover() : closePopover();
    if (sendValue) sendValue(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case keys.ARROW_DOWN:
        openPopover();
        break;
    }
  };

  const openPopover = () => {
    setIsPopoverOpen(true);
    onListOpen && onListOpen(true);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
    onListOpen && onListOpen(false);
  };

  let icon = '';
  let color = '';

  if (statusMap[status]) {
    icon = statusMap[status].icon || '';
    color = statusMap[status].color || '';
  }
  const classes = classNames('euiSuggestInput', className);

  // EuiFieldText's append accepts an array of elements so start by creating an empty array
  const appendArray = [];

  const statusElement = (status === 'saved' || status === 'unsaved') && (
    <EuiToolTip
      position="left"
      content={tooltipContent || statusMap[status].tooltip}
    >
      <EuiIcon
        className="euiSuggestInput__statusIcon"
        color={color}
        type={icon}
      />
    </EuiToolTip>
  );

  // Push the status element to the array if it is not undefined
  if (statusElement) appendArray.push(statusElement);

  // Check to see if consumer passed an append item and if so, add it to the array
  if (append) appendArray.push(append);

  const customInput = (
    <EuiFieldText
      value={value}
      fullWidth
      append={appendArray.length ? appendArray : undefined}
      isLoading={status === 'loading' ? true : false}
      onChange={onFieldChange}
      {...rest}
      onKeyDown={onKeyDown}
    />
  );

  return (
    <EuiInputPopover
      className={classes}
      input={customInput}
      isOpen={suggestions && isPopoverOpen}
      panelPaddingSize="none"
      fullWidth
      closePopover={closePopover}
    >
      {suggestions}
    </EuiInputPopover>
  );
};
