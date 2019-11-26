import React, {
  Component,
  ChangeEventHandler,
  ReactNode,
  InputHTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { omit } from '../../../services/objects';
import { CommonProps } from '../../common';

const typeToClassNameMap = {
  inList: 'euiCheckbox--inList',
};

export const TYPES = keysOf(typeToClassNameMap);
  keyof typeof typeToClassNameMap
>;

export type EuiCheckboxType = keyof typeof typeToClassNameMap;

export interface EuiCheckboxProps
  extends CommonProps,
    InputHTMLAttributes<HTMLInputElement> {
  id: string;
  checked?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>; // overriding to make it required
  inputRef?: (element: HTMLInputElement) => void;
  label?: ReactNode;
  type?: EuiCheckboxType;
  disabled?: boolean;
  compressed?: boolean;
  indeterminate?: boolean;
}

export class EuiCheckbox extends Component<EuiCheckboxProps> {
  static defaultProps = {
    checked: false,
    disabled: false,
    indeterminate: false,
    compressed: false,
  };

  inputRef?: HTMLInputElement = undefined;

  componentDidMount() {
    this.invalidateIndeterminate();
  }

  componentDidUpdate() {
    this.invalidateIndeterminate();
  }

  render() {
    const {
      className,
      id,
      checked,
      label,
      onChange,
      type,
      disabled,
      compressed,
      ...rest
    } = this.props;

    const inputProps = omit(rest, ['indeterminate']);

    const classes = classNames(
      'euiCheckbox',
      type && typeToClassNameMap[type],
      {
        'euiCheckbox--noLabel': !label,
        'euiCheckbox--compressed': compressed,
      },
      className
    );

    let optionalLabel;

    if (label) {
      optionalLabel = (
        <label className="euiCheckbox__label" htmlFor={id}>
          {label}
        </label>
      );
    }

    return (
      <div className={classes}>
        <input
          className="euiCheckbox__input"
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          ref={this.setInputRef}
          {...inputProps}
        />

        <div className="euiCheckbox__square" />

        {optionalLabel}
      </div>
    );
  }

  setInputRef = (input: HTMLInputElement) => {
    this.inputRef = input;

    if (this.props.inputRef) {
      this.props.inputRef(input);
    }

    this.invalidateIndeterminate();
  };

  invalidateIndeterminate() {
    if (this.inputRef) {
      this.inputRef.indeterminate = Boolean(this.props.indeterminate);
    }
  }
}
