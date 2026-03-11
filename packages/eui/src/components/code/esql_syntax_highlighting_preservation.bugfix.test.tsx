/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Preservation Property Tests for ES|QL Syntax Highlighting Bugfix
 *
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**
 *
 * These tests capture the baseline behavior of EuiCodeBlock for non-ES|QL languages
 * and features. They are run on UNFIXED code to establish the baseline, then run
 * after the fix to ensure no regressions.
 *
 * EXPECTED OUTCOME: These tests PASS on unfixed code (confirming baseline behavior)
 * and continue to PASS after the fix (confirming preservation).
 */

import React from 'react';
import { render } from '../../test/rtl';
import { EuiCodeBlock } from './code_block';

describe('ES|QL Syntax Highlighting Preservation Tests', () => {
  /**
   * Helper function to extract token information from rendered code block
   */
  const extractTokens = (container: HTMLElement) => {
    const tokens: Array<{ text: string; classes: string[] }> = [];
    const codeElement = container.querySelector('code');

    if (!codeElement) return tokens;

    const walkNodes = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim();
        if (text) {
          const parent = node.parentElement;
          const classes = parent ? Array.from(parent.classList) : [];
          tokens.push({ text, classes });
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.childNodes.forEach(walkNodes);
      }
    };

    codeElement.childNodes.forEach(walkNodes);
    return tokens;
  };

  /**
   * Helper to capture full HTML structure for comparison
   */
  const captureStructure = (container: HTMLElement) => {
    const codeElement = container.querySelector('code');
    return {
      html: codeElement?.innerHTML || '',
      dataLanguage: codeElement?.getAttribute('data-code-language'),
      classList: codeElement ? Array.from(codeElement.classList) : [],
    };
  };

  describe('Property 2: Preservation - Non-ES|QL Highlighting Unchanged', () => {
    describe('JavaScript Highlighting Preservation', () => {
      const jsCode = `function hello(name) {
  return \`Hello, \${name}!\`;
}

const result = hello("World");
console.log(result);`;

      it('should preserve JavaScript token classification', () => {
        const { container } = render(
          <EuiCodeBlock language="javascript">{jsCode}</EuiCodeBlock>
        );

        const tokens = extractTokens(container);

        // Verify JavaScript-specific tokens are present
        const hasFunctionKeyword = tokens.some(
          (t) =>
            t.text === 'function' &&
            t.classes.some((c) => c.includes('keyword'))
        );
        const hasConstKeyword = tokens.some(
          (t) =>
            t.text === 'const' && t.classes.some((c) => c.includes('keyword'))
        );
        const hasReturnKeyword = tokens.some(
          (t) =>
            t.text === 'return' && t.classes.some((c) => c.includes('keyword'))
        );

        expect(hasFunctionKeyword).toBe(true);
        expect(hasConstKeyword).toBe(true);
        expect(hasReturnKeyword).toBe(true);
      });

      it('should preserve JavaScript language attribute', () => {
        const { container } = render(
          <EuiCodeBlock language="javascript">{jsCode}</EuiCodeBlock>
        );

        const structure = captureStructure(container);
        expect(structure.dataLanguage).toBe('javascript');
      });

      it('should preserve JavaScript string and template literal highlighting', () => {
        const { container } = render(
          <EuiCodeBlock language="javascript">{jsCode}</EuiCodeBlock>
        );

        const tokens = extractTokens(container);

        // Check for string/template literal tokens
        const hasStringTokens = tokens.some((t) =>
          t.classes.some((c) => c.includes('string') || c.includes('template'))
        );

        expect(hasStringTokens).toBe(true);
      });
    });

    describe('JSON Highlighting Preservation', () => {
      const jsonCode = `{
  "name": "elastic-ui",
  "version": "1.0.0",
  "active": true,
  "count": 42,
  "tags": ["ui", "components"]
}`;

      it('should preserve JSON token classification', () => {
        const { container } = render(
          <EuiCodeBlock language="json">{jsonCode}</EuiCodeBlock>
        );

        const tokens = extractTokens(container);

        // Verify JSON-specific tokens are present
        const hasPropertyTokens = tokens.some((t) =>
          t.classes.some((c) => c.includes('property'))
        );
        const hasStringTokens = tokens.some((t) =>
          t.classes.some((c) => c.includes('string'))
        );
        const hasBooleanTokens = tokens.some(
          (t) =>
            (t.text === 'true' || t.text === 'false') &&
            t.classes.some((c) => c.includes('boolean'))
        );

        expect(hasPropertyTokens).toBe(true);
        expect(hasStringTokens).toBe(true);
        expect(hasBooleanTokens).toBe(true);
      });

      it('should preserve JSON language attribute', () => {
        const { container } = render(
          <EuiCodeBlock language="json">{jsonCode}</EuiCodeBlock>
        );

        const structure = captureStructure(container);
        expect(structure.dataLanguage).toBe('json');
      });

      it('should preserve JSON number highlighting', () => {
        const { container } = render(
          <EuiCodeBlock language="json">{jsonCode}</EuiCodeBlock>
        );

        const tokens = extractTokens(container);

        // Check for number tokens
        const hasNumberTokens = tokens.some((t) =>
          t.classes.some((c) => c.includes('number'))
        );

        expect(hasNumberTokens).toBe(true);
      });
    });

    describe('SQL Highlighting Preservation', () => {
      const sqlCode = `SELECT name, age, department
FROM employees
WHERE age > 30 AND status = 'active'
ORDER BY name ASC
LIMIT 100;`;

      it('should preserve SQL token classification', () => {
        const { container } = render(
          <EuiCodeBlock language="sql">{sqlCode}</EuiCodeBlock>
        );

        const tokens = extractTokens(container);

        // Verify SQL-specific tokens are present
        const hasSelectKeyword = tokens.some(
          (t) =>
            t.text === 'SELECT' && t.classes.some((c) => c.includes('keyword'))
        );
        const hasFromKeyword = tokens.some(
          (t) =>
            t.text === 'FROM' && t.classes.some((c) => c.includes('keyword'))
        );
        const hasWhereKeyword = tokens.some(
          (t) =>
            t.text === 'WHERE' && t.classes.some((c) => c.includes('keyword'))
        );

        expect(hasSelectKeyword).toBe(true);
        expect(hasFromKeyword).toBe(true);
        expect(hasWhereKeyword).toBe(true);
      });

      it('should preserve SQL language attribute', () => {
        const { container } = render(
          <EuiCodeBlock language="sql">{sqlCode}</EuiCodeBlock>
        );

        const structure = captureStructure(container);
        expect(structure.dataLanguage).toBe('sql');
      });

      it('should preserve SQL operator and string highlighting', () => {
        const { container } = render(
          <EuiCodeBlock language="sql">{sqlCode}</EuiCodeBlock>
        );

        const tokens = extractTokens(container);

        // Check for operator and string tokens
        const hasOperatorTokens = tokens.some((t) =>
          t.classes.some((c) => c.includes('operator'))
        );
        const hasStringTokens = tokens.some((t) =>
          t.classes.some((c) => c.includes('string'))
        );

        expect(hasOperatorTokens).toBe(true);
        expect(hasStringTokens).toBe(true);
      });
    });

    describe('TypeScript Highlighting Preservation', () => {
      const tsCode = `interface User {
  name: string;
  age: number;
}

const greet = (user: User): string => {
  return \`Hello, \${user.name}!\`;
};`;

      it('should preserve TypeScript token classification', () => {
        const { container } = render(
          <EuiCodeBlock language="typescript">{tsCode}</EuiCodeBlock>
        );

        const tokens = extractTokens(container);

        // Verify TypeScript-specific tokens are present
        const hasInterfaceKeyword = tokens.some(
          (t) =>
            t.text === 'interface' &&
            t.classes.some((c) => c.includes('keyword'))
        );
        const hasConstKeyword = tokens.some(
          (t) =>
            t.text === 'const' && t.classes.some((c) => c.includes('keyword'))
        );

        expect(hasInterfaceKeyword).toBe(true);
        expect(hasConstKeyword).toBe(true);
      });

      it('should preserve TypeScript language attribute', () => {
        const { container } = render(
          <EuiCodeBlock language="typescript">{tsCode}</EuiCodeBlock>
        );

        const structure = captureStructure(container);
        expect(structure.dataLanguage).toBe('typescript');
      });
    });

    describe('Python Highlighting Preservation', () => {
      const pythonCode = `def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

result = calculate_sum([1, 2, 3, 4, 5])
print(f"Sum: {result}")`;

      it('should preserve Python token classification', () => {
        const { container } = render(
          <EuiCodeBlock language="python">{pythonCode}</EuiCodeBlock>
        );

        const tokens = extractTokens(container);

        // Verify Python-specific tokens are present
        const hasDefKeyword = tokens.some(
          (t) =>
            t.text === 'def' && t.classes.some((c) => c.includes('keyword'))
        );
        const hasForKeyword = tokens.some(
          (t) =>
            t.text === 'for' && t.classes.some((c) => c.includes('keyword'))
        );
        const hasReturnKeyword = tokens.some(
          (t) =>
            t.text === 'return' && t.classes.some((c) => c.includes('keyword'))
        );

        expect(hasDefKeyword).toBe(true);
        expect(hasForKeyword).toBe(true);
        expect(hasReturnKeyword).toBe(true);
      });

      it('should preserve Python language attribute', () => {
        const { container } = render(
          <EuiCodeBlock language="python">{pythonCode}</EuiCodeBlock>
        );

        const structure = captureStructure(container);
        expect(structure.dataLanguage).toBe('python');
      });
    });

    describe('EuiCodeBlock Features Preservation', () => {
      const sampleCode = 'const x = 42;';

      it('should preserve line numbers feature', () => {
        const { container } = render(
          <EuiCodeBlock language="javascript" lineNumbers>
            {sampleCode}
          </EuiCodeBlock>
        );

        // Check for line number elements
        const lineNumbers = container.querySelectorAll('[data-line-number]');
        expect(lineNumbers.length).toBeGreaterThan(0);

        // Check for line number wrapper
        const lineNumberWrapper = container.querySelector(
          '.euiCodeBlock__lineNumberWrapper'
        );
        expect(lineNumberWrapper).toBeTruthy();
      });

      it('should preserve line numbers with custom start', () => {
        const { container } = render(
          <EuiCodeBlock language="javascript" lineNumbers={{ start: 100 }}>
            {sampleCode}
          </EuiCodeBlock>
        );

        const firstLineNumber = container.querySelector('[data-line-number]');
        expect(firstLineNumber?.getAttribute('data-line-number')).toBe('100');
      });

      it('should preserve line highlighting feature', () => {
        const multiLineCode = `line 1
line 2
line 3`;

        const { container } = render(
          <EuiCodeBlock language="javascript" lineNumbers={{ highlight: '2' }}>
            {multiLineCode}
          </EuiCodeBlock>
        );

        // Check for highlighted line
        const highlightedLines = container.querySelectorAll(
          '.euiCodeBlock__lineText'
        );
        expect(highlightedLines.length).toBeGreaterThan(0);
      });

      it('should preserve copy button feature', () => {
        const { container } = render(
          <EuiCodeBlock language="javascript" isCopyable>
            {sampleCode}
          </EuiCodeBlock>
        );

        // Check for copy button
        const copyButton = container.querySelector(
          'button[aria-label*="Copy"]'
        );
        expect(copyButton).toBeTruthy();
      });

      it('should preserve fontSize prop', () => {
        const { container: containerS } = render(
          <EuiCodeBlock language="javascript" fontSize="s">
            {sampleCode}
          </EuiCodeBlock>
        );
        const { container: containerM } = render(
          <EuiCodeBlock language="javascript" fontSize="m">
            {sampleCode}
          </EuiCodeBlock>
        );
        const { container: containerL } = render(
          <EuiCodeBlock language="javascript" fontSize="l">
            {sampleCode}
          </EuiCodeBlock>
        );

        // All should render without errors
        expect(containerS.querySelector('.euiCodeBlock')).toBeTruthy();
        expect(containerM.querySelector('.euiCodeBlock')).toBeTruthy();
        expect(containerL.querySelector('.euiCodeBlock')).toBeTruthy();
      });

      it('should preserve paddingSize prop', () => {
        const { container: containerNone } = render(
          <EuiCodeBlock language="javascript" paddingSize="none">
            {sampleCode}
          </EuiCodeBlock>
        );
        const { container: containerS } = render(
          <EuiCodeBlock language="javascript" paddingSize="s">
            {sampleCode}
          </EuiCodeBlock>
        );
        const { container: containerM } = render(
          <EuiCodeBlock language="javascript" paddingSize="m">
            {sampleCode}
          </EuiCodeBlock>
        );
        const { container: containerL } = render(
          <EuiCodeBlock language="javascript" paddingSize="l">
            {sampleCode}
          </EuiCodeBlock>
        );

        // All should render without errors
        expect(containerNone.querySelector('.euiCodeBlock')).toBeTruthy();
        expect(containerS.querySelector('.euiCodeBlock')).toBeTruthy();
        expect(containerM.querySelector('.euiCodeBlock')).toBeTruthy();
        expect(containerL.querySelector('.euiCodeBlock')).toBeTruthy();
      });

      it('should preserve whiteSpace prop', () => {
        const { container: containerPre } = render(
          <EuiCodeBlock language="javascript" whiteSpace="pre">
            {sampleCode}
          </EuiCodeBlock>
        );
        const { container: containerPreWrap } = render(
          <EuiCodeBlock language="javascript" whiteSpace="pre-wrap">
            {sampleCode}
          </EuiCodeBlock>
        );

        // Both should render without errors
        expect(containerPre.querySelector('.euiCodeBlock')).toBeTruthy();
        expect(containerPreWrap.querySelector('.euiCodeBlock')).toBeTruthy();
      });

      it('should preserve transparentBackground prop', () => {
        const { container } = render(
          <EuiCodeBlock language="javascript" transparentBackground>
            {sampleCode}
          </EuiCodeBlock>
        );

        expect(container.querySelector('.euiCodeBlock')).toBeTruthy();
      });

      it('should preserve overflowHeight prop', () => {
        const longCode = Array(50).fill('const x = 42;').join('\n');

        const { container } = render(
          <EuiCodeBlock language="javascript" overflowHeight={300}>
            {longCode}
          </EuiCodeBlock>
        );

        const codeBlock = container.querySelector('.euiCodeBlock');
        expect(codeBlock).toBeTruthy();
      });
    });

    describe('Cross-Language Consistency', () => {
      const testLanguages = [
        { lang: 'javascript', code: 'const x = 42;' },
        { lang: 'typescript', code: 'const x: number = 42;' },
        { lang: 'python', code: 'x = 42' },
        { lang: 'json', code: '{"x": 42}' },
        { lang: 'sql', code: 'SELECT * FROM table;' },
        { lang: 'css', code: '.class { color: red; }' },
        { lang: 'html', code: '<div>Hello</div>' },
        { lang: 'markdown', code: '# Heading' },
      ];

      it('should preserve language attribute for all supported languages', () => {
        testLanguages.forEach(({ lang, code }) => {
          const { container } = render(
            <EuiCodeBlock language={lang}>{code}</EuiCodeBlock>
          );

          const structure = captureStructure(container);
          expect(structure.dataLanguage).toBe(lang);
        });
      });

      it('should preserve token generation for all supported languages', () => {
        testLanguages.forEach(({ lang, code }) => {
          const { container } = render(
            <EuiCodeBlock language={lang}>{code}</EuiCodeBlock>
          );

          const tokens = extractTokens(container);
          // Each language should produce at least some tokens
          expect(tokens.length).toBeGreaterThan(0);
        });
      });

      it('should preserve rendering structure for all supported languages', () => {
        testLanguages.forEach(({ lang, code }) => {
          const { container } = render(
            <EuiCodeBlock language={lang}>{code}</EuiCodeBlock>
          );

          const codeElement = container.querySelector('code');
          expect(codeElement).toBeTruthy();
          expect(codeElement?.textContent).toContain(code.trim());
        });
      });
    });

    describe('Unsupported Language Fallback Preservation', () => {
      it('should preserve fallback to text for unsupported languages', () => {
        const { container } = render(
          <EuiCodeBlock language="unsupported-lang">
            Some code here
          </EuiCodeBlock>
        );

        const structure = captureStructure(container);
        // Should fallback to 'text' language
        expect(structure.dataLanguage).toBe('text');
      });

      it('should preserve plain text rendering for unsupported languages', () => {
        const code = 'Some plain text code';
        const { container } = render(
          <EuiCodeBlock language="unsupported-lang">{code}</EuiCodeBlock>
        );

        const codeElement = container.querySelector('code');
        expect(codeElement?.textContent).toContain(code);
      });
    });
  });
});
