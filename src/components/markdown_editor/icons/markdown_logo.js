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

import React from 'react';

const MarkdownLogo = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="16"
    fill="none"
    viewBox="0 0 26 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M1.25 1.875c0-.345.28-.625.625-.625h22.25c.345 0 .625.28.625.625v12.25c0 .345-.28.625-.625.625H1.875a.625.625 0 01-.625-.625V1.875zM1.875 0C.839 0 0 .84 0 1.875v12.25C0 15.161.84 16 1.875 16h22.25C25.16 16 26 15.16 26 14.125V1.875C26 .839 25.16 0 24.125 0H1.875zM3.75 3.75v8.5h2.5V7.375l2.5 3.125 2.5-3.125v4.875h2.5v-8.5h-2.5l-2.5 3.125-2.5-3.125h-2.5zm11.875 4.375l3.75 4.125 3.75-4.125h-2.5V3.75h-2.5v4.375h-2.5z" />
  </svg>
);

export default MarkdownLogo;
