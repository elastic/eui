import React, { Component, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { Browser } from '../../../services/browser';
import { ENTER } from '../../../services/key_codes';
import { CommonProps } from '../../common';

import { EuiFormControlLayout } from '../form_control_layout';

import { EuiValidatableControl } from '../validatable_control';

export interface EuiFieldSearchProps
  extends CommonProps,
    InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  isInvalid?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  /**
   * Called when the user presses [Enter] OR on change if the incremental prop is `true`.
   * If you don't need the on[Enter] functionality, prefer using onChange
   */
  onSearch?: (value: string) => void;
  /**
   * When `true` the search will be executed (that is, the `onSearch` will be called) as the
   * user types.
   */
  incremental?: boolean;
  /**
   * when `true` creates a shorter height input
   */
  compressed?: boolean;
  inputRef?: (node: HTMLInputElement | null) => void;
  /**
   * Shows a button that quickly clears any input
   */
  isClearable?: boolean;
}

export class EuiFieldSearch extends Component<EuiFieldSearchProps> {
  static defaultProps = {
    fullWidth: false,
    isLoading: false,
    incremental: false,
    compressed: false,
    isClearable: true,
  };

  inputElement: HTMLInputElement | null = null;
  cleanups: Array<() => void> = [];

  componentDidMount() {
    if (!this.inputElement) return;
    if (Browser.isEventSupported('search', this.inputElement)) {
      const onSearch = (event?: Event) => {
        if (this.props.onSearch) {
          if (!event || !event.target) return;
          this.props.onSearch((event.target as HTMLInputElement).value);
        }
      };
      this.inputElement.addEventListener('search', onSearch);
      this.cleanups.push(() => {
        if (!this.inputElement) return;
        this.inputElement.removeEventListener('search', onSearch);
      });
    }
  }

  onClear = () => {
    // clear the field's value

    // 1. React doesn't listen for `change` events, instead it maps `input` events to `change`
    // 2. React only fires the mapped `change` event if the element's value has changed
    // 3. An input's value is, in addition to other methods, tracked by intercepting element.value = '...'
    //
    // So we have to go below the element's value setter to avoid React intercepting it,
    // only then will React treat the value as different and fire its `change` event
    //
    // https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
    const nativeInputValue = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value'
    );
    const nativeInputValueSetter = nativeInputValue
      ? nativeInputValue.set
      : undefined;
    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(this.inputElement, '');
    }

    // dispatch input event, with IE11 support/fallback
    let event;
    if ('Event' in window && typeof Event === 'function') {
      event = new Event('input', {
        bubbles: true,
        cancelable: false,
      });
    } else {
      // IE11
      event = document.createEvent('Event');
      event.initEvent('input', true, false);
    }

    if (this.inputElement) {
      if (event) {
        this.inputElement.dispatchEvent(event);
      }
      // set focus on the search field
      this.inputElement.focus();
    }
  };

  componentWillUnmount() {
    this.cleanups.forEach(cleanup => cleanup());
  }

  setRef = (inputElement: HTMLInputElement | null) => {
    this.inputElement = inputElement;
    if (this.props.inputRef) {
      this.props.inputRef(inputElement);
    }
  };

  onKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
    incremental?: boolean,
    onSearch?: (value: string) => void
  ) => {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
      if (event.defaultPrevented) {
        return;
      }
    }
    if (onSearch && (incremental || event.keyCode === ENTER)) {
      onSearch((event.target as HTMLInputElement).value);
    }
  };

  render() {
    const {
      className,
      id,
      name,
      placeholder,
      value,
      isInvalid,
      fullWidth,
      isLoading,
      inputRef,
      incremental,
      compressed,
      onSearch,
      isClearable,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiFieldSearch',
      {
        'euiFieldSearch--fullWidth': fullWidth,
        'euiFieldSearch--compressed': compressed,
        'euiFieldSearch-isLoading': isLoading,
      },
      className
    );

    return (
      <EuiFormControlLayout
        icon="search"
        fullWidth={fullWidth}
        isLoading={isLoading}
        clear={
          isClearable && value && !rest.readOnly && !rest.disabled
            ? { onClick: this.onClear }
            : undefined
        }
        compressed={compressed}>
        <EuiValidatableControl isInvalid={isInvalid}>
          <input
            type="search"
            id={id}
            name={name}
            placeholder={placeholder}
            className={classes}
            value={value}
            onKeyUp={e => this.onKeyUp(e, incremental, onSearch)}
            ref={this.setRef}
            {...rest}
          />
        </EuiValidatableControl>
      </EuiFormControlLayout>
    );
  }
}
