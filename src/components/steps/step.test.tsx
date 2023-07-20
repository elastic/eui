/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiStep } from './step';
import { STATUS } from './step_number';

describe('EuiStep', () => {
  shouldRenderCustomStyles(
    <EuiStep {...requiredProps} title={'First step'}>
      <p>Do this</p>
    </EuiStep>
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiStep {...requiredProps} title={'First step'}>
        <p>Do this</p>
      </EuiStep>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('headingElement', () => {
      const { container } = render(
        <EuiStep headingElement={'h3'} title={'First step'}>
          <p>Do this</p>
        </EuiStep>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('step', () => {
      const { container } = render(
        <EuiStep step={5} title={'First step'}>
          <p>Do this</p>
        </EuiStep>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('titleSize', () => {
      const { container } = render(
        <EuiStep titleSize="xs" title={'First step'}>
          <p>Do this</p>
        </EuiStep>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('status', () => {
      STATUS.forEach((status) => {
        test(`${status} is rendered`, () => {
          const { container } = render(
            <EuiStep status={status} title={'First step'}>
              <p>Do this</p>
            </EuiStep>
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});
