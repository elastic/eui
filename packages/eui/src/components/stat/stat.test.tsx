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
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiStat, COLORS, ALIGNMENTS } from './stat';
import { TITLE_SIZES } from '../title/title';

describe('EuiStat', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiStat title="title" description="description" {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  shouldRenderCustomStyles(<EuiStat title="title" description="description" />);

  describe('props', () => {
    test('loading is rendered', () => {
      const { container } = render(
        <EuiStat
          title="title"
          description="description"
          isLoading
          {...requiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('title and description are reversed', () => {
      const { container } = render(
        <EuiStat title="title" description="description" reverse />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    ALIGNMENTS.forEach((alignment) => {
      test(`${alignment} is rendered`, () => {
        const { container } = render(
          <EuiStat
            title="title"
            description="description"
            textAlign={alignment}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    COLORS.forEach((color) => {
      test(`${color} is rendered`, () => {
        const { container } = render(
          <EuiStat title="title" description="description" titleColor={color} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    test('hexcode colors are rendered', () => {
      const { container } = render(
        <EuiStat title="title" description="description" titleColor="#EB1919" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('render with custom description element', () => {
      const { container } = render(
        <EuiStat
          title="title"
          description={<div>description</div>}
          descriptionElement="div"
          titleColor="#EB1919"
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('render with custom title element', () => {
      const { container } = render(
        <EuiStat
          title={<div>title</div>}
          titleElement="div"
          description="description"
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    TITLE_SIZES.forEach((size) => {
      test(`${size} is rendered`, () => {
        const { container } = render(
          <EuiStat title="title" description="description" titleSize={size} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
