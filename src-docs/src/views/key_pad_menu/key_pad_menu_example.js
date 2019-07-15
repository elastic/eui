import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
} from '../../../../src/components';

import KeyPadMenu from './key_pad_menu';
const keyPadMenuSource = require('!!raw-loader!./key_pad_menu');
const keyPadMenuHtml = renderToHtml(KeyPadMenu);
const keyPadMenuSnippet = `<EuiKeyPadMenu>
  <EuiKeyPadMenuItem label={label1} href="#">
    <EuiIcon type={icon1} size="l" />
  </EuiKeyPadMenuItem>

  <EuiKeyPadMenuItem label={label2} href="#">
    <EuiIcon type={icon2} size="l" />
  </EuiKeyPadMenuItem>
</EuiKeyPadMenu>
`;

import KeyPadMenuItemButton from './key_pad_menu_item_button';
const keyPadMenuItemButtonSource = require('!!raw-loader!./key_pad_menu_item_button');
const keyPadMenuItemButtonHtml = renderToHtml(KeyPadMenuItemButton);
const keyPadMenuItemButtonSnippet = `<EuiKeyPadMenuItemButton
  label={label}
  onClick={this.handleClick}>
  <EuiIcon type={icon} size="l" />
</EuiKeyPadMenuItemButton>
`;

import KeyPadBeta from './key_pad_beta';
const keyPadBetaSource = require('!!raw-loader!./key_pad_beta');
const keyPadBetaHtml = renderToHtml(KeyPadBeta);
const keyPadBetaSnippet = `<EuiKeyPadMenuItem
  label={label}
  href="#"
  betaBadgeLabel={betaBadgeLabel}
  betaBadgeTooltipContent={tooltipContent}
  betaBadgeIconType={badgeIconType}>
  <EuiIcon type={menuItemIcon} size="l" />
</EuiKeyPadMenuItem>
`;

export const KeyPadMenuExample = {
  title: 'Key Pad Menu',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: keyPadMenuSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: keyPadMenuHtml,
        },
      ],
      text: (
        <p>
          The KeyPadMenu component presents KeyPadMenuItems in a tiled format,
          with a fixed width which will accommodate three items and then wrap.
        </p>
      ),
      props: { EuiKeyPadMenu, EuiKeyPadMenuItem },
      snippet: keyPadMenuSnippet,
      demo: <KeyPadMenu />,
    },
    {
      title: 'Item Button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: keyPadMenuItemButtonSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: keyPadMenuItemButtonHtml,
        },
      ],
      text: (
        <p>
          The KeyPadMenuItem component is a link by default, but you can swap it
          out for a KeyPadMenuItemButton if you want <EuiCode>onClick</EuiCode>{' '}
          behavior.
        </p>
      ),
      snippet: keyPadMenuItemButtonSnippet,
      demo: <KeyPadMenuItemButton />,
    },
    {
      title: 'Beta item',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: keyPadBetaSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: keyPadBetaHtml,
        },
      ],
      text: (
        <div>
          <p>
            If the item links to a module that is not GA (beta, lab, etc), you
            can add a <EuiCode>betaBadgeLabel</EuiCode> and{' '}
            <EuiCode>betaBadgeTooltipContent</EuiCode> to the card and it will
            properly create and position an <EuiCode>EuiBetaBadge</EuiCode>.
          </p>
          <p>
            Supplying just a label will only show the first letter in the badge
            and supply the full label to the tooltip. You can also pass an{' '}
            <EuiCode>iconType</EuiCode> to replace the letter only badge and the
            label will still become the title.
          </p>
        </div>
      ),
      snippet: keyPadBetaSnippet,
      demo: <KeyPadBeta />,
    },
  ],
};
