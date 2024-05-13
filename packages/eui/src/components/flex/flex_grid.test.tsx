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

import {
  EuiFlexGrid,
  GUTTER_SIZES,
  DIRECTIONS,
  ALIGN_ITEMS,
} from './flex_grid';

describe('EuiFlexGrid', () => {
  shouldRenderCustomStyles(<EuiFlexGrid />);

  test('is rendered', () => {
    const { container } = render(
      <EuiFlexGrid columns={3} {...requiredProps}>
        <h2>My Child</h2>
      </EuiFlexGrid>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('gutterSize', () => {
      GUTTER_SIZES.forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(<EuiFlexGrid gutterSize={value} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('columns', () => {
      ([1, 2, 3, 4] as const).forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(<EuiFlexGrid columns={value} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('direction', () => {
      DIRECTIONS.forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(<EuiFlexGrid direction={value} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('alignItems', () => {
      ALIGN_ITEMS.forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(<EuiFlexGrid alignItems={value} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('responsive', () => {
      test('is rendered', () => {
        const { container } = render(<EuiFlexGrid responsive={false} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
