/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { STATUS, EuiStepNumber } from './step_number';

describe('EuiStepNumber', () => {
  test('is rendered', () => {
    const component = render(<EuiStepNumber {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isHollow', () => {
      it('is rendered', () => {
        const component = render(<EuiStepNumber number={1} isHollow />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('has titleSize', () => {
      it('is rendered', () => {
        const component = render(<EuiStepNumber titleSize="xs" number={1} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('status', () => {
      STATUS.forEach((status) => {
        test(`${status} is rendered`, () => {
          const component = render(
            <EuiStepNumber number={1} status={status} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
