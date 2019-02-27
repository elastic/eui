import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiAccordion,
  EuiCode,
  EuiCallOut,
  EuiSpacer,
} from '../../../../src/components';

import Accordion from './accordion';
const accordionSource = require('!!raw-loader!./accordion');
const accordionHtml = renderToHtml(Accordion);

import AccordionForm from './accordion_form';
const accordionFormSource = require('!!raw-loader!./accordion_form');
const accordionFormHtml = renderToHtml(AccordionForm);

import AccordionExtra from './accordion_extra';
const accordionExtraSource = require('!!raw-loader!./accordion_extra');
const accordionExtraHtml = renderToHtml(AccordionExtra);

import AccordionOpen from './accordion_open';
const accordionOpenSource = require('!!raw-loader!./accordion_open');
const accordionOpenHtml = renderToHtml(AccordionOpen);

import AccordionGrow from './accordion_grow';
const accordionGrowSource = require('!!raw-loader!./accordion_grow');
const accordionGrowHtml = renderToHtml(AccordionGrow);

export const AccordionExample = {
  title: 'Accordion',
  intro: (
    <Fragment>
      <EuiCallOut
        title="Take care including flex group content within accordions"
      >
        <p>
          <EuiCode>EuiFlexGroup</EuiCode>&apos;s negative margins can sometimes
          create scrollbars within <EuiCode>EuiAccordion</EuiCode> because of
          the overflow tricks used to hide content. If you run into this issue make
          sure your <EuiCode>paddingSize</EuiCode> prop is large enough to account for
          the <EuiCode>gutterSize</EuiCode> of any nested flex groups.
        </p>
      </EuiCallOut>

      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [{
    title: 'Unstyled',
    source: [{
      type: GuideSectionTypes.JS,
      code: accordionSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: accordionHtml,
    }],
    text: (
      <div>
        <p>
          <EuiCode>EuiAccordion</EuiCode> is purposely bare so that you can
          put whatever styling you need on it (see the accordion form example). The only
          styling we force on you is the caret, which gives the user an understanding
          that the content will open up.
        </p>
        <p>
          A <EuiCode>buttonContent</EuiCode> prop defines the content of the
          clickable area. On click it will expose the children and animate
          based on the height of those children.
        </p>
        <p>
          For styling needs, classes can be individually applied with
          <EuiCode>className</EuiCode> (for the entire accordion),
          and <EuiCode>buttonClassName</EuiCode> (for the clickable area).
        </p>
      </div>
    ),
    props: { EuiAccordion },
    demo: <Accordion />,
  }, {
    title: 'Accordion can have extra actions',
    source: [{
      type: GuideSectionTypes.JS,
      code: accordionExtraSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: accordionExtraHtml,
    }],
    text: (
      <p>
        Use the <EuiCode>extraAction</EuiCode> prop to pass an extra action
        displayed on the right of any accordion. Usually this is a delete or
        button, but can be anything. Note that this action is separate from
        the click state that expands the accordion. This is needed to make
        it accessible.
      </p>
    ),
    demo: <AccordionExtra />,
  },  {
    title: 'Accordion can be opened on initial render',
    source: [{
      type: GuideSectionTypes.JS,
      code: accordionOpenSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: accordionOpenHtml,
    }],
    text: (
      <p>
        Use the <EuiCode>initialIsOpen</EuiCode> prop to open the accordion when first rendered.
      </p>
    ),
    demo: <AccordionOpen />,
  }, {
    title: 'Accordion content can dynamically change height',
    source: [{
      type: GuideSectionTypes.JS,
      code: accordionGrowSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: accordionGrowHtml,
    }],
    text: (
      <p>
        If an accordion&rsquo;s content changes height while the accordion is open,
        it will resize dynamically.
      </p>
    ),
    demo: <AccordionGrow />,
  }, {
    title: 'Accordion for forms',
    source: [{
      type: GuideSectionTypes.JS,
      code: accordionFormSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: accordionFormHtml,
    }],
    text: (
      <p>
        Putting it all together. Using the <EuiCode>classNames</EuiCode>
        and <EuiCode>extraAction</EuiCode> as explained above, we can
        style the accordion in a way common for form use.
      </p>
    ),
    demo: <AccordionForm />,
  }],
};
