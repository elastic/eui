import React from 'react';

import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiCode,
  EuiButtonGroup,
  EuiButtonToggle,
  EuiCallOut,
  EuiText,
} from '../../../../src/components';

import Button from './button';
const buttonSource = require('!!raw-loader!./button');
const buttonHtml = renderToHtml(Button);
const buttonSnippet = [
  `<EuiButton><!-- Primary button --></EuiButton>
`,
  `<EuiButton fill><!-- Filled button --></EuiButton>
`,
  `<EuiButton size="s"><!-- Small button --></EuiButton>
`,
  `<EuiButton size="s" fill><!-- Small and filled button --></EuiButton>
`,
];

import ButtonWithIcon from './button_with_icon';
const buttonWithIconSource = require('!!raw-loader!./button_with_icon');
const buttonWithIconHtml = renderToHtml(Button);
const buttonWithIconSnippet = `<EuiButton iconType={icon}><!-- Button text --></EuiButton>
`;

import ButtonOption from './button_empty';
const buttonOptionSource = require('!!raw-loader!./button_empty');
const buttonOptionHtml = renderToHtml(ButtonOption);
const buttonOptionSnippet = `<EuiButtonEmpty>
  <!-- Button text -->
</EuiButtonEmpty>`;

import ButtonOptionFlush from './button_empty_flush';
const buttonOptionFlushSource = require('!!raw-loader!./button_empty_flush');
const buttonOptionFlushHtml = renderToHtml(ButtonOptionFlush);
const buttonOptionFlushSnippet = `<EuiButtonEmpty flush="left"><!-- Button text --></EuiButtonEmpty>
`;

import ButtonIcon from './button_icon';
const buttonIconSource = require('!!raw-loader!./button_icon');
const buttonIconHtml = renderToHtml(ButtonIcon);
const buttonIconSnippet = `<EuiButtonIcon
  iconType={icon}
/>`;

import ButtonGhost from './button_ghost';
const buttonGhostSource = require('!!raw-loader!./button_ghost');
const buttonGhostHtml = renderToHtml(ButtonGhost);
const buttonGhostSnippet = `<EuiButton color="ghost">
  <!-- Button text -->
</EuiButton>`;

import ButtonAsLink from './button_as_link';
const buttonAsLinkSource = require('!!raw-loader!./button_as_link');
const buttonAsLinkHtml = renderToHtml(ButtonAsLink);
const buttonAsLinkSnippet = `<EuiButton href={someUrl}><!-- Button text --></EuiButton>
`;

import ButtonLoading from './button_loading';
const buttonLoadingSource = require('!!raw-loader!./button_loading');
const buttonLoadingHtml = renderToHtml(ButtonLoading);
const buttonLoadingSnippet = `<EuiButton isLoading={true}>
  <!-- Button text -->
</EuiButton>`;

import ButtonToggle from './button_toggle';
const buttonToggleSource = require('!!raw-loader!./button_toggle');
const buttonToggleHtml = renderToHtml(ButtonToggle);
const buttonToggleSnippet = `<EuiButtonToggle
  label={label}
  iconType={toggleOn ? onIcon : offIcon}
  onChange={onToggleChange}
  isSelected={toggleOn}
/>`;

import ButtonGroup from './button_group';
const buttonGroupSource = require('!!raw-loader!./button_group');
const buttonGroupHtml = renderToHtml(ButtonGroup);
const buttonGroupSnippet = [
  `<EuiButtonGroup
  legend={legend}
  options={toggleButtons}
  idSelected={toggleIdSelected}
  onChange={onChange}
/>`,
  `<EuiButtonGroup
  legend={legend}
  options={toggleButtonsIconsMulti}
  idToSelectedMap={toggleIconIdToSelectedMap}
  onChange={onChangeIconsMulti}
  type="multi"
  isIconOnly
/>`,
];

export const ButtonExample = {
  title: 'Button',
  intro: (
    <EuiText>
      <p>
        <strong>EuiButton</strong> comes in two styles. The{' '}
        <EuiCode>fill</EuiCode> style should be reserved for the main action and
        limited in number for a single page. Be sure to read the full{' '}
        <Link to="/guidelines/buttons">button usage guidelines</Link>.
      </p>
    </EuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonHtml,
        },
      ],
      props: { EuiButton },
      snippet: buttonSnippet,
      demo: <Button />,
    },
    {
      title: 'Buttons can also be links',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonAsLinkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonAsLinkHtml,
        },
      ],
      text: (
        <p>
          Buttons will use an <EuiCode>{'<a>'}</EuiCode> tag if there is a{' '}
          <EuiCode>href</EuiCode> prop present.
        </p>
      ),
      snippet: buttonAsLinkSnippet,
      demo: <ButtonAsLink />,
    },
    {
      title: 'Button with icon',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonWithIconSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonWithIconHtml,
        },
      ],
      text: (
        <p>
          The passed <EuiCode>iconType</EuiCode> must be an acceptable{' '}
          <Link to="/display/icons">
            <strong>EuiIcon</strong>
          </Link>{' '}
          type. It can be flipped{' '}
          {
            // eslint-disable-next-line react/no-unescaped-entities
          }{' '}
          to the opposite side by passing{' '}
          <EuiCode language="js">iconSide=&quot;right&quot;</EuiCode>.
        </p>
      ),
      snippet: buttonWithIconSnippet,
      demo: <ButtonWithIcon />,
    },
    {
      title: 'Loading state',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonLoadingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonLoadingHtml,
        },
      ],
      text: (
        <p>
          Setting the <EuiCode>isLoading</EuiCode> prop to true will add the
          loading spinner or swap the existing icon for the loading spinner and
          set the button to disabled. It is good practice to also rename the
          button to &quot;Loading&hellip;&quot;.
        </p>
      ),
      snippet: buttonLoadingSnippet,
      demo: <ButtonLoading />,
    },
    {
      title: 'Empty button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonOptionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonOptionHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiButtonEmpty</strong> is used when you want to make a button
          look like a regular link, but still want to align it to the rest of
          the buttons.
        </p>
      ),
      props: { EuiButtonEmpty },
      snippet: buttonOptionSnippet,
      demo: <ButtonOption />,
    },
    {
      title: 'Flush empty button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonOptionFlushSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonOptionFlushHtml,
        },
      ],
      text: (
        <p>
          When aligning <strong>EuiButtonEmpty</strong> components to the left
          or the right, you should make sure they&rsquo;re flush with the edge
          of their container, so that they&rsquo;re horizontally aligned with
          the other content in the container.
        </p>
      ),
      snippet: buttonOptionFlushSnippet,
      demo: <ButtonOptionFlush />,
    },
    {
      title: 'Button icon',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonIconSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonIconHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiButtonIcons</strong> are buttons that only contain an icon
          (no text).
        </p>
      ),
      props: { EuiButtonIcon },
      snippet: buttonIconSnippet,
      demo: <ButtonIcon />,
    },
    {
      title: 'Toggle buttons',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonToggleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonToggleHtml,
        },
      ],
      text: (
        <div>
          <p>
            This is a specialized component that combines{' '}
            <strong>EuiButton</strong> and <strong>EuiToggle</strong> to create
            a button with an on/off state. You can pass all the same parameters
            to it as you can to <strong>EuiButton</strong>. The main difference
            is that, it does not accept any children, but a{' '}
            <EuiCode>label</EuiCode> prop instead. This is for the handling of
            accessibility with the <strong>EuiToggle</strong>.
          </p>
          <p>
            The <strong>EuiButtonToggle</strong> does not have any inherit
            visual state differences. These you must apply in your
            implementation.
          </p>
        </div>
      ),
      demo: <ButtonToggle />,
      snippet: buttonToggleSnippet,
      props: { EuiButtonToggle },
    },
    {
      title: 'Button groups',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonGroupHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>EuiButtonGroups</strong> are handled similarly to the way
            checkbox and radio groups are handled but made to look like buttons.
            They group multiple <strong>EuiButtonToggles</strong> and utilize
            the <EuiCode language="js">type=&quot;single&quot;</EuiCode> or{' '}
            <EuiCode language="js">&quot;multi&quot;</EuiCode> prop to determine
            whether multiple or only single selections are allowed per group.
          </p>
          <p>
            Stylistically, all button groups are the size of small buttons, do
            not stretch to fill the container, and typically should only be{' '}
            <EuiCode language="js">color=&quot;text&quot;</EuiCode> (default) or{' '}
            <EuiCode language="js">&quot;primary&quot;</EuiCode>. If you&apos;re
            just displaying a group of icons, add the prop{' '}
            <EuiCode>isIconOnly</EuiCode>.
          </p>
          <EuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <span>
                In order for groups to be properly read as groups with a title,
                add the <EuiCode>legend</EuiCode> prop. This is only for
                accessibility, however, so it will be visibly hidden.
              </span>
            }
          />
        </div>
      ),
      demo: <ButtonGroup />,
      snippet: buttonGroupSnippet,
      props: { EuiButtonGroup },
    },
    {
      title: 'Ghost',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonGhostSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonGhostHtml,
        },
      ],
      text: (
        <p>
          For buttons on dark color backgrounds, you can pass{' '}
          <EuiCode language="js">{'color="ghost"'}</EuiCode> to any of the
          button styles on this page. These should be used extremely rarely, and
          are only for placing buttons on top of dark or image-based
          backgrounds. A good example of their use is in the{' '}
          <Link to="/layout/bottom-bar">
            <strong>EuiBottomBar</strong>
          </Link>{' '}
          component.
        </p>
      ),
      snippet: buttonGhostSnippet,
      demo: <ButtonGhost />,
    },
  ],
};
