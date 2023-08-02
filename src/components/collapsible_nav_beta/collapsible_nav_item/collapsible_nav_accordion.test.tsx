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
      'linkProps',
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

  describe('when any items have an icon', () => {
    it('renders all items without icon with an `empty` icon', () => {
      const { container } = render(
        <EuiCollapsibleNavAccordion
          {...props}
          items={[
            { title: '1', icon: 'home' },
            { title: '2' },
            { title: '3' },
            { title: '4' },
            { title: '5', icon: 'faceHappy' },
          ]}
        />
      );

      expect(
        container.querySelectorAll('[data-euiicon-type="empty"]')
      ).toHaveLength(3);
    });
  });

  describe('when the accordion header is a link and the link is clicked', () => {
    it('does not trigger the accordion opening', () => {
      const { getByTestSubject, container } = render(
        <EuiCollapsibleNavAccordion
          {...props}
          href="#"
          linkProps={{ 'data-test-subj': 'link' }}
          accordionProps={{ arrowProps: { 'data-test-subj': 'toggle' } }}
        />
      );

      fireEvent.click(getByTestSubject('link'));
      expect(
        container.querySelector('.euiAccordion__childWrapper')
      ).toHaveStyleRule('opacity', '0');

      fireEvent.click(getByTestSubject('toggle'));
      expect(
        container.querySelector('.euiAccordion__childWrapper')
      ).toHaveStyleRule('opacity', '1');
    });
  });
});
