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

import { _EuiPageBottomBar as EuiPageBottomBar } from './page_bottom_bar';

describe('_EuiPageBottomBar', () => {
  shouldRenderCustomStyles(<EuiPageBottomBar />);

  test('is rendered', () => {
    const component = render(<EuiPageBottomBar {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('restrict width', () => {
    test('can be set to a default', () => {
      const component = render(<EuiPageBottomBar restrictWidth={true} />);

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom number', () => {
      const component = render(<EuiPageBottomBar restrictWidth={1024} />);

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom value and measurement', () => {
      const component = render(<EuiPageBottomBar restrictWidth="24rem" />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('paddingSize', () => {
    PADDING_SIZES.forEach((size) => {
      it(`${size} is rendered`, () => {
        const component = render(<EuiPageBottomBar paddingSize={size} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
