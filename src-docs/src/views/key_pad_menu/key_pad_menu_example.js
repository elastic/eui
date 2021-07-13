import React from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiCallOut,
} from '../../../../src/components';
import { keyPadMenuItemConfig } from './playground';

import KeyPadMenu from './key_pad_menu';
const keyPadMenuSource = require('!!raw-loader!./key_pad_menu');
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
const keyPadMenuItemButtonSnippet = `<EuiKeyPadMenuItem
  label={label}
  onClick={handleClick}>
  <EuiIcon type={icon} size="l" />
</EuiKeyPadMenuItem>
`;

import KeyPadBeta from './key_pad_beta';
const keyPadBetaSource = require('!!raw-loader!./key_pad_beta');
const keyPadBetaSnippet = `<EuiKeyPadMenuItem
  label={label}
  href="#"
  betaBadgeLabel={betaBadgeLabel}
  betaBadgeTooltipContent={tooltipContent}
  betaBadgeIconType={badgeIconType}>
  <EuiIcon type={menuItemIcon} size="l" />
</EuiKeyPadMenuItem>
`;

import KeyPadCheckable from './key_pad_menu_checkable';
const keyPadCheckableSource = require('!!raw-loader!./key_pad_menu_checkable');
import KeyPadCheckableMulti from './key_pad_menu_checkable_multi';
const keyPadCheckableMultiSource = require('!!raw-loader!./key_pad_menu_checkable_multi');

export const KeyPadMenuExample = {
  title: 'Key pad menu',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: keyPadMenuSource,
        },
      ],
      text: (
        <>
          <p>
            The <strong>EuiKeyPadMenu</strong> component presents{' '}
            <strong>EuiKeyPadMenuItems</strong> in a tiled format, with a fixed
            width which will accommodate three items and then wrap.
          </p>
          <EuiCallOut
            iconType="accessibility"
            title={
              <>
                If the menu provides navigation for your application, wrap the{' '}
                <strong>EuiKeyPadMenu</strong> with{' '}
                <EuiCode language="html">
                  {'<nav aria-label="Nav title"></nav>'}
                </EuiCode>
                .
              </>
            }
          />
        </>
      ),
      props: { EuiKeyPadMenu, EuiKeyPadMenuItem },
      snippet: keyPadMenuSnippet,
      demo: <KeyPadMenu />,
      playground: keyPadMenuItemConfig,
    },
    {
      title: 'Item button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: keyPadMenuItemButtonSource,
        },
      ],
      text: (
        <p>
          The <strong>EuiKeyPadMenuItem</strong> component can act both as an
          anchor as well as a button by specifying <EuiCode>href</EuiCode> or
          <EuiCode>onClick</EuiCode> respectively.
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
      ],
      text: (
        <div>
          <p>
            If the item links to a module that is not GA (beta, lab, etc), you
            can add a <EuiCode>betaBadgeLabel</EuiCode> and{' '}
            <EuiCode>betaBadgeTooltipContent</EuiCode> to the card and it will
            properly create and position an <strong>EuiBetaBadge</strong>.
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
    {
      title: 'Checkable',
      text: (
        <>
          <p>
            <strong>EuiKeyPadMenuItem</strong>s can also be rendered as checkbox
            or radio form controls using the <EuiCode>checkable</EuiCode> prop.
            Pass in <EuiCode>{'"multi"'}</EuiCode> for checkboxes or{' '}
            <EuiCode>{'"single"'}</EuiCode> for radios.
          </p>
          <p>
            The <strong>EuiKeyPadMenu</strong> provides it&apos;s own group
            labelling mechanism through the <EuiCode>legend</EuiCode> prop.
            Supplying this prop will properly wrap the input group in a{' '}
            <EuiCode language="html">{'<fieldset>'}</EuiCode> and display the{' '}
            <EuiCode language="html">{'<legend>'}</EuiCode>.
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: keyPadCheckableMultiSource,
        },
      ],
      demo: <KeyPadCheckableMulti />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: keyPadCheckableSource,
        },
      ],
      text: (
        <p>
          For single selection (radio) items, you must pass a singular{' '}
          <EuiCode>name</EuiCode> prop to each item to ensure they are grouped
          properly.
        </p>
      ),
      demo: <KeyPadCheckable />,
    },
  ],
};
