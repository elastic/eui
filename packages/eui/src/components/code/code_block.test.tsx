/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import {
  EuiCodeBlock,
  EuiCodeBlockFontSize,
  EuiCodeBlockPaddingSize,
} from './code_block';

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

      expect(container.querySelector('.euiCodeBlock')).toHaveStyleRule(
        'background',
        'transparent'
      );
    });

    test.each<{ paddingSize: EuiCodeBlockPaddingSize; expected: string }>([
      { paddingSize: 'none', expected: '0' },
      { paddingSize: 's', expected: '8px' },
      { paddingSize: 'm', expected: '16px' },
      { paddingSize: 'l', expected: '24px' },
    ])(
      'renders a padding of $expected when `paddingSize` is `$paddingSize`',
      ({ paddingSize, expected }) => {
        const { container } = render(
          <EuiCodeBlock paddingSize={paddingSize}>{code}</EuiCodeBlock>
        );

        expect(container.querySelector('.euiCodeBlock__pre')).toHaveStyleRule(
          'padding',
          expected
        );
      }
    );

    test.each<{ fontSize: EuiCodeBlockFontSize; expected: string }>([
      { fontSize: 's', expected: '0.8571rem' },
      { fontSize: 'm', expected: '1.0000rem' },
      { fontSize: 'l', expected: '1.1429rem' },
    ])(
      'renders a font size of $expected when `fontSize` is `$fontSize`',
      ({ fontSize, expected }) => {
        const { container } = render(
          <EuiCodeBlock fontSize={fontSize}>{code}</EuiCodeBlock>
        );

        expect(container.querySelector('.euiCodeBlock')).toHaveStyleRule(
          'font-size',
          expected
        );
      }
    );
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

    describe('keyboard navigation', () => {
      it('correctly navigates fullscreen with keyboard', () => {
        const { getByLabelText, baseElement } = render(
          <EuiCodeBlock
            {...requiredProps}
            language="javascript"
            overflowHeight={300}
          >
            const value = &quot;hello&quot;
          </EuiCodeBlock>
        );

        (baseElement.querySelector(
          '.euiCodeBlock__pre'
        ) as HTMLPreElement)!.focus(); // start on focusable code block element

        expect(getByLabelText('Expand')).toBeInTheDocument();

        userEvent.keyboard('{tab}');

        waitFor(() => expect(getByLabelText('Expand')).toHaveFocus());

        userEvent.keyboard('{enter}');

        waitFor(() =>
          expect(
            baseElement.querySelector('.euiCodeBlockFullScreen')
          ).toBeInTheDocument()
        );

        userEvent.keyboard('{tab}');

        waitFor(() =>
          expect(
            baseElement.querySelector(
              '.euiCodeBlockFullScreen .euiCodeBlock__pre'
            )
          ).toHaveFocus()
        );

        userEvent.keyboard('{tab}');

        waitFor(() => expect(getByLabelText('Collapse')).toHaveFocus());

        userEvent.keyboard('{enter}');

        waitFor(() => {
          expect(
            baseElement.querySelector('.euiCodeBlockFullScreen')
          ).not.toBeInTheDocument();

          expect(getByLabelText('Expand')).toHaveFocus();
        });
      });
    });

    it('closes fullscreen mode when the escape key is pressed', () => {
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

      waitFor(() => expect(getByLabelText('Expand')).toHaveFocus());
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

    it('keeps the same code element when the content changes', () => {
      const { container, rerender } = render(
        <EuiCodeBlock isVirtualized overflowHeight="50%">
          {code}
        </EuiCodeBlock>
      );
      const codeElement = container.querySelector('code');
      expect(codeElement).toBeInTheDocument();

      rerender(
        <EuiCodeBlock isVirtualized overflowHeight="50%">
          {`${code}\nconsole.log('more');`}
        </EuiCodeBlock>
      );

      expect(container.querySelector('code')).toBe(codeElement);
    });

    it('does not let a consumer height or blockSize override the virtualized list size', () => {
      const getBlockSize = (style?: React.CSSProperties) => {
        const { container, unmount } = render(
          <EuiCodeBlock isVirtualized overflowHeight={100} style={style}>
            {code}
          </EuiCodeBlock>
        );
        const codeElement = container.querySelector('code')!;
        const result = {
          blockSize: codeElement.style.blockSize,
          height: codeElement.style.height,
        };
        unmount();
        return result;
      };

      const baseline = getBlockSize();
      expect(baseline.blockSize).toMatch(/^\d+px$/);

      expect(getBlockSize({ height: 10 })).toEqual({
        blockSize: baseline.blockSize,
        height: '',
      });
      expect(getBlockSize({ blockSize: 5 })).toEqual({
        blockSize: baseline.blockSize,
        height: '',
      });
    });

    describe('consumer style', () => {
      const renderCode = (style: React.CSSProperties | null) => {
        const { container } = render(
          // @ts-expect-error JS consumers can pass null
          <EuiCodeBlock isVirtualized overflowHeight={100} style={style}>
            {code}
          </EuiCodeBlock>
        );
        const codeElement = container.querySelector('code')!;
        const declarations = codeElement
          .getAttribute('style')!
          .split(';')
          .map((declaration) => declaration.trim().split(':')[0])
          .filter(Boolean);
        return { container, codeElement, declarations };
      };

      it('applies styles that do not conflict with the list', () => {
        const { codeElement } = renderCode({ padding: 0 });
        expect(codeElement.style.padding).toBe('0px');
        expect(codeElement.style.blockSize).toMatch(/^\d+px$/);
      });

      it('does not convert consumer styles to logical properties', () => {
        const { codeElement } = renderCode({ paddingLeft: 12 });
        expect(codeElement.style.paddingLeft).toBe('12px');
        expect(codeElement.style.paddingInlineStart).toBe('');
      });

      it('keeps the consumer pointerEvents while the list is idle', () => {
        const { codeElement } = renderCode({ pointerEvents: 'none' });
        expect(codeElement.style.pointerEvents).toBe('none');
      });

      it('lets react-window disable pointerEvents while scrolling', () => {
        const { container } = renderCode({ pointerEvents: 'auto' });

        fireEvent.scroll(container.querySelector('pre')!, {
          target: { scrollTop: 50 },
        });

        expect(container.querySelector('code')!.style.pointerEvents).toBe(
          'none'
        );
      });

      it('ignores a consumer all reset', () => {
        const { declarations } = renderCode({ all: 'unset' });
        expect(declarations).not.toContain('all');
        expect(declarations).toContain('block-size');
      });

      it.each([
        ['width', { width: '50%' }, 'width'],
        ['inlineSize', { inlineSize: '50%' }, 'inline-size'],
      ])(
        'lets a consumer %s replace the list inline size',
        (_, style, prop) => {
          const { codeElement, declarations } = renderCode(style);
          expect(codeElement.getAttribute('style')).toContain(`${prop}: 50%`);
          expect(
            declarations.filter((d) => d === 'width' || d === 'inline-size')
          ).toHaveLength(1);
        }
      );

      it.each([
        ['height', { height: 10 }],
        ['maxHeight', { maxHeight: 10 }],
        ['minHeight', { minHeight: 10 }],
        ['blockSize', { blockSize: 10 }],
        ['maxBlockSize', { maxBlockSize: 10 }],
        ['minBlockSize', { minBlockSize: 10 }],
      ])('ignores a consumer %s so the scroll range is kept', (_, style) => {
        const baseline = renderCode({}).codeElement.style.blockSize;
        const { codeElement } = renderCode(style);
        expect(codeElement.style.blockSize).toBe(baseline);
        expect(codeElement.style.maxBlockSize).toBe('');
        expect(codeElement.style.minBlockSize).toBe('');
        expect(codeElement.style.height).toBe('');
        expect(codeElement.style.minHeight).toBe('');
        expect(codeElement.style.maxHeight).toBe('');
      });

      it('renders when the style is null', () => {
        const { codeElement } = renderCode(null);
        expect(codeElement).toBeInTheDocument();
      });
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
