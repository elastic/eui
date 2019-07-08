import React from 'react';

import { Link } from 'react-router';

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
  iconType={this.state.toggleOn ? onIcon : offIcon}
  onChange={this.onToggleChange}
  isSelected={this.state.toggleOn}
/>`;

import ButtonGroup from './button_group';
const buttonGroupSource = require('!!raw-loader!./button_group');
const buttonGroupHtml = renderToHtml(ButtonGroup);
const buttonGroupSnippet = [
  `<EuiButtonGroup
  legend={legend}
  options={this.toggleButtons}
  idSelected={this.state.toggleIdSelected}
  onChange={this.onChange}
/>`,
  `<EuiButtonGroup
  legend={legend}
  options={this.toggleButtonsIconsMulti}
  idToSelectedMap={this.state.toggleIconIdToSelectedMap}
  onChange={this.onChangeIconsMulti}
  type="multi"
  isIconOnly
/>`,
];

export const ButtonExample = {
  title: 'Button',
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
      title: 'Button with Icon',
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
          The passed icon needs to come from our list of svg icons. Can be
          flipped{' '}
          {
            // eslint-disable-next-line react/no-unescaped-entities
          }{' '}
          to the other side by passing{' '}
          <EuiCode>iconSide=&quot;right&quot;</EuiCode>.
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
      title: 'ButtonEmpty',
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
          <EuiCode>EuiButtonEmpty</EuiCode> is used when you want to make a
          button look like a regular link, but still want to align it to the
          rest of the buttons.
        </p>
      ),
      props: { EuiButtonEmpty },
      snippet: buttonOptionSnippet,
      demo: <ButtonOption />,
    },
    {
      title: 'Flush ButtonEmpty',
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
          When aligning <EuiCode>EuiButtonEmpty</EuiCode> components to the left
          or the right, you should make sure they&rsquo;re flush with the edge
          of their container, so that they&rsquo;re horizontally aligned with
          the other content in the container.
        </p>
      ),
      snippet: buttonOptionFlushSnippet,
      demo: <ButtonOptionFlush />,
    },
    {
      title: 'Button Icon',
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
        <p>Button icons are buttons that only contain an icon (no text).</p>
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
            <EuiCode>EuiButton</EuiCode> and <EuiCode>EuiToggle</EuiCode> to
            create a button with an on/off state. You can pass all the same
            parameters to it as you can to <EuiCode>EuiButton</EuiCode>. The
            main difference is that, it does not accept any children, but a{' '}
            <EuiCode>label</EuiCode> prop instead. This is for the handling of
            accessibility with the <EuiCode>EuiToggle</EuiCode>.
          </p>
          <p>
            The <EuiCode>EuiButtonToggle</EuiCode> does not have any inherit
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
      title: 'Groups',
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
            Button groups are handled similarly to the way checkbox and radio
            groups are handled but made to look like buttons. They group
            multiple <EuiCode>EuiButtonToggle</EuiCode>s and utilize the{' '}
            <EuiCode>type=&quot;single&quot;</EuiCode> or{' '}
            <EuiCode>&quot;multi&quot;</EuiCode> prop to determine whether
            multiple or only single selections are allowed per group.
          </p>
          <p>
            Stylistically, all button groups are the size of small buttons, do
            not stretch to fill the container, and typically should only be{' '}
            <EuiCode>color=&quot;text&quot;</EuiCode> (default) or{' '}
            <EuiCode>&quot;primary&quot;</EuiCode>. If you&apos;re just
            displaying a group of icons, add the prop{' '}
            <EuiCode>isIconOnly</EuiCode>.
          </p>
          <EuiCallOut title="Accessibility">
            <p>
              In order for groups to be properly read as groups with a title,
              add the <EuiCode>legend</EuiCode> prop. This is only for
              accessibility, however, so it will be visibly hidden.
            </p>
          </EuiCallOut>
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
          <EuiCode>color=&apos;ghost&apos;</EuiCode> to any of the button styles
          on this page. These should be used extremely rarely, and are only for
          placing buttons on top of dark or image-based backgrounds. A good
          example of their use is in the{' '}
          <Link to="/layout/bottom-bar">EuiBottomBar</Link> component.
        </p>
      ),
      snippet: buttonGhostSnippet,
      demo: <ButtonGhost />,
    },
  ],
};
