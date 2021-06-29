/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiCheckableCard } from './checkable_card';

const checkablePanelRequiredProps = {
  label: 'Label',
  id: 'id',
  onChange: () => {},
};

describe('EuiCheckableCard', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCheckableCard {...requiredProps} {...checkablePanelRequiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders panel props', () => {
    const component = render(
      <EuiCheckableCard
        hasBorder={false}
        hasShadow={true}
        {...checkablePanelRequiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders disabled', () => {
    const component = render(
      <EuiCheckableCard disabled={true} {...checkablePanelRequiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders children', () => {
    const component = render(
      <EuiCheckableCard {...checkablePanelRequiredProps}>
        Child
      </EuiCheckableCard>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders a checkbox when specified', () => {
    const component = render(
      <EuiCheckableCard
        {...requiredProps}
        {...checkablePanelRequiredProps}
        checkableType="checkbox"
      />
    );

    expect(component).toMatchSnapshot();
  });
});
