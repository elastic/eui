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
import { EuiTimelineItem, VERTICAL_ALIGN } from './timeline_item';

describe('EuiTimelineItem', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiTimelineItem icon="dot">
        <p>I&apos;m the children</p>
      </EuiTimelineItem>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('verticalAlign', () => {
      VERTICAL_ALIGN.forEach((alignment) => {
        test(`${alignment} is rendered`, () => {
          const { container } = render(
            <EuiTimelineItem icon="dot" verticalAlign={alignment}>
              <p>I&apos;m the children</p>
            </EuiTimelineItem>
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    test('iconAriaLabel is rendered', () => {
      const { container } = render(
        <EuiTimelineItem icon="dot" iconAriaLabel="icon aria label">
          <p>I&apos;m the children</p>
        </EuiTimelineItem>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('EuiAvatar is passed as an icon', () => {
      const { container } = render(
        <EuiTimelineItem
          icon={<EuiAvatar name="dot" iconType="dot" color="subdued" />}
        >
          <p>I&apos;m the children</p>
        </EuiTimelineItem>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
