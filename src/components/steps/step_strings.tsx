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

type Props = { number?: number; title?: string };

export const useI18nStep = ({ number, title }: Props): string => {
  const string = useEuiI18n('euiStepStrings.step', 'Step {number}: {title}', {
    number,
    title,
  });

  const simpleString = useEuiI18n(
    'euiStepStrings.simpleStep',
    'Step {number}',
    { number }
  );

  return title ? string : simpleString;
};

export const useI18nCompleteStep = ({ number, title }: Props): string => {
  const string = useEuiI18n(
    'euiStepStrings.complete',
    'Step {number}: {title} is complete',
    {
      number,
      title,
    }
  );

  const simpleString = useEuiI18n(
    'euiStepStrings.simpleComplete',
    'Step {number} is complete',
    { number }
  );

  return title ? string : simpleString;
};

export const useI18nWarningStep = ({ number, title }: Props): string => {
  const string = useEuiI18n(
    'euiStepStrings.warning',
    'Step {number}: {title} has warnings',
    {
      number,
      title,
    }
  );

  const simpleString = useEuiI18n(
    'euiStepStrings.simpleWarning',
    'Step {number} has warnings',
    { number }
  );

  return title ? string : simpleString;
};

export const useI18nErrorsStep = ({ number, title }: Props): string => {
  const string = useEuiI18n(
    'euiStepStrings.errors',
    'Step {number}: {title} has errors',
    {
      number,
      title,
    }
  );

  const simpleString = useEuiI18n(
    'euiStepStrings.simpleErrors',
    'Step {number} has errors',
    { number }
  );

  return title ? string : simpleString;
};

export const useI18nIncompleteStep = ({ number, title }: Props): string => {
  const string = useEuiI18n(
    'euiStepStrings.incomplete',
    'Step {number}: {title} is incomplete',
    {
      number,
      title,
    }
  );

  const simpleString = useEuiI18n(
    'euiStepStrings.simpleIncomplete',
    'Step {number} is incomplete',
    { number }
  );

  return title ? string : simpleString;
};

export const useI18nDisabledStep = ({ number, title }: Props): string => {
  const string = useEuiI18n(
    'euiStepStrings.disabled',
    'Step {number}: {title} is disabled',
    {
      number,
      title,
    }
  );

  const simpleString = useEuiI18n(
    'euiStepStrings.simpleDisabled',
    'Step {number} is disabled',
    { number }
  );

  return title ? string : simpleString;
};

export const useI18nLoadingStep = ({ number, title }: Props): string => {
  const string = useEuiI18n(
    'euiStepStrings.loading',
    'Step {number}: {title} is loading',
    {
      number,
      title,
    }
  );

  const simpleString = useEuiI18n(
    'euiStepStrings.simpleLoading',
    'Step {number} is loading',
    { number }
  );

  return title ? string : simpleString;
};
