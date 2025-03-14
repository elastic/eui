import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiBadge,
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiCode,
  EuiButtonGroup,
  EuiCallOut,
  EuiLink,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiCard,
  EuiPanel,
  EuiSpacer,
} from '../../../../src/components';

import { EuiButtonGroupOptionProps } from '!!prop-loader!../../../../src/components/button/button_group/button_group';

import Guidelines from './guidelines';
import {
  buttonConfig,
  buttonEmptyConfig,
  buttonIconConfig,
  buttonGroupConfig,
  buttonIconGroupConfig,
} from './playground';

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
const buttonIconSnippet = [
  '<EuiButtonIcon iconType={icon} aria-label={label} />',
  '<EuiButtonIcon display="fill" iconType={icon} aria-label={label} />',
  '<EuiButtonIcon size="s" iconType={icon} aria-label={label} />',
];

import SplitButton from './split_button';
const splitButtonSource = require('!!raw-loader!./split_button');
const splitButtonSnippet = [
  `<EuiFlexGroup responsive={false} gutterSize="xs" alignItems="center">
  <EuiFlexItem grow={false}>
    <EuiButton size="s" fill>
      Primary action
    </EuiButton>
  </EuiFlexItem>
  <EuiFlexItem grow={false}>
    <EuiButtonIcon
      display="fill"
      size="s"
      iconType="boxesVertical"
      aria-label="More"
    />
  </EuiFlexItem>
</EuiFlexGroup>`,
];

import ButtonAsLink from './button_as_link';
const buttonAsLinkSource = require('!!raw-loader!./button_as_link');
const buttonAsLinkSnippet = `<EuiButton href={someUrl}><!-- Button text --></EuiButton>
`;

import ButtonLoading from './button_loading';
const buttonLoadingSource = require('!!raw-loader!./button_loading');
const buttonLoadingSnippet =
  '<EuiButton isLoading={true}><!-- Button text --></EuiButton>';

import ButtonToggle from './button_toggle';
const buttonToggleSource = require('!!raw-loader!./button_toggle');
import ButtonToggleAria from './button_toggle_aria';
const buttonToggleAriaSource = require('!!raw-loader!./button_toggle_aria');
const buttonToggleSnippet = `<EuiButton
  iconType={toggleOn ? onIcon : offIcon}
  onClick={onToggleChange}
>
  {toggleOn ? onLabel : offLabel}
</EuiButton>
`;
const buttonToggleAriaSnippet = [
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
const buttonGroupSnippet = [
  `<EuiButtonGroup
  legend={legend}
  name={name}
  idSelected={toggleIdSelected}
  onChange={(optionId) => {}}
  options={[
    {
      id,
      label
    }
  ]}
/>`,
  `<EuiButtonGroup
  type="multi"
  legend={legend}
  idToSelectedMap={{ optionId: true }}
  onChange={(optionId) => {}}
  options={[
    {
      id,
      label
    }
  ]}
/>`,
];

import ButtonGroupIcons from './button_group_icon';
const buttonGroupIconsSource = require('!!raw-loader!./button_group_icon');
const buttonGroupIconsSnippet = [
  `<EuiButtonGroup
  isIconOnly
  legend={legend}
  name={name}
  options={[
    {
      id,
      label,
      iconType,
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
  onChange={(optionId) => {}}
/>`,
];

import ButtonGroupCompressed from './button_group_compressed';
const buttonGroupCompressedSource = require('!!raw-loader!./button_group_compressed');
const buttonGroupCompressedSnippet = [
  `<EuiButtonGroup
  legend={legend}
  name={name}
  options={[
    {
      id,
      label,
    }
  ]}
  idSelected={idSelected}
  onChange={(optionId) => {}}
  buttonSize="compressed"
  isFullWidth
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
  onChange={(optionId) => {}}
  buttonSize="compressed"
  isFullWidth
/>`,
];

import ButtonGroupToolTips from './button_group_tooltips';
const buttonGroupToolTipsSource = require('!!raw-loader!./button_group_tooltips');
const buttonGroupToolTipsSnippet = [
  `<EuiButtonGroup
  legend={legend}
  options={[
    {
      id,
      label,
      toolTipContent,
      toolTipProps: {
        title,
        delay,
        position,
      },
    },
  ]}
  idSelected={idSelected}
  onChange={(optionId) => {}}
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
      <p>
        Be sure to read the full{' '}
        <Link to="/guidelines/button">button usage guidelines</Link>.
      </p>
    </EuiText>
  ),
  sections: [
    {
      text: (
        <>
          <EuiSpacer size="xl" />
          <EuiFlexGroup wrap>
            <EuiFlexItem>
              <EuiCard
                hasBorder
                href="#/navigation/button#basic-button"
                image={
                  <EuiPanel color="transparent" borderRadius="none">
                    <EuiPanel color="subdued">
                      <EuiButton fill>Primary action</EuiButton>
                    </EuiPanel>
                  </EuiPanel>
                }
                title="EuiButton"
                titleSize="xs"
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiCard
                hasBorder
                href="#/navigation/button#basic-button"
                image={
                  <EuiPanel color="transparent" borderRadius="none">
                    <EuiPanel color="subdued">
                      <EuiButton>Secondary action</EuiButton>
                    </EuiPanel>
                  </EuiPanel>
                }
                title="EuiButton"
                titleSize="xs"
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiCard
                hasBorder
                href="#/navigation/button#empty-button"
                image={
                  <EuiPanel color="transparent" borderRadius="none">
                    <EuiPanel color="subdued">
                      <EuiButtonEmpty>Tertiary action</EuiButtonEmpty>
                    </EuiPanel>
                  </EuiPanel>
                }
                title="EuiButtonEmpty"
                titleSize="xs"
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiCard
                hasBorder
                href="#/navigation/button#icon-buttons"
                image={
                  <EuiPanel color="transparent" borderRadius="none">
                    <EuiPanel color="subdued">
                      <EuiButtonIcon
                        display="base"
                        size="m"
                        iconType="refresh"
                        aria-label="Button icon example with refresh icon"
                      />
                    </EuiPanel>
                  </EuiPanel>
                }
                title="EuiButtonIcon"
                titleSize="xs"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </>
      ),
    },
    {
      title: 'Basic button',
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
          <p>
            All button components accept an <EuiCode>iconType</EuiCode> which
            must be an acceptable{' '}
            <Link to="/display/icons">
              <strong>EuiIcon</strong>
            </Link>{' '}
            type. Multi-color icons like app icons will be converted to single
            color. Icons can be displayed on the opposite side by passing{' '}
            <EuiCode language="js">{'iconSide="right"'}</EuiCode>.
          </p>
        </>
      ),
      props: { EuiButton },
      snippet: buttonSnippet,
      demo: <Button />,
      demoPanelProps: { color: 'subdued' },
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
          Use <strong>EuiButtonEmpty</strong> when you want to reduce the
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
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonOptionFlushSource,
        },
      ],
      text: (
        <>
          <h3 id="emptyButton-flush">Flush empty button</h3>
          <p>
            By default, buttons contain padding. Apply the{' '}
            <EuiCode>flush</EuiCode> property in cases where precise alignment
            and spacing is desired. This situation can arise when{' '}
            <strong>EuiButtonEmpty</strong> appears within a horizontal list of
            buttons such as a menu.
          </p>
        </>
      ),
      props: { EuiButtonEmpty },
      snippet: buttonOptionFlushSnippet,
      demo: <ButtonOptionFlush />,
      demoPanelProps: { color: 'subdued' },
    },
    {
      title: 'Icon button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonIconSource,
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
            color="warning"
            size="s"
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
      playground: buttonIconConfig,
    },
    {
      title: 'Button group',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonGroupSource,
        },
      ],
      text: (
        <>
          <p>
            An <strong>EuiButtonGroup</strong> is for indicating{' '}
            <strong>selection</strong> only. They utilize the{' '}
            <EuiCode language="js">type=&quot;single&quot;</EuiCode> or{' '}
            <EuiCode language="js">&quot;multi&quot;</EuiCode> prop to determine
            whether multiple or only single selections are allowed per group.
          </p>
          <EuiCallOut
            iconType="accessibility"
            color="warning"
            size="s"
            title={
              <span>
                In order for groups to be properly read as groups with a title,
                the <EuiCode>legend</EuiCode> prop is <strong>required</strong>.
                This is only for accessibility, however, so it will be visibly
                hidden.
              </span>
            }
          />
        </>
      ),
      demo: <ButtonGroup />,
      demoPanelProps: { color: 'subdued' },
      snippet: buttonGroupSnippet,
      props: { EuiButtonGroup, EuiButtonGroupOptionProps },
      playground: buttonGroupConfig,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonGroupIconsSource,
        },
      ],
      text: (
        <>
          <h3 id="buttonGroup-isIconOnly">Icon only button group</h3>
          <p>
            Use the <EuiCode>isIconOnly</EuiCode> prop when displaying a group
            of icon-only buttons.
          </p>
        </>
      ),
      demo: <ButtonGroupIcons />,
      snippet: buttonGroupIconsSnippet,
      props: { EuiButtonGroup, EuiButtonGroupOptionProps },
      playground: buttonIconGroupConfig,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonGroupToolTipsSource,
        },
      ],
      text: (
        <>
          <h3 id="buttonGroup-toolTipContent">Button group tooltips</h3>
          <p>
            Buttons within a button group will automatically display a default
            browser tooltip containing the button <EuiCode>label</EuiCode> text.
            This can be customized or unset via the <EuiCode>title</EuiCode>{' '}
            property in your <EuiCode>options</EuiCode> button configuration.
          </p>
          <p>
            To instead display an <strong>EuiToolTip</strong> around your
            button(s), pass the <EuiCode>toolTipContent</EuiCode> property. You
            can also use <EuiCode>toolTipProps</EuiCode> to customize tooltip
            placement, title, and any other prop that{' '}
            <Link to="/#/display/tooltip">
              <strong>EuiToolTip</strong>
            </Link>{' '}
            accepts.
          </p>
        </>
      ),
      demo: <ButtonGroupToolTips />,
      snippet: buttonGroupToolTipsSnippet,
      props: { EuiButtonGroupOptionProps },
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonGroupCompressedSource,
        },
      ],
      text: (
        <>
          <h3 id="buttonGroup-compressed">Button group in forms</h3>
          <EuiBadge>Pattern</EuiBadge>
          <EuiSpacer />
          <p>
            When using button groups within compressed forms, match the form
            elements by adding <EuiCode>{'buttonSize="compressed"'}</EuiCode>.
            Compressed groups should always be <EuiCode>fullWidth</EuiCode> so
            they line up nicely in their small container <strong>unless</strong>{' '}
            they are icon only.
          </p>
          <p>
            For a more detailed example of how to integrate with forms, see the{' '}
            <Link to="/forms/compressed-forms#complex-example">
              &quot;Complex example&quot;
            </Link>{' '}
            on the compressed forms page.{' '}
          </p>
        </>
      ),
      demo: <ButtonGroupCompressed />,
      snippet: buttonGroupCompressedSnippet,
      props: { EuiButtonGroup, EuiButtonGroupOptionProps },
      demoPanelProps: { color: 'subdued' },
    },
    {
      title: 'Split button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: splitButtonSource,
        },
      ],
      text: (
        <>
          <EuiBadge>Pattern</EuiBadge>
          <EuiSpacer />
          <p>
            EUI{' '}
            <EuiLink href="https://github.com/elastic/eui/issues/4171">
              does not support
            </EuiLink>{' '}
            split buttons specifically. Instead, use separate buttons for the
            main and overflow actions. This pattern is achieved by setting the{' '}
            <EuiCode>display</EuiCode> and <EuiCode>size</EuiCode> props on{' '}
            <strong>EuiButtonIcon</strong> to match that of the primary button.
          </p>
        </>
      ),
      props: { EuiButton, EuiButtonIcon },
      snippet: splitButtonSnippet,
      demo: <SplitButton />,
    },
    {
      title: 'Toggle button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonToggleSource,
        },
      ],
      text: (
        <>
          <EuiBadge>Pattern</EuiBadge>
          <EuiSpacer />
          <p>
            A toggle button can be built with any button including the standard{' '}
            <strong>EuiButton</strong>, <strong>EuiButtonEmpty</strong>, or{' '}
            <strong>EuiButtonIcon</strong>. Use state management to handle the
            visual differences for on and off.
          </p>
          <p>
            Consider the followingn exception cases when building a toggle
            button.
          </p>
          <ol>
            <li>
              If your button changes its readable <strong>text</strong>, via
              children or <EuiCode>aria-label</EuiCode>, then there is no
              additional accessibility concern.
            </li>
          </ol>
        </>
      ),
      demo: <ButtonToggle />,
      snippet: buttonToggleSnippet,
      props: { EuiButton, EuiButtonIcon },
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonToggleAriaSource,
        },
      ],
      text: (
        <>
          <ol start={2}>
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
            size="s"
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
      demo: <ButtonToggleAria />,
      snippet: buttonToggleAriaSnippet,
      props: { EuiButton, EuiButtonIcon },
    },
    {
      title: 'Loading state',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonLoadingSource,
        },
      ],
      text: (
        <p>
          Setting the <EuiCode>isLoading</EuiCode> prop to true will display a
          loading spinner, swap the current icon if one is present, and set the
          disabled state. It is also recommended to change the button label to
          &quot;Loading&hellip;&quot;.
        </p>
      ),
      snippet: buttonLoadingSnippet,
      demo: <ButtonLoading />,
    },
    {
      title: 'Using href and onClick',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonAsLinkSource,
        },
      ],
      text: (
        <>
          <p>
            Every button component accepts either an <EuiCode>href</EuiCode>{' '}
            (rendered as an <EuiCode language="html">{'<a>'}</EuiCode>) or an{' '}
            <EuiCode>onClick</EuiCode> (rendered as a{' '}
            <EuiCode language="html">{'<button>'}</EuiCode>). While they also
            accept both props to be applied simultaneously to support certain
            routing mechansims, it is not usually recommended. For more specific
            information on how to integrate EUI buttons with react-router,{' '}
            <EuiLink href="https://github.com/elastic/eui/blob/main/wiki/consuming-eui/react-router.md#how-react-router-works">
              see this wiki page
            </EuiLink>
            .
          </p>
          <p>
            If you are creating a purely text-based link, like the one in the
            previous paragraph, use{' '}
            <Link to="/navigation/link">
              <strong>EuiLink</strong>
            </Link>{' '}
            instead.
          </p>
        </>
      ),
      snippet: buttonAsLinkSnippet,
      demo: <ButtonAsLink />,
    },
  ],
  guidelines: <Guidelines />,
};
