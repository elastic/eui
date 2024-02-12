/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiFormLegend } from './form_legend';

describe('EuiFormLegend', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiFormLegend {...requiredProps}>Legend</EuiFormLegend>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('hidden is rendered', () => {
      const { container } = render(
        <EuiFormLegend display="hidden">Legend</EuiFormLegend>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('compressed is rendered', () => {
      const { container } = render(
        <EuiFormLegend compressed>Legend</EuiFormLegend>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
