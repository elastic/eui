import React, { Fragment } from 'react';
import { Link } from 'react-router';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiFormRow } from '../../../../src/components';

import FormCompressed from './form_compressed';
const formCompressedSource = require('!!raw-loader!./form_compressed');
const formCompressedHtml = renderToHtml(FormCompressed);

import FormHorizontal from './form_horizontal';
const formHorizontalSource = require('!!raw-loader!./form_horizontal');
const formHorizontalHtml = renderToHtml(FormHorizontal);

import FormHelp from './form_horizontal_help';
const formHelpSource = require('!!raw-loader!./form_horizontal_help');
const formHelpHtml = renderToHtml(FormHelp);

export const FormCompressedExample = {
  title: 'Compressed forms',
  sections: [
    {
      // title: 'Compressed and horizontal',
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
        <Fragment>
          <p>
            Also known as <strong>Editor Style Controls</strong>, compressed
            forms and controls were specifically created for use when space is
            at a premium. They are not intended for use when the form is the
            main objective of the page. They are best used for applications that
            are of the editor style and the form controls are used to create
            something else on the page.
          </p>
          <p>
            <strong>
              Do no use compressed and non-compressed form controls in the same
              form.
            </strong>
          </p>
          <p>
            Pass <EuiCode>display=&quot;rowCompressed&quot;</EuiCode> to the{' '}
            <EuiCode>EuiFormRow</EuiCode>s but you will also need to pass{' '}
            <EuiCode>compressed=true</EuiCode> to the form controls themselves.
          </p>
        </Fragment>
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
      title: 'Horizontal layout',
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
            Editor style controls can be displayed horizontally for even better
            use of limited space, just pass{' '}
            <EuiCode>display=&quot;columnCompressed&quot;</EuiCode> to align the
            labels and inputs horizontally.
          </p>
          <p>
            <strong>EuiSwitches</strong> are a special case in which so you must
            pass <EuiCode>columnCompressedSwitch</EuiCode> as the display
            property.
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
            When using compressed form styles, it is best not to overload the UI
            with expansive help text. If it&apos;s short and part of the
            validation, use the <EuiCode>helpText</EuiCode>. However, if
            it&apos;s an explanation of the control, consider wrapping the whole
            form row in an <Link to="/display/tooltip">EuiToolTip</Link> with a
            long delay.
          </p>
        </Fragment>
      ),
      props: {
        EuiFormRow,
      },
      demo: <FormHelp />,
      snippet: [''],
    },
  ],
};
