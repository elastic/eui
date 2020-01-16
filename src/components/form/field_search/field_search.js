import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Browser } from '../../../services/browser';
import { ENTER } from '../../../services/key_codes';

import { EuiFormControlLayout } from '../form_control_layout';

import { EuiValidatableControl } from '../validatable_control';

const propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  isInvalid: PropTypes.bool,
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  inputRef: PropTypes.func,
  /**
   * Called when the user presses [Enter] OR on change if the incremental prop is `true`.
   * If you don't need the on[Enter] functionality, prefer using onChange
   */
  onSearch: PropTypes.func,
  /**
   * When `true` the search will be executed (that is, the `onSearch` will be called) as the
   * user types.
   */
  incremental: PropTypes.bool,
  /**
   * when `true` creates a shorter height input
   */
  compressed: PropTypes.bool,
  /**
   * Shows a button that quickly clears any input
   */
  isClearable: PropTypes.bool,
};

const defaultProps = {
  fullWidth: false,
  isLoading: false,
  incremental: false,
  compressed: false,
  isClearable: true,
};

export class EuiFieldSearch extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
    this.cleanups = [];
  }

  componentDidMount() {
    if (Browser.isEventSupported('search', this.inputElement)) {
      const onSearch = event => {
        if (this.props.onSearch) {
          this.props.onSearch(event.target.value);
        }
      };
      this.inputElement.addEventListener('search', onSearch);
      this.cleanups.push(() =>
        this.inputElement.removeEventListener('search', onSearch)
      );
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
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    ).set;
    nativeInputValueSetter.call(this.inputElement, '');

    // dispatch input event, with IE11 support/fallback
    if ('Event' in window && typeof Event === 'function') {
      const event = new Event('input', {
        bubbles: true,
        cancelable: false,
      });
      this.inputElement.dispatchEvent(event);
    } else {
      // IE11
      const event = document.createEvent('Event');
      event.initEvent('input', true, false);
      this.inputElement.dispatchEvent(event);
    }

    // set focus on the search field
    this.inputElement.focus();
  };

  componentWillUnmount() {
    this.cleanups.forEach(cleanup => cleanup());
  }

  setRef = inputElement => {
    this.inputElement = inputElement;
    if (this.props.inputRef) {
      this.props.inputRef(inputElement);
    }
  };

  onKeyUp = (incremental, onSearch, event) => {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
      if (event.defaultPrevented) {
        return;
      }
    }
    if (onSearch && (incremental || event.keyCode === ENTER)) {
      onSearch(event.target.value);
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
            : null
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
            onKeyUp={this.onKeyUp.bind(this, incremental, onSearch)}
            ref={this.setRef}
            {...rest}
          />
        </EuiValidatableControl>
      </EuiFormControlLayout>
    );
  }
}
