/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test/required_props';
import { shouldRenderCustomStyles } from '../../test/internal';

import { TEXT_SIZES } from '../text/text';
import { EuiSkeletonText, LINES } from './skeleton_text';

describe('EuiSkeletonText', () => {
  shouldRenderCustomStyles(<EuiSkeletonText />);

  test('is rendered', () => {
    const { container } = render(<EuiSkeletonText {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('lines', () => {
    LINES.forEach((count) => {
      test(String(count), () => {
        const { getByRole } = render(<EuiSkeletonText lines={count} />);
        const container = getByRole('progressbar');

        expect(container.querySelectorAll('span')).toHaveLength(count);
      });
    });
  });

  describe('size', () => {
    TEXT_SIZES.forEach((size) => {
      test(size, () => {
        const { container } = render(<EuiSkeletonText size={size} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
