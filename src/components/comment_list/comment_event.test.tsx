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

import { EuiCommentEvent } from './comment_event';

describe('EuiCommentEvent', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCommentEvent username="someuser" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('type', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCommentEvent username="someuser" type="update" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('timestamp', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCommentEvent timestamp="21 days ago" username="someuser" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('event', () => {
      it('is rendered', () => {
        const component = render(
          <EuiCommentEvent event="commented" username="someuser" />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
