import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test';
import { EuiLink, COLORS } from './link';

describe('EuiLink', () => {
  test('it errors if an invalid color is provided', () => {
    expect(() => render(
      <EuiLink href="#" color="phooey" />
    )).toThrow(/phooey/);
  });

  COLORS.forEach(color => {
    test(`${color} is rendered`, () => {
      const component = render(
        <EuiLink color={color} />
      );
      expect(component)
        .toMatchSnapshot();
    });
  });

  test('it does not support both href and onClick', () => {
    expect(() => render(
      <EuiLink href="/no/can/do" onClick={() => null} />
    )).toThrow(/href/);
  });

  test('it passes the default props through', () => {
    const component = render(
      <EuiLink {...requiredProps} />
    );
    expect(component)
      .toMatchSnapshot();
  });

  test('supports children', () => {
    const component = render(
      <EuiLink href="#">
        <span>Hiya!!!</span>
      </EuiLink>
    );
    expect(component)
      .toMatchSnapshot();
  });

  test('supports href', () => {
    const component = render(
      <EuiLink href="/baz/bing" />
    );
    expect(component)
      .toMatchSnapshot();
  });

  test('supports target', () => {
    const component = render(
      <EuiLink href="#" target="_parent" />
    );
    expect(component)
      .toMatchSnapshot();
  });

  test('supports rel', () => {
    const component = render(
      <EuiLink rel="stylesheet" />
    );
    expect(component)
      .toMatchSnapshot();
  });

  test('if onClick specified, it renders a button of type=button', () => {
    const component = render(
      <EuiLink onClick={() => 'hello, world!'} />
    );
    expect(component)
      .toMatchSnapshot();
  });

  test('button respects the type property', () => {
    const component = render(
      <EuiLink type="submit" onClick={() => 'hello, world!'} />
    );
    expect(component)
      .toMatchSnapshot();
  });

  test('onClick actually fires', () => {
    const handler = jest.fn();
    const component = mount(
      <EuiLink onClick={handler} />
    );
    component.find('button').simulate('click');
    expect(handler.mock.calls.length).toEqual(1);
  });
});
