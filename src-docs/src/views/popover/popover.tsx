import React, { useState } from 'react';
import moment from 'moment';
import {
  EuiPopover,
  EuiPopoverTitle,
  EuiPopoverFooter,
  EuiButton,
  EuiButtonEmpty,
  EuiHorizontalRule,
  EuiDatePickerRange,
  EuiDatePicker,
} from '../../../../src';

export default () => {
  const [isPopoverOpen3, setIsPopoverOpen3] = useState(false);

  const onButtonClick3 = () =>
    setIsPopoverOpen3((isPopoverOpen3) => !isPopoverOpen3);
  const closePopover3 = () => setIsPopoverOpen3(false);

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(11, 'd'));

  return (
    <EuiPopover
      button={
        <EuiButtonEmpty
          iconType="questionInCircle"
          iconSide="right"
          onClick={onButtonClick3}
        >
          With title and footer button
        </EuiButtonEmpty>
      }
      isOpen={isPopoverOpen3}
      closePopover={closePopover3}
      anchorPosition="upCenter"
    >
      <EuiPopoverTitle>Edit schedule</EuiPopoverTitle>
      <EuiDatePickerRange
        isInvalid={startDate > endDate}
        startDateControl={
          <EuiDatePicker
            selected={startDate}
            onChange={(date) => date && setStartDate(date)}
            startDate={startDate}
            endDate={endDate}
            aria-label="Start date"
            showTimeSelect
          />
        }
        endDateControl={
          <EuiDatePicker
            selected={endDate}
            onChange={(date) => date && setEndDate(date)}
            startDate={startDate}
            endDate={endDate}
            aria-label="End date"
            showTimeSelect
          />
        }
      />
      <EuiHorizontalRule margin="m" />
      <EuiButton fill fullWidth>
        Save schedule
      </EuiButton>
      <EuiPopoverFooter>
        <EuiButton fullWidth color="danger">
          Delete schedule
        </EuiButton>
      </EuiPopoverFooter>
    </EuiPopover>
  );
};
