/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { render } from '../../../../test/rtl';

import { EuiTimeZoneDisplay } from './timezone_display';

import { EuiButtonIcon } from '../../../button';

describe('EuiTimeZoneDisplay', () => {
  it('renders', () => {
    const { container } = render(
      <EuiTimeZoneDisplay timeZoneDisplay="America/Los_Angeles" />
    );

    expect(container).toMatchSnapshot();
  });

  it('handles "Browser" time zone name', () => {
    const { getByTestSubject } = render(
      <EuiTimeZoneDisplay timeZoneDisplay="Browser" />
    );

    const browserTimeZone = new Intl.DateTimeFormat().resolvedOptions()
      .timeZone;

    expect(getByTestSubject('euiTimeZoneDisplay')).toHaveTextContent(
      browserTimeZone
    );
  });

  it('handles "UTC" time zone name', () => {
    const { getByTestSubject } = render(
      <EuiTimeZoneDisplay timeZoneDisplay="UTC" />
    );

    // No name displayed between parenthesis, only "UTC"
    expect(getByTestSubject('euiTimeZoneDisplay')).toHaveTextContent('UTC');
  });

  it('does not render with invalid time zone', () => {
    const { queryByTestSubject } = render(
      <EuiTimeZoneDisplay timeZoneDisplay="Foo/Bar" />
    );

    expect(queryByTestSubject('euiTimeZoneDisplay')).not.toBeInTheDocument();
  });

  test('timeZoneCustomDisplayRender render function', () => {
    const customContent = (
      <EuiButtonIcon
        href="https://example.com"
        iconType="documentation"
        data-test-subj="customContent"
      />
    );

    const { getByTestSubject } = render(
      <EuiTimeZoneDisplay
        timeZoneDisplay="Europe/Helsinki"
        timeZoneCustomDisplayRender={({ nameDisplay }) => (
          <>
            {nameDisplay}
            {customContent}
          </>
        )}
      />
    );

    expect(getByTestSubject('euiTimeZoneDisplay')).toHaveTextContent(
      'Helsinki'
    );
    expect(getByTestSubject('customContent')).toBeInTheDocument();
  });
});
