import React, { useState } from 'react';

import { EuiButton, EuiControlBar } from '../../../../src/components';

export default () => {
  const [isDisplaying, setDisplay] = useState(false);

  const toggleDisplay = () => {
    setDisplay(!isDisplaying);
  };

  const controls = [
    {
      controlType: 'icon',
      id: 'icon',
      iconType: 'folderClosed',
      'aria-label': 'folder',
      className: 'eui-hideFor--m eui-hideFor--l eui-hideFor--xl',
    },
    {
      controlType: 'breadcrumbs',
      id: 'current_file_path',
      responsive: true,
      className: 'eui-hideFor--s eui-hideFor--xs',
      breadcrumbs: [
        {
          text: 'src',
        },
        {
          text: 'components',
        },
      ],
    },
    {
      controlType: 'spacer',
    },
    {
      controlType: 'icon',
      id: 'github_icon',
      iconType: 'logoGithub',
      'aria-label': 'Github',
    },
    {
      controlType: 'text',
      id: 'github_text',
      text: 'Open in Github',
    },
  ];

  let display;

  if (isDisplaying) {
    display = <EuiControlBar controls={controls} showOnMobile />;
  }

  return (
    <div>
      <EuiButton onClick={toggleDisplay}>Toggle mobile example</EuiButton>
      {display}
    </div>
  );
};
