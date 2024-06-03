/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiPagination } from './pagination';

describe('EuiPagination', () => {
  test('is rendered', () => {
    const { container } = render(<EuiPagination {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('pageCount', () => {
      test('is rendered', () => {
        const { container } = render(<EuiPagination pageCount={10} />);

        expect(container.firstChild).toMatchSnapshot();
      });

      test('can be 0', () => {
        const { container } = render(<EuiPagination pageCount={0} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('activePage', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiPagination activePage={5} pageCount={10} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('can be -1', () => {
        const { container } = render(
          <EuiPagination pageCount={0} activePage={-1} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('compressed', () => {
      test('is rendered', () => {
        const { container } = render(<EuiPagination compressed />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    test('aria-controls is rendered', () => {
      const { container } = render(
        <EuiPagination aria-controls={'idOfTable'} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('responsive', () => {
      test('can be false', () => {
        const { container } = render(<EuiPagination responsive={false} />);

        expect(container.firstChild).toMatchSnapshot();
      });

      test('can be customized', () => {
        const { container } = render(<EuiPagination responsive={['xs']} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
