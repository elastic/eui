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
import { EuiAvatar } from '../avatar';

describe('EuiComment', () => {
  test('is rendered', () => {
    const component = render(
      <EuiComment username="someuser" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('type', () => {
      it('is rendered', () => {
        const component = render(
          <EuiComment username="someuser" type="update" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('timelineIcon', () => {
      it('is rendered', () => {
        const component = render(
          <EuiComment
            username="someuser"
            timelineIcon={<EuiAvatar size="l" name="Mario" />}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

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
          <EuiComment event="commented" username="someuser" />
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
});
