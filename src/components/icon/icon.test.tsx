import React from 'react';
import { mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';
import cheerio from 'cheerio';

import { EuiIcon, SIZES, TYPES, COLORS, setCache, iconCache } from './icon';
import { PropsOf } from '../common';

const prettyHtml = cheerio.load('');

function testIcon(props: PropsOf<EuiIcon>) {
  return () => {
    const component = mount(<EuiIcon {...props} />);

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
  beforeEach(() => {
    setCache(iconCache());
  });

  test('is rendered', testIcon({ type: 'search', ...requiredProps }));

  describe('props', () => {
    describe('other props', () => {
      test(
        'are passed through to the icon',
        testIcon({ type: 'search', 'aria-label': 'a custom title' })
      );
    });

    describe('size', () => {
      SIZES.forEach(size => {
        test('${size} is rendered', testIcon({ type: 'search', size }));
      });
    });

    describe('cache', () => {
      it('renders icons from the cache', async () => {
        const uncachedRender = mount(<EuiIcon type="gear" />);

        expect(uncachedRender.find('.euiIcon-isLoading').length).toBeTruthy();

        await new Promise(resolve => {
          setTimeout(() => {
            uncachedRender.update();
            resolve();
          });
        });

        const cachedRender = mount(<EuiIcon type="gear" />);

        expect(uncachedRender.find('.euiIcon-isLoading').length).toBeFalsy();
        expect(cachedRender.find('.euiIcon-isLoading').length).toBeFalsy();
        expect(uncachedRender.find('.euiIcon-isLoaded').length).toBeTruthy();
        expect(cachedRender.find('.euiIcon-isLoaded').length).toBeTruthy();
      });
    });

    describe('type', () => {
      TYPES.forEach(type => {
        test(`${type} is rendered`, testIcon({ type }));
      });
    });

    describe('color', () => {
      [
        ...COLORS,
        '#fde',
        '#885522',
        'rgb(100, 150, 200)',
        'hsla(270, 60%, 70%, 0.9)',
      ].forEach(color => {
        it(`${color} is rendered`, testIcon({ type: 'search', color }));
      });
    });

    describe('tabIndex', () => {
      it(
        'renders focusable="false" when not provided',
        testIcon({ type: 'search' })
      );

      it(
        'renders focusable="false" when -1',
        testIcon({ type: 'search', tabIndex: -1 })
      );

      it(
        'renders focusable="true" when 0',
        testIcon({ type: 'search', tabIndex: 0 })
      );
    });
  });
});
