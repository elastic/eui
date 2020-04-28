/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
