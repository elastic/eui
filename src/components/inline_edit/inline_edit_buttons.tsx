/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
import { EuiButtonIcon } from '../button';
import { EuiFormRow } from '../form';
import { EuiTextProps } from '../text';
import { EuiTitleSize } from '../title';
import { EuiFlexItem } from '../flex';
import { useEuiI18n } from '../i18n';
import { getInlineEditIconButtonSettings } from './inline_edit_utils';

export type EuiInlineEditButtonsProps = CommonProps & {
  size?: EuiTextProps['size'] | EuiTitleSize;
  saveButtonAriaLabel?: string;
  cancelButtonAriaLabel?: string;
  saveFunction: Function;
  cancelFunction: Function;
};

export const EuiInlineEditButtons: FunctionComponent<EuiInlineEditButtonsProps> = ({
  className,
  size = 'm',
  saveButtonAriaLabel,
  cancelButtonAriaLabel,
  saveFunction,
  cancelFunction,
}) => {
  const classes = classNames('euiInlineEditButtons', className);

  const defaultSaveButtonAriaLabel = useEuiI18n(
    'euiInlineEditButtons.saveButtonAriaLabel',
    'Save edit'
  );

  const defaultCancelButtonAriaLabel = useEuiI18n(
    'euiInlineEditButtons.cancelButtonAriaLabel',
    'Cancel edit'
  );

  const buttonSettings = getInlineEditIconButtonSettings(size);

  return (
    <>
      <EuiFlexItem grow={false} className={classes}>
        <EuiFormRow>
          <EuiButtonIcon
            iconType="check"
            aria-label={saveButtonAriaLabel || defaultSaveButtonAriaLabel}
            onClick={() => saveFunction()}
            color="success"
            display="base"
            size={buttonSettings.compressed ? 's' : 'm'}
            iconSize={buttonSettings.iconSize}
          />
        </EuiFormRow>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiFormRow>
          <EuiButtonIcon
            iconType="cross"
            aria-label={cancelButtonAriaLabel || defaultCancelButtonAriaLabel}
            onClick={() => cancelFunction()}
            color="danger"
            display="base"
            size={buttonSettings.compressed ? 's' : 'm'}
            iconSize={buttonSettings.iconSize}
          />
        </EuiFormRow>
      </EuiFlexItem>
    </>
  );
};
