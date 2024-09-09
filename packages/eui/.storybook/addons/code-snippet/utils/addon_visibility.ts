/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

export const clearHiddenStyle = (id: string) => {
  const styleElement = document.getElementById(id);

  if (styleElement && styleElement.parentElement) {
    styleElement.parentElement.removeChild(styleElement);
  }
};

export const addHiddenStyle = (id: string, css: string) => {
  const existingStyle = document.getElementById(id);

  if (existingStyle) {
    if (existingStyle.innerHTML !== css) {
      existingStyle.innerHTML = css;
    }
  } else {
    const style = global.document.createElement('style');

    style.setAttribute('id', id);
    style.innerHTML = css;
    document.head.appendChild(style);
  }
};
