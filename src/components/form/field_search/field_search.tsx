/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, InputHTMLAttributes, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { Browser } from '../../../services/browser';
import { CommonProps } from '../../common';
import { keys } from '../../../services';

import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../form_control_layout';

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
  /**
   * Creates an input group with element(s) coming before input
   * `string` | `ReactElement` or an array of these
   */
  prepend?: EuiFormControlLayoutProps['prepend'];

  /**
   * Creates an input group with element(s) coming after input.
   * `string` | `ReactElement` or an array of these
   */
  append?: EuiFormControlLayoutProps['append'];
}

interface EuiFieldSearchState {
  value: string;
}

let isSearchSupported: boolean = false;

export class EuiFieldSearch extends Component<
  EuiFieldSearchProps,
  EuiFieldSearchState
> {
  static defaultProps = {
    fullWidth: false,
    isLoading: false,
    incremental: false,
    compressed: false,
    isClearable: true,
  };

  state = {
    value:
      this.props.value ||
      (this.props.defaultValue ? `${this.props.defaultValue}` : ''),
  };

  inputElement: HTMLInputElement | null = null;
  cleanups: Array<() => void> = [];

  componentDidMount() {
    if (!this.inputElement) return;
    isSearchSupported = Browser.isEventSupported('search', this.inputElement);
    if (isSearchSupported) {
      const onSearch = (event?: Event) => {
        if (this.props.onSearch) {
          if (!event || !event.target || event.defaultPrevented) return;
          this.props.onSearch((event.target as HTMLInputElement).value);
        }
      };
      this.inputElement.addEventListener('search', onSearch);
      this.cleanups.push(() => {
        if (!this.inputElement) return;
        this.inputElement.removeEventListener('search', onSearch);
      });
    }
    const onChange = (event: Event) => {
      if (
        event.target &&
        (event.target as HTMLInputElement).value !== this.state.value
      ) {
        this.setState({
          value: (event.target as HTMLInputElement).value,
        });
        if (this.props.onSearch) {
          this.props.onSearch((event.target as HTMLInputElement).value);
        }
      }
    };
    this.inputElement.addEventListener('change', onChange);
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
      this.inputElement.dispatchEvent(new Event('change'));
    }
    this.setState({ value: '' });

    const { incremental, onSearch } = this.props;

    if (onSearch && incremental) {
      onSearch('');
    }
  };

  componentWillUnmount() {
    this.cleanups.forEach((cleanup) => cleanup());
  }

  setRef = (inputElement: HTMLInputElement | null) => {
    this.inputElement = inputElement;
    if (this.props.inputRef) {
      this.props.inputRef(inputElement);
    }
  };

  onKeyUp = (
    event: KeyboardEvent<HTMLInputElement>,
    incremental?: boolean,
    onSearch?: (value: string) => void
  ) => {
    this.setState({ value: (event.target as HTMLInputElement).value });

    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
      if (event.defaultPrevented) {
        return;
      }
    }

    if (
      onSearch &&
      ((event.key !== keys.ENTER && incremental) ||
        (event.key === keys.ENTER && !isSearchSupported))
    ) {
      onSearch((event.target as HTMLInputElement).value);
    }
  };

  render() {
    const {
      className,
      id,
      name,
      placeholder,
      isInvalid,
      fullWidth,
      isLoading,
      inputRef,
      incremental,
      compressed,
      onSearch,
      isClearable,
      append,
      prepend,
      ...rest
    } = this.props;

    let value = this.props.value;
    if (typeof this.props.value !== 'string') value = this.state.value;

    const classes = classNames(
      'euiFieldSearch',
      {
        'euiFieldSearch--fullWidth': fullWidth,
        'euiFieldSearch--compressed': compressed,
        'euiFieldSearch--inGroup': prepend || append,
        'euiFieldSearch-isLoading': isLoading,
        'euiFieldSearch-isClearable': isClearable && value,
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
        compressed={compressed}
        append={append}
        prepend={prepend}>
        <EuiValidatableControl isInvalid={isInvalid}>
          <input
            type="search"
            id={id}
            name={name}
            placeholder={placeholder}
            className={classes}
            onKeyUp={(e) => this.onKeyUp(e, incremental, onSearch)}
            ref={this.setRef}
            {...rest}
          />
        </EuiValidatableControl>
      </EuiFormControlLayout>
    );
  }
}
