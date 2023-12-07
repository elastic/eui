/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiComment } from './comment';

describe('EuiComment', () => {
  shouldRenderCustomStyles(
    <EuiComment username="someuser" {...requiredProps} />
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiComment username="someuser" {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('timestamp', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiComment timestamp="21 days ago" username="someuser" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('event', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiComment username="someuser" event="commented" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  test('renders a body', () => {
    const { container } = render(
      <EuiComment username="someuser">
        <p>This is the body.</p>
      </EuiComment>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders a timeline icon', () => {
    const { container } = render(
      <EuiComment username="someuser" timelineAvatar="dot">
        <p>This is the body.</p>
      </EuiComment>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
