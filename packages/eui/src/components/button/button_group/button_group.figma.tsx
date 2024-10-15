/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import figma from '@figma/code-connect';

import { EuiButtonGroup } from './button_group';

figma.connect(EuiButtonGroup, 'node-id=31735-392753', {
  props: {
    buttonSize: figma.enum('Size', {
      'Small*': undefined,
      Medium: 'm',
      Compressed: 'compressed',
    }),
    color: figma.enum('Color', {
      'Neutral*': undefined,
      Primary: 'primary',
      // Discrepancy between Figma and EUI
      // Lack of "accent", "success", "warning", "danger" in Figma
    }),
    isDisabled: figma.boolean('Disabled'),
    isFullWidth: figma.boolean('Full width'),
    isIconOnly: figma.boolean('Icon only'),
  },
  example: (props) => (
    <EuiButtonGroup
      type="single"
      idSelected="0"
      legend="Legend"
      onChange={() => {}}
      options={[
        { id: '0', label: 'Button' },
        { id: '1', label: 'Button' },
        { id: '2', label: 'Button' },
      ]}
      {...props}
    />
  ),
});
