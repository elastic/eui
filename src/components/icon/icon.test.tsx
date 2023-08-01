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
import { shouldRenderCustomStyles } from '../../test/internal';
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
import { icon as EuiIconVideoPlayer } from './assets/videoPlayer';

jest.mock('./icon', () => {
  return jest.requireActual('./icon');
});

beforeEach(() => clearIconComponentCache());

const prettyHtml = cheerio.load('');

function testIcon(props: PropsOf<typeof EuiIcon>) {
  return () => {
    expect.assertions(1);
    return new Promise<void>((resolve) => {
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
  let consoleErrorOverride: jest.SpyInstance;
  beforeAll(() => {
    // Ignore EuiIcon update not wrapped in act() warnings as they are triggered
    // directly from the component componentDidUpdate() and loadIconComponent()
    // TODO: Refactor EuiIcon to not cause this issue and think of a simpler
    //  implementation based on modern JS bundlers features instead of
    //  the EuiIcon caching layer.
    const originalConsoleError: typeof console.error = console.error;
    consoleErrorOverride = jest
      .spyOn(console, 'error')
      .mockImplementation((message, ...args) => {
        if (
          message?.startsWith(
            'Warning: An update to %s inside a test was not wrapped in act(...).'
          )
        ) {
          return;
        }

        originalConsoleError(message, ...args);
      });
  });

  afterAll(() => {
    consoleErrorOverride.mockRestore();
  });

  test('is rendered', testIcon({ type: 'search', ...requiredProps }));

  shouldRenderCustomStyles(<EuiIcon type="customImg" />);
  shouldRenderCustomStyles(<EuiIcon type="videoPlayer" />, {
    wrapper: ({ children }) => {
      // Need to preload the icon so we don't run into Emotion CSS `isLoading`/`isLoaded` race conditions
      appendIconComponentCache({ videoPlayer: EuiIconVideoPlayer });
      return children;
    },
  });

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
      expect(component.find('svg').prop('data-is-loading')).toEqual(true);
    });

    it('preloads the specified icon into the cache', () => {
      appendIconComponentCache({
        videoPlayer: EuiIconVideoPlayer,
      });
      const component = mount(<EuiIcon type="videoPlayer" />);
      // Should not have either data-is-loading attr set to true, because it was pre-loaded
      expect(component.find('svg').prop('data-is-loading')).not.toEqual(true);
    });

    it('does not impact non-loaded icons', () => {
      appendIconComponentCache({
        videoPlayer: EuiIconVideoPlayer,
      });
      const component = mount(<EuiIcon type="accessibility" />);
      expect(component.find('svg').prop('data-is-loading')).toEqual(true);
    });
  });
});
