import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiAvatar, SIZES } from './avatar';

describe('EuiAvatar', () => {
  test('is rendered', () => {
    const component = render(
      <EuiAvatar
        name="name"
        {...requiredProps}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    describe('imageUrl', () => {
      it('is rendered', () => {
        const component = render(
          <EuiAvatar
            name="name"
            imageUrl="image url"
          />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('size', () => {
      SIZES.forEach(size => {
        it(`${size} is rendered`, () => {
          const component = render(
            <EuiAvatar
              name="name"
              size={size}
            />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });
  });
});
