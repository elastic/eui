/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const SUPPORTED_ELEMENTS = [
  'fieldset',
  'input',
  'select',
  'optgroup',
  'option',
  'button',
  'textarea',
];

export const elementCanBeDisabled = <T extends HTMLElement>(
  htmlElement: T | null
) => {
  if (!htmlElement) return false;

  const tagName = htmlElement.tagName && htmlElement.tagName.toLowerCase();
  const roleName = htmlElement.getAttribute('role') ?? '';

  return (
    SUPPORTED_ELEMENTS.includes(roleName) ||
    SUPPORTED_ELEMENTS.includes(tagName)
  );
};
