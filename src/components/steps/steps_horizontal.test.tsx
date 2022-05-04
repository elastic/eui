/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiStepStatus } from './step_number';
import { EuiStepsHorizontal } from './steps_horizontal';

const steps = [
  {
    title: 'Completed Step 1',
    status: 'complete' as EuiStepStatus,
    onClick: () => {},
  },
  {
    title: 'Selected Step 2',
    status: 'current' as EuiStepStatus,
    onClick: () => {},
  },
  {
    title: 'Incomplete Step 3',
    onClick: () => {},
  },
  {
    title: 'Disabled Step 4',
    status: 'disabled' as EuiStepStatus,
    onClick: () => {},
  },
];

describe('EuiStepsHorizontal', () => {
  test('is rendered', () => {
    const component = render(
      <EuiStepsHorizontal {...requiredProps} steps={steps} />
    );

    expect(component).toMatchSnapshot();
  });
});
