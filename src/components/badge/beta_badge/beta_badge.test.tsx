/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiBetaBadge, COLORS, SIZES, ALIGNMENTS } from './beta_badge';

describe('EuiBetaBadge', () => {
  shouldRenderCustomStyles(
    <EuiBetaBadge label="Hello" tooltipContent="World" />,
    { childProps: ['anchorProps'] }
  );

  test('is rendered', () => {
    const component = render(<EuiBetaBadge label="Beta" {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const component = render(<EuiBetaBadge label="Beta" color={color} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const component = render(<EuiBetaBadge label="Beta" size={size} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    test('iconType', () => {
      const component = render(<EuiBetaBadge label="Beta" iconType="beta" />);

      expect(component).toMatchSnapshot();
    });

    test('single letter', () => {
      const component = render(<EuiBetaBadge label="B" />);

      expect(component).toMatchSnapshot();
    });

    test('tooltip and anchorProps are rendered', () => {
      const component = render(
        <EuiBetaBadge
          label="Beta"
          tooltipContent="Tooltip"
          anchorProps={{
            className: 'customAnchorClass',
            'data-test-subj': 'DTS',
          }}
        />
      );

      expect(component).toMatchSnapshot();
    });

    describe('alignement', () => {
      ALIGNMENTS.forEach((alignment) => {
        test(`${alignment} is rendered`, () => {
          const component = render(
            <EuiBetaBadge label="Beta" alignment={alignment} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
