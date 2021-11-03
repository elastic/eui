/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
import { EuiFieldText, EuiFieldTextProps } from '../form';
import { EuiToolTip } from '../tool_tip';
import { EuiIcon } from '../icon';
import { EuiInputPopover } from '../popover';
import { EuiSuggestItemProps } from './suggest_item';

export type EuiSuggestInputProps = CommonProps &
  EuiFieldTextProps & {
    tooltipContent?: string;

    /**
     * Status of the current query 'unsaved', 'saved', 'unchanged' or 'loading'.
     */
    status?: 'unsaved' | 'saved' | 'unchanged' | 'loading';

    /**
     * Element to be appended to the input bar.
     */
    append?: JSX.Element;

    /**
     * List of suggestions to display using 'suggestItem'.
     */
    suggestions: JSX.Element[] | EuiSuggestItemProps[];

    sendValue?: Function;
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

export const EuiSuggestInput: FunctionComponent<EuiSuggestInputProps> = (
  props
) => {
  const [value, setValue] = useState<string>('');
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const {
    className,
    status = 'unchanged',
    append,
    tooltipContent,
    suggestions,
    sendValue,
    ...rest
  } = props;

  const onFieldChange = (e: any) => {
    setValue(e.target.value);
    setIsPopoverOpen(e.target.value !== '' ? true : false);
    if (sendValue) sendValue(e.target.value);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
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
    />
  );

  return (
    <EuiInputPopover
      className={classes}
      input={customInput}
      isOpen={suggestions.length > 0 && isPopoverOpen}
      panelPaddingSize="none"
      fullWidth
      closePopover={closePopover}
    >
      {suggestions}
    </EuiInputPopover>
  );
};
