/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act, waitFor } from '@testing-library/react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test/required_props';
import { shouldRenderCustomStyles } from '../../test/internal';

import { PropsOf } from '../common';

import {
  EuiIcon,
  SIZES,
  TYPES,
  COLORS,
  clearIconComponentCache,
  appendIconComponentCache,
} from './icon';
import { icon as EuiIconVideoPlayer } from './assets/videoPlayer';

jest.mock('./icon', () => {
  return jest.requireActual('./icon');
});

beforeEach(() => clearIconComponentCache());

const testIcon =
  (
    props: PropsOf<typeof EuiIcon>,
    assertion?: (icon: Element | null) => void
  ) =>
  async () => {
    act(() => {
      render(<EuiIcon {...props} />);
    });
    await waitFor(
      () => {
        const icon = document.querySelector(`[data-icon-type=${props.type}]`);
        expect(icon).toHaveAttribute('data-is-loaded', 'true');

        if (assertion) {
          assertion(icon);
        } else {
          expect(icon).toMatchSnapshot();
        }
      },
      { timeout: 3000 } // CI will sometimes time out if the icon doesn't load fast enough
    );
  };

describe('EuiIcon', () => {
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
    test('onIconLoad', async () => {
      const onIconLoad = jest.fn();

      render(<EuiIcon type="search" onIconLoad={onIconLoad} />);
      expect(onIconLoad).toHaveBeenCalledTimes(0);

      await waitFor(() => {
        expect(onIconLoad).toHaveBeenCalledTimes(1);
      });
    });

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

    describe('aria-hidden', () => {
      it(
        'enforces role=presentation if no title or label has been passed',
        testIcon({ type: 'empty', 'aria-hidden': false }, (icon) => {
          expect(icon).toHaveAttribute('role', 'presentation');
        })
      );

      it(
        'does not set role=presentation if a title/label is passed',
        testIcon(
          { type: 'empty', title: 'Anything', 'aria-label': 'Anything' },
          (icon) => {
            expect(icon).toHaveAttribute('role', 'img');
          }
        )
      );

      it(
        'allows consumers to override aria-hidden and role',
        testIcon(
          { type: 'empty', 'aria-hidden': false, role: 'img' },
          (icon) => {
            expect(icon).toHaveAttribute('aria-hidden', 'false');
            expect(icon).toHaveAttribute('role', 'img');
          }
        )
      );

      it(
        'allows consumers to override aria-hidden even if a title/label exists',
        testIcon(
          { type: 'empty', title: 'Anything', 'aria-hidden': true },
          (icon) => {
            expect(icon).toHaveAttribute('aria-hidden', 'true');
            expect(icon).not.toHaveAttribute('role');
          }
        )
      );

      it(
        'allows consumers to override role',
        testIcon({ type: 'empty', title: 'Anything', role: 'none' }, (icon) => {
          expect(icon).toHaveAttribute('role', 'none');
        })
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
    const { container } = render(<EuiIcon type={CustomIcon} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('appendIconComponentCache', () => {
    it('does nothing if not called', () => {
      const { container } = render(<EuiIcon type="videoPlayer" />);
      expect(container.firstChild).toHaveAttribute('data-is-loading', 'true');
    });

    it('preloads the specified icon into the cache', () => {
      appendIconComponentCache({
        videoPlayer: EuiIconVideoPlayer,
      });
      const { container } = render(<EuiIcon type="videoPlayer" />);
      expect(container.firstChild).not.toHaveAttribute('data-is-loading');
    });

    it('does not impact non-loaded icons', () => {
      appendIconComponentCache({
        videoPlayer: EuiIconVideoPlayer,
      });
      const { container } = render(<EuiIcon type="accessibility" />);
      expect(container.firstChild).toHaveAttribute('data-is-loading', 'true');
    });
  });
});
