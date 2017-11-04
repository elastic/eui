import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiStatusPill } from './status_pill';

describe('EuiStatusPill', () => {
  test('is rendered', () => {
    const component = render(
      <EuiStatusPill onClick={() => window.alert('alert')} {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
