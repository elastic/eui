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

// import { requiredProps } from '../../test/required_props';
// import { shouldRenderCustomStyles } from '../../test/internal';

describe('EuiCommentTimeline', () => {
  // gives error
  // shouldRenderCustomStyles(
  //   <EuiCommentTimeline username="someuser" {...requiredProps} />
  // );

  describe('props', () => {
    describe('avatarName', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCommentTimeline username="someuser" avatarName="avatar name" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('avatarIcon', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCommentTimeline username="someuser" avatarIcon="dot" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('timelineAvatarProps', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCommentTimeline
            username="someuser"
            avatarProps={{ size: 's', color: '#ffff00' }}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
