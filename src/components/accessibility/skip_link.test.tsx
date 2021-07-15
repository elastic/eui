/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

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
