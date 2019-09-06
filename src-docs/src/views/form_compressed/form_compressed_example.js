import React, { Fragment } from 'react';
import { Link } from 'react-router';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiFormRow,
  EuiToolTip,
  EuiCallOut,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';

import FormCompressed from './form_compressed';
const formCompressedSource = require('!!raw-loader!./form_compressed');
const formCompressedHtml = renderToHtml(FormCompressed);

import FormHorizontal from './form_horizontal';
const formHorizontalSource = require('!!raw-loader!./form_horizontal');
const formHorizontalHtml = renderToHtml(FormHorizontal);

import FormHelp from './form_horizontal_help';
const formHelpSource = require('!!raw-loader!./form_horizontal_help');
const formHelpHtml = renderToHtml(FormHelp);

import ComplexExample from './complex_example';
const ComplexExampleSource = require('!!raw-loader!./complex_example');
const ComplexExampleHtml = renderToHtml(ComplexExample);

export const FormCompressedExample = {
  title: 'Compressed forms',
  intro: (
    <Fragment>
      <EuiText>
        <p>
          Also known as <strong>Editor-Style Controls</strong>, compressed forms
          and controls were specifically created for use when space is at a
          premium. They are not intended for use when the form is the main
          objective of the page. They work best in editor-style applications
          where form controls are being used to create or edit content on the
          page.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiCallOut
        color="danger"
        title="Do not use compressed and non-compressed form controls in the same form."
      />
      <EuiSpacer />
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formCompressedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formCompressedHtml,
        },
      ],
      text: (
        <p>
          To use compressed forms, pass{' '}
          <EuiCode>display=&quot;rowCompressed&quot;</EuiCode> to the
          EuiFormRows and <EuiCode>compressed=true</EuiCode> to the form
          controls themselves.
        </p>
      ),
      props: {
        EuiFormRow,
      },
      demo: <FormCompressed />,
      snippet: [
        `<EuiFormRow
  label="Text field"
  display="rowCompressed"
>
  <EuiFieldText compressed />
</EuiFormRow>`,
      ],
    },
    {
      title: 'Column layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formHorizontalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formHorizontalHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Editor-style controls can be displayed in a two column layout for
            even better use of limited space, just pass{' '}
            <EuiCode>display=&quot;columnCompressed&quot;</EuiCode> to align the
            labels and inputs side by side.
          </p>
          <p>
            <strong>EuiSwitches</strong> are a special case in which so you must
            pass <EuiCode>columnCompressedSwitch</EuiCode> to the EuiFormRow as
            the display property.
          </p>
        </Fragment>
      ),
      props: {
        EuiFormRow,
      },
      demo: <FormHorizontal />,
      snippet: [
        `<EuiFormRow
  label="Text field"
  display="columnCompressed"
>
  <EuiFieldText compressed />
</EuiFormRow>`,
        `<EuiFormRow
  label="Switch"
  display="columnCompressedSwitch"
>
  <EuiSwitch compressed />
</EuiFormRow>`,
      ],
    },
    {
      title: 'Contextual help',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formHelpSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formHelpHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            When using compressed, horizontal form styles, it is best not to
            overload the UI with expansive help text. If it&apos;s short and
            part of the validation, use <EuiCode>helpText</EuiCode>. However, if
            it&apos;s an explanation of the control, consider wraping the label
            with an <Link to="/display/tooltip">EuiToolTip</Link> and appending
            the <EuiCode>questionInCircle</EuiCode> icon to it.
          </p>
        </Fragment>
      ),
      props: {
        EuiFormRow,
        EuiToolTip,
      },
      demo: <FormHelp />,
      snippet: [
        `<EuiFormRow
  display="columnCompressed"
  label=""
  helpText="">
  <EuiFieldText compressed />
</EuiFormRow>`,
        `<EuiFormRow
  display="columnCompressed"
  label={
    <EuiToolTip content="">
      <span>
        Label <EuiIcon type="questionInCircle" color="subdued" />
      </span>
    </EuiToolTip>
  }>
  <EuiFieldText compressed />
</EuiFormRow>`,
      ],
    },
    {
      title: 'Complex example',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ComplexExampleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ComplexExampleHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            This is an example of how to combine compressed form controls with
            from rows, labels, prepend and appends in a column layout.
          </p>
          <EuiCallOut color="warning" title="Accessiblity in compressed forms">
            <p>
              Pay close attention to the patterns of using{' '}
              <EuiCode>htmlFor</EuiCode> and <EuiCode>aria-label</EuiCode>. For
              best results each form control that is not wrapped in an
              EuiFormRow should be supplied an <EuiCode>id</EuiCode>.
            </p>
          </EuiCallOut>
        </Fragment>
      ),
      demo: <ComplexExample />,
    },
  ],
};
