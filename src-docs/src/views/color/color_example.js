import React from 'react';

import { LanguageSelector } from '../../components';
import Intro from './intro';

import { TextSections } from './text/sections';

export const ColorExample = {
  title: 'Color functions',
  intro: <Intro />,
  rightSideItems: [<LanguageSelector />],
  sections: [
    {
      title: 'Light or dark text',
      wrapText: false,
      text: <TextSections />,
    },
  ],
};
