/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test';
import { EuiLink, COLORS } from './link';

describe('EuiLink', () => {
  COLORS.forEach((color) => {
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
    const component = render(<EuiLink href="#" target="_blank" />);
    expect(component).toMatchSnapshot();
  });

  test('allows for target and external to be controlled independently', () => {
    const component = render(
      <EuiLink href="#" target="_blank" external={false} />
    );
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
