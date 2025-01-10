/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiPopoverPanel } from './_popover_panel';
import { POSITIONS } from '../popover_arrow/_popover_arrow';

describe('EuiPopoverPanel', () => {
  test('is rendered', () => {
    const { container } = render(<EuiPopoverPanel {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  shouldRenderCustomStyles(<EuiPopoverPanel />);

  describe('props', () => {
    test('isOpen is rendered', () => {
      const { container } = render(<EuiPopoverPanel isOpen />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isAttached is rendered', () => {
      const { container } = render(<EuiPopoverPanel isOpen />);

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('position', () => {
      POSITIONS.forEach((position) => {
        test(`${position} is rendered`, () => {
          const { container } = render(<EuiPopoverPanel position={position} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});
