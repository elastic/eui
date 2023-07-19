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

import { EuiCallOut, COLORS, HEADINGS } from './call_out';

describe('EuiCallOut', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiCallOut {...requiredProps}>Content</EuiCallOut>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('title', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiCallOut title="Title">Content</EuiCallOut>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const { container } = render(<EuiCallOut iconType="user" />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(<EuiCallOut color={color} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('heading', () => {
      HEADINGS.forEach((heading) => {
        test(`${heading} is rendered`, () => {
          const { container } = render(<EuiCallOut heading={heading} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});
