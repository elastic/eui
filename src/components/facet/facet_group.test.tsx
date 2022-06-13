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

import { EuiFacetGroup, LAYOUTS, GUTTER_SIZES } from './facet_group';

describe('EuiFacetGroup', () => {
  test('is rendered', () => {
    const component = render(<EuiFacetGroup {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('layout', () => {
      LAYOUTS.forEach((layout) => {
        test(`${layout} is rendered`, () => {
          const component = render(<EuiFacetGroup layout={layout} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('gutterSize', () => {
      GUTTER_SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const component = render(<EuiFacetGroup gutterSize={size} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
