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
import { shouldRenderCustomStyles } from '../../test/internal';

import {
  EuiStepsHorizontal,
  EuiStepsHorizontalProps,
} from './steps_horizontal';

const steps: EuiStepsHorizontalProps['steps'] = [
  {
    title: 'Completed Step 1',
    status: 'complete',
    onClick: () => {},
  },
  {
    title: 'Selected Step 2',
    status: 'current',
    onClick: () => {},
  },
  {
    title: 'Incomplete Step 3',
    onClick: () => {},
  },
  {
    title: 'Disabled Step 4',
    status: 'disabled',
    onClick: () => {},
  },
];

describe('EuiStepsHorizontal', () => {
  shouldRenderCustomStyles(
    <EuiStepsHorizontal {...requiredProps} steps={steps} />
  );

  test('is rendered', () => {
    const component = render(
      <EuiStepsHorizontal {...requiredProps} steps={steps} />
    );

    expect(component).toMatchSnapshot();
  });
});
