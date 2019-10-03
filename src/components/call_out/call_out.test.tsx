import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCallOut, COLORS } from './call_out';

describe('EuiCallOut', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCallOut {...requiredProps}>Content</EuiCallOut>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('title', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCallOut title="Title">Content</EuiCallOut>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const component = render(<EuiCallOut iconType="user" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach(color => {
        test(`${color} is rendered`, () => {
          const component = render(<EuiCallOut color={color} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
