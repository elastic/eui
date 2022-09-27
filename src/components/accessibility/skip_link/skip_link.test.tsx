/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { fireEvent } from '@testing-library/dom';
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
              fallbackDestination="main, [role=main]"
            >
              Skip to content
            </EuiSkipLink>
            <div role="main">I am content</div>
          </>
        );
        fireEvent.click(getByText('Skip to content'));

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
