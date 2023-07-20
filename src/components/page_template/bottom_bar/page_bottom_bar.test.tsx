/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { PADDING_SIZES } from '../../../global_styling';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { _EuiPageBottomBar as EuiPageBottomBar } from './page_bottom_bar';

describe('_EuiPageBottomBar', () => {
  shouldRenderCustomStyles(<EuiPageBottomBar />);

  test('is rendered', () => {
    const { container } = render(<EuiPageBottomBar {...requiredProps} />);

    expect(container).toMatchSnapshot();
  });

  describe('restrict width', () => {
    test('can be set to a default', () => {
      const { container } = render(<EuiPageBottomBar restrictWidth={true} />);

      expect(container).toMatchSnapshot();
    });

    test('can be set to a custom number', () => {
      const { container } = render(<EuiPageBottomBar restrictWidth={1024} />);

      expect(container).toMatchSnapshot();
    });

    test('can be set to a custom value and measurement', () => {
      const { container } = render(<EuiPageBottomBar restrictWidth="24rem" />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('paddingSize', () => {
    PADDING_SIZES.forEach((size) => {
      it(`${size} is rendered`, () => {
        const { container } = render(<EuiPageBottomBar paddingSize={size} />);

        expect(container).toMatchSnapshot();
      });
    });
  });
});
