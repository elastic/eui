/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { jsx } from '@emotion/react';

/**
 * React.cloneElement does not work if the cloned element does not already have the
 * `css` prop - as a result, we need to use `jsx()` to manually clone the element
 * See https://github.com/emotion-js/emotion/issues/1404
 */
export const cloneElementWithCss = (
  element: any,
  props: any
): React.ReactElement => {
  const clonedElement =
    element.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__ || element.type; // EMOTION_TYPE handles non-React elements (native JSX/HTML nodes)

  const clonedProps = {
    key: element.key,
    ref: element.ref,
    ...element.props,
    ...props,
  };

  if (props.css || element.props.css) {
    clonedProps.css = [element.props.css, props.css];
  }

  return jsx(clonedElement, clonedProps);
};
