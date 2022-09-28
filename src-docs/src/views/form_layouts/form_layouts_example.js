import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiForm,
  EuiFormRow,
  EuiText,
  EuiDescribedFormGroup,
  EuiLink,
} from '../../../../src/components';
import Guidelines from './guidelines';
import FormRows from './form_rows';
const formRowsSource = require('!!raw-loader!./form_rows');

import DescribedFormGroup from './described_form_group';
const describedFormGroupSource = require('!!raw-loader!./described_form_group');
import DescribedFormGroupWidth from './described_form_group_width';
const describedFormGroupWidthSource = require('!!raw-loader!./described_form_group_width');
import DescribedFormGroupRatio from './described_form_group_ratio';
const describedFormGroupRatioSource = require('!!raw-loader!./described_form_group_ratio');

import FullWidth from './full_width';
const fullWidthSource = require('!!raw-loader!./full_width');

import FullWidthViaContext from './full_width_via_context';
const fullWidthViaContextSource = require('!!raw-loader!./full_width_via_context');

import Inline from './inline';
const inlineSource = require('!!raw-loader!./inline');

import InlineSizing from './inline_sizing';
const inlineSizingSource = require('!!raw-loader!./inline_sizing');

import InlinePopover from './inline_popover';
const inlinePopoverSource = require('!!raw-loader!./inline_popover');

import AccessibleLabels from './accessible_labels';
const AccessibleLabelsSource = require('!!raw-loader!./accessible_labels');
const accessibleLabelsSnippet = `<EuiFormRow
  label="Settings"
  hasChildLabel={false}>
  <EuiSwitch
    label="Dark mode"
    onChange={}
    checked={}
  />
</EuiFormRow>`;

import ImplicitTitles from './implicit_titles';
const ImplicitTitlesSource = require('!!raw-loader!./implicit_titles');
const implicitTitleSnippet = `<EuiDescribedFormGroup
  title={<h3 id={implicitTitleId}>{titleText}</h3>}
  <EuiFormRow>
    <EuiFieldText aria-labelledby={randomId} />
  </EuiFormRow>
  <EuiFormRow
    <EuiFilePicker aria-label={titleText} />
  </EuiFormRow>
</EuiDescribedFormGroup>`;

import DifficultAccessibleLabels from './difficult_accessibility_labels';
const DifficultAccessibleLabelsSource = require('!!raw-loader!./difficult_accessibility_labels');

export const FormLayoutsExample = {
  title: 'Form layouts',
  intro: (
    <EuiText>
      <p>
        Be sure to read the full{' '}
        <Link to="/forms/form-layouts/guidelines">forms usage guidelines</Link>.
      </p>
    </EuiText>
  ),
  sections: [
    {
      title: 'Form and form rows',
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
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formRowsSource,
        },
      ],
      snippet: `<EuiFormRow
  label="Text field"
  helpText="I am some friendly help text."
>
  <EuiFieldText />
</EuiFormRow>`,
    },
    {
      title: 'Full-width',
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
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fullWidthSource,
        },
      ],
      snippet: `<EuiFormRow
  fullWidth
  label="Works on form rows too"
  helpText="Note that the fullWidth prop is not passed to the form row's child"
>
  <EuiRange fullWidth />
</EuiFormRow>`,
    },
    {
      title: 'Global full-width',
      text: (
        <p>
          To set all the row and controls in a form to{' '}
          <EuiCode>fullWidth</EuiCode>, specify the prop on the root{' '}
          <EuiCode>EuiForm</EuiCode> component.
        </p>
      ),
      props: {
        EuiForm,
      },
      demo: <FullWidthViaContext />,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fullWidthViaContextSource,
        },
      ],
      snippet: `<EuiForm fullWidth>
  <EuiFormRow label="Everything defaults to fullWidth={true}" >
    <EuiRange />
  </EuiFormRow>
</EuiForm>`,
    },
    {
      title: 'Inline',
      text: (
        <p>
          Inline forms can be made with{' '}
          <Link to="/layout/flex">
            <strong>EuiFlexGroup</strong>
          </Link>
          . Apply <EuiCode language="js">{'grow={false}'}</EuiCode> on any of
          the items you want to collapse (like the button below). Note that the
          button&apos;s <strong>EuiFormRow</strong> wrapper also requires an
          additional prop when it&rsquo;s missing a label{' '}
          <EuiCode language="js">hasEmptyLabelSpace</EuiCode>.
        </p>
      ),
      demo: <Inline />,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inlineSource,
        },
      ],
    },
    {
      text: (
        <>
          <h3>Sizing inline form rows</h3>
          <p>
            Apply a <EuiCode>width</EuiCode> or change the{' '}
            <EuiCode>grow</EuiCode> prop on the wrapping{' '}
            <strong>EuiFlexItem</strong> to size individual controls. When you
            need to make a field smaller, always apply the width to the flex
            item, not the input. The input inside will resize as needed.
          </p>
          <p>
            When supplying children to an <strong>EuiFormRow</strong> that is{' '}
            <strong>not</strong> a form control, and you need to the content to
            vertically center with the other form controls, change the{' '}
            <EuiCode>display</EuiCode> prop to <EuiCode>center</EuiCode> or{' '}
            <EuiCode>centerCompressed</EuiCode>.
          </p>
        </>
      ),
      demo: <InlineSizing />,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inlineSizingSource,
        },
      ],
      snippet: `<EuiFormRow label="Avatar" display="centerCompressed">
  <EuiAvatar name="John Doe" size="s" />
</EuiFormRow>`,
    },
    {
      title: 'Described form groups',
      text: (
        <>
          <p>
            Use <strong>EuiDescribedFormGroup</strong> component to create
            sections of associated form controls and rows. It can also simply be
            used with one <strong>EuiFormRow</strong> as a way to display
            additional text next to the field (on mobile, it will revert to
            being stacked).
          </p>
          <p>
            Read more about appropriate layout usage of{' '}
            <strong>EuiDescribedFormGroup</strong> in the{' '}
            <Link to="/forms/form-layouts/guidelines">
              forms usage guidelines
            </Link>
            .
          </p>
        </>
      ),
      props: {
        EuiDescribedFormGroup,
      },
      demo: <DescribedFormGroup />,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: describedFormGroupSource,
        },
      ],
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
      text: (
        <>
          <h3>Sizing described form rows</h3>
          <p>
            By default, <strong>EuiDescribedFormGroup</strong> has a max-width
            of 800px for best readability. To expand the group to 100%, add the{' '}
            <EuiCode>fullWidth</EuiCode> prop to this, the{' '}
            <strong>EuiFormRow</strong>, <strong>and</strong> the individual
            fields.
          </p>
        </>
      ),
      props: {
        EuiDescribedFormGroup,
      },
      demo: <DescribedFormGroupWidth />,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: describedFormGroupWidthSource,
        },
      ],
    },
    {
      text: (
        <>
          <p>
            You can also change the ratio of the width of the description column
            versus the field column. By default it is{' '}
            <EuiCode>{"'half'"}</EuiCode>, but you can also change to{' '}
            <EuiCode>{"'third'"}</EuiCode> or <EuiCode>{"'quarter'"}</EuiCode>{' '}
            which prioritizes the field column. You will most likely still need
            to apply <EuiCode>fullWidth</EuiCode> to all the components. The
            description column does have a minimum readable width applied to it
            so that it cannot shrink too far.
          </p>
          <p>
            Both the description and field columns are simply{' '}
            <strong>EuiFlexItem</strong> wrappers. If you need more
            customization of these columns you can pass flex item props to{' '}
            <EuiCode>descriptionFlexItemProps</EuiCode> and{' '}
            <EuiCode>fieldFlexItemProps</EuiCode> respectively.
          </p>
        </>
      ),
      props: {
        EuiDescribedFormGroup,
      },
      demo: <DescribedFormGroupRatio />,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: describedFormGroupRatioSource,
        },
      ],
    },
    {
      title: 'Form labels',
      text: (
        <>
          <p>
            The best way to provide an{' '}
            <EuiLink
              href="https://www.tpgi.com/what-is-an-accessible-name/"
              external
            >
              accessible name
            </EuiLink>{' '}
            to form elements is to use the <EuiCode>label</EuiCode> prop
            provided by <strong>EuiFormRow</strong>. However, certain types of
            form controls require extra care to ensure an accessible experience.
            Below are just a few examples.
          </p>
          <p>
            Form controls that come with their own label don&lsquo;t need the
            one provided by <strong>EuiFormRow</strong>. For controls like{' '}
            <EuiCode>EuiSwitch</EuiCode>, <EuiCode>EuiButton</EuiCode>, and{' '}
            <EuiCode>EuiLink</EuiCode> be sure to pass{' '}
            <EuiCode>{'hasChildLabel={false}'}</EuiCode> to the wrapping{' '}
            <strong>EuiFormRow</strong>.
          </p>
        </>
      ),
      demo: <AccessibleLabels />,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: AccessibleLabelsSource,
        },
      ],
      snippet: accessibleLabelsSnippet,
    },
    {
      text: (
        <>
          <h3>Implicit titles for the first form control</h3>
          <p>
            When displaying the form control&apos;s name in some other way than
            through the visual <EuiCode>label</EuiCode> prop, the form control
            still needs to be associated with that element. To do this, either:
          </p>
          <ul>
            <li>
              duplicate the text and pass it as the{' '}
              <EuiCode>aria-label</EuiCode> of the form control, or
            </li>
            <li>
              pass the <EuiCode>id</EuiCode> of the text to the form
              control&apos;s <EuiCode>aria-labelledby</EuiCode>.
            </li>
          </ul>
        </>
      ),
      demo: <ImplicitTitles />,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ImplicitTitlesSource,
        },
      ],
      snippet: implicitTitleSnippet,
    },
    {
      text: (
        <>
          <h3>More complicated form labels</h3>
          <p>
            Some controls are just hard though and will often require some
            custom work. Refer to an individual component&lsquo;s documentation
            and remember to test with a screen reader!
          </p>
        </>
      ),
      demo: <DifficultAccessibleLabels />,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: DifficultAccessibleLabelsSource,
        },
      ],
    },

    {
      title: 'In a popover',
      text: (
        <p>
          Because forms auto-size to their wrapping elements, it means you can
          do fun things with them like stuff them in popovers and they&rsquo;ll
          still work perfectly.
        </p>
      ),
      demo: <InlinePopover />,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inlinePopoverSource,
        },
      ],
    },
  ],
  guidelines: <Guidelines />,
};
