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

import chroma from 'chroma-js';
// import { useEuiTheme } from '../../services';

// Mixes a provided color with white.
export const tint = (color: string, ratio: number) =>
  chroma.mix(color, '#fff', ratio).hex();

// Mixes a provided color with black.
export const shade = (color: string, ratio: number) =>
  chroma.mix(color, '#000', ratio).hex();

// TODO
export const makeHighContrastColor = (color: string) => color;
// TODO
export const makeDisabledContrastColor = (color: string) => color;

export const transparentize = (color: string, alpha: number) =>
  chroma(color).alpha(alpha).css();
