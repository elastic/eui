/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiHeaderLinks, GUTTER_SIZES } from './header_links';

describe('EuiHeaderLinks', () => {
  test('is rendered', () => {
    const component = render(<EuiHeaderLinks {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('gutterSize', () => {
    GUTTER_SIZES.forEach((gutterSize) => {
      test(`${gutterSize} is rendered`, () => {
        const component = render(<EuiHeaderLinks gutterSize={gutterSize} />);

        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('popover props', () => {
    test('is rendered', () => {
      const component = render(
        <EuiHeaderLinks
          popoverBreakpoints={['xs', 's', 'm', 'l', 'xl']}
          popoverButtonProps={{
            iconType: 'bolt',
            className: 'customButtonClass',
          }}
          popoverProps={{ anchorClassName: 'customAnchorClass' }}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('is never rendered with "none"', () => {
      const component = render(<EuiHeaderLinks popoverBreakpoints={'none'} />);

      expect(component).toMatchSnapshot();
    });
  });
});
