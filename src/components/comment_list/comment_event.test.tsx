/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiCommentEvent } from './comment_event';

describe('EuiCommentEvent', () => {
  test('is rendered with custom content', () => {
    const { container } = render(
      <EuiCommentEvent username="someuser" {...requiredProps}>
        <p>Some custom content</p>
      </EuiCommentEvent>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('timestamp', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiCommentEvent timestamp="21 days ago" username="someuser" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('event', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiCommentEvent event="commented" username="someuser" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('eventIcon and eventIconAriaLabel', () => {
      it('are rendered', () => {
        const { container } = render(
          <EuiCommentEvent
            username="someuser"
            eventIcon="pencil"
            eventIconAriaLabel="edit"
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('eventColor', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiCommentEvent username="someuser" eventColor="danger" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
