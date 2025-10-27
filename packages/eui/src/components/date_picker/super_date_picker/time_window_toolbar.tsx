/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
// import dateMath from '@elastic/datemath';
// import moment from 'moment';

import { ShortDate, ApplyTime } from '../types';
import { useEuiMemoizedStyles, useGeneratedHtmlId } from '../../../services';

import { EuiButtonGroupButton } from '../../button/button_group/button_group_button';
import { euiButtonGroupButtonsStyles } from '../../button/button_group/button_group.styles';

interface TimeWindowToolbarProps {
  applyTime: ApplyTime;
  start: ShortDate;
  end: ShortDate;
  compressed?: boolean;
  isDisabled?: boolean;
}

/**
 * Toolbar for managing the time window with controls for moving the time window
 * forwards and backwards, and zooming out.
 *
 * We're using EuiButtonGroupButton wrapped in role=toolbar,
 * whenever we have something like EuiToolbar, this might get refactored.
 *
 * @todo
 * - [ ] translate labels, etc.
 * - [ ] is `aria-pressed` being rendered causing any trouble?
 * - [ ] use `euiButtonGroup__buttons` class?
 * - [ ] check if hiding tooltips when isDisabled is the right thing to do
 */
export const TimeWindowToolbar: React.FC<TimeWindowToolbarProps> = ({
  // applyTime,
  // start,
  // end,
  compressed,
  isDisabled,
}) => {
  const buttonColor = 'text';
  const buttonSize = compressed ? 'compressed' : 'm';
  const styles = useEuiMemoizedStyles(euiButtonGroupButtonsStyles);
  const cssStyles = [styles.euiButtonGroup__buttons, styles[buttonSize]];

  // Previous
  const previousId = useGeneratedHtmlId({ prefix: 'previous' });
  const previousLabel = 'Previous'; // TODO translate
  const previousTooltipContent = 'Previous ...'; // TODO translate

  // Zoom out
  const zoomOutId = useGeneratedHtmlId({ prefix: 'zoom_out' });
  const zoomOutLabel = 'Zoom out'; // TODO translate

  // Next
  const nextId = useGeneratedHtmlId({ prefix: 'next' });
  const nextLabel = 'Next'; // TODO translate
  const nextTooltipContent = 'Next ...'; // TODO translate

  const handleClickForNow = () => {};

  return (
    <div role="toolbar" css={cssStyles} className="euiButtonGroup__buttons">
      <EuiButtonGroupButton
        color={buttonColor}
        onClick={handleClickForNow}
        id={previousId}
        label={previousLabel}
        toolTipContent={!isDisabled && previousTooltipContent}
        iconType="arrowLeft"
        isIconOnly
        size={buttonSize}
        isSelected={false}
        isDisabled={isDisabled}
      />
      <EuiButtonGroupButton
        color={buttonColor}
        onClick={handleClickForNow}
        id={zoomOutId}
        label={zoomOutLabel}
        toolTipContent={!isDisabled && zoomOutLabel}
        iconType="magnifyWithMinus"
        isIconOnly
        size={buttonSize}
        isSelected={false}
        isDisabled={isDisabled}
      />
      <EuiButtonGroupButton
        color={buttonColor}
        onClick={handleClickForNow}
        id={nextId}
        label={nextLabel}
        toolTipContent={!isDisabled && nextTooltipContent}
        iconType="arrowRight"
        isIconOnly
        size={buttonSize}
        isSelected={false}
        isDisabled={isDisabled}
      />
    </div>
  );
};
