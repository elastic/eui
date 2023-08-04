/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test';

import { EuiSkipLink, POSITIONS } from './skip_link';

describe('EuiSkipLink', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiSkipLink destinationId="somewhere" {...requiredProps}>
        Skip
      </EuiSkipLink>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('overrideLinkBehavior', () => {
      const mockElement = document.createElement('main');
      jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

      it('prevents default link behavior and manually focuses the destination', () => {
        const focusSpy = jest.fn();
        mockElement.focus = focusSpy;

        const component = mount(
          <EuiSkipLink destinationId="somewhere" overrideLinkBehavior />
        );

        const preventDefault = jest.fn();
        component.find('a').simulate('click', { preventDefault });

        expect(preventDefault).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalled();
      });

      it('only scrolls to the destination if out of view', () => {
        const scrollSpy = jest.fn();
        mockElement.scrollIntoView = scrollSpy;

        const component = mount(
          <EuiSkipLink destinationId="somewhere" overrideLinkBehavior />
        );
        component.find('a').simulate('click');
        expect(scrollSpy).not.toHaveBeenCalled();

        mockElement.getBoundingClientRect = () => ({ top: 1000 } as any);
        component.find('a').simulate('click');
        expect(scrollSpy).toHaveBeenCalled();
      });

      afterAll(() => jest.restoreAllMocks());
    });

    describe('fallbackDestination', () => {
      it('falls back to focusing the main tag if destinationId is invalid', () => {
        const { getByText } = render(
          <>
            <EuiSkipLink destinationId="">Skip to content</EuiSkipLink>
            <main>I am content</main>
          </>
        );
        fireEvent.click(getByText('Skip to content'));

        const expectedFocus = document.querySelector('main');
        expect(document.activeElement).toEqual(expectedFocus);
      });

      it('supports multiple query selectors', () => {
        const { getByText } = render(
          <>
            <EuiSkipLink
              destinationId=""
              fallbackDestination="main, [role=main], .appWrapper"
            >
              Skip to content
            </EuiSkipLink>
            <div className="appWrapper">
              <div role="main">I am content</div>
            </div>
          </>
        );
        fireEvent.click(getByText('Skip to content'));

        // Unlike the array behavior, querySelector always picks *the first node in the DOM tree* found
        // vs. the first item in the selector comma string
        const expectedFocus = document.querySelector('.appWrapper');
        expect(document.activeElement).toEqual(expectedFocus);
      });

      it('supports an array of query selectors', () => {
        const { getByText } = render(
          <>
            <EuiSkipLink
              destinationId=""
              fallbackDestination={['main', '[role=main]', '.appWrapper']}
            >
              Skip to content
            </EuiSkipLink>
            <div className="appWrapper">
              <div role="main">Test</div>
            </div>
          </>
        );
        fireEvent.click(getByText('Skip to content'));

        // Array syntax allows us to prioritize preferred selectors
        const expectedFocus = document.querySelector('[role=main]');
        expect(document.activeElement).toEqual(expectedFocus);
      });
    });

    test('tabIndex is rendered', () => {
      const { container } = render(
        <EuiSkipLink destinationId="somewhere" tabIndex={-1} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('onClick', () => {
      test('is always called', () => {
        const onClick = jest.fn();
        const { getByText } = render(
          <>
            <EuiSkipLink destinationId="somewhere" onClick={onClick}>
              Test
            </EuiSkipLink>
            <div id="somewhere" />
          </>
        );
        fireEvent.click(getByText('Test'));

        expect(onClick).toHaveBeenCalled();
      });

      test('is called even when no valid destination exists', () => {
        const onClick = jest.fn(() =>
          document.querySelector('button')!.focus()
        );
        const { getByText } = render(
          <>
            <EuiSkipLink
              destinationId=""
              fallbackDestination=""
              onClick={onClick}
            >
              Test
            </EuiSkipLink>
            <button />
          </>
        );
        fireEvent.click(getByText('Test'));

        expect(onClick).toHaveBeenCalled();
        expect(document.activeElement?.tagName.toLowerCase()).toEqual('button');
      });

      test('does not override overrideLinkBehavior', () => {
        const onClick = jest.fn();
        const { getByText } = render(
          <>
            <EuiSkipLink
              destinationId="somewhere"
              overrideLinkBehavior
              onClick={onClick}
            >
              Test
            </EuiSkipLink>
            <div id="somewhere" />
          </>
        );
        fireEvent.click(getByText('Test'));

        expect(document.activeElement?.id).toEqual('somewhere');
        expect(onClick).toHaveBeenCalled();
      });
    });

    describe('position', () => {
      POSITIONS.forEach((position) => {
        test(`${position} is rendered`, () => {
          const { container } = render(
            <EuiSkipLink destinationId="somewhere" position={position} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});
