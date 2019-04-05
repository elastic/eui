import React from 'react';
import { mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';
import cheerio from 'cheerio';

import { EuiIcon, IconType, SIZES, TYPES, COLORS } from './icon';
import { PropsOf } from '../common';

const prettyHtml = cheerio.load('');

function testIcon(type: IconType, props: PropsOf<EuiIcon> = {}) {
  return () => {
    const component = mount(
      <EuiIcon type={type} {...props} />
    );

    return new Promise(resolve => {
      setTimeout(() => {
        component.update();
        expect(prettyHtml(component.html())).toMatchSnapshot();
        resolve();
      }, 0);
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
        test('${size} is rendered', testIcon('search', { size }));
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
        testIcon(`${color} is rendered`, { color });
      });
    });

    describe('tabIndex', () => {
      testIcon('renders focusable="false" when not provided', {type: 'search'});

      testIcon('renders focusable="false" when -1', {type: 'search', tabIndex: -1});

      testIcon('renders focusable="true" when 0', {type: 'search', tabIndex: 0});
    });
  });
});
