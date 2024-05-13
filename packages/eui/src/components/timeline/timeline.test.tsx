/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { EuiAvatar } from '../avatar';
import { EuiTimeline, EuiTimelineProps, GUTTER_SIZES } from './timeline';

const items: EuiTimelineProps['items'] = [
  {
    icon: <EuiAvatar name="email" iconType="email" color="subdued" />,
    verticalAlign: 'center',
    children: (
      <p>
        <strong>janet@elastic.co</strong> was invited to the project
      </p>
    ),
  },
  {
    icon: 'bolt',
    verticalAlign: 'top',
    children: (
      <p>
        <strong>janet@elastic.co</strong> was invited to the project
      </p>
    ),
  },
];

describe('EuiTimeline', () => {
  test('is rendered with items', () => {
    const { container } = render(<EuiTimeline items={items} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('gutterSize', () => {
      GUTTER_SIZES.forEach((gutterSize) => {
        test(`${gutterSize} is rendered`, () => {
          const { container } = render(
            <EuiTimeline items={items} gutterSize={gutterSize} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});
