import React, { cloneElement, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexGroup,
  EuiSwitch,
  EuiFlexItem,
  EuiToolTip,
  EuiIcon,
  EuiButtonEmpty,
  EuiPopover,
  EuiSpacer,
} from '../../../../src/components';

export const DisplayToggles = ({
  canIsDisabled,
  canDisabled,
  canReadOnly,
  canLoading,
  canCompressed,
  canFullWidth,
  canPrepend,
  canAppend,
  canInvalid,
  children,
  extras,
  spacerSize,
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

  const canProps = {};
  if (canDisabled) canProps.disabled = disabled;
  if (canIsDisabled) canProps.isDisabled = disabled;
  if (canReadOnly) canProps.readOnly = readOnly;
  if (canLoading) canProps.isLoading = loading;
  if (canFullWidth) canProps.fullWidth = fullWidth;
  if (canCompressed) canProps.compressed = compressed;
  if (canPrepend && prepend) canProps.prepend = 'Prepend';
  if (canAppend && append) canProps.append = 'Append';
  if (canInvalid) canProps.isInvalid = invalid;

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
            }}>
            Display toggles
          </EuiButtonEmpty>
        }>
        <div>
          <EuiFlexGroup
            wrap={true}
            direction="column"
            gutterSize="s"
            responsive={false}>
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
                          <EuiIcon type="help" />
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

DisplayToggles.propTypes = {
  canIsDisabled: PropTypes.bool,
  canDisabled: PropTypes.bool,
  canReadOnly: PropTypes.bool,
  canLoading: PropTypes.bool,
  canCompressed: PropTypes.bool,
  canFullWidth: PropTypes.bool,
  canPrepend: PropTypes.bool,
  canAppend: PropTypes.bool,
  canInvalid: PropTypes.bool,
  extras: PropTypes.arrayOf(PropTypes.node),
  // Manually building the spacer array to avoid having to import Spacer into codesandbox
  spacerSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'xxl']),
};

DisplayToggles.defaultProps = {
  canIsDisabled: false,
  canDisabled: true,
  canReadOnly: true,
  canLoading: true,
  canCompressed: true,
  canFullWidth: true,
  canInvalid: true,
  canPrepend: false,
  canAppend: false,
  spacerSize: 'l',
};
