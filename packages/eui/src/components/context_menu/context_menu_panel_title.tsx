/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode, FunctionComponent, Ref } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps, NoArgCallback } from '../common';
import { EuiButtonIcon, EuiButtonIconProps } from '../button';
import { useEuiI18n } from '../i18n';
import { euiContextMenuPanelTitleStyles } from './context_menu_panel_title.styles';

export type EuiContextMenuPanelTitleProps = CommonProps & {
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  id?: string;
  title?: ReactNode;
  buttonRef?: Ref<HTMLButtonElement>;
  buttonProps?: EuiButtonIconProps;
  onClose?: NoArgCallback<void>;
};

export const EuiContextMenuPanelTitle: FunctionComponent<
  EuiContextMenuPanelTitleProps
> = (props) => {
  const {
    component: Component = 'h2',
    id,
    title,
    buttonRef,
    className,
    onClose,
    buttonProps,
    ...rest
  } = props;
  const classes = classNames('euiContextMenuPanelTitle', className);
  const styles = useEuiMemoizedStyles(euiContextMenuPanelTitleStyles);

  const closeButtonId = `${id}-closeButton`;
  const buttonAriaLabel = useEuiI18n(
    'euiContextMenuPanelTitle.ariaLabel',
    'Close current panel:'
  );

  return (
    <div
      className={classes}
      css={styles.euiContextMenuPanelTitle}
      data-test-subj="contextMenuPanelTitle"
      {...rest}
    >
      {onClose && (
        <>
          <EuiButtonIcon
            buttonRef={buttonRef}
            color="text"
            iconType="chevronSingleLeft"
            onClick={onClose}
            data-test-subj="contextMenuPanelTitleButton"
            id={closeButtonId}
            aria-label={buttonAriaLabel}
            // Uses aria-labelledby to combine aria-label with the panel title for screen readers.
            aria-labelledby={`${closeButtonId} ${id}`}
            {...buttonProps}
          />
        </>
      )}
      <Component
        className="euiContextMenuPanelTitle__text"
        css={styles.text}
        id={id}
      >
        {title}
      </Component>
    </div>
  );
};
