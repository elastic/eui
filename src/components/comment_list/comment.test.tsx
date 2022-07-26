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

import { EuiComment } from './comment';
import { shouldRenderCustomStyles } from '../../test/internal';

describe('EuiComment', () => {
  shouldRenderCustomStyles(
    <EuiComment username="someuser" {...requiredProps} />
  );

  test('is rendered', () => {
    const component = render(
      <EuiComment username="someuser" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('timestamp', () => {
      it('is rendered', () => {
        const component = render(
          <EuiComment timestamp="21 days ago" username="someuser" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('event', () => {
      it('is rendered', () => {
        const component = render(
          <EuiComment username="someuser" event="commented" />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });

  test('renders a body', () => {
    const component = render(
      <EuiComment username="someuser">
        <p>This is the body.</p>
      </EuiComment>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders a timeline icon', () => {
    const component = render(
      <EuiComment username="someuser" timelineAvatar="dot">
        <p>This is the body.</p>
      </EuiComment>
    );

    expect(component).toMatchSnapshot();
  });
});
