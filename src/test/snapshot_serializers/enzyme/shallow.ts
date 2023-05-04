/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ShallowWrapper } from 'enzyme';

import { getEuiComponentFromClassName } from '../utils';
import {
  getEnzymeProps,
  stripUnderscorePrefix,
  cleanEuiComponentNames,
} from './utils';

/**
 * Utils
 */
const isShallowWrapper = (wrapper: any) =>
  wrapper?.constructor?.name === ShallowWrapper.name;

const getShallowName = (wrapper: ShallowWrapper) => {
  let name = wrapper.name();
  // Emotion bogarts the name with its own wrapper :(
  if (name === 'EmotionCssPropInternal') {
    name = wrapper.prop('__EMOTION_LABEL_PLEASE_DO_NOT_USE__');
    // Sometimes the emotion label isn't set - fall back to the className
    if (!name)
      name = getEuiComponentFromClassName(wrapper.prop('className')) || '';
  }
  // Some display names have underscored prefixes
  name = stripUnderscorePrefix(name);
  return name;
};

const printChildren = (children: string) => {
  children = children.replace(/\n\n/g, '').replace(/\n/g, '\n  '); // Fix indentation and spacing
  children = cleanEuiComponentNames(children);
  return children;
};

/**
 * Snapshot serializer
 */
export const euiEnzymeShallowSnapshotSerializer = {
  test: (val: any) => {
    if (isShallowWrapper(val)) {
      if (val.name() === 'ContextProvider') {
        // Skip context providers
        return true;
      } else {
        const name = getShallowName(val);
        return name.startsWith('Eui');
      }
    } else {
      return false;
    }
  },
  print: (val: ShallowWrapper, serialize: Function) => {
    if (val.name() === 'ContextProvider') return serialize(val.children());

    const euiComponentName = getShallowName(val);

    let props = getEnzymeProps(val);
    props = props ? ` ${props}` : '';

    const children = printChildren(val.children().debug());
    return children
      ? `<${euiComponentName}${props}>\n  ${children}\n</${euiComponentName}>`
      : `<${euiComponentName}${props} />`;
  },
};
