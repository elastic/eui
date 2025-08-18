/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';
import { render } from '../../test/rtl';

import { EuiFacetButton } from './facet_button';
import { EuiIcon } from '../icon';

describe('EuiFacetButton', () => {
  shouldRenderCustomStyles(<EuiFacetButton>Content</EuiFacetButton>);

  test('is rendered', () => {
    const { container } = render(
      <EuiFacetButton {...requiredProps}>Content</EuiFacetButton>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isDisabled', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiFacetButton
            isDisabled
            quantity={6}
            icon={<EuiIcon type="dot" color="success" />}
          >
            Content
          </EuiFacetButton>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiFacetButton isLoading>Content</EuiFacetButton>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiFacetButton isSelected>Content</EuiFacetButton>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('quantity', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiFacetButton quantity={60}>Content</EuiFacetButton>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('icon', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiFacetButton icon={<EuiIcon type="dot" />}>Content</EuiFacetButton>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick', () => {
        const handler = jest.fn();
        const { getByRole } = render(
          <EuiFacetButton onClick={handler}>Content</EuiFacetButton>
        );
        fireEvent.click(getByRole('button'));
        expect(handler).toHaveBeenCalledTimes(1);
      });
    });
  });
});
