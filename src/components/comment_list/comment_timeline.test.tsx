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

describe('EuiCommentTimeline', () => {
  describe('props', () => {
    describe('username', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCommentTimeline username="someuser" timelineIcon="avatar dot" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('timelineIcon', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCommentTimeline username="someuser" timelineIcon="dot" />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
