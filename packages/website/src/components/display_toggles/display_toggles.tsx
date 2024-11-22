/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  cloneElement,
  useState,
  Fragment,
  ReactElement,
  FunctionComponent,
} from 'react';

import {
  EuiFlexGroup,
  EuiSwitch,
  EuiFlexItem,
  EuiToolTip,
  EuiIcon,
  EuiButtonEmpty,
  EuiPopover,
  EuiSpacer,
  EuiSpacerProps,
} from '@elastic/eui';

export type DisplayTogglesProps = {
  canIsDisabled?: boolean;
  canDisabled?: boolean;
  canReadOnly?: boolean;
  canLoading?: boolean;
  canCompressed?: boolean;
  canFullWidth?: boolean;
  canInvalid?: boolean;
  canPrepend?: boolean;
  canAppend?: boolean;
  canClear?: boolean;
  children: ReactElement;
  extras?: ReactElement[];
  spacerSize?: EuiSpacerProps['size'];
};

export type CanPropsType = {
  disabled?: boolean;
  isDisabled?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  compressed?: boolean;
  isLoading?: boolean;
  prepend?: string;
  append?: string;
  isInvalid?: boolean;
  isClearable?: boolean;
};

export const DisplayToggles: FunctionComponent<DisplayTogglesProps> = ({
  canIsDisabled = false,
  canDisabled = true,
  canReadOnly = true,
  canLoading = true,
  canCompressed = true,
  canFullWidth = true,
  canInvalid = true,
  canPrepend = false,
  canAppend = false,
  canClear = false,
  children,
  extras,
  spacerSize = 'l',
}) => {
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [compressed, setCompressed] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [prepend, setPrepend] = useState(false);
  const [append, setAppend] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [isClearable, setIsClearable] = useState(false);

  const canProps: CanPropsType = {};
  if (canDisabled) canProps.disabled = disabled;
  if (canIsDisabled) canProps.isDisabled = disabled;
  if (canReadOnly) canProps.readOnly = readOnly;
  if (canLoading) canProps.isLoading = loading;
  if (canFullWidth) canProps.fullWidth = fullWidth;
  if (canCompressed) canProps.compressed = compressed;
  if (canPrepend && prepend) canProps.prepend = 'Prepend';
  if (canAppend && append) canProps.append = 'Append';
  if (canInvalid) canProps.isInvalid = invalid;
  if (canClear) canProps.isClearable = isClearable;

  return (
    <Fragment>
      {cloneElement(children, canProps)}
      <EuiSpacer size={spacerSize} />
      <EuiPopover
        panelPaddingSize="s"
        isOpen={isPopoverOpen}
        closePopover={() => {
          setIsPopoverOpen(false);
        }}
        button={
          <EuiButtonEmpty
            iconType="controlsHorizontal"
            size="xs"
            onClick={() => {
              setIsPopoverOpen(!isPopoverOpen);
            }}
          >
            Display toggles
          </EuiButtonEmpty>
        }
      >
        <div>
          <EuiFlexGroup
            wrap={true}
            direction="column"
            gutterSize="s"
            responsive={false}
          >
            {(canDisabled || canIsDisabled) && (
              <EuiFlexItem grow={false}>
                <EuiSwitch
                  compressed
                  label={'disabled'}
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                />
              </EuiFlexItem>
            )}
            {canReadOnly && (
              <EuiFlexItem grow={false}>
                <EuiSwitch
                  compressed
                  label={'readOnly'}
                  checked={readOnly}
                  onChange={(e) => setReadOnly(e.target.checked)}
                />
              </EuiFlexItem>
            )}
            {canLoading && (
              <EuiFlexItem grow={false}>
                <EuiSwitch
                  compressed
                  label={'loading'}
                  checked={loading}
                  onChange={(e) => setLoading(e.target.checked)}
                />
              </EuiFlexItem>
            )}
            {canInvalid && (
              <EuiFlexItem grow={false}>
                <EuiSwitch
                  compressed
                  label={'invalid'}
                  checked={invalid}
                  onChange={(e) => setInvalid(e.target.checked)}
                />
              </EuiFlexItem>
            )}
            {canFullWidth && (
              <EuiFlexItem grow={false}>
                <EuiSwitch
                  compressed
                  label={'fullWidth'}
                  checked={fullWidth}
                  onChange={(e) => setFullWidth(e.target.checked)}
                />
              </EuiFlexItem>
            )}
            {canCompressed && (
              <EuiFlexItem grow={false}>
                <EuiSwitch
                  compressed
                  label={
                    <span>
                      compressed{' '}
                      <EuiToolTip content="Compressed usages are very specific. Click to view full compressed documentation">
                        <a href="#/forms/compressed-forms">
                          <EuiIcon type="help" aria-label="help" />
                        </a>
                      </EuiToolTip>
                    </span>
                  }
                  checked={compressed}
                  onChange={(e) => setCompressed(e.target.checked)}
                />
              </EuiFlexItem>
            )}
            {canPrepend && (
              <EuiFlexItem grow={false}>
                <EuiSwitch
                  compressed
                  label={'prepend'}
                  checked={prepend}
                  onChange={(e) => setPrepend(e.target.checked)}
                />
              </EuiFlexItem>
            )}
            {canAppend && (
              <EuiFlexItem grow={false}>
                <EuiSwitch
                  compressed
                  label={'append'}
                  checked={append}
                  onChange={(e) => setAppend(e.target.checked)}
                />
              </EuiFlexItem>
            )}
            {canClear && (
              <EuiFlexItem grow={false}>
                <EuiSwitch
                  compressed
                  label={'clearable'}
                  checked={isClearable}
                  onChange={(e) => setIsClearable(e.target.checked)}
                />
              </EuiFlexItem>
            )}
            {extras &&
              extras.map((extra, index) => {
                return (
                  <EuiFlexItem key={index} grow={false}>
                    {extra}
                  </EuiFlexItem>
                );
              })}
          </EuiFlexGroup>
        </div>
      </EuiPopover>
    </Fragment>
  );
};
