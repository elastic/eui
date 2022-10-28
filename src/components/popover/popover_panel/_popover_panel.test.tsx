/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiPopoverPanel } from './_popover_panel';
import { POSITIONS } from '../popover_arrow/_popover_arrow';

describe('EuiPopoverPanel', () => {
  test('is rendered', () => {
    const component = render(<EuiPopoverPanel {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  shouldRenderCustomStyles(<EuiPopoverPanel />);

  describe('props', () => {
    test('isOpen is rendered', () => {
      const component = render(<EuiPopoverPanel isOpen />);

      expect(component).toMatchSnapshot();
    });

    test('isAttached is rendered', () => {
      const component = render(<EuiPopoverPanel isOpen />);

      expect(component).toMatchSnapshot();
    });

    test('hasDragDrop is rendered', () => {
      const component = render(<EuiPopoverPanel hasDragDrop />);

      expect(component).toMatchSnapshot();
    });

    describe('position', () => {
      POSITIONS.forEach((position) => {
        test(`${position} is rendered`, () => {
          const component = render(<EuiPopoverPanel position={position} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
