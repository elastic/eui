import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps, validateSnapshot } from '../../test';
import { EuiLink, COLORS } from './link';

const defaultProps = {...requiredProps, href: '#', target: '_blank'};

describe('EuiLink', () => {
  test('errors if an invalid color is provided', () => {
    expect(() => render(
      <EuiLink
        {...defaultProps}
        color="phooey"
      />
    )).toThrow(/phooey/);
  });

  test('supports the official color palette', () => {
    COLORS.forEach((color) => {
      const component = render(
        <EuiLink
          {...defaultProps}
          color={color}
        />
      );
  
      expect(component[0].attribs.class).toMatch(color);
    });
  });

  test('cannot specify both href and onclick', () => {
    expect(() => render(
      <EuiLink
        {...defaultProps}
        href="/cant/have/this/and/onclick"
        onClick={() => null}
      />
    )).toThrow(/href/);
  });

  test('is rendered', () => validateSnapshot(
    <EuiLink {...defaultProps} />
  ));

  test('supports children', () => validateSnapshot(
    <EuiLink {...defaultProps}>
      <span>Hiya!!!</span>
    </EuiLink>
  ));

  test('supports className', () => validateSnapshot(
    <EuiLink
      {...defaultProps}
      className="bazinga"
    />
  ));

  test('supports href', () => validateSnapshot(
    <EuiLink
      {...defaultProps}
      href="/baz/bing"
    />
  ));

  test('supports target', () => validateSnapshot(
    <EuiLink
      {...defaultProps}
      target="_parent"
    />
  ));

  test('supports rel', () => validateSnapshot(
    <EuiLink
      {...defaultProps}
      rel="stylesheet"
    />
  ));

  test('supports aria-label', () => validateSnapshot(
    <EuiLink
      {...defaultProps}
      aria-label="Shazm!"
    />
  ));

  test('if onClick specified, it renders a button of type=button', () => validateSnapshot(
    <EuiLink
      {...requiredProps}
      onClick={() => 'hello, world!'}
    />
  ));

  test('button respects the type property', () => validateSnapshot(
    <EuiLink
      {...requiredProps}
      type="submit"
      onClick={() => 'hello, world!'}
    />
  ));

  test('onClick actually fires', () => {
    const handler = jest.fn();
    const component = mount(
      <EuiLink
        {...requiredProps}
        onClick={handler}
      />
    );
    component.find('button').simulate('click');
    expect(handler.mock.calls.length).toEqual(1);
  });
});
