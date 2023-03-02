/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiButtonEmptyProps } from '../button';
import { EuiTextProps } from '../text';
import { EuiTitleSize } from '../title';

type InlineEditButtonSettings = {
  iconSize: EuiButtonEmptyProps['iconSize'];
  compressed: boolean;
};

/**
 *
 * @param size any value within EuiTextProps['size'] or EuiTitleSize
 * @returns returns the iconSize and compression combination to apply to buttons based on the text or title size provided.
 */
export const getInlineEditIconButtonSettings = (
  size: EuiTextProps['size'] | EuiTitleSize
) => {
  switch (size) {
    case 'xxxs':
    case 'xxs':
    case 'xs':
    case 's':
      return { iconSize: 's', compressed: true } as InlineEditButtonSettings;
    default:
      return { iconSize: 'm', compressed: false } as InlineEditButtonSettings;
  }
};
