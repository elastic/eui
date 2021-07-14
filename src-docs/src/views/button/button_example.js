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
  EuiTitle,
  EuiLink,
  EuiText,
} from '../../../../src/components';

import { EuiButtonGroupOptionProps } from '!!prop-loader!../../../../src/components/button/button_group/button_group';

import Guidelines from './guidelines';
import { buttonConfig, buttonEmptyConfig } from './playground';

import Button from './button';
const buttonSource = require('!!raw-loader!./button');
const buttonSnippet = [
  `<EuiButton><!-- Primary button --></EuiButton>
`,
  `<EuiButton fill><!-- Filled button --></EuiButton>
`,
  `<EuiButton size="s"><!-- Small button --></EuiButton>
`,
  `<EuiButton size="s" fill><!-- Small and filled button --></EuiButton>
`,
  `<EuiButton fullWidth><!-- Full width button --></EuiButton>
`,
  `<EuiButton isDisabled><!-- Disabled button --></EuiButton>
`,
];

import ButtonWithIcon from './button_with_icon';
const buttonWithIconSource = require('!!raw-loader!./button_with_icon');
const buttonWithIconSnippet = [
  '<EuiButton iconType={icon}><!-- Button text --></EuiButton>',
  '<EuiButton iconType={icon} iconSide="right"><!-- Button text --></EuiButton>',
];

import ButtonOption from './button_empty';
const buttonOptionSource = require('!!raw-loader!./button_empty');
const buttonOptionSnippet = [
  `<EuiButtonEmpty>
  <!-- Empty button -->
</EuiButtonEmpty>`,
  `<EuiButtonEmpty size="s">
  <!-- Empty button -->
</EuiButtonEmpty>`,
  `<EuiButtonEmpty size="xs">
  <!-- Empty button -->
</EuiButtonEmpty>`,
];

import ButtonOptionFlush from './button_empty_flush';
const buttonOptionFlushSource = require('!!raw-loader!./button_empty_flush');
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

import ButtonGroupIcons from './button_group_icon';
const buttonGroupIconsSource = require('!!raw-loader!./button_group_icon');
const buttonGroupIconsHtml = renderToHtml(ButtonGroupIcons);

import ButtonGroupCompressed from './button_group_compressed';
const buttonGroupCompressedSource = require('!!raw-loader!./button_group_compressed');
const buttonGroupCompressedHtml = renderToHtml(ButtonGroupCompressed);
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
];
const buttonGroupIconsSnippet = [
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
        EUI provides many types, colors and configurations of buttons. The one
        best suited for you context depends on placement, prominence, and state.
        For primary and secondary actions it is best to use the basic{' '}
        <strong>EuiButton</strong>. For tertiary or low prominence actions, use{' '}
        <strong>EuiButtonEmpty</strong>.
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
      ],
      text: (
        <>
          <p>
            The most standard button component is <strong>EuiButton</strong>{' '}
            which comes in two styles and two sizes. The <EuiCode>fill</EuiCode>{' '}
            style should be reserved for the main action and limited in number
            for a single page. Use the small size (
            <EuiCode>{'size="s"'}</EuiCode>) when placing buttons into smaller
            containers like popovers.
          </p>
          <p>
            When using colors other than <EuiCode>primary</EuiCode>, be sure
            that either the words or an icon also represents the status. For
            instance, don&apos;t rely on color alone to represent dangerous
            actions but use words like &quot;Delete&quot; not
            &quot;Confirm&quot;. The <EuiCode>text</EuiCode> and{' '}
            <EuiCode>accent</EuiCode> colors should be used sparingly as they
            can easily be confused with other states like disabled and danger.
          </p>
        </>
      ),
      props: { EuiButton },
      snippet: buttonSnippet,
      demo: <Button />,
      playground: buttonConfig,
    },
    {
      title: 'Empty button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonOptionSource,
        },
      ],
      text: (
        <p>
          Use <strong>EuiButtonEmpty</strong> when you want to make reduce the
          importance of the button, but still want to align it to the rest of
          the buttons. It is also the only button component that supports down
          to size <EuiCode>xs</EuiCode>.
        </p>
      ),
      props: { EuiButtonEmpty },
      snippet: buttonOptionSnippet,
      demo: <ButtonOption />,
      playground: buttonEmptyConfig,
    },
    {
      title: 'Flush empty button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonOptionFlushSource,
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
      title: 'Buttons with icons',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonWithIconSource,
        },
      ],
      text: (
        <p>
          All button components accept an <EuiCode>iconType</EuiCode> which must
          be an acceptable{' '}
          <Link to="/display/icons">
            <strong>EuiIcon</strong>
          </Link>{' '}
          type. Multi-color icons like app icons will be converted to single
          color. Icons can be displayed on the opposite side by passing{' '}
          <EuiCode language="js">{'iconSide="right"'}</EuiCode>.
        </p>
      ),
      snippet: buttonWithIconSnippet,
      demo: <ButtonWithIcon />,
    },
    {
      title: 'Buttons as links',
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
          Every button component accepts either an <EuiCode>href</EuiCode>{' '}
          (rendering it as an <EuiCode language="html">{'<a>'}</EuiCode>) or an{' '}
          <EuiCode>onClick</EuiCode> (rendering it as a{' '}
          <EuiCode language="html">{'<button>'}</EuiCode>). While they also
          accept both props to be applied simultaneously to support certain
          routing mechansims, it is not usually recommended. For more specific
          information on how to integrate EUI buttons with react-router,{' '}
          <EuiLink href="https://github.com/elastic/eui/blob/master/wiki/react-router.md#how-react-router-works">
            see this wiki page
          </EuiLink>
          .
        </p>
      ),
      snippet: buttonAsLinkSnippet,
      demo: <ButtonAsLink />,
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
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonGroupIconsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonGroupIconsHtml,
        },
      ],
      wrapText: false,
      text: (
        <EuiTitle size="xs">
          <h3>Icons only</h3>
        </EuiTitle>
      ),
      demo: <ButtonGroupIcons />,
      snippet: buttonGroupIconsSnippet,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonGroupCompressedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonGroupCompressedHtml,
        },
      ],
      demo: <ButtonGroupCompressed />,
    },
    {
      title: 'Ghost',
      ghostBackground: true,
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
};
