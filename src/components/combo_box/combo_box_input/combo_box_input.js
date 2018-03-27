import React from 'react';
import PropTypes from 'prop-types';
import AutosizeInput from 'react-input-autosize';

import { EuiFormControlLayout, EuiValidatableControl } from '../../form';
import { EuiComboBoxPill } from './combo_box_pill';

export const EuiComboBoxInput = ({
  selectedOptions,
  onRemoveOption,
  onClick,
  onFocus,
  onChange,
  value,
  autoSizeInputRef,
  inputRef,
}) => {
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
            role="combobox"
            style={{ fontSize: 14 }}
            className="euiComboBox__input"
            onFocus={onFocus}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            ref={autoSizeInputRef}
            inputRef={inputRef}
          />
        </EuiValidatableControl>
      </div>
    </EuiFormControlLayout>
  );
};

EuiComboBoxInput.propTypes = {
  selectedOptions: PropTypes.array,
  onRemoveOption: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  autoSizeInputRef: PropTypes.func,
  inputRef: PropTypes.func,
};
