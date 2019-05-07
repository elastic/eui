import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTabs } from './tabs';

describe('EuiTabs', () => {
  test('renders', () => {
    const component = <EuiTabs {...requiredProps} />;

    expect(render(component)).toMatchSnapshot();
  });

  describe('props', () => {
    describe('size', () => {
      test('can be small', () => {
        const component = render(<EuiTabs size="s" />);
        expect(component).toMatchSnapshot();
      });
    });

    describe('display', () => {
      test('can be condensed', () => {
        const component = render(<EuiTabs display="condensed" />);
        expect(component).toMatchSnapshot();
      });
    });

    describe('expand', () => {
      test('is rendered', () => {
        const component = render(<EuiTabs expand />);
        expect(component).toMatchSnapshot();
      });
    });
  });
});
