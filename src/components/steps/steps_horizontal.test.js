import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiStepsHorizontal } from './steps_horizontal';

const steps = [
  {
    title: 'Completed Step 1',
    isComplete: true,
    onClick: () => window.alert('Step 1 clicked'),
  },
  {
    title: 'Selected Step 2',
    isSelected: true,
  },
  {
    title: 'Incomplete Step 3',
  },
  {
    title: 'Disabled Step 4',
    disabled: true,
  },
];

describe('EuiStepsHorizontal', () => {
  test('is rendered', () => {
    const component = render(
      <EuiStepsHorizontal {...requiredProps} steps={steps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
