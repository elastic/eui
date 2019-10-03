import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiFacetGroup } from './facet_group';

describe('EuiFacetGroup', () => {
  test('is rendered', () => {
    const component = render(<EuiFacetGroup {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('layout', () => {
      it('is rendered', () => {
        const component = render(<EuiFacetGroup layout="horizontal" />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
