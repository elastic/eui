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

describe('EuiCommentTimeline', () => {
  test('is rendered', () => {
    const component = render(<EuiCommentTimeline {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('type', () => {
      it('is rendered', () => {
        const component = render(<EuiCommentTimeline type="update" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('timelineIcon', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCommentTimeline
            timelineIcon={<EuiAvatar size="l" name="Mario" />}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
