/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCommentTimeline } from './comment_timeline';
import { EuiAvatar } from '../avatar';
import { shouldRenderCustomStyles } from '../../test/internal';

describe('EuiCommentTimeline', () => {
  shouldRenderCustomStyles(
    <EuiCommentTimeline username="someuser" {...requiredProps} />
  );

  test('is rendered', () => {
    const component = render(
      <EuiCommentTimeline username="someuser" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('timelineIcon', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCommentTimeline
            username="someuser"
            timelineIcon={<EuiAvatar size="l" name="Mario" />}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
