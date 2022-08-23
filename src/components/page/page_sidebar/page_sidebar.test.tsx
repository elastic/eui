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
import { PADDING_SIZES } from '../../../global_styling';

import { EuiPageSidebar } from './page_sidebar';

describe('EuiPageSidebar', () => {
  shouldRenderCustomStyles(<EuiPageSidebar />);

  test('is rendered', () => {
    const component = render(<EuiPageSidebar {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('minWidth is rendered', () => {
    const component = render(<EuiPageSidebar minWidth={400} />);

    expect(component).toMatchSnapshot();
  });

  test('sticky is rendered', () => {
    const component = render(<EuiPageSidebar sticky={{ offset: 100 }} />);

    expect(component).toMatchSnapshot();
  });

  describe('paddingSize', () => {
    PADDING_SIZES.forEach((size) => {
      it(`${size} is rendered`, () => {
        const component = render(<EuiPageSidebar paddingSize={size} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
