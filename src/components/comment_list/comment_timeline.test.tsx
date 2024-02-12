/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { EuiCommentTimeline } from './comment_timeline';
import { EuiAvatar } from '../avatar';

describe('EuiCommentTimeline', () => {
  describe('props', () => {
    describe('timelineAvatar', () => {
      it('defaults to an avatar with a `userAvatar` icon', () => {
        const { container } = render(<EuiCommentTimeline />);

        expect(container.firstChild).toMatchSnapshot();
      });

      it('is rendered with a string', () => {
        const { container } = render(
          <EuiCommentTimeline timelineAvatar="dot" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('is rendered with a ReactNode', () => {
        const { container } = render(
          <EuiCommentTimeline
            timelineAvatar={
              <EuiAvatar
                name="username"
                iconType="userAvatar"
                color="subdued"
              />
            }
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('is rendered with timelineAvatarAriaLabel', () => {
        const { container } = render(
          <EuiCommentTimeline
            timelineAvatar="dot"
            timelineAvatarAriaLabel="timelineAvatarAriaLabel"
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
