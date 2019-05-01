import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiStep } from './step';

describe('EuiStep', () => {
  test('is rendered', () => {
    const component = render(
      <EuiStep
        {...requiredProps}
        headingElement={'h3'}
        step={1}
        title={'First step'}>
        <p>Do this</p>
      </EuiStep>
    );

    expect(component).toMatchSnapshot();
  });
});
