import React, { Component } from 'react';
import classNames from 'classnames';
import { omit } from 'lodash';

export class EuiFieldProxy extends Component {
  state = {
    hasFocus: false
  }

  componentDidMount() {
    const { getSource } = this.props;
    const source = getSource();

    if (source) {
      source.classList.add('euiFieldProxy__proxySource');
      source.addEventListener('focus', this.onFocus);
      source.addEventListener('blur', this.onBlur);
    }
  }

  componentWillUnmount() {
    const { getSource } = this.props;
    const source = getSource();

    if (source) {
      source.classList.remove('euiFieldProxy__proxySource');
      source.removeEventListener('focus', this.onFocus);
      source.removeEventListener('blur', this.onBlur);
    }
  }

  render() {
    const { hasFocus } = this.state;
    const { className, disabled, invalid, ...remainder } = this.props;
    const rest = omit(remainder, 'getSource');

    const classes = classNames('euiFieldProxy', {
      'euiFieldProxy-focus': hasFocus,
      'euiFieldProxy-disabled': disabled,
      'euiFieldProxy-invalid': invalid,
    }, className);

    return (
      <div
        className={classes}
        disabled={disabled}
        onClick={this.onClick}
        {...rest}
      />
    );
  }

  onFocus = () => {
    this.setState({ hasFocus: true });
  }

  onBlur = () => {
    this.setState({ hasFocus: false });
  }

  onClick = e => {
    const { getSource } = this.props;
    const source = getSource();

    if (source) {
      source.click();
      source.focus();
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }
}
