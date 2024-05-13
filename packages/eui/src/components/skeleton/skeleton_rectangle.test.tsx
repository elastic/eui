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

import { EuiSkeletonRectangle, RADIUS } from './skeleton_rectangle';

describe('EuiSkeletonRectangle', () => {
  shouldRenderCustomStyles(<EuiSkeletonRectangle />, {
    childProps: ['ariaWrapperProps'],
  });

  test('is rendered', () => {
    const { container } = render(<EuiSkeletonRectangle {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('width and height', () => {
    const { container } = render(
      <EuiSkeletonRectangle width="100%" height="33vh" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('borderRadius', () => {
    RADIUS.forEach((radius) => {
      test(radius, () => {
        const { container } = render(
          <EuiSkeletonRectangle borderRadius={radius} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  it('correctly renders passed styles', () => {
    const { container } = render(
      <EuiSkeletonRectangle style={{ backgroundColor: 'red' }} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders its children when `isLoading=false`', () => {
    const { queryByRole, queryByTestSubject } = render(
      <EuiSkeletonRectangle isLoading={false}>
        <span data-test-subj="loaded" />
      </EuiSkeletonRectangle>
    );

    expect(queryByRole('progressbar')).toBeFalsy();
    expect(queryByTestSubject('loaded')).toBeTruthy();
  });
});
