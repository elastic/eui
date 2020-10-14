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

import { useEuiI18n } from '../i18n';

export const useI18nStep = (number?: number) =>
  useEuiI18n('euiStepStrings.step', 'Step {number}', { number });

export const useI18nCompleteStep = (number?: number) =>
  useEuiI18n('euiStepStrings.complete', 'Step {number} is complete', {
    number,
  });

export const useI18nWarningStep = (number?: number) =>
  useEuiI18n('euiStepStrings.warning', 'Step {number} has warnings', {
    number,
  });

export const useI18nErrorsStep = (number?: number) =>
  useEuiI18n('euiStepStrings.errors', 'Step {number} has errors', {
    number,
  });

export const useI18nIncompleteStep = (number?: number) =>
  useEuiI18n('euiStepStrings.incomplete', 'Step {number} is incomplete', {
    number,
  });

export const useI18nDisabledStep = (number?: number) =>
  useEuiI18n('euiStepStrings.disabled', 'Step {number} is disabled', {
    number,
  });
