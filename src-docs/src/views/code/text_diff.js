import React from 'react';

import { EuiTextDiff } from '../../../../src/components';

export default () => {
  const initialText =
    'One difference is that interface creates a new name that is used everywhere. Type aliases do create a new name — for instance, error text won’t use the alias name. In the code below, hovering over interfaced in code editor will show that it returns an Interface, but will show that aliased returns object literal type.Wish you happy';
  const currentText =
    'One difference is that interfaces create a new name that is used everywhere. Type aliases don’t create a new name — for instance, error messages won’t use the alias name. In the code below, hovering over interfaced in an editor will show that it returns an Interface, but will show that aliased returns object literal type.Hope you will be happy every day';

  const onGetDataFormat = data => console.log(data);

  return (
    <EuiTextDiff
      fontSize="m"
      paddingSize="m"
      initialText={initialText}
      currentText={currentText}
      showDeletion={true}
      getDataFormat={onGetDataFormat}
    />
  );
};
