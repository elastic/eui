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

import { TITLE_SIZES } from '../title/title';
import { EuiSkeletonTitle } from './skeleton_title';

describe('EuiSkeletonTitle', () => {
  shouldRenderCustomStyles(<EuiSkeletonTitle />, {
    childProps: ['ariaWrapperProps'],
  });

  test('is rendered', () => {
    const { container } = render(<EuiSkeletonTitle {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('size', () => {
    TITLE_SIZES.forEach((size) => {
      test(size, () => {
        const { container } = render(<EuiSkeletonTitle size={size} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  it('renders its children when `isLoading=false`', () => {
    const { queryByRole, queryByTestSubject } = render(
      <EuiSkeletonTitle isLoading={false}>
        <span data-test-subj="loaded" />
      </EuiSkeletonTitle>
    );

    expect(queryByRole('progressbar')).toBeFalsy();
    expect(queryByTestSubject('loaded')).toBeTruthy();
  });
});
