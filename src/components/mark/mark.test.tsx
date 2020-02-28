import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiMark } from './mark';

describe('EuiMark', () => {
  test('is rendered', () => {
    const component = render(
      <EuiMark {...requiredProps} search="">
        value
      </EuiMark>
    );

    expect(component).toMatchSnapshot();
  });

  describe('behavior', () => {
    describe('matching', () => {
      test('only applies to first match', () => {
        const component = render(
          <EuiMark search="match">match match match</EuiMark>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('loose matching', () => {
      test('matches strings with different casing', () => {
        const component = render(
          <EuiMark search="CASE">different case match</EuiMark>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('strict matching', () => {
      test("doesn't match strings with different casing", () => {
        const component = render(
          <EuiMark search="CASE" strict>
            different case match
          </EuiMark>
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
