/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { EuiEmptyPrompt, EuiEmptyPromptProps } from '../empty_prompt';
import { EuiPageSection, EuiPageSectionProps } from '../page/page_section';

export type _EuiPageEmptyPromptProps = Omit<
  EuiPageSectionProps,
  'title' | 'paddingSize' | 'bottomBorder'
> &
  Omit<EuiEmptyPromptProps, 'body'> & {
    panelled?: boolean;
  };

export const _EuiPageEmptyPrompt: FunctionComponent<_EuiPageEmptyPromptProps> = ({
  children,
  alignment = 'center',
  restrictWidth = false,
  paddingSize = 'l',
  grow = true,
  contentProps,
  panelled,
  color,
  ...rest
}) => {
  /**
   * If panelled = true, then either the section or empty prompt must be plain;
   * If color is anything but plain, then it must be the section that is plain;
   * If panelled = true, but color is undefined, then default to the empty prompt being plain;
   */

  let sectionColor: EuiPageSectionProps['color'];
  let emptyPromptColor: EuiEmptyPromptProps['color'];

  if (panelled && color === undefined) {
    sectionColor = 'transparent';
    emptyPromptColor = 'plain';
  } else if (panelled && color !== 'plain') {
    sectionColor = 'plain';
    emptyPromptColor = color || 'subdued';
  } else {
    sectionColor = panelled ? 'plain' : 'transparent';
    emptyPromptColor = color || 'subdued';
  }

  return (
    <EuiPageSection
      paddingSize="none"
      color={sectionColor}
      grow={grow}
      restrictWidth={restrictWidth}
      alignment={alignment}
    >
      <EuiEmptyPrompt
        paddingSize={paddingSize}
        color={emptyPromptColor}
        body={children}
        {...rest}
      />
    </EuiPageSection>
  );
};
