/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  createElement,
  ReactElement,
  ReactNode,
  HTMLAttributes,
} from 'react';
import {
  listLanguages,
  highlight,
  AST,
  RefractorNode,
  register,
  type RefractorSyntax,
} from 'refractor';
import { cx } from '@emotion/css';
import { esql as esqlLanguage } from '@elastic/prismjs-esql';

import { CommonProps } from '../common';
import { UseEuiTheme } from '../../services';

import {
  EuiCodeBlockAnnotation,
  LineAnnotationMap,
} from './code_block_annotations';
import { euiCodeBlockLineStyles } from './code_block_line.styles';

register(esqlLanguage as RefractorSyntax);

/**
 * Utils shared between EuiCode and EuiCodeBlock
 */

export type EuiCodeSharedProps = CommonProps &
  HTMLAttributes<HTMLElement> & {
    /**
     * Sets the syntax highlighting for a specific language
     * @see [https://prismjs.com/#supported-languages](https://prismjs.com/#supported-languages) for options
     */
    language?: string;
    transparentBackground?: boolean;
  };

export const SUPPORTED_LANGUAGES = listLanguages();
export const DEFAULT_LANGUAGE = 'text';

/**
 * Platform-agnostic new line regex that safely matches all standard
 * line termination conventions:
 * - LF: Unix-based platforms and JS-native sources like text areas
 * - CRLF: Windows
 * - CR: Mac Classic; to support files saved a long time ago
 */
export const NEW_LINE_REGEX = /\r\n|\r|\n/;

/**
 * Platform-agnostic global new line regex that safely matches all standard
 * line termination conventions.
 * See [NEW_LINE_REGEX]{@link NEW_LINE_REGEX} for more details.
 */
export const NEW_LINE_REGEX_GLOBAL = new RegExp(NEW_LINE_REGEX, 'g');

export const checkSupportedLanguage = (language: string): string => {
  return SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
};

export const getHtmlContent = (
  data: RefractorNode[],
  children: ReactNode
): ReactElement[] | ReactNode => {
  if (!Array.isArray(data) || data.length < 1) {
    return children;
  }
  return data.map(nodeToHtml);
};

export const isAstElement = (node: RefractorNode): node is AST.Element =>
  node.hasOwnProperty('type') && node.type === 'element';

export const nodeToHtml = (
  node: RefractorNode,
  idx: number,
  nodes: RefractorNode[],
  depth: number = 0
): ReactElement => {
  const key = `node-${depth}-${idx}`;

  if (isAstElement(node)) {
    const { properties, tagName, children } = node;

    return createElement(
      tagName,
      {
        ...properties,
        key,
        className: cx(properties.className),
      },
      children &&
        children.map((el, i) =>
          // @ts-ignore - using a custom type here to handle JSX annotations
          el.type === 'annotation' ? (
            <EuiCodeBlockAnnotation
              className="euiCodeBlock__lineAnnotation"
              lineNumber={(el as any).lineNumber}
              children={(el as any).annotation}
              key={i}
            />
          ) : (
            nodeToHtml(el, i, nodes, depth + 1)
          )
        )
    );
  }

  return <React.Fragment key={key}>{node.value}</React.Fragment>;
};

/**
 * Line utils specific to EuiCodeBlock
 */

type ExtendedRefractorNode = RefractorNode & {
  lineStart?: number;
  lineEnd?: number;
};

interface LineNumbersConfig {
  start: number;
  show: boolean;
  highlight?: string;
  annotations?: LineAnnotationMap;
}

// Approximate width of a single digit/character
const CHAR_SIZE = 8;

// Creates an array of numbers from comma-separeated
// string of numbers or number ranges using `-`
// (e.g., "1, 3-10, 15")
export const parseLineRanges = (ranges: string) => {
  const highlights: number[] = [];
  ranges
    .replace(/\s/g, '')
    .split(',')
    .forEach((line: string) => {
      if (line.includes('-')) {
        const range = line.split('-').map(Number);
        for (let i = range[0]; i <= range[1]; i++) {
          highlights.push(i);
        }
      } else {
        highlights.push(Number(line));
      }
    });
  return highlights;
};

const addLineData = (
  nodes: ExtendedRefractorNode[],
  data: { lineNumber: number }
): ExtendedRefractorNode[] => {
  return nodes.reduce<ExtendedRefractorNode[]>((result, node) => {
    const lineStart = data.lineNumber;
    if (node.type === 'text') {
      if (!node.value.match(NEW_LINE_REGEX)) {
        node.lineStart = lineStart;
        node.lineEnd = lineStart;
        result.push(node);
      } else {
        const lines = node.value.split(NEW_LINE_REGEX);
        lines.forEach((line, i) => {
          const num = i === 0 ? data.lineNumber : ++data.lineNumber;
          result.push({
            type: 'text',
            value: i === lines.length - 1 ? line : `${line}\n`,
            lineStart: num,
            lineEnd: num,
          });
        });
      }
      return result;
    }

    if (node.children && node.children.length) {
      const children = addLineData(node.children, data);
      const first = children[0];
      const last = children[children.length - 1];
      const start = first.lineStart ?? lineStart;
      const end = last.lineEnd ?? lineStart;
      if (start !== end) {
        children.forEach((node) => {
          result.push(node);
        });
      } else {
        node.lineStart = start;
        node.lineEnd = end;
        node.children = children;
        result.push(node);
      }
      return result;
    }

    result.push(node);
    return result;
  }, []);
};

function wrapLines(
  nodes: ExtendedRefractorNode[],
  options: { showLineNumbers: boolean; highlight?: string; annotations?: any },
  euiTheme: UseEuiTheme
) {
  const grouped: ExtendedRefractorNode[][] = [];
  nodes.forEach((node) => {
    const lineStart = node.lineStart! - 1;
    if (grouped[lineStart]) {
      grouped[lineStart].push(node);
    } else {
      grouped[lineStart] = [node];
    }
  });
  const wrapped: RefractorNode[] = [];
  grouped.forEach((node, i) => {
    let children: RefractorNode[] = node;

    const styles = euiCodeBlockLineStyles(euiTheme);
    const lineStyles = cx([
      styles.euiCodeBlock__line,
      options.showLineNumbers && styles.hasLineNumbers,
    ]);

    if (options.showLineNumbers) {
      const lineNumber = i + 1;
      const digits = grouped.length.toString().length;
      const width = digits * CHAR_SIZE;

      // Line text element and highlights
      const highlights = options.highlight
        ? parseLineRanges(options.highlight)
        : [];
      const lineTextStyles = cx([
        styles.lineText.euiCodeBlock__lineText,
        highlights.includes(lineNumber) && styles.lineText.isHighlighted,
      ]);
      const lineTextElement: RefractorNode = {
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['euiCodeBlock__lineText', lineTextStyles],
        },
        children: node,
      };

      // Line number column/wrapper
      const lineNumberWrapperStyles = cx(
        styles.lineNumber.euiCodeBlock__lineNumberWrapper
      );
      const lineNumberWrapperElement: RefractorNode = {
        type: 'element',
        tagName: 'span',
        properties: {
          style: { inlineSize: width },
          className: [
            'euiCodeBlock__lineNumberWrapper',
            lineNumberWrapperStyles,
          ],
        },
        children: [],
      };

      // Line number element
      const lineNumberStyles = cx(styles.lineNumber.euiCodeBlock__lineNumber);
      const lineNumberElement: RefractorNode = {
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['euiCodeBlock__lineNumber', lineNumberStyles],
          ['data-line-number']: lineNumber,
          ['aria-hidden']: true,
        },
        children: [],
      };
      lineNumberWrapperElement.children.push(lineNumberElement);

      // Annotation element
      const hasAnnotation = options.annotations?.hasOwnProperty(lineNumber);
      if (hasAnnotation) {
        const annotationElement = {
          type: 'annotation',
          annotation: options.annotations[lineNumber],
          lineNumber,
        } as unknown as RefractorNode;
        lineNumberWrapperElement.children.push(annotationElement);
      }

      children = [lineNumberWrapperElement, lineTextElement];
    }

    wrapped.push({
      type: 'element',
      tagName: 'span',
      properties: {
        className: ['euiCodeBlock__line', lineStyles],
      },
      children,
    });
  });
  return wrapped;
}

export const highlightByLine = (
  children: string,
  language: string,
  data: LineNumbersConfig,
  euiTheme: UseEuiTheme
) => {
  return wrapLines(
    addLineData(highlight(children, language), { lineNumber: data.start }),
    {
      showLineNumbers: data.show,
      highlight: data.highlight,
      annotations: data.annotations,
    },
    euiTheme
  );
};
