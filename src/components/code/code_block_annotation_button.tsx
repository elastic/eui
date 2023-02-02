/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { useEuiTheme } from '../../services';
import { euiCodeBlockAnnotationButtonStyles } from './code_block_annotation_button.styles';
import { EuiButtonIcon, EuiButtonIconProps } from '../button';

export type EuiCodeBlockAnnotationButtonProps = Omit<
  EuiButtonIconProps,
  'iconType'
>;

export const EuiCodeBlockAnnotationButton: FunctionComponent<EuiCodeBlockAnnotationButtonProps> = ({
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiCodeBlockAnnotationButtonStyles(euiTheme);
  const cssStyles = [styles.euiCodeBlock__annotationButton];

  return (
    <EuiButtonIcon
      type="button"
      className="euiCodeBlock__annotationButton"
      css={cssStyles}
      aria-label="Open annotation popover"
      title="Open annotation popover"
      iconType="info"
      display="fill"
      iconSize="s"
      {...rest}
    />
  );
};
