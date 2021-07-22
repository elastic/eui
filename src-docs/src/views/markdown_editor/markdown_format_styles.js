import React from 'react';

import { EuiMarkdownFormat } from '../../../../src';

const markdownContent = `This text has the \`textSize\` prop set to \`"s"\`.

The color prop is set to \`"danger"\` and that's why all the text is red! :smile:

| Emoji | Color |
| ------ | ----------- |
| :rose:   | Red |
| :apple: | Red |
| :green_heart:    | Green |
`;

export default () => {
  return (
    <EuiMarkdownFormat color="danger" textSize="s">
      {markdownContent}
    </EuiMarkdownFormat>
  );
};
