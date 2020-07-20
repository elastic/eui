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

export const isWithinRange = (
  min: number | string,
  max: number | string,
  value: number | string
) => {
  if (min === '' || max === '' || value === '') {
    return false;
  }

  const val = Number(value);
  return Number(min) <= val && val <= Number(max);
};

// 1e-6 covers up to 10,000,000,000 factored by a decimal
const EPSILON = 1e-6;
export function isEvenlyDivisibleBy(num: number, factor: number) {
  const remainder = num % factor;

  // due to floating point issues the remainder needs to be within a margin instead of exactly 0
  // 1 % 0.1          === 0.09999999999999995
  // 1000000000 % 0.1 === 0.09999994448884877
  // 1 % 0.05         === 0.04999999999999995

  // Compare the smaller of (remainder, factor - remainder) to EPSILON
  return (
    Math.min(
      remainder, // remainder may be smallest, it is 0 in the well-formed case
      Math.abs(factor - remainder) // otherwise the positive difference between factor and remainder
    ) < EPSILON
  );
}
