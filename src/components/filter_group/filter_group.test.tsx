import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiFilterGroup } from './filter_group';

describe('EuiFilterGroup', () => {
  test('is rendered', () => {
    const component = render(<EuiFilterGroup {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth is rendered', () => {
      const component = render(<EuiFilterGroup fullWidth />);

      expect(component).toMatchSnapshot();
    });
  });
});
