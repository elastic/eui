/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiFlyout, EuiFlyoutSize } from './flyout';

const SIZES: EuiFlyoutSize[] = ['s', 'm', 'l'];

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

    test('accepts div props', () => {
      const component = render(<EuiFlyout onClose={() => {}} id="imaflyout" />);

      expect(component).toMatchSnapshot();
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
