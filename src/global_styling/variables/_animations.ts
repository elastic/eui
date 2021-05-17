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

import { CSSProperties } from 'react';

export interface _EuiThemeAnimationSpeed {
  extraFast: CSSProperties['animationDuration'];
  fast: CSSProperties['animationDuration'];
  normal: CSSProperties['animationDuration'];
  slow: CSSProperties['animationDuration'];
  extraSlow: CSSProperties['animationDuration'];
}
export interface _EuiThemeAnimationEasing {
  bounce: CSSProperties['animationTimingFunction'];
  resistance: CSSProperties['animationTimingFunction'];
}

export type EuiThemeAnimation = _EuiThemeAnimationEasing &
  _EuiThemeAnimationSpeed;

export const animation_speed: _EuiThemeAnimationSpeed = {
  extraFast: '90ms',
  fast: '150ms',
  normal: '250ms',
  slow: '350ms',
  extraSlow: '500ms',
};

export const animation_ease: _EuiThemeAnimationEasing = {
  bounce: 'cubic-bezier(.34, 1.61, .7, 1)',
  resistance: 'cubic-bezier(.694, .0482, .335, 1)',
};

export const animation: EuiThemeAnimation = {
  ...animation_speed,
  ...animation_ease,
};
