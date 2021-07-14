/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiStat, COLORS, ALIGNMENTS } from './stat';
import { TITLE_SIZES } from '../title/title';

jest.mock('./../form/form_row/make_id', () => () => 'generated-id');

describe('EuiStat', () => {
  test('is rendered', () => {
    const component = render(
      <EuiStat title="title" description="description" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('loading is rendered', () => {
      const component = render(
        <EuiStat
          title="title"
          description="description"
          isLoading
          {...requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('title and description are reversed', () => {
      const component = render(
        <EuiStat title="title" description="description" reverse />
      );

      expect(component).toMatchSnapshot();
    });

    ALIGNMENTS.forEach((alignment) => {
      test(`${alignment} is rendered`, () => {
        const component = render(
          <EuiStat
            title="title"
            description="description"
            textAlign={alignment}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    COLORS.forEach((color) => {
      test(`${color} is rendered`, () => {
        const component = render(
          <EuiStat title="title" description="description" titleColor={color} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    test('hexcode colors are rendered', () => {
      const component = render(
        <EuiStat title="title" description="description" titleColor="#EB1919" />
      );

      expect(component).toMatchSnapshot();
    });

    test('render with custom description element', () => {
      const component = render(
        <EuiStat
          title="title"
          description={<div>description</div>}
          descriptionElement="div"
          titleColor="#EB1919"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('render with custom title element', () => {
      const component = render(
        <EuiStat
          title={<div>title</div>}
          titleElement="div"
          description="description"
        />
      );

      expect(component).toMatchSnapshot();
    });

    TITLE_SIZES.forEach((size) => {
      test(`${size} is rendered`, () => {
        const component = render(
          <EuiStat title="title" description="description" titleSize={size} />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
