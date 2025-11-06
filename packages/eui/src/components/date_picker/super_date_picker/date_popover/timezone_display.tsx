/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { type ReactNode } from 'react';

import { euiTimeZoneDisplayStyles } from './timezone_display.styles';

import { useEuiMemoizedStyles } from '../../../../services';
import { EuiFlexGroup } from '../../../flex';
import { EuiIcon } from '../../../icon';
import { EuiText } from '../../../text';

// TODO test this!
type TimeZoneCustomDisplayRenderOptions = {
  nameDisplay?: ReactNode; // ReactElement<typeof ???>;
};

export type EuiTimeZoneDisplayProps = {
  /**
   * A name from IANA time zone database.
   * Setting this will display the time zone information next to date/time input fields.
   * This does NOT affect how date/times are handled internally.
   *
   * @example "America/Los_Angeles"
   * @link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   */
  timeZoneDisplay?: string;

  /**
   * Render prop function to add additional content to the time zone display.
   * Useful for
   * @returns
   */
  timeZoneCustomDisplayRender?: (
    options: TimeZoneCustomDisplayRenderOptions
  ) => ReactNode;
};

/**
 * Display time zone information.
 *
 * @todo pass `locale` and possibly a date for the formatter
 */
export const EuiTimeZoneDisplay: React.FC<EuiTimeZoneDisplayProps> = ({
  timeZoneDisplay,
  timeZoneCustomDisplayRender,
}) => {
  const color = 'subdued';
  const styles = useEuiMemoizedStyles(euiTimeZoneDisplayStyles);
  const { utc, name, isInvalid } = useUTCDisplayFromIANAName(
    timeZoneDisplay ?? 'Browser'
  );

  if (!timeZoneDisplay || isInvalid) return null;

  const nameDisplay = (
    <>
      <EuiIcon type="globe" color={color} />
      <EuiText component="span" color={color} size="s">
        {utc} {name && `(${name})`}
      </EuiText>
    </>
  );

  return (
    <EuiFlexGroup
      css={styles.euiTimeZoneDisplay}
      alignItems="center"
      gutterSize="xs"
      data-test-subj="euiTimeZoneDisplay"
    >
      {typeof timeZoneCustomDisplayRender === 'function'
        ? timeZoneCustomDisplayRender({ nameDisplay })
        : nameDisplay}
    </EuiFlexGroup>
  );
};

/**
 * Get the UTC offset display e.g. UTC+2 from time zone name.
 *
 * @param timeZoneName IANA time zone name
 * @param [locale] Locale to use with Intl.DateTimeFormat
 * @param [date] Reference date to get offset with Intl.DateTimeFormat
 */
export function useUTCDisplayFromIANAName(
  timeZoneName: string,
  locale: string = 'en',
  date?: Date
) {
  try {
    if (timeZoneName === 'UTC') {
      return {
        utc: 'UTC',
        name: '',
        isInvalid: false,
      };
    }

    const ianaName =
      timeZoneName === 'Browser'
        ? new Intl.DateTimeFormat().resolvedOptions().timeZone
        : timeZoneName;
    const formatter = new Intl.DateTimeFormat(locale, {
      timeZone: ianaName,
      timeZoneName: 'shortOffset',
    });
    const formattedParts = formatter.formatToParts(date ?? new Date());
    const timeZoneNamePart =
      formattedParts.find((part) => part.type === 'timeZoneName')?.value || '';

    return {
      utc: timeZoneNamePart.replace('GMT', 'UTC'),
      name: ianaName,
      isInvalid: false,
    };
  } catch (err) {
    return {
      utc: '',
      name: timeZoneName,
      isInvalid: true,
    };
  }
}
