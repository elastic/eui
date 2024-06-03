/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';

import { useEuiTheme } from '../../../services';
import { EuiI18n } from '../../i18n';
import { EuiText } from '../../text';
import { EuiLoadingSpinner } from '../../loading';

import { EuiAccordionProps } from '../accordion';

type _EuiAccordionChildrenLoadingProps = Pick<
  EuiAccordionProps,
  'isLoadingMessage'
>;

export const EuiAccordionChildrenLoading: FunctionComponent<
  _EuiAccordionChildrenLoadingProps
> = ({ isLoadingMessage }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <>
      <EuiLoadingSpinner
        className="euiAccordion__spinner"
        css={{ marginInlineEnd: euiTheme.size.xs }}
      />
      <EuiText size="s">
        <p>
          {isLoadingMessage !== true ? (
            isLoadingMessage
          ) : (
            <EuiI18n
              token="euiAccordionChildrenLoading.message"
              default="Loading"
            />
          )}
        </p>
      </EuiText>
    </>
  );
};
