import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiForm,
  EuiFormRow,
  EuiDescribedFormGroup,
  EuiFieldText,
  EuiPopover,
  EuiRange,
  EuiSwitch,
} from '../../../../src/components';

import FormRows from './form_rows';
const formRowsSource = require('!!raw-loader!./form_rows');
const formRowsHtml = renderToHtml(FormRows);

import DescribedFormGroup from './described_form_group';
const describedFormGroupSource = require('!!raw-loader!./described_form_group');
const describedFormGroupHtml = renderToHtml(DescribedFormGroup);

import FullWidth from './full_width';
const fullWidthSource = require('!!raw-loader!./full_width');
const fullWidthHtml = renderToHtml(FullWidth);

import Popover from './popover';
const popoverSource = require('!!raw-loader!./popover');
const popoverHtml = renderToHtml(Popover);

import Inline from './inline';
const inlineSource = require('!!raw-loader!./inline');
const inlineHtml = renderToHtml(Inline);

import InlineSizing from './inline_sizing';
const inlineSizingSource = require('!!raw-loader!./inline_sizing');
const inlineSizingHtml = renderToHtml(InlineSizing);

import InlinePopover from './inline_popover';
const inlinePopoverSource = require('!!raw-loader!./inline_popover');
const inlinePopoverHtml = renderToHtml(InlinePopover);

import InlineFieldEmpty from './inline_field_empty';
const inlineFieldEmptySource = require('!!raw-loader!./inline_field_empty');
const inlineFieldEmptyHtml = renderToHtml(InlineFieldEmpty);

import FormCompressed from './form_compressed';
const formCompressedSource = require('!!raw-loader!./form_compressed');
const formCompressedHtml = renderToHtml(FormCompressed);

export const FormLayoutsExample = {
  title: 'Form layouts',
  sections: [{
    title: 'Form and form rows',
    source: [{
      type: GuideSectionTypes.JS,
      code: formRowsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: formRowsHtml,
    }],
    text: (
      <p>
        Use the <EuiCode>EuiFormRow</EuiCode> component to easily associate form components with
        labels, help text, and error text. Use the <EuiCode>EuiForm</EuiCode> component to group <EuiCode>EuiFormRow</EuiCode>s.
      </p>
    ),
    props: {
      EuiForm,
      EuiFormRow,
    },
    demo: <FormRows />,
  }, {
    title: 'Full-width',
    source: [{
      type: GuideSectionTypes.JS,
      code: fullWidthSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: fullWidthHtml,
    }],
    text: (
      <p>
        Form elements will automatically flex to a max-width of <EuiCode>400px</EuiCode>.
        You can optionally pass the <EuiCode>fullWidth</EuiCode> prop to both individual field
        and row components to expand to their container. This should be done rarely and usually
        you will only need it for isolated controls like search bars and sliders.
      </p>
    ),
    props: {
      EuiFormRow,
    },
    demo: <FullWidth />,
  }, {
    title: 'Compressed',
    source: [{
      type: GuideSectionTypes.JS,
      code: formCompressedSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: formCompressedHtml,
    }],
    text: (
      <p>
        If the particular form is in an area with a small amount of real estate,
        you can add the prop <EuiCode>compressed</EuiCode> to the <EuiCode>EuiFormRow</EuiCode>s and it
        will pass down to the form controls.
      </p>
    ),
    props: {
      EuiFormRow,
    },
    demo: <FormCompressed />,
  }, {
    title: 'Described form groups',
    source: [{
      type: GuideSectionTypes.JS,
      code: describedFormGroupSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: describedFormGroupHtml,
    }],
    text: (
      <p>
        Use <EuiCode>EuiDescribedFormGroup</EuiCode> component to associate multiple <EuiCode>EuiFormRow</EuiCode>s.
        It can also simply be used with one <EuiCode>EuiFormRow</EuiCode> as a way to display help text (or additional
        text) next to the field instead of below (on mobile, will revert to being stacked).
      </p>
    ),
    props: {
      EuiDescribedFormGroup,
    },
    demo: <DescribedFormGroup />,
  }, {
    title: 'In popover',
    text: (
      <p>
        Forms can be placed within <EuiCode>EuiPopover</EuiCode> and
        should scale accordingly.
      </p>
    ),
    source: [{
      type: GuideSectionTypes.JS,
      code: popoverSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: popoverHtml,
    }],
    props: {
      EuiPopover,
      EuiForm,
      EuiRange,
      EuiFormRow,
      EuiSwitch,
      EuiFieldText,
    },
    demo: <Popover />,
  }, {
    title: 'Inline',
    text: (
      <p>
        Inline forms can be made with <EuiCode>EuiFlexGroup</EuiCode>. Apply
        <EuiCode>grow=false</EuiCode> on any of the items you want to collapse
        (like this button). Note that the button FormRow component also requires
        an additional prop because it&rsquo;s missing a label.
      </p>
    ),
    source: [{
      type: GuideSectionTypes.JS,
      code: inlineSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: inlineHtml,
    }],
    props: {
      EuiPopover,
      EuiForm,
      EuiRange,
      EuiFormRow,
      EuiSwitch,
      EuiFieldText,
    },
    demo: <Inline />,
  }, {
    title: 'Inline forms with inline data views',
    source: [{
      type: GuideSectionTypes.JS,
      code: inlineFieldEmptySource,
    }, {
      type: GuideSectionTypes.HTML,
      code: inlineFieldEmptyHtml,
    }],
    text: (
      <p>
        Inline forms often need us to display some computed properties that result
        from the inputs, and do so inline as well. <EuiCode>EuiFieldEmpty</EuiCode>
        facilitates the layout for those cases.
      </p>
    ),
    demo: <InlineFieldEmpty />,
  }, {
    title: 'Apply width to FlexItem to size individual controls',
    source: [{
      type: GuideSectionTypes.JS,
      code: inlineSizingSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: inlineSizingHtml,
    }],
    text: (
      <p>
        When you need to make a field smaller, always apply the width to the
        FlexItem, not the input. The input inside will resize as needed.
      </p>
    ),
    demo: <InlineSizing />,
  }, {
    title: 'Inline forms can live in popovers, or any container',
    source: [{
      type: GuideSectionTypes.JS,
      code: inlinePopoverSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: inlinePopoverHtml,
    }],
    text: (
      <p>
        Because forms auto-size to their wrapping elements, it means you
        can do fun things with them like stuff them in popovers and
        they&rsquo;ll still work perfectly.
      </p>
    ),
    demo: <InlinePopover />,
  }],
};
