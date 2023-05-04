/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const printEmptyComponent = (componentName: string) =>
  `<${componentName} />`;

export const printWrappingComponent = (
  componentName: string,
  content: string | null = ''
) =>
  content
    ? `<${componentName}>${content}</${componentName}>`
    : printEmptyComponent(componentName);

export const getEuiComponentFromClassName = (className?: string) => {
  if (!className) return;

  const euiClassNameRegex = /^(?<euiComponent>eui[A-Z][A-Za-z]+)/;
  const euiMatch = className.match(euiClassNameRegex);
  const euiClassName = euiMatch?.groups?.euiComponent;

  if (euiClassName) {
    // Capitalize the first letter to get the component name
    return euiClassName.charAt(0).toUpperCase() + euiClassName.slice(1);
  }
};

export const fixIndentation = (children: string, startingIndentLevel = 1) => {
  // Flatten/remove existing indentation
  children = children.replace(/^\s+/gm, '');

  // Restore component indentation
  const INDENT = '  ';
  let currentIndentLevel = startingIndentLevel;

  children = children
    .split('\n')
    .map((line) => {
      const isClosingComponent = line.startsWith('</');
      const isSelfContainedComponent = line.endsWith('/>');
      const isOpeningComponent =
        !isClosingComponent &&
        !isSelfContainedComponent &&
        line.startsWith('<');
      const isEndOfOpeningComponent = line === '>' || line === '/>';

      if (isClosingComponent) currentIndentLevel -= 1;

      const indentedLine = isEndOfOpeningComponent
        ? `${INDENT.repeat(currentIndentLevel - 1)}${line}`
        : `${INDENT.repeat(currentIndentLevel)}${line}`;

      if (isOpeningComponent) currentIndentLevel += 1;

      return indentedLine;
    })
    .join('\n');

  return children;
};

export const removeSerializedSyntax = (children: string) => {
  children = children.replace(/^HTMLCollection \[/, '');
  children = children.replace(/^Array \[/, '');
  children = children.replace(/,$/gm, '');
  children = children.replace(/]$/, '');
  return children;
};
