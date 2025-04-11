/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiCheckableCard } from './checkable_card';

const checkablePanelRequiredProps = {
  label: 'Label',
  id: 'id',
  onChange: () => {},
};

describe('EuiCheckableCard', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiCheckableCard {...requiredProps} {...checkablePanelRequiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  shouldRenderCustomStyles(
    <EuiCheckableCard {...checkablePanelRequiredProps} />,
    { skip: { style: true } }
  );
  // `style` goes with ...rest onto the child check/radio input, unlike className/css
  shouldRenderCustomStyles(
    <EuiCheckableCard {...checkablePanelRequiredProps} />,
    {
      targetSelector: '.euiRadio',
      skip: { className: true, css: true },
    }
  );

  test('renders panel props', () => {
    const { container } = render(
      <EuiCheckableCard
        hasBorder={false}
        hasShadow={true}
        {...checkablePanelRequiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders disabled', () => {
    const { container } = render(
      <EuiCheckableCard disabled={true} {...checkablePanelRequiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders children', () => {
    const { container } = render(
      <EuiCheckableCard {...checkablePanelRequiredProps}>
        Child
      </EuiCheckableCard>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders a checkbox when specified', () => {
    const { container } = render(
      <EuiCheckableCard
        {...requiredProps}
        {...checkablePanelRequiredProps}
        checkableType="checkbox"
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('applies labelProps to the label element', () => {
    const labelProps = {
      'data-test-subj': 'testLabel',
      title: 'Test Title',
    };

    const { getByText } = render(
      <EuiCheckableCard
        {...checkablePanelRequiredProps}
        labelProps={labelProps}
      />
    );

    const labelElement = getByText('Label');
    expect(labelElement).toHaveAttribute('data-test-subj', 'testLabel');
    expect(labelElement).toHaveAttribute('title', 'Test Title');
  });
});
