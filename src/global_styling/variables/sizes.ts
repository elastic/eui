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

// The actual number for the scale
const euiBaseSize = 16;

// Does the scale calculation, then appends the `px` value
const euiSize = (scale?: number) => `${euiBaseSize * (scale || 1)}px`;

// The calculated scales, only `euiSize` is a function
const sizes = {
  euiSize0: '0', // Could be better, but easiest way to handle instances where we want none/0
  euiSizeXS: euiSize(0.25),
  euiSizeS: euiSize(0.5),
  euiSizeM: euiSize(0.75),
  euiSize: euiSize(),
  euiSizeL: euiSize(1.5),
  euiSizeXL: euiSize(2),
  euiSizeXXL: euiSize(2.5),
};

export default sizes;
export { sizes, euiSize, euiBaseSize };
