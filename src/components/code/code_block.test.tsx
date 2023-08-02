/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiCodeBlock, FONT_SIZES, PADDING_SIZES } from './code_block';

const code = `var some = 'code';
console.log(some);`;

describe('EuiCodeBlock', () => {
  it('renders a code block', () => {
    const { container } = render(
      <EuiCodeBlock {...requiredProps}>{code}</EuiCodeBlock>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('transparentBackground', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiCodeBlock transparentBackground>{code}</EuiCodeBlock>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isCopyable', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiCodeBlock isCopyable>{code}</EuiCodeBlock>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('overflowHeight', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiCodeBlock overflowHeight={200}>{code}</EuiCodeBlock>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('language', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiCodeBlock language="html">{code}</EuiCodeBlock>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('fontSize', () => {
      FONT_SIZES.forEach((fontSize) => {
        test(`${fontSize} is rendered`, () => {
          const { container } = render(
            <EuiCodeBlock fontSize={fontSize}>{code}</EuiCodeBlock>
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('paddingSize', () => {
      PADDING_SIZES.forEach((paddingSize) => {
        test(`${paddingSize} is rendered`, () => {
          const { container } = render(
            <EuiCodeBlock paddingSize={paddingSize}>{code}</EuiCodeBlock>
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('whiteSpace', () => {
      it('renders a pre block tag with a css class modifier', () => {
        const { container } = render(
          <EuiCodeBlock whiteSpace="pre" {...requiredProps}>
            {code}
          </EuiCodeBlock>
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('dynamic content', () => {
    it('updates DOM when input changes', () => {
      const { container, rerender } = render(
        <EuiCodeBlock language="javascript">
          const value = &apos;State 1&apos;
        </EuiCodeBlock>
      );

      expect(container).toMatchSnapshot();

      rerender(
        <EuiCodeBlock language="javascript">
          const value = &apos;State 2&apos;
        </EuiCodeBlock>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('fullscreen', () => {
    it('displays content in fullscreen mode', () => {
      const component = mount(
        <EuiCodeBlock
          {...requiredProps}
          language="javascript"
          overflowHeight={300}
        >
          const value = &quot;hello&quot;
        </EuiCodeBlock>
      );
      component.find('button[aria-label="Expand"]').simulate('click');
      component.update();
      expect(
        component.find('div.euiCodeBlockFullScreen').render()
      ).toMatchSnapshot();
    });

    it('closes fullscreen mode when the escape key is pressed', () => {
      const component = mount(
        <EuiCodeBlock
          {...requiredProps}
          language="javascript"
          overflowHeight={300}
        >
          const value = &quot;world&quot;
        </EuiCodeBlock>
      );
      component.find('button[aria-label="Expand"]').simulate('click');
      component.update();
      component
        .find('div.euiCodeBlockFullScreen')
        .find('pre.euiCodeBlock__pre')
        .simulate('keyDown', { key: 'Escape' });
      expect(component.find('.euiCodeBlockFullScreen')).toHaveLength(0);
    });
  });

  describe('virtualization', () => {
    it('renders a virtualized code block', () => {
      const { container } = render(
        <EuiCodeBlock
          isVirtualized={true}
          overflowHeight="50%"
          {...requiredProps}
        >
          {code}
        </EuiCodeBlock>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    describe('type checks', () => {
      it('requires overflowHeight', () => {
        // @ts-expect-error should expect overflowHeight
        shallow(<EuiCodeBlock isVirtualized overflowHeight={undefined} />);
      });

      it('only allows whiteSpace of pre', () => {
        shallow(
          // @ts-expect-error should only accept "pre"
          <EuiCodeBlock
            isVirtualized
            overflowHeight={50}
            whiteSpace="pre-wrap"
          />
        );
        // OK
        shallow(
          <EuiCodeBlock isVirtualized overflowHeight={50} whiteSpace="pre" />
        );
      });
    });
  });

  describe('line numbers', () => {
    it('renders line numbers', () => {
      const { container } = render(
        <EuiCodeBlock lineNumbers {...requiredProps}>
          {code}
        </EuiCodeBlock>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders line numbers with a start value', () => {
      const { container } = render(
        <EuiCodeBlock lineNumbers={{ start: 10 }} {...requiredProps}>
          {code}
        </EuiCodeBlock>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders highlighted line numbers', () => {
      const { container } = render(
        <EuiCodeBlock lineNumbers={{ highlight: '1' }} {...requiredProps}>
          {code}
        </EuiCodeBlock>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders annotated line numbers', () => {
      const { container } = render(
        <EuiCodeBlock
          lineNumbers={{ annotations: { 1: 'hello world' } }}
          {...requiredProps}
        >
          {code}
        </EuiCodeBlock>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
