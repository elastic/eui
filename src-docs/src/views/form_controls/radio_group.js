import React, { useState } from 'react';

import { EuiRadioGroup } from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';
import { DisplayToggles } from './display_toggles';

export default () => {
  const radioGroupItemId__1 = useGeneratedHtmlId({
    prefix: 'radioGroupItem',
    suffix: 'first',
  });
  const radioGroupItemId__2 = useGeneratedHtmlId({
    prefix: 'radioGroupItem',
    suffix: 'second',
  });
  const radioGroupItemId__3 = useGeneratedHtmlId({
    prefix: 'radioGroupItem',
    suffix: 'third',
  });

  const radios = [
    {
      id: radioGroupItemId__1,
      label: 'Option one',
    },
    {
      id: radioGroupItemId__2,
      label: 'Option two is checked by default',
    },
    {
      id: radioGroupItemId__3,
      label: 'Option three is disabled',
      disabled: true,
    },
  ];

  const [radioIdSelected, setRadioIdSelected] = useState(radioGroupItemId__2);

  const onChange = (optionId) => {
    setRadioIdSelected(optionId);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles
      canLoading={false}
      canReadOnly={false}
      canInvalid={false}
      canFullWidth={false}
    >
      <EuiRadioGroup
        options={radios}
        idSelected={radioIdSelected}
        onChange={(id) => onChange(id)}
        name="radio group"
        legend={{
          children: <span>This is a legend for a radio group</span>,
        }}
      />
    </DisplayToggles>
  );
};
