import { get } from 'lodash';
import React, { Component } from 'react';
import classNames from 'classnames';

export class EuiFocusEmulator extends Component {
  state = {
    hasFocus: false
  }

  componentDidMount() {
    const { getSource } = this.props;
    const source = getSource();

    if (source) {
      source.addEventListener('focus', this.onFocus);
      source.addEventListener('blur', this.onBlur);
    }
  }

  componentWillUnmount() {
    const { getSource } = this.props;
    const source = getSource();

    if (source) {
      source.removeEventListener('focus', this.onFocus);
      source.removeEventListener('blur', this.onBlur);
    }
  }

  render() {
    const { hasFocus } = this.state;
    const { getSource, className, ...rest } = this.props;
    const source = getSource();
    const disabled = get(source, 'disabled', false);
    const invalid = get(source, 'invalid', false);

    const classes = classNames('euiFocusEmulator', {
      'euiFocusEmulator--focus': hasFocus,
      'euiFocusEmulator--disabled': disabled,
      'euiFocusEmulator--invalid': invalid,
    }, className);

    return (
      <div className={classes} onClick={this.onClick} {...rest} />
    );
  }

  onFocus = () => {
    this.setState({ hasFocus: true });
  }

  onBlur = () => {
    this.setState({ hasFocus: false });
  }

  onClick = (...rest) => {
    const { getSource } = this.props;
    const source = getSource();

    if (source) {
      source.click();
      source.focus();
    }

    if (this.props.onClick) {
      this.props.onClick(...rest);
    }
  }
}
