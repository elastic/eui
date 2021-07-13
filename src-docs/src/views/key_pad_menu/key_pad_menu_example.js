import React from 'react';
import { Link } from 'react-router-dom';
import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiCallOut,
  EuiText,
} from '../../../../src/components';
import { keyPadMenuItemConfig } from './playground';

import KeyPadMenu from './key_pad_menu';
const keyPadMenuSource = require('!!raw-loader!./key_pad_menu');
const keyPadMenuSnippet = `<nav aria-label="Nav title">
  <EuiKeyPadMenu>
    <EuiKeyPadMenuItem label={label1} href="#">
      <EuiIcon type={icon1} size="l" />
    </EuiKeyPadMenuItem>
    <EuiKeyPadMenuItem isSelected label={label2} href="#">
      <EuiIcon type={icon2} size="l" />
    </EuiKeyPadMenuItem>
  </EuiKeyPadMenu>
</nav>`;

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
  intro: (
    <>
      <EuiText>
        <p>
          The <strong>EuiKeyPadMenu</strong> component presents{' '}
          <strong>EuiKeyPadMenuItems</strong> in a tiled format, with a fixed
          width which will accommodate three items and then wrap.
        </p>
      </EuiText>
    </>
  ),
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
            <strong>EuiKeyPadMenu</strong> is just a wrapping element for
            creating the list elements but you must declare each{' '}
            <strong>EuiKeyPadMenu</strong> component manually.
          </p>
          <EuiCallOut
            color="warning"
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
    },
    {
      title: 'Menu item',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: keyPadMenuItemButtonSource,
        },
      ],
      text: (
        <>
          <p>
            The <strong>EuiKeyPadMenuItem</strong> component can act both as an
            anchor as well as a button by specifying <EuiCode>href</EuiCode> or{' '}
            <EuiCode>onClick</EuiCode> respectively. It requires a text-based{' '}
            <EuiCode>label</EuiCode> and <EuiCode>children</EuiCode> for
            declaring the <Link to="/display/icons">icon</Link>. This is the
            most flexible way for handling the customization of the icon itself.
          </p>
          <p>
            When using the <EuiCode>isSelected</EuiCode> prop to create a toggle
            button, you must supply both the <EuiCode>true</EuiCode> and{' '}
            <EuiCode>false</EuiCode> states explicitly.
          </p>
        </>
      ),
      snippet: keyPadMenuItemButtonSnippet,
      playground: keyPadMenuItemConfig,
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
        <>
          <p>
            If the item links to a module that is not GA (beta, lab, etc), you
            can add a <EuiCode>betaBadgeLabel</EuiCode> and{' '}
            <EuiCode>betaBadgeTooltipContent</EuiCode> to the card and it will
            properly create and position an{' '}
            <Link to="/display/badge#beta-badge-type">
              <strong>EuiBetaBadge</strong>
            </Link>
            .
          </p>
          <p>
            Supplying just a label will only show the first letter in the badge
            but displays the full label to the tooltip. You can also pass an{' '}
            <EuiCode>iconType</EuiCode> to replace the letter.
          </p>
        </>
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
            The <strong>EuiKeyPadMenu</strong> provides it&apos;s own form group
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
