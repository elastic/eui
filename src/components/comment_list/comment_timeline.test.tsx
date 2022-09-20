/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { EuiCommentTimeline } from './comment_timeline';
import { EuiAvatar } from '../avatar';

describe('EuiCommentTimeline', () => {
  describe('props', () => {
    describe('timelineAvatar', () => {
      it('defaults to an avatar with a `userAvatar` icon', () => {
        const component = render(<EuiCommentTimeline />);

        expect(component).toMatchSnapshot();
      });

      it('is rendered with a string', () => {
        const component = render(<EuiCommentTimeline timelineAvatar="dot" />);

        expect(component).toMatchSnapshot();
      });

      it('is rendered with a ReactNode', () => {
        const component = render(
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

        expect(component).toMatchSnapshot();
      });

      it('is rendered with timelineAvatarAriaLabel', () => {
        const component = render(
          <EuiCommentTimeline
            timelineAvatar="dot"
            timelineAvatarAriaLabel="timelineAvatarAriaLabel"
          />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
