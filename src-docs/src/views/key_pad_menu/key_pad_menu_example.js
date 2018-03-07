import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';

import KeyPadMenu from './key_pad_menu';
const keyPadMenuSource = require('!!raw-loader!./key_pad_menu');
const keyPadMenuHtml = renderToHtml(KeyPadMenu);

import KeyPadMenuItemButton from './key_pad_menu_item_button';
const keyPadMenuItemButtonSource = require('!!raw-loader!./key_pad_menu_item_button');
const keyPadMenuItemButtonHtml = renderToHtml(KeyPadMenuItemButton);

export const KeyPadMenuExample = {
  title: 'Key Pad Menu',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: keyPadMenuSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: keyPadMenuHtml,
    }],
    text: (
      <p>
        The KeyPadMenu component presents KeyPadMenuItems in a tiled format, with a fixed width which will
        accommodate three items and then wrap.
      </p>
    ),
    props: { EuiKeyPadMenu, EuiKeyPadMenuItem },
    demo: <KeyPadMenu />,
  }, {
    title: 'Item Button',
    source: [{
      type: GuideSectionTypes.JS,
      code: keyPadMenuItemButtonSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: keyPadMenuItemButtonHtml,
    }],
    text: (
      <p>
        The KeyPadMenuItem component is a link by default, but you can swap it out for a
        KeyPadMenuItemButton if you want <EuiCode>onClick</EuiCode> behavior.
      </p>
    ),
    demo: <KeyPadMenuItemButton />,
  }],
};
