/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiSelectableProps } from '../../../selectable';

export interface MentionsParserConfig {
  options: EuiSelectableProps['options'];
}

export interface MentionsNodeDetails {
  type: 'mentionsPlugin';
  config: MentionsParserConfig;
  mention: string;
}
