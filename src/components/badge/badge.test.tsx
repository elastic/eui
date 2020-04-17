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
import { requiredProps } from '../../test/required_props';

import { EuiBadge, COLORS, ICON_SIDES } from './badge';

describe('EuiBadge', () => {
  test('is rendered', () => {
    const component = render(<EuiBadge {...requiredProps}>Content</EuiBadge>);

    expect(component).toMatchSnapshot();
  });

  test('is disabled', () => {
    const component = render(
      <EuiBadge isDisabled {...requiredProps}>
        Content
      </EuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with onClick provided', () => {
    const component = render(
      <EuiBadge
        {...requiredProps}
        onClick={jest.fn()}
        onClickAriaLabel="Example of onclick event for the button">
        Content
      </EuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with href provided', () => {
    const component = render(
      <EuiBadge {...requiredProps} href="/#/">
        Content
      </EuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with iconOnClick provided', () => {
    const component = render(
      <EuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the button">
        Content
      </EuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with iconOnClick and onClick provided', () => {
    const component = render(
      <EuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the button"
        onClick={jest.fn()}
        onClickAriaLabel="Example of onclick event for the button">
        Content
      </EuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with iconOnClick and href provided', () => {
    const component = render(
      <EuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the anchor"
        href="/#/">
        Content
      </EuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with href and rel provided', () => {
    const component = render(
      <EuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the anchor"
        href="/#/"
        rel="noopener">
        Content
      </EuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('iconType', () => {
      it('is rendered', () => {
        const component = render(<EuiBadge iconType="user">Content</EuiBadge>);

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach(color => {
        it(`${color} is rendered`, () => {
          const component = render(<EuiBadge color={color}>Content</EuiBadge>);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('iconSide', () => {
      ICON_SIDES.forEach(iconSide => {
        it(`${iconSide} is rendered`, () => {
          const component = render(
            <EuiBadge iconType="user" iconSide={iconSide}>
              Content
            </EuiBadge>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('style', () => {
      const style = { border: '4px solid tomato' };

      it('is rendered', () => {
        const component = render(<EuiBadge style={style}>Content</EuiBadge>);

        expect(component).toMatchSnapshot();
      });

      COLORS.forEach(color => {
        it(`is rendered with ${color}`, () => {
          const component = render(
            <EuiBadge style={style} color={color}>
              Content
            </EuiBadge>
          );

          expect(component).toMatchSnapshot();
        });
      });

      it('is rendered with hollow', () => {
        const component = render(
          <EuiBadge style={style} color="hollow">
            Content
          </EuiBadge>
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
