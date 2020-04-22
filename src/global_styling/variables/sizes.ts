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

const euiSize = 16;

const sizeScale = {
  euiSizeXS: euiSize * 0.25,
  euiSizeS: euiSize * 0.5,
  euiSizeM: euiSize * 0.75,
  euiSizeL: euiSize * 1.5,
  euiSizeXL: euiSize * 2,
  euiSizeXXL: euiSize * 2.5,
};

const euiButtonMinWidth = euiSize * 7;

const euiScrollBar = euiSize;
const euiScrollBarCorner = sizeScale.euiSizeS * 0.75;

const sizes = {
  euiSize,
  ...sizeScale,
  euiButtonMinWidth,
  euiScrollBar,
  euiScrollBarCorner,
};

export default sizes;
export { sizes, euiSize };
