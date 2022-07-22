/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiPopoverArrow, POSITIONS } from './_popover_arrow';

describe('EuiPopoverArrow', () => {
  shouldRenderCustomStyles(<EuiPopoverArrow position="left" />);

  describe('position', () => {
    POSITIONS.forEach((position) => {
      test(`${position} is rendered`, () => {
        const component = render(
          <EuiPopoverArrow position={position} {...requiredProps} />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
