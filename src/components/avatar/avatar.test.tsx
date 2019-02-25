import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiAvatar, SIZES } from './avatar';

describe('EuiAvatar', () => {
  test('is rendered', () => {
    const component = render(<EuiAvatar name="name" {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('allows a name composed entirely of whitespace', () => {
    const component = render(<EuiAvatar name="  " {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('imageUrl', () => {
      it('is rendered', () => {
        const component = render(
          <EuiAvatar name="name" imageUrl="image url" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('size', () => {
      SIZES.forEach(size => {
        it(`${size} is rendered`, () => {
          const component = render(<EuiAvatar name="name" size={size} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('initials', () => {
      it('is rendered', () => {
        const component = render(<EuiAvatar name="name" initials="lo" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('initialsLength', () => {
      it('is rendered', () => {
        const component = render(<EuiAvatar name="name" initialsLength={2} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('type', () => {
      it('is rendered', () => {
        const component = render(<EuiAvatar name="name" type="space" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      it('is rendered', () => {
        const component = render(<EuiAvatar name="name" color="#000" />);

        expect(component).toMatchSnapshot();
      });
    });
  });

  test('should throw error if color is not a hex', () => {
    const component = () =>
      render(<EuiAvatar name="name" color="rgba(0,0,0,0)" />);

    expect(component).toThrowErrorMatchingSnapshot();
  });
});
