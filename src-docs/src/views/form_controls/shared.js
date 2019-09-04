import React, { cloneElement, Component, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import {
  EuiFlexGroup,
  EuiSwitch,
  EuiFlexItem,
  EuiToolTip,
  EuiIcon,
  EuiButtonEmpty,
  EuiFormLabel,
  EuiPopover,
  EuiSpacer,
} from '../../../../src/components';

export class DisplayToggles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      readOnly: false,
      loading: false,
      compressed: false,
      fullWidth: false,
      prepend: false,
      append: false,
      isPopoverOpen: false,
      invalid: false,
    };
  }

  updateProperty = (checked, property) => {
    const currentState = { ...this.state };
    currentState[property] = checked;
    this.setState(currentState);
    this.props.onUpdate && this.props.onUpdate(currentState);
  };

  render() {
    const {
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onUpdate,
    } = this.props;

    const canProps = {};
    if (canDisabled) canProps.disabled = this.state.disabled;
    if (canReadOnly) canProps.readOnly = this.state.readOnly;
    if (canLoading) canProps.isLoading = this.state.loading;
    if (canFullWidth) canProps.fullWidth = this.state.fullWidth;
    if (canCompressed) canProps.compressed = this.state.compressed;
    if (canPrepend && this.state.prepend)
      canProps.prepend = <EuiFormLabel>Prepend</EuiFormLabel>;
    if (canAppend && this.state.append)
      canProps.append = <EuiButtonEmpty size="xs">Append</EuiButtonEmpty>;
    if (canInvalid) canProps.isInvalid = this.state.invalid;

    return (
      <Fragment>
        {cloneElement(children, canProps)}
        <EuiSpacer />
        <EuiPopover
          isOpen={this.state.isPopoverOpen}
          closePopover={() => {
            this.setState({ isPopoverOpen: false });
          }}
          button={
            <EuiButtonEmpty
              iconType="controlsHorizontal"
              size="xs"
              onClick={() => {
                this.setState({ isPopoverOpen: !this.state.isPopoverOpen });
              }}>
              Display toggles
            </EuiButtonEmpty>
          }>
          <div>
            <EuiFlexGroup wrap={true} direction="column" gutterSize="s">
              {canDisabled && (
                <EuiFlexItem grow={false}>
                  <EuiSwitch
                    label={'disabled'}
                    checked={this.state.disabled}
                    onChange={e =>
                      this.updateProperty(e.target.checked, 'disabled')
                    }
                  />
                </EuiFlexItem>
              )}
              {canReadOnly && (
                <EuiFlexItem grow={false}>
                  <EuiSwitch
                    label={'readOnly'}
                    checked={this.state.readOnly}
                    onChange={e =>
                      this.updateProperty(e.target.checked, 'readOnly')
                    }
                  />
                </EuiFlexItem>
              )}
              {canLoading && (
                <EuiFlexItem grow={false}>
                  <EuiSwitch
                    label={'loading'}
                    checked={this.state.loading}
                    onChange={e =>
                      this.updateProperty(e.target.checked, 'loading')
                    }
                  />
                </EuiFlexItem>
              )}
              {canInvalid && (
                <EuiFlexItem grow={false}>
                  <EuiSwitch
                    label={'invalid'}
                    checked={this.state.invalid}
                    onChange={e =>
                      this.updateProperty(e.target.checked, 'invalid')
                    }
                  />
                </EuiFlexItem>
              )}
              {canFullWidth && (
                <EuiFlexItem grow={false}>
                  <EuiSwitch
                    label={'fullWidth'}
                    checked={this.state.fullWidth}
                    onChange={e =>
                      this.updateProperty(e.target.checked, 'fullWidth')
                    }
                  />
                </EuiFlexItem>
              )}
              {canCompressed && (
                <EuiFlexItem grow={false}>
                  <EuiSwitch
                    label={
                      <span>
                        compressed{' '}
                        <EuiToolTip content="Compressed usages are very specific. Click to view full compressed documentation">
                          <Link to="/forms/compressed-forms">
                            <EuiIcon type="help" />
                          </Link>
                        </EuiToolTip>
                      </span>
                    }
                    checked={this.state.compressed}
                    onChange={e =>
                      this.updateProperty(e.target.checked, 'compressed')
                    }
                  />
                </EuiFlexItem>
              )}
              {canPrepend && (
                <EuiFlexItem grow={false}>
                  <EuiSwitch
                    label={'prepend'}
                    checked={this.state.prepend}
                    onChange={e =>
                      this.updateProperty(e.target.checked, 'prepend')
                    }
                  />
                </EuiFlexItem>
              )}
              {canAppend && (
                <EuiFlexItem grow={false}>
                  <EuiSwitch
                    label={'append'}
                    checked={this.state.append}
                    onChange={e =>
                      this.updateProperty(e.target.checked, 'append')
                    }
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
  }
}

DisplayToggles.propTypes = {
  canDisabled: PropTypes.bool,
  canReadOnly: PropTypes.bool,
  canLoading: PropTypes.bool,
  canCompressed: PropTypes.bool,
  canFullWidth: PropTypes.bool,
  canFullWidth: PropTypes.bool,
  canPrepend: PropTypes.bool,
  canAppend: PropTypes.bool,
  canInvalid: PropTypes.bool,
  extras: PropTypes.arrayOf(PropTypes.node),
  onUpdate: PropTypes.func,
};

DisplayToggles.defaultProps = {
  canDisabled: true,
  canReadOnly: true,
  canLoading: true,
  canCompressed: true,
  canFullWidth: true,
  canInvalid: true,
  canPrepend: false,
  canAppend: false,
};
