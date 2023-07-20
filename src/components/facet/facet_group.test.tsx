/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test';
import { render } from '../../test/rtl';

import { EuiFacetGroup, LAYOUTS, GUTTER_SIZES } from './facet_group';
import { shouldRenderCustomStyles } from '../../test/internal';

describe('EuiFacetGroup', () => {
  shouldRenderCustomStyles(<EuiFacetGroup>Content</EuiFacetGroup>);

  test('is rendered', () => {
    const { container } = render(<EuiFacetGroup {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('layout', () => {
      LAYOUTS.forEach((layout) => {
        test(`${layout} is rendered`, () => {
          const { container } = render(<EuiFacetGroup layout={layout} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('gutterSize', () => {
      GUTTER_SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { container } = render(<EuiFacetGroup gutterSize={size} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});
