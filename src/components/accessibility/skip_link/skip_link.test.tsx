/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
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
    });

    test('tabIndex is rendered', () => {
      const { container } = render(
        <EuiSkipLink destinationId="somewhere" tabIndex={-1} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('onClick is rendered', () => {
      const { container } = render(
        <EuiSkipLink destinationId="somewhere" onClick={() => {}} />
      );

      expect(container.firstChild).toMatchSnapshot();
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
