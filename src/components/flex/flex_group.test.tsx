/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import {
  requiredProps,
  startThrowingReactWarnings,
  stopThrowingReactWarnings,
} from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';
import { render } from '../../test/rtl';

import {
  EuiFlexGroup,
  GUTTER_SIZES,
  ALIGN_ITEMS,
  JUSTIFY_CONTENTS,
  DIRECTIONS,
} from './flex_group';

beforeAll(startThrowingReactWarnings);
afterAll(stopThrowingReactWarnings);

describe('EuiFlexGroup', () => {
  shouldRenderCustomStyles(<EuiFlexGroup />);

  test('is rendered', () => {
    const { container } = render(
      <EuiFlexGroup {...requiredProps}>
        <h2>My Child</h2>
      </EuiFlexGroup>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('responsive', () => {
      [true, false].forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(<EuiFlexGroup responsive={value} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('gutterSize', () => {
      GUTTER_SIZES.forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(<EuiFlexGroup gutterSize={value} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('alignItems', () => {
      ALIGN_ITEMS.forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(<EuiFlexGroup alignItems={value} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('justifyContent', () => {
      JUSTIFY_CONTENTS.forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(<EuiFlexGroup justifyContent={value} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('direction', () => {
      DIRECTIONS.forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(<EuiFlexGroup direction={value} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('component', () => {
      ['div', 'span'].forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(
            <EuiFlexGroup component={value as 'div' | 'span'} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });

      ['h2'].forEach((value) => {
        test(`${value} is not rendered`, () => {
          expect(() =>
            render(
              // @ts-ignore intentionally passing an invalid value
              <EuiFlexGroup component={value} />
            )
          ).toThrow();
        });
      });
    });

    describe('wrap', () => {
      [true, false].forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(<EuiFlexGroup wrap={value} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});
