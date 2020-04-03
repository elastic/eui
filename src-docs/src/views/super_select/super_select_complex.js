import React, { Fragment, useState } from 'react';

import { EuiSuperSelect, EuiText } from '../../../../src/components';

export default () => {
  const options = [
    {
      value: 'option_one',
      inputDisplay: 'Option one',
      dropdownDisplay: (
        <Fragment>
          <strong>Option one</strong>
          <EuiText size="s" color="subdued">
            <p className="euiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </EuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_two',
      inputDisplay: 'Option two',
      dropdownDisplay: (
        <Fragment>
          <strong>Option two</strong>
          <EuiText size="s" color="subdued">
            <p className="euiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </EuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_three',
      inputDisplay: 'Option three',
      dropdownDisplay: (
        <Fragment>
          <strong>Option three</strong>
          <EuiText size="s" color="subdued">
            <p className="euiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </EuiText>
        </Fragment>
      ),
    },
  ];

  const [value, setValue] = useState('option_one');

  const onChange = value => {
    setValue(value);
  };

  return (
    <EuiSuperSelect
      options={options}
      valueOfSelected={value}
      onChange={value => onChange(value)}
      itemLayoutAlign="top"
      hasDividers
    />
  );
};
