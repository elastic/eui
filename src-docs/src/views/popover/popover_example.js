import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiInputPopover,
  EuiPopover,
  EuiPopoverTitle,
  EuiPopoverFooter,
  EuiCallOut,
} from '../../../../src/components';

import Popover from './popover';
const popoverSource = require('!!raw-loader!./popover');
const popoverHtml = renderToHtml(Popover);

import TrapFocus from './trap_focus';
const trapFocusSource = require('!!raw-loader!./trap_focus');
const trapFocusHtml = renderToHtml(TrapFocus);

import PopoverAnchorPosition from './popover_anchor_position';
const popoverAnchorPositionSource = require('!!raw-loader!./popover_anchor_position');
const popoverAnchorPositionHtml = renderToHtml(PopoverAnchorPosition);

import PopoverPanelClassName from './popover_panel_class_name';
const popoverPanelClassNameSource = require('!!raw-loader!./popover_panel_class_name');
const popoverPanelClassNameHtml = renderToHtml(PopoverPanelClassName);

import PopoverWithTitle from './popover_with_title';
const popoverWithTitleSource = require('!!raw-loader!./popover_with_title');
const popoverWithTitleHtml = renderToHtml(PopoverWithTitle);

import PopoverWithTitlePadding from './popover_with_title_padding';
const popoverWithTitlePaddingSource = require('!!raw-loader!./popover_with_title_padding');
const popoverWithTitlePaddingHtml = renderToHtml(PopoverWithTitlePadding);

import PopoverHTMLElementAnchor from './popover_htmlelement_anchor';
const popoverHTMLElementAnchorSource = require('!!raw-loader!./popover_htmlelement_anchor');
const popoverHTMLElementAnchorHtml = renderToHtml(PopoverHTMLElementAnchor);

import PopoverContainer from './popover_container';
const popoverContainerSource = require('!!raw-loader!./popover_container');
const popoverContainerHtml = renderToHtml(PopoverContainer);

import PopoverFixed from './popover_fixed';
const popoverFixedSource = require('!!raw-loader!./popover_fixed');
const popoverFixedHtml = renderToHtml(PopoverFixed);

import PopoverBlock from './popover_block';
const popoverBlockSource = require('!!raw-loader!./popover_block');
const popoverBlockHtml = renderToHtml(PopoverBlock);

import InputPopover from './input_popover';
const inputPopoverSource = require('!!raw-loader!./input_popover');
const inputPopoverHtml = renderToHtml(PopoverBlock);

const popOverSnippet = `<EuiPopover
  ownFocus
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}>
  <!-- Popover content -->
</EuiPopover>`;

const trapFocusSnippet = `<EuiPopover
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}>
  <!-- Popover content -->
</EuiPopover>`;

const popoverAnchorSnippet = `<EuiPopover
  ownFocus
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  anchorPosition="downLeft">
  <!-- Popover content -->
</EuiPopover>`;

const popoverWithTitleSnippet = `<EuiPopover
  ownFocus
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}>
  <EuiPopoverTitle><!-- Popover title --></EuiPopoverTitle>
  <!-- Popover content -->
  <EuiPopoverFooter><!-- Popover footer --></EuiPopoverFooter>
</EuiPopover>`;

const popoverPanelClassNameSnippet = `<EuiPopover
  ownFocus
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  panelClassName="yourClassNameHere"
  panelPaddingSize="none">
  <!-- Content for popover with custom class name and custom padding -->
</EuiPopover>`;

const popoverWithTitlePaddingSnippet = `<EuiPopover
  ownFocus
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  panelPaddingSize="none">
  <EuiPopoverTitle paddingSize="s"><!-- Popover title --></EuiPopoverTitle>
  <!-- Content for popover without padding -->
  <EuiPopoverFooter paddingSize="s"><!-- Popover footer --></EuiPopoverFooter>
</EuiPopover>`;

const popoverContainerSnippet = `<EuiPopover
  ownFocus
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  container={panel}>
  <!-- Content for popover inside a container -->
</EuiPopover>`;

const popoverFixedSnippet = `<EuiPopover
  ownFocus
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  repositionOnScroll={true}>
  <!-- Content for popover on a fixed element -->
</EuiPopover>`;

const popoverBlockSnippet = `<EuiPopover
  ownFocus
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  display="block">
  <!-- Content for popover with display block anchor -->
</EuiPopover>`;

const inputPopoverSnippet = `<EuiInputPopover
  input={input}
  isOpen={isPopoverOpen}
  closePopover={closePopover}>
  <!-- Popover content attached to input -->
</EuiInputPopover>`;

export const PopoverExample = {
  title: 'Popover',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverHtml,
        },
      ],
      text: (
        <>
          <p>
            Use the <strong>EuiPopover</strong> component to hide controls or
            options behind a clickable element. A popover is temporary so keep
            tasks simple and narrowly focused.
          </p>
          <p>
            While the visibility of the popover is maintained by the consuming
            application, popovers will automatically close when clicking outside
            of the popover bounds. Therefore all work done in a popover should
            automatically be saved.
          </p>
          <p>
            Avoid popover inception (popover triggering another popover), and
            instead use a{' '}
            <Link to="/navigation/context-menu">
              <strong>EuiContextMenu</strong>
            </Link>{' '}
            to swap the popover panel content.
          </p>
        </>
      ),
      props: { EuiPopover },
      snippet: popOverSnippet,
      demo: <Popover />,
    },
    {
      title: 'Anchor position',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverAnchorPositionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverAnchorPositionHtml,
        },
      ],
      text: (
        <>
          <p>
            The alignment and arrow on your popover can be set with the{' '}
            <EuiCode>anchorPosition</EuiCode> prop. These positions will update
            based upon screen real estate.
          </p>
          <p>
            <strong>Some tips:</strong>
          </p>
          <ul>
            <li>
              The first word in the <EuiCode>anchorPosition</EuiCode> denotes
              where the popover will appear relative to the button.
            </li>
            <li>
              The second word in the <EuiCode>anchorPosition</EuiCode> denotes
              where the gravity / pin position will appear relative to the
              popover.
            </li>
          </ul>
        </>
      ),
      props: { EuiPopover },
      snippet: popoverAnchorSnippet,
      demo: <PopoverAnchorPosition />,
    },
    {
      title: 'Popover titles and footers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverWithTitleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverWithTitleHtml,
        },
      ],
      text: (
        <>
          <p>
            Popovers often need titling. Use the
            <strong>EuiPopoverTitle</strong> component nested somewhere inside
            the popover contents.
          </p>
          <p>
            You can also add a similarly styled{' '}
            <strong>EuiPopoverFooter</strong> for smaller captions or call to
            action buttons.
          </p>
        </>
      ),
      props: { EuiPopoverTitle, EuiPopoverFooter },
      demo: <PopoverWithTitle />,
      snippet: popoverWithTitleSnippet,
    },
    {
      title: 'Popover padding sizes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverWithTitlePaddingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverWithTitlePaddingHtml,
        },
      ],
      text: (
        <p>
          Use the <EuiCode>panelPaddingSize</EuiCode> prop to adjust the padding
          of the panel content. When using popover titles and footers, this
          setting will propogate to them. Or you can supply a custom{' '}
          <EuiCode>paddingSize</EuiCode> to either the{' '}
          <strong>EuiPopoverTitle</strong> of <strong>EuiPopoverFooter</strong>.
        </p>
      ),
      props: { EuiPopover, EuiPopoverTitle, EuiPopoverFooter },
      snippet: popoverWithTitlePaddingSnippet,
      demo: <PopoverWithTitlePadding />,
    },
    {
      title: 'Panel class name',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverPanelClassNameSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverPanelClassNameHtml,
        },
      ],
      text: (
        <p>
          Use the <EuiCode>panelClassName</EuiCode> prop to pass a custom class
          to the panel containing the popover contents.
        </p>
      ),
      props: { EuiPopover },
      demo: <PopoverPanelClassName />,
      snippet: popoverPanelClassNameSnippet,
    },
    {
      title: 'Popover with block level display',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverBlockSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverBlockHtml,
        },
      ],
      text: (
        <p>
          Popover anchors default to{' '}
          <EuiCode language="sass">display: inline-block;</EuiCode> so they do
          not force a display on inline triggers. If you do need to change this,
          just add <EuiCode language="js">display=&quot;block&quot;</EuiCode>
        </p>
      ),
      props: { EuiPopover },
      snippet: popoverBlockSnippet,
      demo: <PopoverBlock />,
    },
    {
      title: 'Popover on a fixed element',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverFixedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverFixedHtml,
        },
      ],
      text: (
        <p>
          Popover content even works on{' '}
          <EuiCode language="sass">position: fixed;</EuiCode> elements. Add the{' '}
          <EuiCode>repositionOnScroll</EuiCode> boolean prop to ensure the
          popover realigns to the fixed button on scroll.
        </p>
      ),
      props: { EuiPopover },
      snippet: popoverFixedSnippet,
      demo: <PopoverFixed />,
    },
    {
      title: 'Constraining a popover inside a container',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverContainerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverContainerHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiPopover</strong> can accept a React or DOM element as a{' '}
          <EuiCode>container</EuiCode> prop and restrict the popover from
          overflowing that container.
        </p>
      ),
      props: { EuiPopover },
      snippet: popoverContainerSnippet,
      demo: <PopoverContainer />,
    },
    {
      title: 'Popover attached to input element',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inputPopoverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inputPopoverHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiInputPopover</strong> is a specialized popover component
            intended to be used with form elements. Stylistically, the popover
            panel is
            {'"attached"'} to the input. Functionally, consumers have control
            over what events open and close the popover, and it can allow for
            natural tab order.
          </p>
          <p>
            Although some assumptions are made about keyboard behavior,
            consumers should provide specific key event handlers depending on
            the use case. For instance, a <EuiCode>type=text</EuiCode> input
            could use the down key to trigger popover opening, but this
            interaction would not be appropriate for{' '}
            <EuiCode>type=number</EuiCode> inputs as they natively bind to the
            down key.
          </p>
        </>
      ),
      props: { EuiInputPopover },
      snippet: inputPopoverSnippet,
      demo: <InputPopover />,
    },
    {
      title: 'Removing the focus trap',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: trapFocusSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: trapFocusHtml,
        },
      ],
      text: (
        <>
          <p>
            If the popover should not trap focus within itself, then you can
            remove it with <EuiCode language="ts">{'ownFocus={false}'}</EuiCode>
            .
          </p>
          <EuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <>
                Removing <EuiCode>ownFocus</EuiCode> makes it difficult for
                keyboard-only and screen reader users to navigate to and from
                your popover.
              </>
            }
          />
        </>
      ),
      props: { EuiPopover },
      snippet: trapFocusSnippet,
      demo: <TrapFocus />,
    },
    {
      title: 'Popover using an HTMLElement as the anchor',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: popoverHTMLElementAnchorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: popoverHTMLElementAnchorHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiWrappingPopover</strong> is an extra popover component that
          allows any existing DOM element to be passed as the{' '}
          <EuiCode>button</EuiCode> prop.
        </p>
      ),
      demo: <PopoverHTMLElementAnchor />,
    },
  ],
};
