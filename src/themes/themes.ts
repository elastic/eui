/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

export interface EUI_THEME {
  text: string;
  value: string;
}

export const EUI_THEMES: EUI_THEME[] = [
  {
    text: 'Light',
    value: 'light',
  },
  {
    text: 'Dark',
    value: 'dark',
  },
  {
    text: 'Amsterdam: Light',
    value: 'amsterdam-light',
  },
  {
    text: 'Amsterdam: Dark',
    value: 'amsterdam-dark',
  },
];
