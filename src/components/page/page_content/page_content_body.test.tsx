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

import { EuiPageContentBody, PADDING_SIZES } from './page_content_body';

describe('EuiPageContentBody', () => {
  test('is rendered', () => {
    const component = render(<EuiPageContentBody {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('paddingSize', () => {
    PADDING_SIZES.forEach((size) => {
      it(`${size} is rendered`, () => {
        const component = render(<EuiPageContentBody paddingSize={size} />);

        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('restrict width', () => {
    test('can be set to a default', () => {
      const component = render(<EuiPageContentBody restrictWidth={true} />);

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom number', () => {
      const component = render(<EuiPageContentBody restrictWidth={1024} />);

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom value and does not override custom style', () => {
      const component = render(
        <EuiPageContentBody restrictWidth="24rem" style={{ color: 'red ' }} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
