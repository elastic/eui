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

// --------------------------------------------------------------------------------------
// EUI global variables
// --------------------------------------------------------------------------------------
// This module contains all global variables available within EUI. Every variable in this
// document should be prefixed with $eui. This lets us know where the variable is
// coming from when looking inside the individual component files. Any component local
// variables should be declared at the top of those documents prefixed with $componentName.

// Import order is important. Size and color..etc are used in other variables.
export { sizes } from './sizes';
// import colors from './colors';
// export {} from './animations';
export { typography } from './typography';
export { createBorders } from './borders';
// export {} from './shadows';
// export {} from './states';
// export {} from './z_index';
//
// export {} from './buttons';
// export {} from './form';
// export {} from './panel';
// export {} from './tool_tip';
