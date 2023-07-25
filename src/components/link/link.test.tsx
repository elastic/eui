/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';
import { render } from '../../test/rtl';
import { EuiLink, COLORS } from './link';

describe('EuiLink', () => {
  COLORS.forEach((color) => {
    test(`${color} is rendered`, () => {
      const { container } = render(<EuiLink color={color} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  shouldRenderCustomStyles(<EuiLink />);

  test('it supports both href and onClick', () => {
    const { container } = render(
      <EuiLink href="/imalink" onClick={() => null} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('it passes the default props through', () => {
    const { container } = render(<EuiLink {...requiredProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('supports children', () => {
    const { container } = render(
      <EuiLink href="#">
        <span>Hiya!!!</span>
      </EuiLink>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('it is an external link', () => {
    const { container } = render(<EuiLink external href="/baz/bing" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('supports href', () => {
    const { container } = render(<EuiLink href="/baz/bing" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('supports target', () => {
    const { container } = render(<EuiLink href="#" target="_blank" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('allows for target and external to be controlled independently', () => {
    const { container } = render(
      <EuiLink href="#" target="_blank" external={false} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('supports rel', () => {
    const { container } = render(<EuiLink href="hoi" rel="stylesheet" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('supports disabled', () => {
    const { container } = render(
      <EuiLink disabled onClick={() => 'hello, world!'} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('if href is not specified, it renders a button of type=button', () => {
    const { container } = render(<EuiLink />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('button respects the type property', () => {
    const { container } = render(
      <EuiLink type="submit" onClick={() => 'hello, world!'} />
    );
    expect(container.firstChild).toMatchSnapshot();
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
