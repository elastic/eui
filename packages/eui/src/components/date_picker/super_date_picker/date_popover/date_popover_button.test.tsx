/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '@testing-library/react';

import { requiredProps } from '../../../../test';
import { shouldRenderCustomStyles } from '../../../../test/internal';

import { EuiDatePopoverButton } from './date_popover_button';

const noop = () => {};

describe('EuiSuperUpdateButton', () => {
  const props = {
    ...requiredProps,
    value: '',
    dateFormat: '',
    timeFormat: '',
    timeOptions: {
      timeTenseOptions: [],
      timeUnitsOptions: [],
      relativeOptions: [],
      relativeRoundingLabels: {} as any,
      refreshUnitsOptions: [],
      commonDurationRanges: [],
    },
    onChange: noop,
    onPopoverClose: noop,
    onPopoverToggle: noop,
    position: 'start' as const,
    isOpen: false,
  };

  shouldRenderCustomStyles(<EuiDatePopoverButton {...props} />, {
    childProps: ['buttonProps'],
  });

  it('renders', () => {
    const { container } = render(<EuiDatePopoverButton {...props} />);

    expect(container).toMatchSnapshot();
  });
});
