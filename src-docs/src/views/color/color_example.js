import React from 'react';

import { LanguageSelector } from '../../components';
import Intro from './intro';

import { ContrastSections } from './contrast/sections';
import { TransparencySections } from './transparency/sections';
import { TintShadeSections } from './tint_shade/sections';
import { TextSections } from './text/sections';

export const ColorExample = {
  title: 'Color functions',
  intro: <Intro />,
  rightSideItems: [<LanguageSelector />],
  sections: [
    {
      title: 'Contrast',
      wrapText: false,
      text: <ContrastSections />,
    },
    {
      title: 'Transparency',
      wrapText: false,
      text: <TransparencySections />,
    },
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
