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
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test';
import { EuiLink, COLORS } from './link';

describe('EuiLink', () => {
  test('it errors if an invalid color is provided', () => {
    // @ts-ignore as we're deliberately using a bogus value
    expect(() => render(<EuiLink href="#" color="phooey" />)).toThrow(/phooey/);
  });

  COLORS.forEach(color => {
    test(`${color} is rendered`, () => {
      const component = render(<EuiLink color={color} />);
      expect(component).toMatchSnapshot();
    });
  });

  test('it supports both href and onClick', () => {
    const component = render(<EuiLink href="/imalink" onClick={() => null} />);
    expect(component).toMatchSnapshot();
  });

  test('it passes the default props through', () => {
    const component = render(<EuiLink {...requiredProps} />);
    expect(component).toMatchSnapshot();
  });

  test('supports children', () => {
    const component = render(
      <EuiLink href="#">
        <span>Hiya!!!</span>
      </EuiLink>
    );
    expect(component).toMatchSnapshot();
  });

  test('it is an external link', () => {
    const component = render(<EuiLink external href="/baz/bing" />);
    expect(component).toMatchSnapshot();
  });

  test('supports href', () => {
    const component = render(<EuiLink href="/baz/bing" />);
    expect(component).toMatchSnapshot();
  });

  test('supports target', () => {
    const component = render(<EuiLink href="#" target="_parent" />);
    expect(component).toMatchSnapshot();
  });

  test('supports rel', () => {
    const component = render(<EuiLink href="hoi" rel="stylesheet" />);
    expect(component).toMatchSnapshot();
  });

  test('supports disabled', () => {
    const component = render(
      <EuiLink disabled onClick={() => 'hello, world!'} />
    );
    expect(component).toMatchSnapshot();
  });

  test('if href is not specified, it renders a button of type=button', () => {
    const component = render(<EuiLink />);
    expect(component).toMatchSnapshot();
  });

  test('button respects the type property', () => {
    const component = render(
      <EuiLink type="submit" onClick={() => 'hello, world!'} />
    );
    expect(component).toMatchSnapshot();
  });

  test('onClick fires for buttons', () => {
    const handler = jest.fn();
    const component = mount(<EuiLink onClick={handler} />);
    component.find('button').simulate('click');
    expect(handler.mock.calls.length).toEqual(1);
  });

  test('onClick fires for links', () => {
    const handler = jest.fn();
    const component = mount(<EuiLink href="#" onClick={handler} />);
    component.find('a').simulate('click');
    expect(handler.mock.calls.length).toEqual(1);
  });
});
