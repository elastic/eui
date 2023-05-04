/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// Components that should render as <EuiComponent /> only, with no children
// Their content is either too complex to attempt to render
// or irrelevant/completely controlled by EUI
export const COMPONENTS_EMPTY = [
  'EuiDataGrid',
  'EuiInMemoryTable',
  'EuiBasicTable',
  'EuiSpacer',
  'EuiHorizontalRule',
];

// Components that should render with their text content only
export const COMPONENTS_TEXT = ['EuiButton', 'EuiBadge'];

// Components that should attempt to snapshot all HTML content within them
// as their content is likely important / custom to the consumer
export const COMPONENTS_HTML = [
  'EuiPageTemplate',
  'EuiPageSection',
  'EuiPage',
  'EuiPanel',
  'EuiFlexGrid',
  'EuiFlexGroup',
  'EuiFlexItem',
  'EuiText',
  'EuiTitle',
];
