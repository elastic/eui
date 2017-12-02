import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import FormControls from './form_controls';
const formControlsSource = require('!!raw-loader!./form_controls');
const formControlsHtml = renderToHtml(FormControls);

import FormRows from './form_rows';
const formRowsSource = require('!!raw-loader!./form_rows');
const formRowsHtml = renderToHtml(FormRows);

import Validation from './validation';
const validationSource = require('!!raw-loader!./validation');
const validationHtml = renderToHtml(Validation);

import FormPopover from './form_popover';
const formPopoverSource = require('!!raw-loader!./form_popover');
const formPopoverHtml = renderToHtml(FormPopover);

import InlineForm from './inline_form';
const inlineFormSource = require('!!raw-loader!./inline_form');
const inlineFormHtml = renderToHtml(InlineForm);

import InlineFormSizing from './inline_form_sizing';
const inlineFormSizingSource = require('!!raw-loader!./inline_form_sizing');
const inlineFormSizingHtml = renderToHtml(InlineForm);

import InlineFormPopover from './inline_form_popover';
const inlineFormPopoverSource = require('!!raw-loader!./inline_form_popover');
const inlineFormPopoverHtml = renderToHtml(InlineFormPopover);

import FullWidthForm from './form_full_width';
const fullWidthFormSource = require('!!raw-loader!./form_full_width');
const fullWidthFormHtml = renderToHtml(FullWidthForm);

import Disabled from './disabled';
const disabledSource = require('!!raw-loader!./disabled');
const disabledHtml = renderToHtml(Disabled);

import Loading from './form_controls_loading';
const loadingSource = require('!!raw-loader!./form_controls_loading');
const loadingHtml = renderToHtml(Loading);

export const FormExample = {
  title: 'Form',
  sections: [{
    title: 'Form controls',
    source: [{
      type: GuideSectionTypes.JS,
      code: formControlsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: formControlsHtml,
    }],
    text: (
      <div>
        <p>
          These are the base inputs without their labels. If you need labels
          then use the <EuiCode>FormRow</EuiCode> wrapper as explained
          in the next example.
        </p>
        <p>
          Never forget to label every input element. You can either
          use a <EuiCode>label</EuiCode> element with a <EuiCode>for</EuiCode> attribute
          referencing the <EuiCode>id</EuiCode> of the input field, wrap the <EuiCode>input</EuiCode> field
          within the <EuiCode>label</EuiCode> element or use <EuiCode>aria-label</EuiCode> or <EuiCode>aria-labelledby</EuiCode>.
        </p>
      </div>
    ),
    demo: <FormControls />,
  }, {
    title: 'Form rows',
    source: [{
      type: GuideSectionTypes.JS,
      code: formRowsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: formRowsHtml,
    }],
    text: (
      <p>
        Use the <EuiCode>FormRow</EuiCode> component to easily associate form components with
        labels, help text, and error text.
      </p>
    ),
    demo: <FormRows />,
  }, {
    title: 'Form in popover',
    source: [{
      type: GuideSectionTypes.JS,
      code: formPopoverSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: formPopoverHtml,
    }],
    text: (
      <p>
        Forms can be placed within <EuiCode>EuiPopover</EuiCode> and
        should scale accordingly.
      </p>
    ),
    demo: <FormPopover />,
  }, {
    title: 'Disabled form elements',
    source: [{
      type: GuideSectionTypes.JS,
      code: disabledSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: disabledHtml,
    }],
    text: (
      <p>
        All form elements can be passed a generic <EuiCode>disabled</EuiCode> prop.
        These act the same as their html counterparts.
      </p>
    ),
    demo: <Disabled />,
  }, {
    title: 'Fields can be in a loading state',
    source: [{
      type: GuideSectionTypes.JS,
      code: loadingSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: loadingHtml,
    }],
    text: (
      <p>
        Pass <EuiCode>isLoading</EuiCode> onto any field level (text, number, search, select)
        component to put it in a loading state. This can be in combination with any other
        props you attach (like <EuiCode>disabled</EuiCode>).
      </p>
    ),
    demo: <Loading />,
  }, {
    title: 'Validation',
    source: [{
      type: GuideSectionTypes.JS,
      code: validationSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: validationHtml,
    }],
    text: (
      <p>
        Validation is achieved by applying <EuiCode>isInvalid</EuiCode>
        and optionally <EuiCode>error</EuiCode> props
        onto the <EuiCode>EuiForm</EuiCode> or <EuiCode>EuiFormRow</EuiCode>
        components. Errors are optional and are passed as an array in case you
        need to list many errors.
      </p>
    ),
    demo: <Validation />,
  }, {
    title: 'Full-width form elements and rows',
    source: [{
      type: GuideSectionTypes.JS,
      code: fullWidthFormSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: fullWidthFormHtml,
    }],
    text: (
      <p>
        Form elements will automatically flex to a max-width of <EuiCode>400px</EuiCode>.
        You can optionally pass the <EuiCode>fullWidth</EuiCode> prop to both individual field
        and row components to expand to their container. This should be done rarely and usually
        you will only need it for isolated controls like search bars and sliders.
      </p>
    ),
    demo: <FullWidthForm />,
  }, {
    title: 'Inline form',
    source: [{
      type: GuideSectionTypes.JS,
      code: inlineFormSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: inlineFormHtml,
    }],
    text: (
      <p>
        Inline forms can be made with <EuiCode>FlexGroup</EuiCode>. Apply
        <EuiCode>grow=false</EuiCode> on any of the items you want to collapse
        (like this button). Note that the button FormRow component also requires
        an additional prop because it&rsquo;s missing a label.
      </p>
    ),
    demo: <InlineForm />,
  }, {
    title: 'Apply width to FlexItem to size individual controls',
    source: [{
      type: GuideSectionTypes.JS,
      code: inlineFormSizingSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: inlineFormSizingHtml,
    }],
    text: (
      <p>
        When you need to make a field smaller, always apply the width to the
        FlexItem, not the input. The input inside will resize as needed.
      </p>
    ),
    demo: <InlineFormSizing />,
  }, {
    title: 'Inline forms can live in popovers, or any container',
    source: [{
      type: GuideSectionTypes.JS,
      code: inlineFormPopoverSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: inlineFormPopoverHtml,
    }],
    text: (
      <p>
        Because forms auto-size to their wrapping elements, it means you
        can do fun things with them like stuff them in popovers and
        they&rsquo;ll still work perfectly.
      </p>
    ),
    demo: <InlineFormPopover />,
  }],
};

