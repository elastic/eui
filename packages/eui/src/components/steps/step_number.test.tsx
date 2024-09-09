/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
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
    describe('titleSize', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiStepNumber titleSize="xs" number={1} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      describe('none', () => {
        it('renders no visible number', () => {
          const { container } = render(
            <EuiStepNumber titleSize="none" number={1} />
          );

          expect(
            container.querySelector('.euiStepNumber__number')
          ).not.toBeInTheDocument();
        });
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

        if (['complete', 'warning', 'danger'].includes(status)) {
          it('renders an icon', () => {
            const { container } = render(
              <EuiStepNumber titleSize="none" number={1} status={status} />
            );

            expect(
              container.querySelector('.euiStepNumber__icon')
            ).toBeInTheDocument();
          });
        } else if (status === 'loading') {
          it('renders a loading spinner', () => {
            const { container } = render(
              <EuiStepNumber titleSize="none" number={1} status={status} />
            );

            expect(
              container.querySelector('.euiStepNumber__loader')
            ).toBeInTheDocument();
          });
        } else {
          it('does not render an icon', () => {
            const { container } = render(
              <EuiStepNumber titleSize="none" number={1} status={status} />
            );

            expect(
              container.querySelector('.euiStepNumber__icon')
            ).not.toBeInTheDocument();
          });
        }
      });
    });
  });
});
