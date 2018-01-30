import { noop, omit } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import hash from 'hash-sum';

import {
  EuiFormControlLayout,
} from '../form_control_layout';

import {
  EuiValidatableControl,
} from '../validatable_control';

import {
  EuiBadge
} from '../../badge';

import {
  EuiIcon
} from '../../icon';

import {
  EuiFocusEmulator
} from '../focus_emulator';

export class EuiFieldDiscrete extends Component {
  state = {
    value: ''
  }

  render() {
    const { value } = this.state;
    const {
      values,
      getText,
      inputRef,
      fullWidth,
      isLoading,
      isValid,
      onRemove,
      className,
      ...rest
    } = this.props;

    const fieldClasses = classNames('euiFieldDiscrete', className);

    const isInvalid = value !== `` && !isValid(value);

    const inputRefMix = node => {
      this.input = node;

      if (typeof inputRef === 'function') {
        inputRef(node);
      }
    };

    const otherProps = omit(rest, 'parse', 'onInsert');

    return (
      <EuiFormControlLayout
        fullWidth={fullWidth}
        isLoading={isLoading}
      >
        <EuiFocusEmulator getSource={() => this.input}>
          <div className={fieldClasses}>
            <div className="euiFieldDiscrete-values">
              {
                values.map(value => (
                  <EuiBadge
                    key={hash(value)}
                    color="ghost"
                    className="euiFieldDiscrete-value"
                    onClick={() => onRemove(value)}
                  >
                    <span className="euiFieldDiscrete-valueText">
                      { getText(value) }
                    </span>
                    <span className="euiFieldDiscrete-valueRemove">
                      <EuiIcon type="cross" />
                    </span>
                  </EuiBadge>
                ))
              }
            </div>

            { ' ' }

            <EuiValidatableControl
              isInvalid={isInvalid}
            >
              <input
                type="text"
                ref={inputRefMix}
                className="euiFieldDiscrete-input"
                value={value}
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
                {...otherProps}
              />
            </EuiValidatableControl>
          </div>
        </EuiFocusEmulator>
      </EuiFormControlLayout>
    );
  }

  onChange = e => {
    this.setState({ value: e.target.value });
  }

  onKeyPress = e => {
    const { value } = this.state;
    const { isValid, parse, onInsert } = this.props;

    if (e.key === 'Enter') {
      if (!isValid(value)) {
        return;
      }

      const item = parse(value);

      this.setState({ value: `` });
      onInsert(item);
    }
  }
}

EuiFieldDiscrete.propTypes = {
  values: PropTypes.array,
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  inputRef: PropTypes.func,
};

EuiFieldDiscrete.defaultProps = {
  values: [],
  fullWidth: false,
  isLoading: false,
  isValid: () => true,
  parse: value => value,
  onInsert: noop,
  onRemove: noop,
};
