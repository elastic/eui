import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFormLegend } from './form_legend';

describe('EuiFormLegend', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormLegend {...requiredProps}>Legend</EuiFormLegend>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('hidden is rendered', () => {
      const component = render(
        <EuiFormLegend display="hidden">Legend</EuiFormLegend>
      );

      expect(component).toMatchSnapshot();
    });

    test('compressed is rendered', () => {
      const component = render(
        <EuiFormLegend compressed>Legend</EuiFormLegend>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
