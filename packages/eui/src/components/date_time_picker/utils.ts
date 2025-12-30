/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useState, useEffect, type RefObject } from 'react';
import moment from 'moment';
import dateMath from '@elastic/datemath';

const ABSOLUTE = 'ABSOLUTE';
const RELATIVE = 'RELATIVE';
const NOW = 'NOW';

const DEFAULT_FORMAT = 'MMM D YYYY, HH:mm';
const FORMAT_NO_YEAR = 'MMM D, HH:mm';
const FORMAT_TIME_ONLY = 'HH:mm';

// TODO clean up, update comments

// TODO use "standard" terminology, point > instant

/**
 * Date math string or ISO 8601 yyyy-MM-ddTHH:mm:ss.SSSZ e.g. 2025-12-23T08:15:13Z
 */
export type DateString = string;

export interface Preset {
  label: string;
  start: DateString;
  end: DateString;
}

export type DateType = typeof ABSOLUTE | typeof RELATIVE | typeof NOW;

export interface ParsedRange {
  value: string;
  start: string;
  end: string;
  startDate: Date | null;
  endDate: Date | null;
  type: [DateType, DateType];
  isNaturalLanguage: boolean;
  isValid: boolean;
}

// Unit abbreviation map: full word -> shorthand
const UNIT_MAP: Record<string, string> = {
  second: 's',
  seconds: 's',
  minute: 'm',
  minutes: 'm',
  hour: 'h',
  hours: 'h',
  day: 'd',
  days: 'd',
  week: 'w',
  weeks: 'w',
  month: 'M',
  months: 'M',
  year: 'y',
  years: 'y',
};

// Reverse unit map: shorthand -> full word (singular)
const UNIT_NAMES: Record<string, string> = {
  s: 'second',
  m: 'minute',
  h: 'hour',
  d: 'day',
  w: 'week',
  M: 'month',
  y: 'year',
};

// Natural language named ranges
// (works because parsing of end is done with `roundUp` true)
const NAMED_RANGES: Record<string, { start: string; end: string }> = {
  today: { start: 'now/d', end: 'now/d' },
  yesterday: { start: 'now-1d/d', end: 'now-1d/d' },
  tomorrow: { start: 'now+1d/d', end: 'now+1d/d' },
  'this week': { start: 'now/w', end: 'now/w' },
  'this month': { start: 'now/M', end: 'now/M' },
  'this year': { start: 'now/y', end: 'now/y' },
};

/**
 * Regex patterns for parsing
 */

// "last 7 minutes" or "next 7 minutes"
const NATURAL_DURATION_REGEX = /^(last|next)\s+(\d+)\s+(\w+)$/i;

// "7 minutes ago" or "7 minutes from now"
const NATURAL_POINT_REGEX = /^(\d+)\s+(\w+)\s+(ago|from now)$/i;

// Shorthand: "-7m", "+7d", "now-7m", "now+7d/d"
const SHORTHAND_REGEX = /^(now)?([+-])(\d+)([smhdwMy])(\/[smhdwMy])?$/i;

/**
 * Determines the type of a date string
 */
function getDateType(value: string): DateType {
  if (value === 'now') return NOW;
  if (value.includes('now')) return RELATIVE;
  return ABSOLUTE;
}

/**
 * Parses a single date point (not a range) to a date math string
 * Returns null if parsing fails
 */
function parseSinglePoint(text: string): string | null {
  const trimmed = text.trim().toLowerCase();

  // "now"
  if (trimmed === 'now') {
    return 'now';
  }

  // Shorthand: "-7m", "+7d", "now-7m/d"
  const shorthandMatch = text.match(SHORTHAND_REGEX);
  if (shorthandMatch) {
    const [, , operator, count, unit, round = ''] = shorthandMatch;
    return `now${operator}${count}${unit}${round}`;
  }

  // Natural point: "7 minutes ago" -> now-7m
  const pointMatch = trimmed.match(NATURAL_POINT_REGEX);
  if (pointMatch) {
    const [, count, unitWord, direction] = pointMatch;
    const unit = UNIT_MAP[unitWord.toLowerCase()];
    if (unit) {
      const operator = direction === 'ago' ? '-' : '+';
      return `now${operator}${count}${unit}`;
    }
  }

  // Try parsing as absolute date (ISO, RFC 2822, etc.)
  const parsed = dateMath.parse(text);
  if (parsed?.isValid()) {
    return text; // Return original, it's valid
  }

  return null;
}

/**
 * Parses natural language duration like "last 7 minutes" or "next 7 days"
 * Returns start and end date math strings
 */
function parseNaturalDuration(
  text: string
): { start: string; end: string } | null {
  const trimmed = text.trim().toLowerCase();

  // Check named ranges first
  if (NAMED_RANGES[trimmed]) {
    return NAMED_RANGES[trimmed];
  }

  // "last 7 minutes" or "next 7 days"
  const match = trimmed.match(NATURAL_DURATION_REGEX);
  if (match) {
    const [, direction, count, unitWord] = match;
    const unit = UNIT_MAP[unitWord.toLowerCase()];
    if (unit) {
      if (direction === 'last') {
        return { start: `now-${count}${unit}`, end: 'now' };
      } else {
        return { start: 'now', end: `now+${count}${unit}` };
      }
    }
  }

  return null;
}

/**
 * Validates that start date is before end date and type is not [NOW, NOW]
 */
function isValidRange(
  startDate: Date | null,
  endDate: Date | null,
  type: [DateType, DateType]
): boolean {
  // Both dates must be valid
  if (startDate === null || endDate === null) {
    return false;
  }

  // [NOW, NOW] is not a valid range (zero duration)
  if (type[0] === NOW && type[1] === NOW) {
    return false;
  }

  // Start must be before or equal to end
  return startDate.getTime() <= endDate.getTime();
}

interface ParseTextRangeOptions {
  presets?: Preset[];
  delimiter?: string;
  dateFormat?: string;
}

/**
 * Main parsing function for text range input
 */
export function parseTextRange(
  text: string,
  options?: ParseTextRangeOptions
): ParsedRange {
  const trimmed = text.trim();
  const { presets = [], delimiter = ' to ' } = options ?? {};

  const invalidResult: ParsedRange = {
    value: text,
    start: '',
    end: '',
    startDate: null,
    endDate: null,
    type: [ABSOLUTE, ABSOLUTE],
    isNaturalLanguage: false,
    isValid: false,
  };

  if (!trimmed) {
    return invalidResult;
  }

  // 1. Check if text matches a preset label (case insensitive)
  const matchedPreset = presets.find(
    (p) => p.label.toLowerCase() === trimmed.toLowerCase()
  );
  if (matchedPreset) {
    const startDate = dateMath.parse(matchedPreset.start)?.toDate() ?? null;
    const endDate =
      dateMath.parse(matchedPreset.end, { roundUp: true })?.toDate() ?? null;
    const type: [DateType, DateType] = [
      getDateType(matchedPreset.start),
      getDateType(matchedPreset.end),
    ];
    return {
      value: text,
      start: matchedPreset.start,
      end: matchedPreset.end,
      startDate,
      endDate,
      type,
      isNaturalLanguage: true,
      isValid: isValidRange(startDate, endDate, type),
    };
  }

  // 2. Check if it's a single value (no separator)
  if (!trimmed.includes(delimiter)) {
    // Try natural duration: "last 7 minutes", "today", etc.
    const naturalDuration = parseNaturalDuration(trimmed);
    if (naturalDuration) {
      const startDate = dateMath.parse(naturalDuration.start)?.toDate() ?? null;
      const endDate =
        dateMath.parse(naturalDuration.end, { roundUp: true })?.toDate() ??
        null;
      const type: [DateType, DateType] = [
        getDateType(naturalDuration.start),
        getDateType(naturalDuration.end),
      ];
      return {
        value: text,
        start: naturalDuration.start,
        end: naturalDuration.end,
        startDate,
        endDate,
        type,
        isNaturalLanguage: true,
        isValid: isValidRange(startDate, endDate, type),
      };
    }

    // Try as a single point (treat as start, with end = now)
    const singlePoint = parseSinglePoint(trimmed);
    if (singlePoint) {
      // future shorthand exception (start = now)
      if (SHORTHAND_REGEX.test(singlePoint) && singlePoint.startsWith('now+')) {
        const startDate = new Date(); // now
        const endDate = dateMath.parse(singlePoint)?.toDate() ?? null;
        const type: [DateType, DateType] = [NOW, getDateType(singlePoint)];
        return {
          value: text,
          start: 'now',
          end: singlePoint,
          startDate,
          endDate,
          type,
          isNaturalLanguage: false,
          isValid: isValidRange(startDate, endDate, type),
        };
      }
      const startDate = dateMath.parse(singlePoint)?.toDate() ?? null;
      const endDate = new Date(); // now
      const type: [DateType, DateType] = [getDateType(singlePoint), NOW];
      return {
        value: text,
        start: singlePoint,
        end: 'now',
        startDate,
        endDate,
        type,
        isNaturalLanguage: false,
        isValid: isValidRange(startDate, endDate, type),
      };
    }

    return invalidResult;
  }

  // 3. Parse as a range with separator
  const [startText, endText] = trimmed.split(delimiter);

  if (!startText || !endText) {
    return invalidResult;
  }

  const start = parseSinglePoint(startText.trim());
  const end = parseSinglePoint(endText.trim());

  if (!start || !end) {
    return invalidResult;
  }

  const startDate = dateMath.parse(start)?.toDate() ?? null;
  const endDate = dateMath.parse(end, { roundUp: true })?.toDate() ?? null;
  const type: [DateType, DateType] = [getDateType(start), getDateType(end)];

  return {
    value: text,
    start,
    end,
    startDate,
    endDate,
    type,
    isNaturalLanguage: false,
    isValid: isValidRange(startDate, endDate, type),
  };
}

interface RangeTextDisplayOptions {
  delimiter?: string;
  dateFormat?: string;
}

export function getRangeTextValue(
  parsedRange: ParsedRange,
  options?: RangeTextDisplayOptions
): string {
  const { delimiter = ' → ', dateFormat = DEFAULT_FORMAT } = options ?? {};

  if (!parsedRange.isValid) {
    return parsedRange.value;
  }
  if (parsedRange.isNaturalLanguage) {
    // capitalize
    const value = parsedRange.value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  let startDateFormat = dateFormat;
  let endDateFormat = dateFormat;

  // Abbreviate absolute dates a little when using default format
  if (parsedRange.type.includes(ABSOLUTE) && dateFormat === DEFAULT_FORMAT) {
    const currentYear = new Date().getFullYear();
    const startYear = parsedRange.startDate?.getFullYear();
    const endYear = parsedRange.endDate?.getFullYear();
    const startIsNow = parsedRange.type[0] === NOW;
    const endIsNow = parsedRange.type[1] === NOW;

    // Hide year if both dates are in the current year, or one part is "now"
    const startInCurrentYear = startIsNow || startYear === currentYear;
    const endInCurrentYear = endIsNow || endYear === currentYear;
    if (startInCurrentYear && endInCurrentYear) {
      startDateFormat = FORMAT_NO_YEAR;
      endDateFormat = FORMAT_NO_YEAR;
    }

    // Show only time for end date if both dates are on the same day
    if (
      parsedRange.startDate &&
      parsedRange.endDate &&
      parsedRange.startDate.toDateString() ===
        parsedRange.endDate.toDateString()
    ) {
      endDateFormat = FORMAT_TIME_ONLY;
    }
  }

  const startDisplay = formatDatePoint(
    parsedRange.start,
    parsedRange.startDate,
    startDateFormat
  );
  const endDisplay = formatDatePoint(
    parsedRange.end,
    parsedRange.endDate,
    endDateFormat
  );

  return `${startDisplay}${delimiter}${endDisplay}`;
}

/**
 * Formats a single date point for display
 * Converts date math to natural language where possible
 */
function formatDatePoint(
  dateString: string,
  date: Date | null,
  dateFormat: string
): string {
  // "now" stays as "now"
  if (dateString === 'now') {
    return 'now';
  }

  // Try to parse as relative date math: now-7m, now+3d, etc.
  const relativeParts = parseRelativeDateMath(dateString);
  if (relativeParts) {
    return formatRelativeTime(
      relativeParts.count,
      relativeParts.unit,
      relativeParts.isFuture
    );
  }

  // For absolute dates, format using the date object
  if (date) {
    return formatAbsoluteDate(date, dateFormat);
  }

  // Fallback: return original string
  return dateString;
}

/**
 * Parses date math like "now-7m" or "now+3d/d" into parts
 */
function parseRelativeDateMath(
  value: string
): { count: number; unit: string; isFuture: boolean; round?: string } | null {
  const match = value.match(/^now([+-])(\d+)([smhdwMy])(\/[smhdwMy])?$/);
  if (!match) {
    return null;
  }

  const [, operator, count, unit, round] = match;
  return {
    count: parseInt(count, 10),
    unit,
    isFuture: operator === '+',
    round: round?.slice(1), // Remove the leading "/"
  };
}

/**
 * Formats relative time as natural language
 * e.g., (7, 'm', false) => "7 minutes ago"
 * e.g., (3, 'd', true) => "3 days from now"
 */
function formatRelativeTime(
  count: number,
  unit: string,
  isFuture: boolean
): string {
  const unitName = UNIT_NAMES[unit] || unit;
  const plural = count === 1 ? '' : 's';
  const direction = isFuture ? 'from now' : 'ago';

  return `${count} ${unitName}${plural} ${direction}`;
}

/**
 * @todo replace with moment or simliar
 */
function formatAbsoluteDate(
  date: Date,
  dateFormat: string = DEFAULT_FORMAT
): string {
  return moment(date).format(dateFormat);
}

// DURATION LOGIC

const UNIT_ABBREV: Record<string, string> = {
  years: 'y',
  months: 'mos',
  weeks: 'w',
  days: 'd',
  hours: 'h',
  minutes: 'min',
  seconds: 's',
  milliseconds: 'ms',
  // nanoseconds: 'ns',
};

const MS_PER = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
  week: 1000 * 60 * 60 * 24 * 7,
  month: 1000 * 60 * 60 * 24 * 30,
  year: 1000 * 60 * 60 * 24 * 365,
} as const;

// TODO "exactness" could be adjusted and improved
// e.g. currently 10 days == ~1w and 11 days == ~2w
export function getDurationText(startDate: Date, endDate: Date): string {
  const diff = Math.abs(endDate.getTime() - startDate.getTime());

  const format = (value: number, unit: number, abbrev: string): string => {
    const rounded = Math.round(value / unit);
    const isExact = value % unit === 0;
    return `${isExact ? '' : '~'}${rounded}${abbrev}`;
  };

  if (diff >= MS_PER.year) {
    return format(diff, MS_PER.year, UNIT_ABBREV.years);
  }
  if (diff >= MS_PER.month) {
    return format(diff, MS_PER.month, UNIT_ABBREV.months);
  }
  if (diff >= MS_PER.week) {
    return format(diff, MS_PER.week, UNIT_ABBREV.weeks);
  }
  if (diff >= MS_PER.day) {
    return format(diff, MS_PER.day, UNIT_ABBREV.days);
  }
  if (diff >= MS_PER.hour) {
    return format(diff, MS_PER.hour, UNIT_ABBREV.hours);
  }
  if (diff >= MS_PER.minute) {
    return format(diff, MS_PER.minute, UNIT_ABBREV.minutes);
  }
  if (diff >= MS_PER.second) {
    return format(diff, MS_PER.second, UNIT_ABBREV.seconds);
  }

  return `${Math.round(diff)}${UNIT_ABBREV.milliseconds}`;
}

// PLACEHOLDER

// poc-style of what we want: showing a different one each time to educate users
// would be nice to make it more random, using combinations and not a static list

const PLACEHOLDER_EXAMPLES = [
  'Last 15 minutes',
  'Last 2 hours',
  'Last 7 days',
  'Last 2 weeks',
  'Last 30 days',
  'Next 24 hours',
  '-15m',
  '-2h',
  '-7d',
  '-2w',
  '-30d',
  'now to +24h',
  'Today',
  'Yesterday',
  '-7d to now',
  '-1M to -1w',
];

/**
 * Returns a randomized placeholder that changes whenever the dependency changes.
 * @param dependency
 */
export function useRandomizedPlaceholder(dependency: unknown) {
  const [placeholder, setPlaceholder] = useState(() => getRandomPlaceholder());

  useEffect(() => {
    setPlaceholder(getRandomPlaceholder());
  }, [dependency]);

  return placeholder;
}

function getRandomPlaceholder() {
  const index = Math.floor(Math.random() * PLACEHOLDER_EXAMPLES.length);
  return PLACEHOLDER_EXAMPLES[index];
}

// TEXT SELECTION WITH ARROW KEYS

// Matches text parts separated by spaces, commas, or colons
// e.g. "Dec 29, 14:30 to now" => ["Dec", "29", "14", "30", "to", "now"]
const TEXT_PARTS_REGEX = /[^\s,:]+/g;

interface TextPart {
  text: string;
  start: number;
  end: number;
}

/**
 * Splits a string into parts and returns each part with its position indices
 * @param value - The string to split
 * @returns Array of parts with their text and start/end positions
 */
function getTextParts(value: string) {
  const parts: TextPart[] = [];
  let match: RegExpExecArray | null;
  // Reset regex state
  TEXT_PARTS_REGEX.lastIndex = 0;

  while ((match = TEXT_PARTS_REGEX.exec(value)) !== null) {
    parts.push({
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  return parts;
}

// TODO this could be abstracted AND also take callbacks somehow for custom actions or even preventing them
export function useSelectTextPartsWithArrowKeys(
  input: RefObject<HTMLInputElement>,
  setText: (text: string) => void
) {
  useEffect(() => {
    let currentIndex = -1; // -1 means no part is selected (caret mode)

    const getPartsAndSyncIndex = () => {
      const inputEl = input.current;
      if (!inputEl) return [];

      const parts = getTextParts(inputEl.value);
      const matchingPartIndex = parts.findIndex(
        (part) =>
          part.start === inputEl.selectionStart &&
          part.end === inputEl.selectionEnd
      );
      currentIndex = matchingPartIndex; // -1 if selection doesn't match any part

      return parts;
    };

    const selectPart = (index: number, parts: TextPart[]) => {
      const inputEl = input.current;
      if (!inputEl) return;

      // If navigating past the ends, go to caret mode
      if (index < 0) {
        currentIndex = -1;
        inputEl.setSelectionRange(0, 0);
        return;
      }
      if (index >= parts.length) {
        currentIndex = -1;
        inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
        return;
      }

      currentIndex = index;
      const part = parts[currentIndex];

      inputEl.focus();
      inputEl.setSelectionRange(part.start, part.end);
    };

    // only numbers for now
    // TODO would be nice for shorthands and units
    const modifyPart = (action: 'increase' | 'decrease') => {
      const inputEl = input.current!;
      const parts = getPartsAndSyncIndex();

      if (currentIndex < 0 || currentIndex >= parts.length) return;

      const part = parts[currentIndex];
      // VERY ROUGH! regex would be better
      const value = parseInt(part.text, 10);
      if (!isNaN(value)) {
        const nextValue = action === 'increase' ? value + 1 : value - 1;
        inputEl.setRangeText(String(nextValue), part.start, part.end, 'select');
        setText(inputEl.value!);
        requestAnimationFrame(() => {
          const updatedParts = getTextParts(inputEl.value);
          selectPart(currentIndex, updatedParts);
        });
      }
    };

    const keydownHandler = (event: KeyboardEvent) => {
      // Skip if modifier keys are pressed
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const inputEl = input.current;
      if (!inputEl) return;

      if (event.key.startsWith('Arrow')) {
        // Always refresh parts and sync index on arrow key press
        const parts = getPartsAndSyncIndex();

        if (parts.length === 0) return;

        event.preventDefault();

        switch (event.key) {
          case 'ArrowRight':
            // If in caret mode, select the first part to the right of caret
            if (currentIndex === -1) {
              const caretPos = inputEl.selectionStart ?? 0;
              const nextPartIndex = parts.findIndex(
                (part) => part.start >= caretPos
              );
              selectPart(
                nextPartIndex !== -1 ? nextPartIndex : parts.length,
                parts
              );
            } else {
              selectPart(currentIndex + 1, parts);
            }
            return;
          case 'ArrowLeft':
            // If in caret mode, select the first part to the left of caret
            if (currentIndex === -1) {
              const caretPos = inputEl.selectionStart ?? 0;
              const prevPartIndex = parts.findLastIndex(
                (part) => part.end <= caretPos
              );
              selectPart(prevPartIndex, parts);
            } else {
              selectPart(currentIndex - 1, parts);
            }
            return;
          case 'ArrowUp':
            modifyPart('increase');
            return;
          case 'ArrowDown':
            modifyPart('decrease');
            return;
        }
      }
    };

    input.current?.addEventListener('keydown', keydownHandler);

    if (input.current) {
      const parts = getTextParts(input.current.value);
      // Select the first part initially
      if (parts.length > 0) selectPart(0, parts);
    }

    return () => {
      input.current?.removeEventListener('keydown', keydownHandler);
    };
  }, [input.current]);
}
