/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { render } from '../../../test/rtl';

import { EuiHeaderLinks, GUTTER_SIZES } from './header_links';

describe('EuiHeaderLinks', () => {
  shouldRenderCustomStyles(<EuiHeaderLinks popoverBreakpoints="all" />, {
    childProps: ['popoverButtonProps', 'popoverProps'],
  });

  test('is rendered', () => {
    const { container } = render(<EuiHeaderLinks {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('gutterSize', () => {
    GUTTER_SIZES.forEach((gutterSize) => {
      test(`${gutterSize} is rendered`, () => {
        const { container } = render(
          <EuiHeaderLinks gutterSize={gutterSize} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('popover props', () => {
    test('is rendered', () => {
      const { container } = render(
        <EuiHeaderLinks
          popoverBreakpoints={['xs', 's', 'm', 'l', 'xl']}
          popoverButtonProps={{
            iconType: 'bolt',
            className: 'customButtonClass',
          }}
          popoverProps={{ anchorClassName: 'customAnchorClass' }}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('is never rendered with "none"', () => {
      const { container } = render(
        <EuiHeaderLinks popoverBreakpoints={'none'} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
