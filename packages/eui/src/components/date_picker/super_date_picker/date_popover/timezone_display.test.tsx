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
      <EuiTimeZoneDisplay timeZone="America/Los_Angeles" />
    );

    expect(container).toMatchSnapshot();
  });

  it('handles "Browser" time zone name', () => {
    const { getByTestSubject } = render(
      <EuiTimeZoneDisplay timeZone="Browser" />
    );

    const browserTimeZone = new Intl.DateTimeFormat().resolvedOptions()
      .timeZone;

    expect(getByTestSubject('euiTimeZoneDisplay')).toHaveTextContent(
      browserTimeZone
    );
  });

  it('handles "UTC" time zone name', () => {
    const { getByTestSubject } = render(<EuiTimeZoneDisplay timeZone="UTC" />);

    // No name displayed between parenthesis, only "UTC"
    expect(getByTestSubject('euiTimeZoneDisplay')).toHaveTextContent('UTC');
  });

  it('does not render with invalid time zone', () => {
    const { queryByTestSubject } = render(
      <EuiTimeZoneDisplay timeZone="Foo/Bar" />
    );

    expect(queryByTestSubject('euiTimeZoneDisplay')).not.toBeInTheDocument();
  });

  test('timeZoneCustomDisplayRender render function', () => {
    jest.useFakeTimers().setSystemTime(new Date('2025-06-21T02:42:00Z'));

    const customContent = (
      <EuiButtonIcon
        href="https://example.com"
        iconType="documentation"
        data-test-subj="customContent"
      />
    );

    const { getByTestSubject } = render(
      <EuiTimeZoneDisplay
        timeZone="Europe/Helsinki"
        customRender={({ nameDisplay, utcOffset, timeZoneName }) => (
          <>
            {nameDisplay}
            {customContent}
            <span data-test-subj="utc">{utcOffset}</span>
            <span data-test-subj="name">{timeZoneName}</span>
          </>
        )}
      />
    );

    expect(getByTestSubject('euiTimeZoneDisplay')).toHaveTextContent(
      'Helsinki'
    );
    expect(getByTestSubject('customContent')).toBeInTheDocument();
    expect(getByTestSubject('utc')).toHaveTextContent('UTC+3');
    expect(getByTestSubject('name')).toHaveTextContent('Europe/Helsinki');

    jest.useRealTimers();
  });
});
