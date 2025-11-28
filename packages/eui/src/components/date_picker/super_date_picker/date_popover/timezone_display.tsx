/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { type ReactNode, type ComponentPropsWithoutRef } from 'react';
import { Moment } from 'moment';

import { euiTimeZoneDisplayStyles } from './timezone_display.styles';

import { useEuiMemoizedStyles } from '../../../../services';
import { EuiFlexGroup } from '../../../flex';
import { EuiIcon } from '../../../icon';
import { EuiText } from '../../../text';

/**
 * Available elements to render passed to the
 * `customRender` render function.
 */
type TimeZoneCustomDisplayRenderOptions = {
  /** Name with UTC offset and an icon */
  nameDisplay?: ReactNode;
  /** UTC offset in hours, in plain text e.g. UTC+1 */
  utcOffset?: string;
  /** Time zone name e.g. Europe/Brussels */
  timeZoneName?: string;
};

export type EuiTimeZoneDisplayProps = ComponentPropsWithoutRef<'div'> & {
  /**
   * A valid time zone name, from the IANA database, e.g. "America/Los_Angeles".
   *
   * @link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   */
  timeZone?: string;

  /**
   * Render prop function to add additional content to the time zone display.
   * Useful for e.g. adding links to documentation or setting pages.
   */
  customRender?: (options: TimeZoneCustomDisplayRenderOptions) => ReactNode;

  /**
   * Reference date to be used while resolving the UTC offset.
   * Only useful for edge cases involving daylight saving time.
   */
  date?: Moment;
};

/**
 * Display time zone information.
 */
export const EuiTimeZoneDisplay: React.FC<EuiTimeZoneDisplayProps> = ({
  timeZone,
  customRender,
  date,
  ...rest
}) => {
  const color = 'subdued';
  const styles = useEuiMemoizedStyles(euiTimeZoneDisplayStyles);
  const referenceDate = date ? date.toDate() : undefined;
  const { utc, name, isInvalid } = useEuiUTCOffsetDisplay(
    timeZone ?? 'Browser',
    referenceDate
  );

  if (!timeZone || isInvalid) return null;

  const label = !name ? utc : `${utc} (${name})`;
  const nameDisplay = (
    <>
      <EuiIcon type="globe" color={color} />
      <EuiText component="span" color={color} size="s">
        {label}
      </EuiText>
    </>
  );

  return (
    <EuiFlexGroup
      css={styles.euiTimeZoneDisplay}
      alignItems="center"
      gutterSize="xs"
      data-test-subj="euiTimeZoneDisplay"
      aria-label={label}
      {...rest}
    >
      {typeof customRender === 'function'
        ? customRender({ nameDisplay, utcOffset: utc, timeZoneName: name })
        : nameDisplay}
    </EuiFlexGroup>
  );
};

/**
 * Get the UTC offset display in hours e.g. "UTC+2" from time zone name.
 *
 * @param timeZoneName IANA time zone name
 * @param [date] Reference date to get offset with Intl.DateTimeFormat
 */
export function useEuiUTCOffsetDisplay(timeZoneName: string, date?: Date) {
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
    const formatter = new Intl.DateTimeFormat(undefined, {
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
