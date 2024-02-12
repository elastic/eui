/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { css } from '@emotion/react';
import { PADDING_SIZES, BACKGROUND_COLORS } from '../../../global_styling';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiPageSection } from './page_section';
import { ALIGNMENTS } from './page_section.styles';

describe('EuiPageSection', () => {
  shouldRenderCustomStyles(<EuiPageSection />, {
    childProps: ['contentProps'],
  });

  test('is rendered', () => {
    const { container } = render(<EuiPageSection {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('component', () => {
      const { container } = render(
        <main>
          <EuiPageSection />
          <EuiPageSection component="div" />
          <EuiPageSection component="aside" />
        </main>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('restrictWidth', () => {
      test('can be true', () => {
        const { container } = render(<EuiPageSection restrictWidth />);

        expect(container.firstChild).toMatchSnapshot();
      });

      test('can be custom', () => {
        const { container } = render(<EuiPageSection restrictWidth={1000} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('bottomBorder', () => {
      test('can be true', () => {
        const { container } = render(<EuiPageSection bottomBorder />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('grow', () => {
      test('can be true', () => {
        const { container } = render(<EuiPageSection grow />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('alignment', () => {
      ALIGNMENTS.forEach((alignment) => {
        test(`${alignment} is rendered`, () => {
          const { container } = render(
            <EuiPageSection alignment={alignment} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('color', () => {
      BACKGROUND_COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(<EuiPageSection color={color} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('paddingSize', () => {
      PADDING_SIZES.forEach((padding) => {
        test(`${padding} is rendered`, () => {
          const { container } = render(
            <EuiPageSection paddingSize={padding} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('contentProps', () => {
      test('are passed down', () => {
        const { container } = render(
          <EuiPageSection contentProps={requiredProps} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  // Regression test for recurring bug / unintuitive Emotion behavior
  it('correctly merges `css` passed to `contentProps`', () => {
    const { getByTestSubject } = render(
      <EuiPageSection
        contentProps={{
          css: css`
            color: red;
          `,
          'data-test-subj': 'content',
        }}
      />
    );
    const content = getByTestSubject('content');
    expect(content).toMatchInlineSnapshot(`
      <div
        class="emotion-euiPageSection__content-l-css"
        data-test-subj="content"
      />
    `);
    expect(content.className).toContain('euiPageSection__content'); // Preserves our CSS
    expect(content.className.endsWith('-css')).toBeTruthy(); // Concatenates custom CSS
  });
});
