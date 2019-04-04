import React from 'react';
import { mount, render } from 'enzyme';
import { requiredProps } from '../../test/required_props';
import cheerio from 'cheerio';

import { EuiIcon, IconType, SIZES, TYPES, COLORS } from './icon';
import { PropsOf } from '../common';

function testIcon(type: IconType, props: PropsOf<EuiIcon> = {}) {
  return () => {
    const component = mount(
      <EuiIcon type={type} {...props} />
    );

    return new Promise(resolve => {
      setTimeout(() => {
        component.update();
        expect(cheerio.load('')(component.html())).toMatchSnapshot();
        resolve();
      }, 1000);
    });
  };
}

describe('EuiIcon', () => {
  test('is rendered', testIcon('search', requiredProps));

  describe('props', () => {
    describe('other props', () => {
      test('are passed through to the icon', testIcon('search', {'aria-label': 'a custom title'}));
    });

    describe('size', () => {
      SIZES.forEach(size => {
        test(`${size} is rendered`, () => {
          const component = render(<EuiIcon type="search" size={size} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('type', () => {
      TYPES.forEach(type => {
        test(`${type} is rendered`, testIcon(type));
      });
    });

    describe('color', () => {
      COLORS.concat([
        '#fde',
        '#885522',
        'rgb(100, 150, 200)',
        'hsla(270, 60%, 70%, 0.9)',
      ]).forEach(color => {
        test(`${color} is rendered`, () => {
          const component = render(<EuiIcon color={color} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('tabIndex', () => {
      test('renders focusable="false" when not provided', () => {
        const component = render(<EuiIcon type="search" />);
        expect(component).toMatchSnapshot();
      });

      test('renders focusable="false" when -1', () => {
        const component = render(<EuiIcon type="search" tabIndex={-1} />);
        expect(component).toMatchSnapshot();
      });

      test('renders focusable="true" when 0', () => {
        const component = render(<EuiIcon type="search" tabIndex={0} />);
        expect(component).toMatchSnapshot();
      });
    });
  });
});
