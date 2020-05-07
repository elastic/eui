import React, { useState } from 'react';

import {
  EuiTextDiff,
  EuiCode,
  EuiSpacer,
  EuiTextColor,
  EuiRange,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [del, setDel] = useState(0);
  const [ins, setIns] = useState(0);
  const [value, setValue] = useState(0.00001);
  const initialText =
    'One difference is that interface creates a new name that is used everywhere. Type aliases do create a new name — for instance, error text won’t use the alias name. In the code below, hovering over interfaced in code editor will show that it returns an Interface, but will show that aliased returns object literal type.Wish you happy';

  const currentText =
    'One difference is that inerfaces create a new name that is used everywhere. Type aliases don’t create a new name — for instance, error messages won’t use the alias name. In the code below, hovering over interfaced in an editor will show that it returns an Interface, but will show that aliased returns object literal type.Hope you will be happy every day';

  const onGetDataFormat = data => {
    console.log('data', data);
    setDel([...data].filter(el => el.type === 'delete').length);
    setIns([...data].filter(el => el.type === 'insert').length);
  };

  return (
    <>
      <EuiTextDiff
        fontSize="m"
        paddingSize="m"
        initialText={initialText}
        currentText={currentText}
        getDataFormat={onGetDataFormat}
        timeout={value}
      />
      <EuiSpacer />
      <EuiCode>
        <EuiTextColor color="secondary">{ins} </EuiTextColor> Insertions,
        <EuiTextColor color="danger"> {del} </EuiTextColor>
        Deletions
      </EuiCode>
      <EuiSpacer />
      <EuiRange
        id={htmlIdGenerator()()}
        min={0}
        max={0.001}
        step={0.00001}
        value={value}
        onChange={e => setValue(e.target.value)}
        showLabels
        showValue
        aria-label="An example of EuiRange with showValue prop"
      />
    </>
  );
};
