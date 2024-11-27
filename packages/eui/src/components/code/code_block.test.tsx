/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';

import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';
import { useEuiTheme } from '../../services';

import { EuiCodeBlock } from './code_block';

const code = `var some = 'code';
console.log(some);`;

describe('EuiCodeBlock', () => {
  it('renders a code block', () => {
    const { container } = render(
      <EuiCodeBlock {...requiredProps}>{code}</EuiCodeBlock>
    );

    expect(container).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('updates DOM when the input changes', () => {
    const { container, rerender } = render(
      <EuiCodeBlock language="javascript">
        const value = &apos;State 1&apos;
      </EuiCodeBlock>
    );

    expect(container.querySelector('.euiCodeBlock__line')).toHaveTextContent(
      "const value = 'State 1'"
    );

    rerender(
      <EuiCodeBlock language="javascript">
        const value = &apos;State 2&apos;
      </EuiCodeBlock>
    );

    expect(container.querySelector('.euiCodeBlock__line')).toHaveTextContent(
      "const value = 'State 2'"
    );
  });

  describe('Props', () => {
    it('renders "Copy" on the copy button when no `copyAriaLabel` is passed', () => {
      const { getByTestSubject } = render(
        <EuiCodeBlock isCopyable>{code}</EuiCodeBlock>
      );

      expect(getByTestSubject('euiCodeBlockCopy')).toHaveAttribute(
        'aria-label',
        'Copy'
      );
    });

    it('renders `copyAriaLabel` on the copy button', () => {
      const customLabel = 'Copy this code';
      const { getByTestSubject } = render(
        <EuiCodeBlock isCopyable copyAriaLabel={customLabel}>
          {code}
        </EuiCodeBlock>
      );

      expect(getByTestSubject('euiCodeBlockCopy')).toHaveAttribute(
        'aria-label',
        customLabel
      );
    });

    it('renders a transparent background when `transparentBackground` is `true`', () => {
      const { container } = render(
        <EuiCodeBlock transparentBackground>{code}</EuiCodeBlock>
      );

      expect(container.querySelector('.euiCodeBlock')).toHaveStyle({
        background: 'transparent',
      });
    });

    it('renders no padding when `paddingSize` is `none`', () => {
      const { container } = render(
        <EuiCodeBlock paddingSize="none">{code}</EuiCodeBlock>
      );

      expect(container.querySelector('.euiCodeBlock__pre')).toHaveStyle({
        padding: '0',
      });
    });

    it('renders a small padding when `paddingSize` is `s`', () => {
      const { container } = render(
        <EuiCodeBlock paddingSize="s">{code}</EuiCodeBlock>
      );

      expect(container.querySelector('.euiCodeBlock__pre')).toHaveStyle({
        padding: '8px',
      });
    });

    it('renders a medium padding when `paddingSize` is `m`', () => {
      const { container } = render(
        <EuiCodeBlock paddingSize="m">{code}</EuiCodeBlock>
      );

      expect(container.querySelector('.euiCodeBlock__pre')).toHaveStyle({
        padding: '16px',
      });
    });

    it.skip('renders a large padding when `paddingSize` is `l`', () => {
      const CodeBlock = () => {
        const euiTheme = useEuiTheme();

        console.log(euiTheme);

        return <EuiCodeBlock paddingSize="l">{code}</EuiCodeBlock>;
      };

      const { container } = render(<CodeBlock />);

      console.log(
        getComputedStyle(container.querySelector('.euiCodeBlock__pre')!)
      );

      expect(container.querySelector('.euiCodeBlock__pre')).toHaveStyle({
        padding: '24px',
      });
    });

    it('renders a small font size when `fontSize` is `s`', () => {
      const { container } = render(
        <EuiCodeBlock fontSize="s">{code}</EuiCodeBlock>
      );

      expect(container.querySelector('.euiCodeBlock')).toHaveStyle({
        fontSize: '0.8571rem',
      });
    });

    it('renders a medium font size when `fontSize` is `m`', () => {
      const { container } = render(
        <EuiCodeBlock fontSize="m">{code}</EuiCodeBlock>
      );

      expect(container.querySelector('.euiCodeBlock')).toHaveStyle({
        fontSize: '1.0000rem',
      });
    });

    it('renders a large font size when `fontSize` is `l`', () => {
      const { container } = render(
        <EuiCodeBlock fontSize="l">{code}</EuiCodeBlock>
      );

      expect(container.querySelector('.euiCodeBlock')).toHaveStyle({
        fontSize: '1.1429rem',
      });
    });
  });

  describe('Fullscreen', () => {
    it('displays content in fullscreen mode', () => {
      const { getByLabelText, baseElement } = render(
        <EuiCodeBlock
          {...requiredProps}
          language="javascript"
          overflowHeight={300}
        >
          const value = &quot;hello&quot;
        </EuiCodeBlock>
      );

      fireEvent.click(getByLabelText('Expand'));

      expect(
        baseElement.querySelector('.euiCodeBlockFullScreen')
      ).toBeInTheDocument();
    });

    it('closes fullscreen mode when the Escape key is pressed', () => {
      const { getByLabelText, baseElement } = render(
        <EuiCodeBlock
          {...requiredProps}
          language="javascript"
          overflowHeight={300}
        >
          const value = &quot;world&quot;
        </EuiCodeBlock>
      );

      fireEvent.click(getByLabelText('Expand'));
      fireEvent.keyDown(
        baseElement.querySelector(
          '.euiCodeBlockFullScreen .euiCodeBlock__pre'
        )!,
        { key: 'Escape' }
      );

      expect(
        baseElement.querySelector('.euiCodeBlockFullScreen')
      ).not.toBeInTheDocument();
    });
  });

  describe('Virtualization', () => {
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

      expect(
        container.querySelector('[class*="euiCodeBlock__code-isVirtualized"]')
      ).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });

    it('requires overflowHeight', () => {
      // @ts-expect-error should expect overflowHeight
      render(<EuiCodeBlock isVirtualized overflowHeight={undefined} />);
    });

    it('only allows whiteSpace of pre', () => {
      render(
        // @ts-expect-error should only accept "pre"
        <EuiCodeBlock isVirtualized overflowHeight={50} whiteSpace="pre-wrap" />
      );

      render(
        <EuiCodeBlock isVirtualized overflowHeight={50} whiteSpace="pre" />
      );
    });
  });

  describe('Line numbers', () => {
    it('renders line numbers', () => {
      const { container } = render(
        <EuiCodeBlock lineNumbers {...requiredProps}>
          {code}
        </EuiCodeBlock>
      );

      expect(
        container.querySelectorAll('.euiCodeBlock__lineNumber').length
      ).toBeGreaterThan(0);
    });

    it('renders line numbers with a start value', () => {
      const { container } = render(
        <EuiCodeBlock lineNumbers={{ start: 10 }} {...requiredProps}>
          {code}
        </EuiCodeBlock>
      );

      const lineNumbers = container.querySelectorAll(
        '.euiCodeBlock__lineNumber'
      );

      expect(lineNumbers[0]).toHaveAttribute('data-line-number', '10');
      expect(lineNumbers[1]).toHaveAttribute('data-line-number', '11');
    });

    it('renders highlighted line numbers', () => {
      const { container } = render(
        <EuiCodeBlock lineNumbers={{ highlight: '1' }} {...requiredProps}>
          {code}
        </EuiCodeBlock>
      );

      const highlightedLine = container.querySelector(
        '[class*="euiCodeBlock__lineText-isHighlighted"]'
      );

      expect(highlightedLine).toBeInTheDocument();
    });

    it('renders annotated line numbers', () => {
      const { getByLabelText } = render(
        <EuiCodeBlock
          lineNumbers={{ annotations: { 2: 'Hello world' } }}
          {...requiredProps}
        >
          {code}
        </EuiCodeBlock>
      );

      expect(
        getByLabelText('Click to view a code annotation for line 2')
      ).toBeInTheDocument();
    });
  });
});
