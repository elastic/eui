import React, { useState } from 'react';

import { EuiSuperSelect } from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

export default () => {
  const options = [
    {
      value: 'option_one',
      inputDisplay: 'Option one',
      disabled: true,
      'data-test-subj': 'option one',
    },
    {
      value: 'option_two',
      inputDisplay: 'Option two',
    },
    {
      value: 'option_three',
      inputDisplay: (
        <span className="eui-textTruncate eui-displayBlock">
          Option three has a super long text and added truncation
        </span>
      ),
    },
  ];
  const [value, setValue] = useState(options[1].value);

  const onChange = (value) => {
    setValue(value);
  };

  const testId = '12345';

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles canPrepend={false} canAppend={false}>
      <EuiSuperSelect
        id={testId}
        options={options}
        valueOfSelected={value}
        onChange={(value) => onChange(value)}
        append={<span className="euiFormLabel">Append</span>}
        prepend={<span className="euiFormLabel">Prepend</span>}
      />
    </DisplayToggles>
  );
};
