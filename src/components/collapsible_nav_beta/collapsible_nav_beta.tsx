/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { useEuiTheme } from '../../services';

import {
  EuiCollapsibleNav,
  EuiCollapsibleNavProps,
} from '../collapsible_nav/collapsible_nav';

import { euiCollapsibleNavBetaStyles } from './collapsible_nav_beta.styles';

/**
 * TODO: Actual component in a follow-up PR
 */
export const EuiCollapsibleNavBeta = (props: EuiCollapsibleNavProps) => {
  const euiTheme = useEuiTheme();
  const styles = euiCollapsibleNavBetaStyles(euiTheme);

  return (
    <EuiCollapsibleNav
      css={styles.euiCollapsibleNavBeta}
      size={248}
      {...props}
    />
  );
};
