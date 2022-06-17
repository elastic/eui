/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiSkipLink, POSITIONS } from './skip_link';

describe('EuiSkipLink', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSkipLink destinationId="somewhere" {...requiredProps}>
        Skip
      </EuiSkipLink>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('overrideLinkBehavior prevents default link behavior and manually scrolls and focuses the destination', () => {
      const scrollSpy = jest.fn();
      const focusSpy = jest.fn();
      jest.spyOn(document, 'getElementById').mockReturnValue({
        scrollIntoView: scrollSpy,
        focus: focusSpy,
      } as any);

      const component = mount(
        <EuiSkipLink destinationId="somewhere" overrideLinkBehavior />
      );

      const preventDefault = jest.fn();
      component.find('a').simulate('click', { preventDefault });

      expect(preventDefault).toHaveBeenCalled();
      expect(scrollSpy).toHaveBeenCalled();
      expect(focusSpy).toHaveBeenCalled();
    });

    test('tabIndex is rendered', () => {
      const component = render(
        <EuiSkipLink destinationId="somewhere" tabIndex={-1} />
      );

      expect(component).toMatchSnapshot();
    });

    test('onClick is rendered', () => {
      const component = render(
        <EuiSkipLink destinationId="somewhere" onClick={() => {}} />
      );

      expect(component).toMatchSnapshot();
    });

    describe('position', () => {
      POSITIONS.forEach((position) => {
        test(`${position} is rendered`, () => {
          const component = render(
            <EuiSkipLink destinationId="somewhere" position={position} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
