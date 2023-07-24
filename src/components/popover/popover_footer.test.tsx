/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiPopoverFooter } from './popover_footer';
import { PADDING_SIZES } from '../../global_styling';

describe('EuiPopoverFooter', () => {
  test('is rendered', () => {
    const { container } = render(<EuiPopoverFooter {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  shouldRenderCustomStyles(<EuiPopoverFooter />);

  describe('props', () => {
    describe('paddingSize', () => {
      PADDING_SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { container } = render(<EuiPopoverFooter paddingSize={size} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});
