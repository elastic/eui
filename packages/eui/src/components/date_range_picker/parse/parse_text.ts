/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dateMath from '@elastic/datemath';

import {
  DATE_TYPE_ABSOLUTE,
  DATE_TYPE_NOW,
  DATE_TYPE_RELATIVE,
  DATE_RANGE_INPUT_DELIMITER,
  UNIT_FULL_TO_SHORT_MAP,
} from '../constants';
import {
  type DateType,
  type DateString,
  isValidTimeRange,
  type TimeRange,
  type TimeRangeTransformOptions,
} from '../utils';

// Shorthand: "-7m", "+7d", "now-7m", "now+7d/d"
const SHORTHAND_REGEX = /^(now)?([+-])(\d+)([smhdwMy])(\/[smhdwMy])?$/i;

// (works because parsing of end is done with `roundUp` true)
const NAMED_RANGES: Record<string, { start: string; end: string }> = {
  today: { start: 'now/d', end: 'now/d' },
  yesterday: { start: 'now-1d/d', end: 'now-1d/d' },
  tomorrow: { start: 'now+1d/d', end: 'now+1d/d' },
};

// "last 7 minutes" or "next 7 minutes"
const NATURAL_DURATION_REGEX = /^(last|next)\s+(\d+)\s+(\w+)$/i;

// "7 minutes ago" or "7 minutes from now"
const NATURAL_INSTANT_REGEX = /^(\d+)\s+(\w+)\s+(ago|from now)$/i;

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getDelimiterPattern = (delimiter: string) => {
  const normalized = delimiter.trim();
  if (!normalized) {
    return null;
  }

  return new RegExp(`^(.+?)\\s+${escapeRegExp(normalized)}\\s+(.+)$`);
};

/**
 * Main parsing function to transform text into a time range
 */
export function textToTimeRange(
  text: string,
  options?: TimeRangeTransformOptions
): TimeRange {
  const trimmed = text.trim();
  const { presets = [], delimiter = DATE_RANGE_INPUT_DELIMITER } =
    options ?? {};
  const delimiterPattern = getDelimiterPattern(delimiter);

  const invalidResult: TimeRange = {
    value: text,
    start: '',
    end: '',
    startDate: null,
    endDate: null,
    type: [DATE_TYPE_ABSOLUTE, DATE_TYPE_ABSOLUTE],
    isNaturalLanguage: false,
    isValid: false,
  };

  if (!trimmed) {
    return invalidResult;
  }

  // (1) Check if text matches a preset label (case insensitive)

  const matchedPreset = presets.find(
    (preset) => preset.label.toLowerCase() === trimmed.toLowerCase()
  );
  if (matchedPreset) {
    const startDate = dateMath.parse(matchedPreset.start)?.toDate() ?? null;
    const endDate =
      dateMath.parse(matchedPreset.end, { roundUp: true })?.toDate() ?? null;
    const type: [DateType, DateType] = [
      dateStringToDateType(matchedPreset.start),
      dateStringToDateType(matchedPreset.end),
    ];
    const range: TimeRange = {
      value: text,
      start: matchedPreset.start,
      end: matchedPreset.end,
      startDate,
      endDate,
      type,
      isNaturalLanguage: true,
      isValid: false, // will set below
    };
    range.isValid = isValidTimeRange(range);
    return range;
  }

  // (2) Check if it's a single value (no delimiter)

  const delimiterMatch = delimiterPattern
    ? trimmed.match(delimiterPattern)
    : null;
  if (!delimiterMatch) {
    // Try natural duration: "last 7 minutes", "today", etc.
    const naturalDuration = getTimeRangeBoundsFromNaturalDuration(trimmed);
    if (naturalDuration) {
      const startDate = dateMath.parse(naturalDuration.start)?.toDate() ?? null;
      const endDate =
        dateMath.parse(naturalDuration.end, { roundUp: true })?.toDate() ??
        null;
      const type: [DateType, DateType] = [
        dateStringToDateType(naturalDuration.start),
        dateStringToDateType(naturalDuration.end),
      ];
      const range: TimeRange = {
        value: text,
        start: naturalDuration.start,
        end: naturalDuration.end,
        startDate,
        endDate,
        type,
        isNaturalLanguage: true,
        isValid: false, // will set below
      };
      range.isValid = isValidTimeRange(range);
      return range;
    }

    // Try as a single instant (treat as start, with end = now)
    const singleInstant = textInstantToDateString(trimmed);
    if (singleInstant) {
      // future shorthand exception (start = now)
      if (
        SHORTHAND_REGEX.test(singleInstant) &&
        singleInstant.startsWith('now+')
      ) {
        const startDate = new Date(); // now
        const endDate = dateMath.parse(singleInstant)?.toDate() ?? null;
        const type: [DateType, DateType] = [
          DATE_TYPE_NOW,
          dateStringToDateType(singleInstant),
        ];
        const range: TimeRange = {
          value: text,
          start: 'now',
          end: singleInstant,
          startDate,
          endDate,
          type,
          isNaturalLanguage: false,
          isValid: false, // will set below
        };
        range.isValid = isValidTimeRange(range);
        return range;
      }
      const startDate = dateMath.parse(singleInstant)?.toDate() ?? null;
      const endDate = new Date(); // now
      const type: [DateType, DateType] = [
        dateStringToDateType(singleInstant),
        DATE_TYPE_NOW,
      ];
      const range: TimeRange = {
        value: text,
        start: singleInstant,
        end: 'now',
        startDate,
        endDate,
        type,
        isNaturalLanguage: false,
        isValid: false, // will set below
      };
      range.isValid = isValidTimeRange(range);
      return range;
    }

    return invalidResult;
  }

  // (3) Parse as a range with delimiter

  const startText = delimiterMatch[1].trim();
  const endText = delimiterMatch[2].trim();

  if (!startText || !endText) {
    return invalidResult;
  }

  const start = textInstantToDateString(startText.trim());
  const end = textInstantToDateString(endText.trim());

  if (!start || !end) {
    return invalidResult;
  }

  const startDate = dateMath.parse(start)?.toDate() ?? null;
  const endDate = dateMath.parse(end, { roundUp: true })?.toDate() ?? null;
  const type: [DateType, DateType] = [
    dateStringToDateType(start),
    dateStringToDateType(end),
  ];

  const range: TimeRange = {
    value: text,
    start,
    end,
    startDate,
    endDate,
    type,
    isNaturalLanguage: false,
    isValid: false, // will set below
  };
  range.isValid = isValidTimeRange(range);
  return range;
}

function getTimeRangeBoundsFromNaturalDuration(
  text: string
): { start: DateString; end: DateString } | null {
  const trimmed = text.trim().toLowerCase();

  // Check named ranges first
  if (NAMED_RANGES[trimmed]) {
    return NAMED_RANGES[trimmed];
  }

  // "last 7 minutes" or "next 7 days"
  const match = trimmed.match(NATURAL_DURATION_REGEX);
  if (match) {
    const [, direction, count, unitWord] = match;
    const unit = UNIT_FULL_TO_SHORT_MAP[unitWord.toLowerCase()];
    if (unit) {
      if (direction === 'last') {
        return { start: `now-${count}${unit}`, end: 'now' };
      }
      return { start: 'now', end: `now+${count}${unit}` };
    }
  }

  return null;
}

function textInstantToDateString(text: string): DateString | null {
  const trimmed = text.trim();
  const normalized = trimmed.toLowerCase();

  // "now"
  if (normalized === 'now') {
    return 'now';
  }

  // Shorthand: "-7m", "+7d", "now-7m/d"
  const shorthandMatch = trimmed.match(SHORTHAND_REGEX);
  if (shorthandMatch) {
    const [, , operator, count, unit, round = ''] = shorthandMatch;
    return `now${operator}${count}${unit}${round}`;
  }

  // Natural instant: "7 minutes ago" -> now-7m
  const instantMatch = normalized.match(NATURAL_INSTANT_REGEX);
  if (instantMatch) {
    const [, count, unitWord, direction] = instantMatch;
    const unit = UNIT_FULL_TO_SHORT_MAP[unitWord.toLowerCase()];
    if (unit) {
      const operator = direction === 'ago' ? '-' : '+';
      return `now${operator}${count}${unit}`;
    }
  }

  // Try parsing as absolute date (ISO, RFC 2822, etc.)
  const parsed = dateMath.parse(trimmed);
  if (parsed?.isValid()) {
    return trimmed; // Return original, it's valid
  }

  return null;
}

/**
 * Determines the type of a date string
 */
function dateStringToDateType(dateString: DateString): DateType {
  if (dateString === 'now') return DATE_TYPE_NOW;
  if (dateString.includes('now')) return DATE_TYPE_RELATIVE;
  return DATE_TYPE_ABSOLUTE;
}
