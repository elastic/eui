import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiFlyout, SIZES } from './flyout';

describe('EuiFlyout', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFlyout {...requiredProps} onClose={() => {}} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('close button is not rendered', () => {
      const component = render(
        <EuiFlyout onClose={() => {}} hideCloseButton />
      );

      expect(component).toMatchSnapshot();
    });

    describe('closeButtonLabel', () => {
      test('has a default label for the close button', () => {
        const component = render(<EuiFlyout onClose={() => {}} />);
        const label = component
          .find('[data-test-subj="euiFlyoutCloseButton"]')
          .prop('aria-label');
        expect(label).toBe('Closes this dialog');
      });

      test('sets a custom label for the close button', () => {
        const component = render(
          <EuiFlyout
            onClose={() => {}}
            closeButtonAriaLabel="Closes specific flyout"
          />
        );
        const label = component
          .find('[data-test-subj="euiFlyoutCloseButton"]')
          .prop('aria-label');
        expect(label).toBe('Closes specific flyout');
      });
    });
  });

  describe('size', () => {
    SIZES.forEach(size => {
      it(`${size} is rendered`, () => {
        const component = render(<EuiFlyout onClose={() => {}} size={size} />);

        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('max width', () => {
    test('can be set to a default', () => {
      const component = render(
        <EuiFlyout onClose={() => {}} maxWidth={true} />
      );

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom number', () => {
      const component = render(
        <EuiFlyout onClose={() => {}} maxWidth={1024} />
      );

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom value and measurement', () => {
      const component = render(
        <EuiFlyout onClose={() => {}} maxWidth="24rem" />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
