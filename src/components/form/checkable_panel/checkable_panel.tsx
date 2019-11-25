import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { EuiPanel } from '../../panel';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiRadio, EuiRadioProps } from '../radio';
// @ts-ignore
import { EuiCheckbox } from '../checkbox';
import { EuiFormLabel } from '../form_label';
import { EuiText } from '../../text';

export type EuiCheckablePanelProps = Omit<EuiRadioProps, 'compressed'> & {
  /**
   * Whether the control is a radio button or checkbox
   */
  checkableType?: 'radio' | 'checkbox';
  id: string;
};

export const EuiCheckablePanel: FunctionComponent<EuiCheckablePanelProps> = ({
  children,
  className,
  checkableType = 'radio',
  label,
  ...rest
}) => {
  const { id } = rest;
  const classes = classNames('euiCheckablePanel', className, {
    'euiCheckablePanel--isChecked': rest.checked,
  });

  const CheckableComponent = checkableType === 'radio' ? EuiRadio : EuiCheckbox;

  return (
    <EuiPanel paddingSize="none" className={classes}>
      <EuiFlexGroup
        gutterSize="none"
        alignItems="stretch"
        responsive={false}
        wrap={false}>
        <EuiFlexItem grow={false} className="euiCheckablePanel__control">
          <EuiFlexGroup
            gutterSize="none"
            justifyContent="center"
            alignItems="center">
            <EuiFlexItem>
              <CheckableComponent {...rest} />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem className="euiCheckablePanel__label">
          <EuiFormLabel
            htmlFor={id}
            aria-describedby={children ? `${id}-details` : undefined}>
            <EuiText size="m">{label}</EuiText>
          </EuiFormLabel>
        </EuiFlexItem>
      </EuiFlexGroup>
      {children && (
        <EuiFlexGroup gutterSize="none" responsive={false} wrap={false}>
          <EuiFlexItem grow={false} className="euiCheckablePanel__control" />
          <EuiFlexItem
            id={`${id}-details`}
            className="euiCheckablePanel__children">
            {children}
          </EuiFlexItem>
        </EuiFlexGroup>
      )}
    </EuiPanel>
  );
};
