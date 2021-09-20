/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createElement, Fragment, ReactElement } from 'react';
import { refractor } from 'refractor';
import type { RefractorElement, RefractorRoot, Text } from 'refractor';
import classNames from 'classnames';

export type RefractorNode = RefractorElement | Text;

type ExtendedRefractorNode = RefractorNode & {
  lineStart?: number;
  lineEnd?: number;
};

interface LineNumbersConfig {
  start: number;
  show: boolean;
}

// Approximate width of a single digit/character
const CHAR_SIZE = 8;
const $euiSizeS = 8;

const isAstText = (node: any): node is Text =>
  node.hasOwnProperty('type') && node.type === 'text';

const isAstElement = (node: any): node is RefractorElement =>
  node.hasOwnProperty('type') && node.type === 'element';

const isAstRoot = (node: any): node is RefractorRoot =>
  node.hasOwnProperty('type') && node.type === 'root';

const addLineData = (
  nodes: RefractorRoot | ExtendedRefractorNode[],
  data: { lineNumber: number }
): ExtendedRefractorNode[] => {
  const children: RefractorNode[] = isAstRoot(nodes) ? nodes.children : nodes;
  return children.reduce<ExtendedRefractorNode[]>((result, node) => {
    const lineStart = data.lineNumber;
    if (isAstText(node)) {
      if (!node.value.match(/\r\n?|\n/)) {
        node.lineStart = lineStart;
        node.lineEnd = lineStart;
        result.push(node);
      } else {
        const lines = node.value.split(/\r\n?|\n/);
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
  options: { showLineNumbers: boolean }
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
  const digits = grouped.length.toString().length;
  const width = digits * CHAR_SIZE;
  grouped.forEach((node, i) => {
    const children: RefractorNode[] = options.showLineNumbers
      ? [
          {
            type: 'element',
            tagName: 'span',
            properties: {
              style: { width },
              ['data-line-number']: i + 1,
              ['aria-hidden']: true,
              className: ['euiCodeBlock__lineNumber'],
            },
            children: [],
          },
          {
            type: 'element',
            tagName: 'span',
            properties: {
              style: { marginLeft: width + $euiSizeS },
              className: ['euiCodeBlock__lineText'],
            },
            children: node,
          },
        ]
      : node;
    wrapped.push({
      type: 'element',
      tagName: 'span',
      properties: {
        className: ['euiCodeBlock__line'],
      },
      children,
    });
  });
  return wrapped;
}

export const nodeToHtml = (
  node: RefractorNode,
  idx: number,
  nodes: RefractorNode[],
  depth: number = 0
): ReactElement => {
  const key = `node-${depth}-${idx}`;

  if (isAstElement(node)) {
    const { properties, tagName: TagName, children } = node;

    return (
      <TagName
        key={key}
        {...properties}
        className={classNames((properties as { className: string }).className)}
      >
        {children &&
          children.map((el, i) => nodeToHtml(el, i, nodes, depth + 1))}
      </TagName>
    );

    // return createElement(
    //   tagName as string,
    //   {
    //     ...(properties as {}),
    //     key,
    //     className: classNames((properties as { className: string }).className),
    //   },
    //   children && children.map((el, i) => nodeToHtml(el, i, nodes, depth + 1))
    // );
  }

  // console.log(node.value);

  return <Fragment key={key}>{node.value}</Fragment>;
};

export const highlightByLine = (
  children: string,
  language: string,
  data: LineNumbersConfig
) => {
  return wrapLines(
    addLineData(refractor.highlight(children, language), {
      lineNumber: data.start,
    }),
    { showLineNumbers: data.show }
  );
};
