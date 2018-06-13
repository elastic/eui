import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import {
  EuiFlyout,
  SIZES,
} from './flyout';

describe('EuiFlyout', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFlyout
        {...requiredProps}
        onClose={() => {}}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    test('close button is not rendered', () => {
      const component = render(
        <EuiFlyout
          onClose={() => {}}
          hideCloseButton
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
          <EuiFlyout
            onClose={() => {}}
            size={size}
          />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });
  });
});
