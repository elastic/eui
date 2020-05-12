import React, { useState } from 'react';

import {
  useEuiTextDiff,
  EuiCode,
  EuiSpacer,
  EuiTextColor,
  EuiRange,
  EuiCodeBlock,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

import initialText from '!!raw-loader!../../../../src/global_styling/variables/_colors.scss';
import currentText from '!!raw-loader!../../../../src/themes/eui/eui_colors_dark.scss';

export default () => {
  const [del, setDel] = useState(0);
  const [ins, setIns] = useState(0);
  const [value, setValue] = useState(0.5);

  const [rendered, textDiffObject] = useEuiTextDiff({
    fontSize: 'm',
    paddingSize: 'm',
    initialText,
    currentText,
    timeout: value,
  });

  // textDiffObject.forEach(el => {
  //   if (el[0] === 1) {
  //     setIns(ins + 1);
  //   } else if (el[0] === -1) {
  //     setDel(del + 1);
  //   }
  // });

  return (
    <>
      <EuiRange
        id={htmlIdGenerator()()}
        min={0}
        max={1}
        step={0.1}
        value={value}
        valueAppend=" seconds"
        onChange={e => setValue(e.target.value)}
        showLabels
        showValue
        aria-label="An example of EuiRange with showValue prop"
      />
      <EuiSpacer />
      <EuiCodeBlock language="text" fontSize="m" paddingSize="m">
        {rendered}
      </EuiCodeBlock>
      <EuiSpacer />
      <EuiCode>
        <EuiTextColor color="secondary">{ins} </EuiTextColor> Insertions,
        <EuiTextColor color="danger"> {del} </EuiTextColor>
        Deletions
      </EuiCode>
    </>
  );
};
