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

    describe('status', () => {
      STATUS.forEach(status => {
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
