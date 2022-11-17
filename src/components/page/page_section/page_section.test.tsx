/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { css } from '@emotion/react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiPageSection } from './page_section';
import { ALIGNMENTS } from './page_section.styles';
import { PADDING_SIZES, BACKGROUND_COLORS } from '../../../global_styling';

describe('EuiPageSection', () => {
  shouldRenderCustomStyles(<EuiPageSection />, {
    childProps: ['contentProps'],
  });

  test('is rendered', () => {
    const component = render(<EuiPageSection {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('component', () => {
      const component = render(
        <main>
          <EuiPageSection />
          <EuiPageSection component="div" />
          <EuiPageSection component="aside" />
        </main>
      );

      expect(component).toMatchSnapshot();
    });

    describe('restrictWidth', () => {
      test('can be true', () => {
        const component = render(<EuiPageSection restrictWidth />);

        expect(component).toMatchSnapshot();
      });

      test('can be custom', () => {
        const component = render(<EuiPageSection restrictWidth={1000} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('bottomBorder', () => {
      test('can be true', () => {
        const component = render(<EuiPageSection bottomBorder />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('grow', () => {
      test('can be true', () => {
        const component = render(<EuiPageSection grow />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('alignment', () => {
      ALIGNMENTS.forEach((alignment) => {
        test(`${alignment} is rendered`, () => {
          const component = render(<EuiPageSection alignment={alignment} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('color', () => {
      BACKGROUND_COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const component = render(<EuiPageSection color={color} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('paddingSize', () => {
      PADDING_SIZES.forEach((padding) => {
        test(`${padding} is rendered`, () => {
          const component = render(<EuiPageSection paddingSize={padding} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('contentProps', () => {
      test('are passed down', () => {
        const component = render(
          <EuiPageSection contentProps={requiredProps} />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });

  // Regression test for recurring bug / unintuitive Emotion behavior
  it('correctly merges `css` passed to `contentProps`', () => {
    const component = render(
      <EuiPageSection
        contentProps={{
          css: css`
            color: red;
          `,
          'data-test-subj': 'content',
        }}
      />
    );
    const content = component.find('[data-test-subj="content"]');
    expect(content).toMatchInlineSnapshot(`
      <div
        class="emotion-euiPageSection__content-l-css"
        data-test-subj="content"
      />
    `);
    expect(content.attr('class')).toContain('euiPageSection__content'); // Preserves our CSS
    expect(content.attr('class').endsWith('-css')).toBeTruthy(); // Concatenates custom CSS
  });
});
