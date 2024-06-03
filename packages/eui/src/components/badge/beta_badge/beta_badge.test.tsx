/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { render } from '../../../test/rtl';

import { EuiBetaBadge, COLORS, SIZES, ALIGNMENTS } from './beta_badge';

describe('EuiBetaBadge', () => {
  shouldRenderCustomStyles(
    <EuiBetaBadge label="Hello" tooltipContent="World" />,
    { childProps: ['anchorProps'] }
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiBetaBadge label="Beta" {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(
            <EuiBetaBadge label="Beta" color={color} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { container } = render(
            <EuiBetaBadge label="Beta" size={size} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    test('iconType', () => {
      const { container } = render(
        <EuiBetaBadge label="Beta" iconType="beta" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('single letter', () => {
      const { container } = render(<EuiBetaBadge label="B" />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('tooltip and anchorProps are rendered', () => {
      const { container } = render(
        <EuiBetaBadge
          label="Beta"
          tooltipContent="Tooltip"
          anchorProps={{
            className: 'customAnchorClass',
            'data-test-subj': 'DTS',
          }}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('alignement', () => {
      ALIGNMENTS.forEach((alignment) => {
        test(`${alignment} is rendered`, () => {
          const { container } = render(
            <EuiBetaBadge label="Beta" alignment={alignment} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});
