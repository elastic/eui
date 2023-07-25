/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';
import { render } from '../../test/rtl';

import { EuiTextAlign, ALIGNMENTS } from './text_align';

describe('EuiTextAlign', () => {
  test('is rendered', () => {
    const { container } = render(<EuiTextAlign {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  shouldRenderCustomStyles(
    <EuiTextAlign textAlign="right">
      <p>Content</p>
    </EuiTextAlign>
  );

  describe('props', () => {
    describe('direction', () => {
      ALIGNMENTS.forEach((direction) => {
        test(`${direction} is rendered`, () => {
          const { container } = render(<EuiTextAlign textAlign={direction} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('cloneElement', () => {
      test('cloneElement', () => {
        const { container } = render(
          <EuiTextAlign cloneElement>
            <p>Content</p>
          </EuiTextAlign>
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      shouldRenderCustomStyles(<EuiTextAlign cloneElement textAlign="right" />);
    });
  });
});
