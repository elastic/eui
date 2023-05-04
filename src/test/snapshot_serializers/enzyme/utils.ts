/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { ShallowWrapper, ReactWrapper } from 'enzyme';

export const getEnzymeProps = (wrapper: ShallowWrapper | ReactWrapper) => {
  const props = wrapper.props() || ({} as any);
  const keys = Object.keys(props).filter((key) => {
    if (key === 'children') return false;
    if (key === 'css') return false;
    if (key.startsWith('__EMOTION')) return false;
    return true;
  });
  return keys
    .map((key) => {
      let value = props[key];
      value = typeof value === 'string' ? `"${value}"` : `{${String(value)}}`;
      return `${key}=${value}`;
    })
    .join(' ');
};

export const stripUnderscorePrefix = (string?: string) => {
  return string?.replace(/^_/, '') || '';
};

export const cleanEuiComponentNames = (string: string) => {
  string = string.replace(/<_Eui/g, '<Eui');
  string = string.replace(/<\/_Eui/g, '</Eui');
  return string;
};
