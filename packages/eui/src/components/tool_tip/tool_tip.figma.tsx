/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import figma from '@figma/code-connect';

import { EuiToolTip } from './tool_tip';

figma.connect(EuiToolTip, 'node-id=32039-390707', {
  props: {
    content: figma.string('Description'),
    position: figma.enum('Direction', {
      '12:00 ↑': 'bottom',
      '11:00': 'bottom',
      '10:00': 'right',
      '8:00': 'right',
      '7:00': 'top',
      '6:00 ↓': 'top',
      '5:00': 'top',
      '4:00': 'left',
      '3:00 →': 'left',
      '2:00': 'left',
      '1::00': 'bottom',
      '9:00 ←': 'right',
    }),
    title: figma.boolean('Title', {
      true: figma.string('⮑ Title'),
      false: undefined,
    }),
  },
  example: (props) => <EuiToolTip {...props} />,
});
