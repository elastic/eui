import React from 'react';
import { mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';
import cheerio from 'cheerio';
import {
  EuiIcon,
  SIZES,
  TYPES,
  COLORS,
  setCache,
  createCache,
  EuiIconProps,
  loadIcon,
} from './icon';

const prettyHtml = cheerio.load('');

function testIcon(props: EuiIconProps) {
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
    setCache(createCache());
  });

  test('is rendered', testIcon({ type: 'search', ...requiredProps }));

  describe('loadIcon', () => {
    test('it executes callbacks in a single pass, rather than one per event loop cycle', () => {
      const mockThen = jest.fn(() => ({ finally: jest.fn() }));
      const mockImport = jest.fn(() => ({ then: mockThen }));
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const callback3 = jest.fn();

      loadIcon(mockImport, 'wrench', callback1);
      loadIcon(mockImport, 'wrench', callback2);

      expect(mockThen).toHaveBeenCalledTimes(1);

      loadIcon(mockImport, 'dot', callback3);

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).not.toHaveBeenCalled();

      const [[resolveThen]] = mockThen.mock.calls as any;

      resolveThen({ icon: 'myicon' });

      expect(callback1).toHaveBeenCalledWith('myicon');
      expect(callback2).toHaveBeenCalledWith('myicon');
      expect(callback3).not.toHaveBeenCalled();
    });

    test('caches the icon', () => {
      const setIcon = jest.fn();
      const mockThen = jest.fn(() => ({ finally: jest.fn() }));
      const mockImport = jest.fn(() => ({ then: mockThen }));

      setCache({
        getIcon: jest.fn(),
        setIcon,
      });

      loadIcon(mockImport, 'wrench', jest.fn());

      const [[resolveThen]] = mockThen.mock.calls as any;

      resolveThen({ icon: 'myicon' });

      expect(setIcon).toHaveBeenCalledWith('wrench', 'myicon');
    });

    test('does nothing if the icon is already cached', () => {
      setCache({
        getIcon: () => 'foo',
        setIcon: jest.fn(),
      });

      const mockImport = jest.fn();

      loadIcon(mockImport, 'test1', jest.fn());
      expect(mockImport).not.toHaveBeenCalled();
    });
  });

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
