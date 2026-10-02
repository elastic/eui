/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// This file only exists for react-docgen-typescript (used by both the website
// and Storybook), which cannot extract prop descriptions from plain TypeScript
// interfaces. NOTE: This file should *NOT* be exported publicly.
// @see packages/eui-docgen

import React, { FunctionComponent } from 'react';
import { EuiFlyoutMenuAction as EuiFlyoutMenuActionType } from './types';

export const EuiFlyoutMenuAction: FunctionComponent<
  EuiFlyoutMenuActionType
> = () => <></>;
