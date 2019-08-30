import React, { cloneElement, Component, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import {
  EuiFlexGroup,
  EuiSwitch,
  EuiHorizontalRule,
  EuiFlexItem,
  EuiToolTip,
  EuiIcon,
  EuiButtonEmpty,
  EuiFormLabel,
} from '../../../../src/components';

export class Switches extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      readOnly: false,
      loading: false,
      compressed: false,
      fullWidth: false,
      prepend: undefined,
      append: undefined,
    };
  }

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
        <EuiHorizontalRule />
        <EuiFlexGroup wrap={true}>
          {canDisabled && (
            <EuiFlexItem grow={false}>
              <EuiSwitch
                label={'disabled'}
                checked={this.state.disabled}
                onChange={e => {
                  this.setState({ disabled: e.target.checked });
                }}
              />
            </EuiFlexItem>
          )}
          {canReadOnly && (
            <EuiFlexItem grow={false}>
              <EuiSwitch
                label={'readOnly'}
                checked={this.state.readOnly}
                onChange={e => {
                  this.setState({ readOnly: e.target.checked });
                }}
              />
            </EuiFlexItem>
          )}
          {canLoading && (
            <EuiFlexItem grow={false}>
              <EuiSwitch
                label={'loading'}
                checked={this.state.loading}
                onChange={e => {
                  this.setState({ loading: e.target.checked });
                }}
              />
            </EuiFlexItem>
          )}
          {canFullWidth && (
            <EuiFlexItem grow={false}>
              <EuiSwitch
                label={'fullWidth'}
                checked={this.state.fullWidth}
                onChange={e => {
                  this.setState({ fullWidth: e.target.checked });
                }}
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
                      <Link to="#">
                        <EuiIcon type="help" />
                      </Link>
                    </EuiToolTip>
                  </span>
                }
                checked={this.state.compressed}
                onChange={e => {
                  this.setState({ compressed: e.target.checked });
                }}
              />
            </EuiFlexItem>
          )}
          {canPrepend && (
            <EuiFlexItem grow={false}>
              <EuiSwitch
                label={'prepend'}
                checked={this.state.prepend}
                onChange={e => {
                  this.setState({
                    prepend: e.target.checked,
                  });
                }}
              />
            </EuiFlexItem>
          )}
          {canAppend && (
            <EuiFlexItem grow={false}>
              <EuiSwitch
                label={'append'}
                checked={this.state.append}
                onChange={e => {
                  this.setState({
                    append: e.target.checked,
                  });
                }}
              />
            </EuiFlexItem>
          )}
          {canInvalid && (
            <EuiFlexItem grow={false}>
              <EuiSwitch
                id="invalidType"
                label={'invalid'}
                checked={this.state.invalid}
                onChange={e => {
                  this.setState({
                    invalid: e.target.checked,
                  });
                }}
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
      </Fragment>
    );
  }
}

Switches.propTypes = {
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
};

Switches.defaultProps = {
  canDisabled: true,
  canReadOnly: true,
  canLoading: true,
  canCompressed: true,
  canFullWidth: true,
  canInvalid: true,
  canPrepend: false,
  canAppend: false,
};
