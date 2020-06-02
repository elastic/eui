import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiAccordion,
  EuiCode,
  EuiCallOut,
  EuiSpacer,
} from '../../../../src/components';

import Accordion from './accordion';
const accordionSource = require('!!raw-loader!./accordion');
const accordionHtml = renderToHtml(Accordion);
const accordionSnippet = `<EuiAccordion
  id={accordionId}
  buttonContent="Clickable title"
  >
    <!-- Content to show when expanded -->
</EuiAccordion>
`;

import AccordionArrow from './accordion_arrow';
const accordionArrowSource = require('!!raw-loader!./accordion_arrow');
const accordionArrowHtml = renderToHtml(AccordionArrow);
const accordionArrowSnippet = `<EuiAccordion
  id={accordionId}
  buttonContent="Clickable title"
  arrowDisplay="right"
  >
    <!-- Content to show when expanded -->
</EuiAccordion>
`;

import AccordionMultiple from './accordion_multiple';
const accordionMultipleSource = require('!!raw-loader!./accordion_multiple');
const accordionMultipleHtml = renderToHtml(AccordionMultiple);
const accordionMultipleSnippet = `<EuiAccordion
  id={accordionId}
  buttonContent="Clickable title for first item"
  paddingSize="l"
  >
    <!-- Content to show when expanded -->
</EuiAccordion>
<EuiSpacer />
<EuiAccordion
  id={accordionId}
  buttonContent="Clickable title for second item"
  paddingSize="l"
  >
    <!-- Content to show when expanded -->
</EuiAccordion>
`;

import AccordionForm from './accordion_form';
const accordionFormSource = require('!!raw-loader!./accordion_form');
const accordionFormHtml = renderToHtml(AccordionForm);

import AccordionExtra from './accordion_extra';
const accordionExtraSource = require('!!raw-loader!./accordion_extra');
const accordionExtraHtml = renderToHtml(AccordionExtra);
const accordionExtraSnippet = `<EuiAccordion
  id={accordionId}
  buttonContent="Clickable title"
  extraAction={<EuiButton size="s">Extra action!</EuiButton>}
  paddingSize="l"
  >
    <!-- Content to show when expanded -->
</EuiAccordion>
`;

import AccordionOpen from './accordion_open';
const accordionOpenSource = require('!!raw-loader!./accordion_open');
const accordionOpenHtml = renderToHtml(AccordionOpen);
const accordionOpenSnippet = `<EuiAccordion
  id={accordionId}
  buttonContent="Clickable title"
  initialIsOpen={true}
  >
    <!-- Content to show when expanded -->
</EuiAccordion>
`;

import AccordionCallback from './accordion_callback';
const accordionCallbackSource = require('!!raw-loader!./accordion_callback');
const accordionCallbackHtml = renderToHtml(AccordionCallback);
const accordionCallbackSnippet = `<EuiAccordion
  id={accordionId}
  buttonContent="Clickable title"
  onToggle={isOpen => handleOnToggle(isOpen)}
  >
    <!-- Content to show when expanded -->
</EuiAccordion>
`;

import AccordionGrow from './accordion_grow';
const accordionGrowSource = require('!!raw-loader!./accordion_grow');
const accordionGrowHtml = renderToHtml(AccordionGrow);

import AccordionForceState from './accordion_forceState';
const accordionForceStateSource = require('!!raw-loader!./accordion_forceState');
const accordionForceStateHtml = renderToHtml(AccordionForceState);
const accordionForceStateSnippet = `<EuiAccordion
  id={accordionId}
  forceState="open"
  buttonContent="Controlled via outside prop">
    <!-- Content to show when expanded -->
</EuiAccordion>`;

export const AccordionExample = {
  title: 'Accordion',
  intro: (
    <Fragment>
      <EuiCallOut title="Take care including flex group content within accordions">
        <p>
          <strong>EuiFlexGroup</strong>&apos;s negative margins can sometimes
          create scrollbars within <strong>EuiAccordion</strong> because of the
          overflow tricks used to hide content. If you run into this issue make
          sure your <EuiCode>paddingSize</EuiCode> prop is large enough to
          account for the <EuiCode>gutterSize</EuiCode> of any nested flex
          groups.
        </p>
      </EuiCallOut>

      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'Unstyled',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionHtml,
        },
      ],
      text: (
        <div>
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
        </div>
      ),
      props: { EuiAccordion },
      snippet: accordionSnippet,
      demo: <Accordion />,
    },
    {
      title: 'Arrow display',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionArrowSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionArrowHtml,
        },
      ],
      text: (
        <div>
          <p>
            The arrow helps indicate the current state of the accordion (open or
            not) and points to the main triggering button text. If you must hide
            or change the side in which the arrow appears, use{' '}
            <EuiCode>arrowDisplay: &apos;right&apos;</EuiCode> or{' '}
            <EuiCode>&apos;none&apos;</EuiCode>
          </p>
        </div>
      ),
      snippet: accordionArrowSnippet,
      demo: <AccordionArrow />,
    },
    {
      title: 'Multiple accordions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionMultipleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionMultipleHtml,
        },
      ],
      text: (
        <div>
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
        </div>
      ),
      snippet: accordionMultipleSnippet,
      demo: <AccordionMultiple />,
    },
    {
      title: 'Accordion can have extra actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionExtraSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionExtraHtml,
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
      title: 'Accordion can be opened on initial render',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionOpenSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionOpenHtml,
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
      title: 'Accordion can call a function on open and close',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionCallbackSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionCallbackHtml,
        },
      ],
      text: (
        <p>
          Use the <EuiCode>onToggle</EuiCode> prop to pass a callback method
          that will be called on open and close.
        </p>
      ),
      snippet: accordionCallbackSnippet,
      demo: <AccordionCallback />,
    },

    {
      title: 'Accordion content can dynamically change height',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionGrowSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionGrowHtml,
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
      title: 'Accordion for forms',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionFormSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionFormHtml,
        },
      ],
      text: (
        <p>
          Putting it all together. Using the <EuiCode>classNames</EuiCode>
          and <EuiCode>extraAction</EuiCode> as explained above, we can style
          the accordion in a way common for form use.
        </p>
      ),
      demo: <AccordionForm />,
    },
    {
      title: 'Force accordion state',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: accordionForceStateSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: accordionForceStateHtml,
        },
      ],
      text: (
        <p>
          Use the <EuiCode>forceState</EuiCode> prop to control open and close
          state.
        </p>
      ),
      snippet: accordionForceStateSnippet,
      demo: <AccordionForceState />,
    },
  ],
};
