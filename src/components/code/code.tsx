/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { CommonProps } from '../common';

import React, { FunctionComponent, HTMLAttributes } from 'react';

import { EuiCodeBlockImpl, EuiCodeBlockImplProps } from './_code_block';

export type EuiCodeProps = CommonProps &
  Pick<EuiCodeBlockImplProps, 'language' | 'transparentBackground'> &
  HTMLAttributes<HTMLElement>;

export const EuiCode: FunctionComponent<EuiCodeProps> = ({ ...rest }) => {
  return <EuiCodeBlockImpl inline={true} {...rest} />;
};
