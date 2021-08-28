/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ReactElement } from 'react';

export interface DurationRange {
  end: ShortDate;
  label?: string;
  start: ShortDate;
}

export type TimeUnitId = 's' | 'm' | 'h' | 'd' | 'w' | 'M' | 'y';
export type TimeUnitFromNowId = 's+' | 'm+' | 'h+' | 'd+' | 'w+' | 'M+' | 'y+';
export type TimeUnitLabel =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year';
export type TimeUnitLabelPlural =
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years';
export type AbsoluteDateMode = 'absolute';
export type RelativeDateMode = 'relative';
export type NowDateMode = 'now';
export type DateMode = AbsoluteDateMode | RelativeDateMode | NowDateMode;

/**
 * String as either datemath (e.g.: now, now-15m, now-15m/m) or
 * absolute date in the format 'YYYY-MM-DDTHH:mm:ss.SSSZ'
 */
export type ShortDate = NowDateMode | string;

export type Milliseconds = number;

export interface RelativeParts {
  count: number;
  round: boolean;
  roundUnit?: TimeUnitId;
  unit: string;
}

export interface RelativeOption {
  text: string;
  value: TimeUnitId | TimeUnitFromNowId;
}

export type OnRefreshChangeProps = {
  isPaused: boolean;
  refreshInterval: number;
};

export type ApplyRefreshInterval = (args: OnRefreshChangeProps) => void;

export interface QuickSelect {
  timeTense: string;
  timeValue: number;
  timeUnits: TimeUnitId;
}

interface ApplyTimeArgs extends DurationRange {
  keepPopoverOpen?: boolean;
  quickSelect?: QuickSelect;
}
export type ApplyTime = (args: ApplyTimeArgs) => void;

export interface QuickSelectPanel {
  title: string;
  content: ReactElement;
}
