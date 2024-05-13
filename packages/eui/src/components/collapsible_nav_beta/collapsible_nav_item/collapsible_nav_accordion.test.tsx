/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test';

import { EuiCollapsibleNavAccordion } from './collapsible_nav_accordion';

describe('EuiCollapsibleNavAccordion', () => {
  const props = {
    buttonContent: 'Accordion header',
    items: [{ title: 'sub item' }],
  };

  shouldRenderCustomStyles(<EuiCollapsibleNavAccordion {...props} />, {
    childProps: [
      'accordionProps',
      'accordionProps.arrowProps',
      'accordionProps.buttonProps',
    ],
  });

  it('renders as a top level item', () => {
    const { container } = render(
      <EuiCollapsibleNavAccordion {...requiredProps} {...props} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders as a sub item', () => {
    const { container } = render(
      <EuiCollapsibleNavAccordion {...props} isSubItem />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders as selected', () => {
    const { container } = render(
      <EuiCollapsibleNavAccordion {...props} isSelected />
    );
    expect((container.firstChild as HTMLElement).className).toContain(
      'isSelected'
    );
  });

  it('triggers the accordion opening', () => {
    const { getByTestSubject, container } = render(
      <EuiCollapsibleNavAccordion
        {...props}
        accordionProps={{
          buttonProps: { 'data-test-subj': 'button' },
          arrowProps: { 'data-test-subj': 'arrow' },
        }}
      />
    );
    expect(
      container.querySelector('.euiAccordion__childWrapper')
    ).toHaveStyleRule('opacity', '0');

    fireEvent.click(getByTestSubject('button'));
    expect(
      container.querySelector('.euiAccordion__childWrapper')
    ).toHaveStyleRule('opacity', '1');

    fireEvent.click(getByTestSubject('arrow'));
    expect(
      container.querySelector('.euiAccordion__childWrapper')
    ).toHaveStyleRule('opacity', '0');
  });
});
