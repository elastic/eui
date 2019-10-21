import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCodeBlock } from './code_block';
import { FONT_SIZES, PADDING_SIZES } from './_code_block';

const code = `var some = 'code';
console.log(some);`;

describe('EuiCodeBlock', () => {
  test('renders a code block', () => {
    const component = render(
      <EuiCodeBlock {...requiredProps}>{code}</EuiCodeBlock>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('transparentBackground', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCodeBlock transparentBackground>{code}</EuiCodeBlock>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isCopyable', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCodeBlock isCopyable>{code}</EuiCodeBlock>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('overflowHeight', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCodeBlock overflowHeight={200}>{code}</EuiCodeBlock>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('language', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCodeBlock language="html">{code}</EuiCodeBlock>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('inline', () => {
      it('is rendered', () => {
        const component = render(<EuiCodeBlock inline>{code}</EuiCodeBlock>);

        expect(component).toMatchSnapshot();
      });
    });

    describe('fontSize', () => {
      FONT_SIZES.forEach(fontSize => {
        test(`${fontSize} is rendered`, () => {
          const component = render(
            <EuiCodeBlock fontSize={fontSize}>{code}</EuiCodeBlock>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('paddingSize', () => {
      PADDING_SIZES.forEach(paddingSize => {
        test(`${paddingSize} is rendered`, () => {
          const component = render(
            <EuiCodeBlock paddingSize={paddingSize}>{code}</EuiCodeBlock>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
