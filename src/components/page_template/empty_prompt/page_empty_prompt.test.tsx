/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { PADDING_SIZES } from '../../../global_styling';

import { _EuiPageEmptyPrompt as EuiPageEmptyPrompt } from './page_empty_prompt';

describe('_EuiPageEmptyPrompt', () => {
  shouldRenderCustomStyles(<EuiPageEmptyPrompt />);

  test('is rendered', () => {
    const component = render(<EuiPageEmptyPrompt {...requiredProps} />);
    expect(component).toMatchSnapshot();
  });

  test('EuiPageSectionProps is rendered', () => {
    const component = render(
      <EuiPageEmptyPrompt grow={false} alignment="horizontalCenter" />
    );
    expect(component).toMatchSnapshot();
  });

  test('EuiEmptyPromptProps is rendered', () => {
    const component = render(
      <EuiPageEmptyPrompt
        footer="Footer"
        iconType="warning"
        layout="horizontal"
      />
    );
    expect(component).toMatchSnapshot();
  });

  describe('restrict width', () => {
    test('can be set to a default', () => {
      const component = render(<EuiPageEmptyPrompt restrictWidth={true} />);
      expect(component).toMatchSnapshot();
    });
    test('can be set to a custom number', () => {
      const component = render(<EuiPageEmptyPrompt restrictWidth={1024} />);
      expect(component).toMatchSnapshot();
    });
    test('can be set to a custom value and measurement', () => {
      const component = render(<EuiPageEmptyPrompt restrictWidth="24rem" />);
      expect(component).toMatchSnapshot();
    });
  });

  describe('panelled is true', () => {
    describe('and color', () => {
      test('is not defined, then the prompt is subdued', () => {
        const component = render(<EuiPageEmptyPrompt panelled />);
        expect(component).toMatchSnapshot();
      });
      test('is defined, then the prompt inherits the color', () => {
        const component = render(
          <EuiPageEmptyPrompt panelled color="accent" />
        );
        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('panelled is false', () => {
    describe('and color', () => {
      test('is not defined, then the prompt is plain', () => {
        const component = render(<EuiPageEmptyPrompt panelled={false} />);
        expect(component).toMatchSnapshot();
      });
      test('is defined, then the prompt inherits the color', () => {
        const component = render(
          <EuiPageEmptyPrompt panelled={false} color="warning" />
        );
        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('paddingSize', () => {
    PADDING_SIZES.forEach((size) => {
      it(`${size} is rendered`, () => {
        const component = render(<EuiPageEmptyPrompt paddingSize={size} />);
        expect(component).toMatchSnapshot();
      });
    });
  });
});
