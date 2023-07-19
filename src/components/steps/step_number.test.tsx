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

import { STATUS, EuiStepNumber } from './step_number';

describe('EuiStepNumber', () => {
  shouldRenderCustomStyles(<EuiStepNumber {...requiredProps} />);

  test('is rendered', () => {
    const { container } = render(<EuiStepNumber {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('has titleSize', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiStepNumber titleSize="xs" number={1} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('status', () => {
      STATUS.forEach((status) => {
        test(`${status} is rendered`, () => {
          const { container } = render(
            <EuiStepNumber number={1} status={status} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});
