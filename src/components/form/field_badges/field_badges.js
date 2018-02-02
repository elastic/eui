import { noop, omit } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
  EuiFieldProxy
} from '../field_proxy';

import {
  ENTER
} from '../../../services/key_codes';

import makeId from '../form_row/make_id';

export class EuiFieldBadges extends Component {
  state = {
    inputValue: ''
  }

  render() {
    const { inputValue } = this.state;
    const {
      values,
      renderContent,
      inputRef,
      fullWidth,
      isLoading,
      onRemove,
      className,
      disabled,
      ...rest
    } = this.props;

    const fieldClasses = classNames('euiFieldBadges', className);

    const isInvalid = this.validate(inputValue) ? null : true;

    const inputRefMix = node => {
      this.input = node;

      if (typeof inputRef === 'function') {
        inputRef(node);
      }
    };

    const otherProps = omit(rest, 'parse', 'onInsert', 'isValid', 'allowEmpty');

    return (
      <EuiFormControlLayout
        fullWidth={fullWidth}
        isLoading={isLoading}
      >
        <EuiFieldProxy
          getSource={() => this.input}
          disabled={disabled}
          invalid={isInvalid}
        >
          <div className={fieldClasses} {...otherProps}>
            <div className="euiFieldBadges__badges">
              {
                values.map(value => (
                  <EuiBadge
                    key={makeId()}
                    color="ghost"
                    className="euiFieldBadges__badge"
                    onClick={() => onRemove(value)}
                    data-test-subj="fieldProxyBadge"
                  >
                    <span className="euiFieldBadges__badgeContents">
                      { renderContent(value) }
                    </span>
                    <span className="euiFieldBadges__badgeRemove">
                      <EuiIcon type="cross" size="s" />
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
                className="euiFieldBadges__input"
                value={inputValue}
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
              />
            </EuiValidatableControl>
          </div>
        </EuiFieldProxy>
      </EuiFormControlLayout>
    );
  }

  validate(value) {
    const { allowEmpty, isValid } = this.props;
    const isEmpty = value === `` && !allowEmpty;
    const valid = isEmpty || isValid(value);
    return valid;
  }

  onChange = e => {
    this.setState({ inputValue: e.target.value });
  }

  onKeyPress = e => {
    const { inputValue } = this.state;
    const { parse, onInsert } = this.props;

    if (e.which === ENTER) {
      if (!this.validate(inputValue)) {
        return;
      }

      const item = parse(inputValue);

      this.setState({ inputValue: `` });
      onInsert(item);
    }
  }
}

EuiFieldBadges.propTypes = {
  values: PropTypes.array,
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  inputRef: PropTypes.func,
};

EuiFieldBadges.defaultProps = {
  values: [],
  fullWidth: false,
  isLoading: false,
  allowEmpty: false,
  isValid: () => true,
  renderContent: value => String(value),
  parse: inputValue => inputValue,
  onInsert: noop,
  onRemove: noop,
};
