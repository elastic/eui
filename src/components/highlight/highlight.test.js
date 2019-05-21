import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiHighlight } from './highlight';

describe('EuiHighlight', () => {
  test('is rendered', () => {
    const component = render(
      <EuiHighlight {...requiredProps} search="">
        value
      </EuiHighlight>
    );

    expect(component).toMatchSnapshot();
  });

  describe('behavior', () => {
    describe('matching', () => {
      test('only applies to first match', () => {
        const component = render(
          <EuiHighlight search="match">match match match</EuiHighlight>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('loose matching', () => {
      test('matches strings with different casing', () => {
        const component = render(
          <EuiHighlight search="CASE">different case match</EuiHighlight>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('strict matching', () => {
      test(`doesn't match strings with different casing`, () => {
        const component = render(
          <EuiHighlight search="CASE" strict>
            different case match
          </EuiHighlight>
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
