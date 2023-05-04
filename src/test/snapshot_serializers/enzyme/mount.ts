/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ReactWrapper } from 'enzyme';

import { fixIndentation } from '../utils';
import {
  getEnzymeProps,
  stripUnderscorePrefix,
  cleanEuiComponentNames,
} from './utils';

/**
 * Utils
 */
const isReactWrapper = (wrapper: any) =>
  wrapper?.constructor?.name === ReactWrapper.name;

const printChildrenShallowly = (children: string) => {
  // Remove annoying Emotion wrappers
  children = children.replace(/^\s*<EmotionCssPropInternal[^\n]*>\n?/gm, '');
  children = children.replace(/^\s*<\/EmotionCssPropInternal>\n?/gm, '');
  children = children.replace(/^\s*<Insertion[^\n]*>\n?/gm, '');
  children = children.replace(/^\s*<\/Insertion>\n?/gm, '');

  // Strip/replace any underscore-prefixed EUI component names
  children = cleanEuiComponentNames(children);

  // Attempt to remove rendered DOM content that are EUI and can be represented by wrappers
  // Determine this via, e.g. <button className="euiButton [...whatever other classes" [whatever props]>
  const tagRegex = /^(?<tagName>\s*<[a-z]+)[^\n]* className="eui[A-Z][A-Za-z]+[\s\w-]*"[^\n]*>\n/m;
  let tagMatch;
  while ((tagMatch = children.match(tagRegex))) {
    const tagName = tagMatch.groups?.tagName;
    const closingTagRegex = new RegExp(
      `^${tagName?.replace('<', '</')}>\\n`,
      'm'
    );
    children = children.replace(tagRegex, '');
    children = children.replace(closingTagRegex, '');
  }

  // Indentation will potentially be messed up due to removed content/wrappers - we'll need to restore it manually
  children = fixIndentation(children.trim());

  return children;
};

/**
 * Snapshot serializer
 */
export const euiEnzymeMountSnapshotSerializer = {
  test: (val: any) => {
    if (isReactWrapper(val)) {
      return val.name().startsWith('Eui') || val.name().startsWith('_Eui');
    } else {
      return false;
    }
  },
  print: (val: ReactWrapper) => {
    const euiComponentName = stripUnderscorePrefix(val.name());

    let props = getEnzymeProps(val);
    props = props ? ` ${props}` : '';

    const children = printChildrenShallowly(val.children().debug());

    return children
      ? `<${euiComponentName}${props}>\n${children}\n</${euiComponentName}>`
      : `<${euiComponentName}${props} />`;
  },
};
