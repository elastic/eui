import React, { useState, useEffect } from 'react';

import {
  useEuiTextDiff,
  EuiCode,
  EuiSpacer,
  EuiTextColor,
  EuiText,
} from '../../../../src/components';

export default () => {
  const [del, setDel] = useState(0);
  const [ins, setIns] = useState(0);

  const beforeText =
    'Orbiting this at a distance of roughly ninety-two million miles is an utterly insignificant little blue green planet whose ape- descended life forms are so amazingly primitive that they still think digital watches are a pretty neat idea.';
  const afterText =
    'Orbiting those at a distance of roughly ninety-nine billion yards is not insignificant dwaf red green planet whose ape- ascended life forms are so amazingly primitive that they still think digital clocks are a pretty neat idea.';

  const [rendered, textDiffObject] = useEuiTextDiff({
    beforeText,
    afterText,
  });

  useEffect(() => {
    textDiffObject.forEach((el) => {
      if (el[0] === 1) {
        setIns((add) => add + 1);
      } else if (el[0] === -1) {
        setDel((sub) => sub + 1);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <EuiText>
        <p>{rendered}</p>
      </EuiText>
      <EuiSpacer />
      <EuiCode>
        <EuiTextColor color="success"> {ins} </EuiTextColor> Insertions,
        <EuiTextColor color="danger"> {del} </EuiTextColor>
        Deletions
      </EuiCode>
    </>
  );
};
