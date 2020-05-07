import React, { useState, useMemo } from 'react';

import {
  useEuiTextDiff,
  EuiCode,
  EuiSpacer,
  EuiTextColor,
} from '../../../../src/components';

export default () => {
  const [del, setDel] = useState(0);
  const [ins, setIns] = useState(0);

  const initialText =
    'One difference is that interface creates a new name that is used everywhere. Type aliases do create a new name — for instance, error text won’t use the alias name. In the code below, hovering over interfaced in code editor will show that it returns an Interface, but will show that aliased returns object literal type.Wish you happy';
  const currentText =
    'One difference is that interfaces create a new name that is used everywhere. Type aliases don’t create a new name — for instance, error messages won’t use the alias name. In the code below, hovering over interfaced in an editor will show that it returns an Interface, but will show that aliased returns object literal type.Hope you will be happy every day';

  const [rendered, textDiffObject] = useEuiTextDiff({
    fontSize: 'm',
    paddingSize: 'm',
    initialText,
    currentText,
    DeletionComponent: () => null,
    timeout: 0,
  });

  // useMemo(() => {
  //   textDiffObject.forEach(el => {
  //     if (el[0] === 1) {
  //       setIns(ins + 1);
  //     } else if (el[0] === -1) {
  //       setDel(del + 1);
  //     }
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [textDiffObject]);

  return (
    <>
      {rendered}
      <EuiSpacer />
      <EuiCode>
        <EuiTextColor color="secondary">{ins} </EuiTextColor> Insertions,
        <EuiTextColor color="danger"> {del} </EuiTextColor>
        Deletions
      </EuiCode>
    </>
  );
};
