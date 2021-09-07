/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { EuiText } from '../../text';
import { EuiCodeBlock } from '../../code';
import {
  EuiDataGridPopoverContents,
  EuiDataGridPopoverContent,
} from '../data_grid_types';

export const DefaultColumnFormatter: EuiDataGridPopoverContent = ({
  children,
}) => {
  return <EuiText>{children}</EuiText>;
};

export const providedPopoverContents: EuiDataGridPopoverContents = {
  json: ({ cellContentsElement }) => {
    let formattedText = cellContentsElement.innerText;

    // attempt to pretty-print the json
    try {
      formattedText = JSON.stringify(JSON.parse(formattedText), null, 2);
    } catch (e) {} // eslint-disable-line no-empty

    return (
      <EuiCodeBlock
        isCopyable
        transparentBackground
        paddingSize="none"
        language="json"
      >
        {formattedText}
      </EuiCodeBlock>
    );
  },
};
