/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';
import cheerio from 'cheerio';

import {
  EuiIcon,
  SIZES,
  TYPES,
  COLORS,
  clearIconComponentCache,
  appendIconComponentCache,
} from './icon';
import { PropsOf } from '../common';
// @ts-ignore importing from a JS file
import { icon as EuiIconVideoPlayer } from './assets/videoPlayer.js';

jest.mock('./icon', () => {
  return jest.requireActual('./icon');
});

beforeEach(() => clearIconComponentCache());

const prettyHtml = cheerio.load('');

function testIcon(props: PropsOf<EuiIcon>) {
  return () => {
    expect.assertions(1);
    return new Promise((resolve) => {
      const onIconLoad = () => {
        component.update();
        expect(prettyHtml(component.html())).toMatchSnapshot();
        resolve();
      };
      const component = mount(<EuiIcon {...props} onIconLoad={onIconLoad} />);
    });
  };
}

describe('EuiIcon', () => {
  test('is rendered', testIcon({ type: 'search', ...requiredProps }));

  describe('props', () => {
    describe('other props', () => {
      test(
        'are passed through to the icon',
        testIcon({
          type: 'search',
          'aria-label': 'A Search Icon',
          title: 'Search',
        })
      );
    });

    describe('title and titleId', () => {
      test(
        'are passed and generate an aria-labelledby',
        testIcon({
          type: 'search',
          title: 'Search icon',
          titleId: 'id-test',
        })
      );
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test('${size} is rendered', testIcon({ type: 'search', size }));
      });
    });

    describe('type', () => {
      TYPES.forEach((type) => {
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
      ].forEach((color) => {
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

  it('renders custom components', () => {
    const CustomIcon = ({ ...props }) => {
      return (
        <span role="img" aria-label="heart" {...props}>
          ❤️
        </span>
      );
    };
    const component = mount(<EuiIcon type={CustomIcon} />);
    expect(prettyHtml(component.html())).toMatchSnapshot();
  });

  describe('appendIconComponentCache', () => {
    it('does nothing if not called', () => {
      const component = mount(<EuiIcon type="videoPlayer" />);
      expect(
        component.find('EuiIcon[type="videoPlayer"] > EuiIconEmpty').length
      ).toBe(1);
    });

    it('injects the specified icon', () => {
      appendIconComponentCache({
        videoPlayer: EuiIconVideoPlayer,
      });
      const component = mount(<EuiIcon type="videoPlayer" />);
      expect(
        component.find('EuiIcon[type="videoPlayer"] > EuiIconVideoPlayer')
          .length
      ).toBe(1);
    });

    it('does not impact non-loaded icons', () => {
      appendIconComponentCache({
        videoPlayer: EuiIconVideoPlayer,
      });
      const component = mount(<EuiIcon type="accessibility" />);
      expect(
        component.find('EuiIcon[type="accessibility"] > EuiIconEmpty').length
      ).toBe(1);
    });
  });
});
