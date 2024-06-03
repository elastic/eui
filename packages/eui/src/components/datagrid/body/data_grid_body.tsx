/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';

import { EuiDataGridBodyProps } from '../data_grid_types';
import { EuiDataGridBodyVirtualized } from './data_grid_body_virtualized';
import { EuiDataGridBodyCustomRender } from './data_grid_body_custom';

export const EuiDataGridBody: FunctionComponent<EuiDataGridBodyProps> = ({
  renderCustomGridBody,
  ...props
}) => {
  /*
   * Determine whether we should use the default EuiDataGridBody
   * + virtualization library for rendering content, or if consumers have
   * passed their own custom renderer
   */
  return renderCustomGridBody ? (
    <EuiDataGridBodyCustomRender
      renderCustomGridBody={renderCustomGridBody}
      {...props}
    />
  ) : (
    <EuiDataGridBodyVirtualized {...props} />
  );
};
