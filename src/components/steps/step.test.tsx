/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiStep } from './step';
import { STATUS } from './step_number';

describe('EuiStep', () => {
  test('is rendered', () => {
    const component = render(
      <EuiStep {...requiredProps} title={'First step'}>
        <p>Do this</p>
      </EuiStep>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('headingElement', () => {
      const component = render(
        <EuiStep headingElement={'h3'} title={'First step'}>
          <p>Do this</p>
        </EuiStep>
      );

      expect(component).toMatchSnapshot();
    });

    test('step', () => {
      const component = render(
        <EuiStep step={5} title={'First step'}>
          <p>Do this</p>
        </EuiStep>
      );

      expect(component).toMatchSnapshot();
    });

    test('titleSize', () => {
      const component = render(
        <EuiStep titleSize="xs" title={'First step'}>
          <p>Do this</p>
        </EuiStep>
      );

      expect(component).toMatchSnapshot();
    });

    describe('status', () => {
      STATUS.forEach((status) => {
        test(`${status} is rendered`, () => {
          const component = render(
            <EuiStep status={status} title={'First step'}>
              <p>Do this</p>
            </EuiStep>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
