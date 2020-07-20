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

import { HSV, RGB } from './color_types';

export function hsvToRgb({ h, s, v }: HSV): RGB {
  h /= 60;

  const fn = (n: number) => {
    const k = (n + h) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  };

  const r = fn(5);
  const g = fn(3);
  const b = fn(1);

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}
