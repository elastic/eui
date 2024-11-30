/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { CommonProps } from '../common';

import { useEuiTheme } from '../../services';
import { euiModalHeaderStyles } from './modal_header.styles';

import { EuiButtonIcon } from '../button';
import { EuiI18n } from '../i18n';
export type EuiModalHeaderProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> &
    CommonProps & {
      onClose: (
        event?:
          | React.KeyboardEvent<HTMLDivElement>
          | React.MouseEvent<HTMLButtonElement>
      ) => void;
    }
>;

export const EuiModalHeader: EuiModalHeaderProps = ({
  className,
  children,
  onClose,
  ...rest
}) => {
  const classes = classnames('euiModalHeader', className);

  const euiTheme = useEuiTheme();
  const styles = euiModalHeaderStyles(euiTheme);
  const cssStyles = [styles.euiModalHeader];
  const cssCloseIconStyles = [styles.euiModal__closeIcon];

  return (
    <div css={cssStyles} className={classes} {...rest}>
      {children}
      <EuiI18n
        token="euiModalHeader.closeModal"
        default="Closes this modal window"
      >
        {(closeModal: string) => (
          <EuiButtonIcon
            iconType="cross"
            css={cssCloseIconStyles}
            className="euiModal__closeIcon"
            color="text"
            onClick={onClose}
            aria-label={closeModal}
          />
        )}
      </EuiI18n>
    </div>
  );
};
