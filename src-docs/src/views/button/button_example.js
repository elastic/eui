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
  EuiCallOut,
  EuiText,
} from '../../../../src/components';

import { EuiButtonGroupOptionProps } from '!!prop-loader!../../../../src/components/button/button_group/button_group';

import Guidelines from './guidelines';
import Playground from './playground';

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
const buttonIconSnippet = [
  `<EuiButtonIcon
  iconType={icon}
/>`,
  `<EuiButtonIcon
  display="fill"
  iconType={icon}
/>`,
  `<EuiButtonIcon
  display="base"
  size="s"
  iconType={icon}
/>`,
];

import SplitButton from './split_button';
const splitButtonSource = require('!!raw-loader!./split_button');
const splitButtonHtml = renderToHtml(SplitButton);
const splitButtonSnippet = [
  `<EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
  <EuiFlexItem grow={false}>
    <EuiButton size="s">
      Primary action
    </EuiButton>
  </EuiFlexItem>
  <EuiFlexItem grow={false}>
    <EuiButtonIcon
      display="base"
      size="s"
      iconType="boxesVertical"
      aria-label="More"
    />
  </EuiFlexItem>
</EuiFlexGroup>`,
];

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
const buttonToggleSnippet = [
  `<EuiButton
  iconType={toggleOn ? onIcon : offIcon}
  onClick={onToggleChange}
>
  {toggleOn ? onLabel : offLabel}
</EuiButton>
`,
  `<EuiButton
  isSelected={toggleOn}
  fill={toggleOn}
  onClick={onToggleChange}
  >
  <!-- Button text -->
</EuiButton>`,
  `<EuiButton
  aria-pressed={toggleOn}
  fill={toggleOn}
  onClick={onToggleChange}
>
  <!-- Button text -->
</EuiButton>`,
];

import ButtonGroup from './button_group';
const buttonGroupSource = require('!!raw-loader!./button_group');
const buttonGroupHtml = renderToHtml(ButtonGroup);
const buttonGroupSnippet = [
  `<EuiButtonGroup
  type="single"
  legend={legend}
  name={name}
  options={[
    {
      id,
      label'
    }
  ]}
  idSelected={idSelected}
  onChange={(optionId) => {}}
/>`,
  `<EuiButtonGroup
  type="multi"
  isIconOnly
  legend={legend}
  options={[
    {
      id,
      label,
      iconType,
    }
  ]}
  idToSelectedMap={{ optionId: true }}
  onChange={(optionId, optionValue) => {}}
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
        <Link to="/guidelines/button">button usage guidelines</Link>.
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
      props: { EuiButtonEmpty },
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
        <>
          <p>
            An <strong>EuiButtonIcon</strong> is a button that only contains an
            icon (no text). Use the <EuiCode>display</EuiCode> and{' '}
            <EuiCode>size</EuiCode> props to match the appearance of your{' '}
            <strong>EuiButtonIcon</strong> to other standard buttons. By default
            they will appear as <EuiCode>xs</EuiCode>, <EuiCode>empty</EuiCode>{' '}
            buttons.
          </p>
          <EuiCallOut
            size="s"
            color="warning"
            iconType="accessibility"
            title={
              <>
                <strong>EuiButtonIcon</strong> requires an{' '}
                <EuiCode>aria-label</EuiCode> to express the meaning to screen
                readers.
              </>
            }
          />
        </>
      ),
      props: { EuiButtonIcon },
      snippet: buttonIconSnippet,
      demo: <ButtonIcon />,
    },
    {
      title: 'Split buttons',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: splitButtonSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: splitButtonHtml,
        },
      ],
      text: (
        <>
          <p>
            EUI does not support split buttons specifically. Instead, we
            recommend using separate buttons for the main and overflow actions.
            You can achieve this by simply using the <EuiCode>display</EuiCode>{' '}
            and <EuiCode>size</EuiCode> props <strong>EuiButtonIcon</strong> to
            match that of the primary action button.
          </p>
        </>
      ),
      props: { EuiButton, EuiButtonIcon },
      snippet: splitButtonSnippet,
      demo: <SplitButton />,
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
        <>
          <p>
            You can create a toggle style button with any button type like the
            standard <strong>EuiButton</strong>, <strong>EuiButtonEmpty</strong>
            , or <strong>EuiButtonIcon</strong>. Use state management to handle
            the visual differences for on and off. Though there are two{' '}
            <strong>exclusive</strong> situations to consider.
          </p>
          <ol>
            <li>
              If your button changes its readable <strong>text</strong>, via
              children or <EuiCode>aria-label</EuiCode>, then there is no
              additional accessibility concern.
            </li>
            <li>
              If your button only changes the <strong>visual</strong>{' '}
              appearance, you must add <EuiCode>aria-pressed</EuiCode> passing a
              boolean for the on and off states. All EUI button types provide a
              helper prop for this called <EuiCode>isSelected</EuiCode>.
            </li>
          </ol>
          <EuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <span>
                Do not add <EuiCode>aria-pressed</EuiCode> or{' '}
                <EuiCode>isSelected</EuiCode> if you also change the readable
                text.
              </span>
            }
          />
        </>
      ),
      demo: <ButtonToggle />,
      snippet: buttonToggleSnippet,
      props: { EuiButton, EuiButtonIcon },
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
            <strong>EuiButtonGroups</strong> utilize the{' '}
            <EuiCode language="js">type=&quot;single&quot;</EuiCode> or{' '}
            <EuiCode language="js">&quot;multi&quot;</EuiCode> prop to determine
            whether multiple or only single selections are allowed per group. If
            you&apos;re just displaying a group of icons, add the prop{' '}
            <EuiCode>isIconOnly</EuiCode>.
          </p>
          <EuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <span>
                In order for groups to be properly read as groups with a title,
                the <EuiCode>legend</EuiCode> prop is <strong>required</strong>.
                This is only for accessibility, however, so it will be visibly
                hidden.
              </span>
            }
          />
        </div>
      ),
      demo: <ButtonGroup />,
      snippet: buttonGroupSnippet,
      props: { EuiButtonGroup, EuiButtonGroupOptionProps },
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
  guidelines: <Guidelines />,
  playground: Playground,
};
