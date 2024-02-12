/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { PADDING_SIZES } from '../../../global_styling';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { _EuiPageEmptyPrompt as EuiPageEmptyPrompt } from './page_empty_prompt';

describe('_EuiPageEmptyPrompt', () => {
  shouldRenderCustomStyles(<EuiPageEmptyPrompt />);

  test('is rendered', () => {
    const { container } = render(<EuiPageEmptyPrompt {...requiredProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('EuiPageSectionProps is rendered', () => {
    const { container } = render(
      <EuiPageEmptyPrompt grow={false} alignment="horizontalCenter" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('EuiEmptyPromptProps is rendered', () => {
    const { container } = render(
      <EuiPageEmptyPrompt
        footer="Footer"
        iconType="warning"
        layout="horizontal"
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('restrict width', () => {
    test('can be set to a default', () => {
      const { container } = render(<EuiPageEmptyPrompt restrictWidth={true} />);
      expect(container.firstChild).toMatchSnapshot();
    });
    test('can be set to a custom number', () => {
      const { container } = render(<EuiPageEmptyPrompt restrictWidth={1024} />);
      expect(container.firstChild).toMatchSnapshot();
    });
    test('can be set to a custom value and measurement', () => {
      const { container } = render(
        <EuiPageEmptyPrompt restrictWidth="24rem" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('panelled is true', () => {
    describe('and color', () => {
      test('is not defined, then the prompt is subdued', () => {
        const { container } = render(<EuiPageEmptyPrompt panelled />);
        expect(container.firstChild).toMatchSnapshot();
      });
      test('is defined, then the prompt inherits the color', () => {
        const { container } = render(
          <EuiPageEmptyPrompt panelled color="accent" />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('panelled is false', () => {
    describe('and color', () => {
      test('is not defined, then the prompt is plain', () => {
        const { container } = render(<EuiPageEmptyPrompt panelled={false} />);
        expect(container.firstChild).toMatchSnapshot();
      });
      test('is defined, then the prompt inherits the color', () => {
        const { container } = render(
          <EuiPageEmptyPrompt panelled={false} color="warning" />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('paddingSize', () => {
    PADDING_SIZES.forEach((size) => {
      it(`${size} is rendered`, () => {
        const { container } = render(<EuiPageEmptyPrompt paddingSize={size} />);
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
