import React, { useState } from 'react';

import { EuiCheckboxGroup } from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const checkboxGroupItemId__1 = useGeneratedHtmlId({
    prefix: 'checkboxGroupItem',
    suffix: 'first',
  });
  const checkboxGroupItemId__2 = useGeneratedHtmlId({
    prefix: 'checkboxGroupItem',
    suffix: 'second',
  });
  const checkboxGroupItemId__3 = useGeneratedHtmlId({
    prefix: 'checkboxGroupItem',
    suffix: 'third',
  });

  const checkboxes = [
    {
      id: checkboxGroupItemId__1,
      label: 'Option one',
      'data-test-sub': 'dts_test',
    },
    {
      id: checkboxGroupItemId__2,
      label: 'Option two is checked by default',
      className: 'classNameTest',
    },
    {
      id: checkboxGroupItemId__3,
      label: 'Option three is disabled',
      disabled: true,
    },
  ];
  const [checkboxIdToSelectedMap, setCheckboxIdToSelectedMap] = useState({
    [checkboxGroupItemId__2]: true,
  });

  const onChange = (optionId) => {
    const newCheckboxIdToSelectedMap = {
      ...checkboxIdToSelectedMap,
      ...{
        [optionId]: !checkboxIdToSelectedMap[optionId],
      },
    };
    setCheckboxIdToSelectedMap(newCheckboxIdToSelectedMap);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles
      canLoading={false}
      canReadOnly={false}
      canInvalid={false}
      canFullWidth={false}
    >
      <EuiCheckboxGroup
        options={checkboxes}
        idToSelectedMap={checkboxIdToSelectedMap}
        onChange={(id) => onChange(id)}
      />
    </DisplayToggles>
  );
};
