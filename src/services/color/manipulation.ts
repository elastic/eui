/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

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

/**
 * Makes a color more transparent.
 * @param color - Color to manipulate
 * @param alpha - alpha channel value. From 0-1.
 */
export const transparentize = (color: string, alpha: number) =>
  chroma(color).alpha(alpha).css();

/**
 * Mixes a provided color with white.
 * @param color - Color to mix with white
 * @param ratio - Mix weight. From 0-1. Larger value indicates more white.
 */
export const tint = (color: string, ratio: number) =>
  chroma.mix(color, '#fff', ratio, 'rgb').hex();

/**
 * Mixes a provided color with black.
 * @param color - Color to mix with black
 * @param ratio - Mix weight. From 0-1. Larger value indicates more black.
 */
export const shade = (color: string, ratio: number) =>
  chroma.mix(color, '#000', ratio, 'rgb').hex();

/**
 * Increases the saturation of a color by manipulating the hsl saturation.
 * @param color - Color to manipulate
 * @param amount - Amount to change in absolute terms. 0-1.
 */
export const saturate = (color: string, amount: number) =>
  chroma(color).set('hsl.s', `+${amount}`).css();

/**
 * Decreases the saturation of a color by manipulating the hsl saturation.
 * @param color - Color to manipulate
 * @param amount - Amount to change in absolute terms. 0-1.
 */
export const desaturate = (color: string, amount: number) =>
  chroma(color).set('hsl.s', `-${amount}`).css();

/**
 * Returns the lightness value of a color. 0-100
 * @param color
 */
export const lightness = (color: string) => chroma(color).get('hsl.l') * 100;
