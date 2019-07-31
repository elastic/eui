import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiStepsHorizontal } from './steps_horizontal';

const steps = [
  {
    title: 'Completed Step 1',
    isComplete: true,
    onClick: () => {},
  },
  {
    title: 'Selected Step 2',
    isSelected: true,
    onClick: () => {},
  },
  {
    title: 'Incomplete Step 3',
    onClick: () => {},
  },
  {
    title: 'Disabled Step 4',
    disabled: true,
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
