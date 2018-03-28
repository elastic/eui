import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutosizeInput from 'react-input-autosize';

import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiFormControlLayout, EuiValidatableControl } from '../../form';
import { EuiComboBoxPill } from './combo_box_pill';
import { htmlIdGenerator } from '../../../services';

const makeId = htmlIdGenerator();

export class EuiComboBoxInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasFocus: false,
    };
  }

  onFocus = () => {
    this.props.onFocus();
    this.setState({
      hasFocus: true,
    });
  };

  onBlur = () => {
    this.setState({
      hasFocus: false,
    });
  };

  render() {
    const {
      selectedOptions,
      onRemoveOption,
      onClick,
      onChange,
      value,
      searchValue,
      autoSizeInputRef,
      inputRef,
    } = this.props;

    const pills = selectedOptions.map((option) => {
      const {
        value,
        label,
        ...rest
      } = option;

      return (
        <EuiComboBoxPill
          option={option}
          onClose={onRemoveOption}
          key={value}
          {...rest}
        >
          {label}
        </EuiComboBoxPill>
      )
    });

    let removeOptionMessage;
    let removeOptionMessageId;

    if (this.state.hasFocus) {
      const removeOptionMessageContent =
        `Combo box. Selected. ` +
        (searchValue ? `${searchValue}. Selected. ` : '') +
        (selectedOptions.length ? `${value}. Unselected. Press Backspace to delete ${selectedOptions[selectedOptions.length - 1].label}. ` : '') +
        `You are currently on a combo box. Type text or, to display a list of choices, press Down Arrow. ` +
        `To exit the list of choices, press Escape.`;

      removeOptionMessageId = makeId();

      // aria-live="assertive" will read this message aloud immediately once it enters the DOM.
      // We'll render to the DOM when the input gains focus and remove it when the input loses focus.
      // We'll use aria-hidden to prevent default aria information from being read by the screen
      // reader.
      removeOptionMessage = (
        <EuiScreenReaderOnly>
          <span aria-live="assertive" id={removeOptionMessageId}>
            {removeOptionMessageContent}
          </span>
        </EuiScreenReaderOnly>
      );
    }

    return (
      <EuiFormControlLayout
        icon="arrowDown"
        iconSide="right"
      >
        <div
          className="euiComboBox__inputWrap"
          onClick={onClick}
          data-test-subj="comboBoxInput"
        >
          {pills}

          <EuiValidatableControl isInvalid={false}>
            <AutosizeInput
              aria-hidden
              style={{ fontSize: 14 }}
              className="euiComboBox__input"
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChange={(e) => onChange(e.target.value)}
              value={searchValue}
              ref={autoSizeInputRef}
              inputRef={inputRef}
            />
          </EuiValidatableControl>
          {removeOptionMessage}
        </div>
      </EuiFormControlLayout>
    );
  }
}

EuiComboBoxInput.propTypes = {
  selectedOptions: PropTypes.array,
  onRemoveOption: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  searchValue: PropTypes.string,
  autoSizeInputRef: PropTypes.func,
  inputRef: PropTypes.func,
};
