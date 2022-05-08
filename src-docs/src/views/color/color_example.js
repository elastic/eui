import React from 'react';

import { LanguageSelector } from '../../components';
import Intro from './intro';

import { TintShadeSections } from './tint_shade/sections';
import { TextSections } from './text/sections';

export const ColorExample = {
  title: 'Color functions',
  intro: <Intro />,
  rightSideItems: [<LanguageSelector />],
  sections: [
    {
      title: 'Tint and shade',
      wrapText: false,
      text: <TintShadeSections />,
    },
    {
      title: 'Light or dark text',
      wrapText: false,
      text: <TextSections />,
    },
  ],
};
