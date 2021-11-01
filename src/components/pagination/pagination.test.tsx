/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiPagination } from './pagination';

describe('EuiPagination', () => {
  test('is rendered', () => {
    const component = render(<EuiPagination {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('pageCount', () => {
      test('is rendered', () => {
        const component = render(<EuiPagination pageCount={10} />);

        expect(component).toMatchSnapshot();
      });

      test('can be null', () => {
        const component = render(<EuiPagination pageCount={null} />);

        expect(component).toMatchSnapshot();
      });
    });

    test('activePage is rendered', () => {
      const component = render(<EuiPagination activePage={5} pageCount={10} />);

      expect(component).toMatchSnapshot();
    });

    describe('compressed', () => {
      test(' is rendered', () => {
        const component = render(<EuiPagination compressed />);

        expect(component).toMatchSnapshot();
      });
      test('arrows is rendered', () => {
        const component = render(<EuiPagination compressed="arrows" />);

        expect(component).toMatchSnapshot();
      });
    });

    test('aria-controls is rendered', () => {
      const component = render(<EuiPagination aria-controls={'idOfTable'} />);

      expect(component).toMatchSnapshot();
    });
  });
});
