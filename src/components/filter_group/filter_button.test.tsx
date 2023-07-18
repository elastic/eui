/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../..//test/internal';

import { EuiFilterButton } from './filter_button';

describe('EuiFilterButton', () => {
  shouldRenderCustomStyles(<EuiFilterButton />, {
    childProps: ['textProps', 'contentProps'],
  });

  it('renders', () => {
    const { container } = render(<EuiFilterButton {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders zero properly', () => {
    const { container } = render(
      <EuiFilterButton {...requiredProps} numFilters={0} numActiveFilters={0} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('does not render a badge or count if numFilters is not passed', () => {
    const { container } = render(
      <EuiFilterButton {...requiredProps} numActiveFilters={0} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('iconType and iconSide', () => {
      it('renders', () => {
        const { container } = render(
          <EuiFilterButton iconType="user" iconSide="right" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('numFilters', () => {
      it('renders', () => {
        const { container } = render(<EuiFilterButton numFilters={5} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('numActiveFilters and hasActiveFilters', () => {
      it('renders', () => {
        const { container } = render(
          <EuiFilterButton numActiveFilters={5} hasActiveFilters />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      it('renders', () => {
        const { container } = render(<EuiFilterButton isSelected />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      it('renders', () => {
        const { container } = render(<EuiFilterButton isDisabled />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('type', () => {
      it('renders', () => {
        const { container } = render(<EuiFilterButton type="button" />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('grow', () => {
      it('can be turned off', () => {
        const { container } = render(<EuiFilterButton grow={false} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('withNext', () => {
      it('renders', () => {
        const { container } = render(<EuiFilterButton withNext />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('badgeColor', () => {
      it('renders', () => {
        const { container } = render(<EuiFilterButton badgeColor="success" />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
