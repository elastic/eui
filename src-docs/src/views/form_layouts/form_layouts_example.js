import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiForm,
  EuiFormRow,
  EuiText,
  EuiSpacer,
  EuiDescribedFormGroup,
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

import Inline from './inline';
const inlineSource = require('!!raw-loader!./inline');
const inlineHtml = renderToHtml(Inline);

import InlineSizing from './inline_sizing';
const inlineSizingSource = require('!!raw-loader!./inline_sizing');
const inlineSizingHtml = renderToHtml(InlineSizing);

import InlinePopover from './inline_popover';
const inlinePopoverSource = require('!!raw-loader!./inline_popover');
const inlinePopoverHtml = renderToHtml(InlinePopover);

export const FormLayoutsExample = {
  title: 'Form layouts',
  intro: (
    <EuiText>
      <p>
        Be sure to read the full{' '}
        <Link to="/guidelines/forms">forms usage guidelines</Link>.
      </p>
      <EuiSpacer />
    </EuiText>
  ),
  sections: [
    {
      title: 'Form and form rows',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formRowsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formRowsHtml,
        },
      ],
      text: (
        <p>
          Use the <strong>EuiFormRow</strong> component to easily associate form
          components with labels, help text, and error text. Use the{' '}
          <strong>EuiForm</strong> component to group{' '}
          <strong>EuiFormRows</strong>. By default EuiForm will render as a
          simple div unless you pass{' '}
          <EuiCode language="js">component=&quot;form&quot;</EuiCode>.
        </p>
      ),
      props: {
        EuiForm,
        EuiFormRow,
      },
      demo: <FormRows />,
      snippet: `<EuiFormRow
  label="Text field"
  helpText="I am some friendly help text."
>
  <EuiFieldText />
</EuiFormRow>`,
    },
    {
      title: 'Full-width',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fullWidthSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fullWidthHtml,
        },
      ],
      text: (
        <p>
          Form elements will automatically flex to a max-width of{' '}
          <EuiCode>400px</EuiCode>. You can optionally pass the{' '}
          <EuiCode>fullWidth</EuiCode> prop to the row and form control to
          expand to their container. This should be done rarely and usually you
          will only need it for isolated controls like search bars and sliders.
        </p>
      ),
      props: {
        EuiFormRow,
      },
      demo: <FullWidth />,
      snippet: `<EuiFormRow
  fullWidth
  label="Works on form rows too"
  helpText="Note that the fullWidth prop is not passed to the form row's child"
>
  <EuiRange fullWidth />
</EuiFormRow>`,
    },
    {
      title: 'Described form groups',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: describedFormGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: describedFormGroupHtml,
        },
      ],
      text: (
        <p>
          Use <strong>EuiDescribedFormGroup</strong> component to associate
          multiple <strong>EuiFormRows</strong>. It can also simply be used with
          one <strong>EuiFormRow</strong> as a way to display additional text
          next to the field (on mobile, it will revert to being stacked).
        </p>
      ),
      props: {
        EuiDescribedFormGroup,
      },
      demo: <DescribedFormGroup />,
      snippet: `<EuiDescribedFormGroup
  title={<h3>Set heading level based on context</h3>}
  description={
    <Fragment>
      Will be wrapped in a small, subdued EuiText block.
    </Fragment>
  }
>
  <EuiFormRow
    label="Text field"
  >
    <EuiFieldText />
  </EuiFormRow>
</EuiDescribedFormGroup>`,
    },
    {
      title: 'Inline',
      text: (
        <p>
          Inline forms can be made with{' '}
          <Link to="/layout/flex">
            <strong>EuiFlexGroup</strong>
          </Link>
          . Apply <EuiCode language="js">grow=false</EuiCode> on any of the
          items you want to collapse (like this button). Note that the button
          FormRow component also requires an additional prop because it&rsquo;s
          missing a label.
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inlineSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inlineHtml,
        },
      ],
      demo: <Inline />,
    },
    {
      title: 'Sizing inline form rows',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inlineSizingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inlineSizingHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Apply a width to the wrapping FlexItem to size individual controls.
            When you need to make a field smaller, always apply the width to the
            FlexItem, not the input. The input inside will resize as needed.
          </p>
          <p>
            When supplying children to an EuiFormRow that is{' '}
            <strong>not</strong> a form control, and you need to the content to
            vertically center with the other form controls, change the{' '}
            <EuiCode>display</EuiCode> prop to <EuiCode>center</EuiCode> or{' '}
            <EuiCode>centerCompressed</EuiCode>.
          </p>
        </Fragment>
      ),
      demo: <InlineSizing />,
      snippet: `<EuiFormRow label="Avatar" display="centerCompressed">
  <EuiAvatar name="John Doe" size="s" />
</EuiFormRow>`,
    },
    {
      title: 'In a popover',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inlinePopoverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inlinePopoverHtml,
        },
      ],
      text: (
        <p>
          Because forms auto-size to their wrapping elements, it means you can
          do fun things with them like stuff them in popovers and they&rsquo;ll
          still work perfectly.
        </p>
      ),
      demo: <InlinePopover />,
    },
  ],
};
