import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiStep } from './step';

describe('EuiStep', () => {
  test('is rendered', () => {
    const stepContent = (<p>Do this</p>);
    const component = render(
      <EuiStep
        {...requiredProps}
        headingElement={'h3'}
        step={1}
        title={'First step'}
        children={stepContent}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
