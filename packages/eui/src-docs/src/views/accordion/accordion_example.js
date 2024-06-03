import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import { EuiAccordion, EuiCode, EuiCallOut } from '../../../../src/components';

import { accordionConfig } from './playground';

import Accordion from './accordion';
const accordionSource = require('!!raw-loader!./accordion');

import AccordionArrow from './accordion_arrow';
const accordionArrowSource = require('!!raw-loader!./accordion_arrow');
import AccordionArrowRight from './accordion_arrow_right';
const accordionArrowRightSource = require('!!raw-loader!./accordion_arrow_right');

import AccordionMultiple from './accordion_multiple';
const accordionMultipleSource = require('!!raw-loader!./accordion_multiple');
const accordionMultipleSnippet = `<EuiAccordion
  id={accordionId1}
  buttonContent="Clickable title for first item"
  paddingSize="l">
    <!-- Content to show when expanded -->
</EuiAccordion>
<EuiSpacer />
<EuiAccordion
  id={accordionId2}
  buttonContent="Clickable title for second item"
  paddingSize="l">
    <!-- Content to show when expanded -->
</EuiAccordion>
`;

import AccordionForm from './accordion_form';
const accordionFormSource = require('!!raw-loader!./accordion_form');

import AccordionExtra from './accordion_extra';
const accordionExtraSource = require('!!raw-loader!./accordion_extra');
const accordionExtraSnippet = `<EuiAccordion
  id={accordionId}
  buttonContent="Clickable title"
  extraAction={<EuiButton size="s">Extra action!</EuiButton>}
  paddingSize="l">
    <!-- Content to show when expanded -->
</EuiAccordion>
`;

import AccordionOpen from './accordion_open';
const accordionOpenSource = require('!!raw-loader!./accordion_open');
const accordionOpenSnippet = `<EuiAccordion
  id={accordionId}
  buttonContent="Clickable title"
  initialIsOpen={true}>
    <!-- Content to show when expanded -->
</EuiAccordion>
`;

import AccordionGrow from './accordion_grow';
const accordionGrowSource = require('!!raw-loader!./accordion_grow');

import AccordionForceState from './accordion_forceState';
const accordionForceStateSource = require('!!raw-loader!./accordion_forceState');
const accordionForceStateSnippet = `<EuiAccordion
  id={accordionId}
  forceState="open"
  onToggle={onToggle}
  buttonContent="Controlled via outside prop">
    <!-- Content to show when expanded -->
</EuiAccordion>`;

import AccordionIsLoading from './accordion_isLoading';
const accordionIsLoadingSource = require('!!raw-loader!./accordion_isLoading');
const accordionIsLoadingSnippet = [
  `<EuiAccordion
  id={accordionId1}
  isLoading>
    <!-- Content to show when expanded -->
</EuiAccordion>
`,
  `<EuiAccordion
  id={accordionId2}
  isLoading
  isLoadingMessage={customMessage}>
  <!-- Content that will be replaced by isLoadingMessage -->
</EuiAccordion>`,
];

import AccordionButtonElement from './accordion_buttonElement';
const accordionButtonElementSource = require('!!raw-loader!./accordion_buttonElement');

import AccordionDisabled from './accordion_disabled';
const accordionDisabledSource = require('!!raw-loader!./accordion_disabled');

export const AccordionExample = {
  title: 'Accordion',
  sections: [
    {
      title: 'Simple and unstyled',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiAccordion</strong> has been purposely designed with
            minimal styles, allowing you to visually enhance it as needed (see
            the accordion form example). The only styling enforced by EUI is the
            caret icon, which indicates to users that the item can be opened.
          </p>
          <p>
            A <EuiCode>buttonContent</EuiCode> prop defines the content of the
            clickable area. On click it will expose the children and animate
            based on the height of those children.
          </p>
          <p>
            For styling needs, classes can be individually applied with{' '}
            <EuiCode>className</EuiCode> (for the entire accordion), and{' '}
            <EuiCode>buttonClassName</EuiCode> (for the clickable area).
          </p>
        </>
      ),
      demo: <Accordion />,
      playground: accordionConfig,
      props: { EuiAccordion },
      snippet: `<EuiAccordion
  id={accordionId1}
  buttonContent="Clickable title"
  >
    <!-- Content to show when expanded -->
</EuiAccordion>
`,
    },
    {
      title: 'Arrow display',
      text: (
        <>
          <p>
            The arrow helps indicate the current state of the accordion (open or
            not) and points to the main triggering button text. If you must hide
            or change the side in which the arrow appears, use{' '}
            <EuiCode>arrowDisplay: &apos;right&apos;</EuiCode> or{' '}
            <EuiCode>&apos;none&apos;</EuiCode>
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionArrowRightSource,
        },
      ],
      demo: <AccordionArrowRight />,
      snippet: `<EuiAccordion
  id={accordionId2}
  buttonContent="Clickable title"
  arrowDisplay="right"
  >
    <!-- Content to show when expanded -->
</EuiAccordion>
`,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionArrowSource,
        },
      ],
      demo: <AccordionArrow />,
      snippet: `<EuiAccordion
  id={accordionId3}
  buttonContent="Clickable title"
  arrowDisplay="none"
  >
    <!-- Content to show when expanded -->
</EuiAccordion>
`,
    },
    {
      title: 'Multiple accordions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionMultipleSource,
        },
      ],
      text: (
        <>
          <p>
            Use any number of <strong>EuiAccordion</strong> elements to visually
            display them as a group.
          </p>
          <p>
            Due to the previously mentioned bare styles, it is recommended to
            place an{' '}
            <Link to="/layout/spacer">
              <strong>EuiSpacer</strong>
            </Link>{' '}
            between accordion items. Padding within each accordion item can be
            applied via the <EuiCode>paddingSize</EuiCode> prop.
          </p>
        </>
      ),
      snippet: accordionMultipleSnippet,
      demo: <AccordionMultiple />,
    },
    {
      title: 'Extra actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionExtraSource,
        },
      ],
      text: (
        <p>
          Use the <EuiCode>extraAction</EuiCode> prop to pass an extra action
          displayed on the right of any accordion. Usually this is a delete or
          button, but can be anything. Note that this action is separate from
          the click state that expands the accordion. This is needed to make it
          accessible.
        </p>
      ),
      snippet: accordionExtraSnippet,
      demo: <AccordionExtra />,
    },
    {
      title: 'Opened on initial render',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionOpenSource,
        },
      ],
      text: (
        <p>
          Use the <EuiCode>initialIsOpen</EuiCode> prop to open the accordion
          when first rendered.
        </p>
      ),
      snippet: accordionOpenSnippet,
      demo: <AccordionOpen />,
    },
    {
      title: 'Controlling toggled state',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionForceStateSource,
        },
      ],
      text: (
        <>
          <p>
            Typically, the open and closed state of{' '}
            <strong>EuiAccordion</strong> is maintained by the component&apos;s
            internal state. Though, you can manually control it with:
          </p>
          <ul>
            <li>
              <EuiCode>forceState</EuiCode>: Accepts either{' '}
              <EuiCode>{"'open'"}</EuiCode> or <EuiCode>{"'closed'"}</EuiCode>.
            </li>
            <li>
              <EuiCode>onToggle</EuiCode>: A callback function returning{' '}
              <EuiCode>true</EuiCode> if the accordion is open
            </li>
          </ul>
        </>
      ),
      snippet: accordionForceStateSnippet,
      demo: <AccordionForceState />,
    },
    {
      title: 'Loading state',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionIsLoadingSource,
        },
      ],
      text: (
        <>
          <p>
            Use the <EuiCode>isLoading</EuiCode> prop when not all of the
            accordion&apos;s content is ready yet. When using{' '}
            <EuiCode>isLoading</EuiCode>, the content of{' '}
            <EuiCode>extraAction</EuiCode> is replaced with a loading spinner.
          </p>
          <p>
            Manage the content of the accordion using{' '}
            <EuiCode>isLoadingMessage</EuiCode>. By default, it is set to{' '}
            <EuiCode>false</EuiCode> and the content will remain unaltered. Set
            it to <EuiCode>true</EuiCode> to show a default loading message or
            pass a node to show a custom loading message.
          </p>
        </>
      ),
      snippet: accordionIsLoadingSnippet,
      demo: <AccordionIsLoading />,
    },
    {
      title: 'Disabled state',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionDisabledSource,
        },
      ],
      text: (
        <>
          <p>
            In some cases you might want to prevent the user from closing the{' '}
            <strong>EuiAccordion</strong>. For example, if a form field is
            displaying an error, opening the accordion and preventing its
            closure until the error has been addressed will help the user find
            and fix the error.
          </p>
          <p>
            The <EuiCode>isDisabled</EuiCode> prop will disable interaction on
            the button and the arrow. Use it in conjunction with{' '}
            <EuiCode>initialIsOpen</EuiCode> to achieve the desired effect.
          </p>
          <EuiCallOut
            color="warning"
            iconType="accessibility"
            title={
              <>
                When disabling the interaction of accordions based on user
                input, it&apos;s advisable to ensure there is further
                explanation through the use of help or error text.
              </>
            }
          />
        </>
      ),
      demo: <AccordionDisabled />,
      props: { EuiAccordion },
      snippet: `<EuiAccordion
  id={accordionId5}
  buttonContent="Clickable title"
  isDisabled={true}
  initialIsOpen={true}
  >
    <!-- Content to show when expanded -->
</EuiAccordion>
`,
    },
    {
      title: 'When content changes dynamically',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionGrowSource,
        },
      ],
      text: (
        <p>
          If an accordion&rsquo;s content changes height while the accordion is
          open, it will resize dynamically.
        </p>
      ),
      demo: <AccordionGrow />,
    },
    {
      title: 'Interactive content in the trigger',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionButtonElementSource,
        },
      ],
      text: (
        <>
          <p>
            Passing interactive content like links, buttons, or form elements as
            the <EuiCode>buttonContent</EuiCode>, will cause issues with the
            wrapping button element. To fix this, you can change this wrapping
            element to a div using <EuiCode>{'buttonElement="div"'}</EuiCode>.
          </p>
          <p>
            If you don&apos;t want the interactive content to trigger the
            accordion expansion, you will have to apply{' '}
            <EuiCode language="js">e.stopPropagation()</EuiCode> to your element
            manually.
          </p>
          <EuiCallOut
            iconType="accessibility"
            color="warning"
            title="Accordions need a focusable button for accessibility, so changing the element to anything other than a button will enforce the display of the arrow."
          />
        </>
      ),
      demo: <AccordionButtonElement />,
    },
    {
      title: 'Styled for forms',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionFormSource,
        },
      ],
      text: (
        <>
          <p>
            Accordions are unstyled by default, but{' '}
            <strong>EuiAccordion</strong> supports several props around padding
            sizes and borders, as well as letting you pass in your own custom
            CSS styles. See the snippet tab below for a quick preview of said
            props, and the and the demo code tab below for custom hover and
            focus CSS overrides.
          </p>
          <p>
            We also recommend creating a fieldset/legend combination for better
            accessibility and DOM structure by passing{' '}
            <EuiCode language="tsx">{'element="fieldset"'}</EuiCode>. This will
            set the entire accordion as a{' '}
            <EuiCode language="html">{'<fieldset>'}</EuiCode> and automatically
            change the <EuiCode>{'buttonElement'}</EuiCode> to a{' '}
            <EuiCode language="html">{'<legend>'}</EuiCode>.
          </p>
        </>
      ),
      demo: <AccordionForm />,
      snippet: `<EuiAccordion
  id={accordionId}
  element="fieldset"
  paddingSize="l"
  borders="horizontal"
  buttonProps={{ paddingSize: 'm' }}
  buttonContent={buttonContent}
>
  <!-- Content to show when expanded -->
</EuiAccordion>`,
    },
  ],
};
