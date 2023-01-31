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

import { EuiSkeletonCircle, SIZES } from './skeleton_circle';

describe('EuiSkeletonCircle', () => {
  shouldRenderCustomStyles(<EuiSkeletonCircle />, {
    childProps: ['ariaWrapperProps'],
  });

  test('is rendered', () => {
    const { container } = render(<EuiSkeletonCircle {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('size', () => {
    SIZES.forEach((size) => {
      test(size, () => {
        const { container } = render(<EuiSkeletonCircle size={size} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  it('renders its children when `isLoading=false`', () => {
    const { queryByRole, queryByTestSubject } = render(
      <EuiSkeletonCircle isLoading={false}>
        <span data-test-subj="loaded" />
      </EuiSkeletonCircle>
    );

    expect(queryByRole('progressbar')).toBeFalsy();
    expect(queryByTestSubject('loaded')).toBeTruthy();
  });
});
