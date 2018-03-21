import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiForm,
  EuiFormRow,
  EuiCheckboxGroup,
  EuiFieldNumber,
  EuiFieldPassword,
  EuiFieldSearch,
  EuiFieldText,
  EuiRange,
  EuiRadioGroup,
  EuiSelect,
  EuiSwitch,
  EuiTextArea,
  EuiFilePicker,
} from '../../../../src/components';

import Default from './default';
const defaultSource = require('!!raw-loader!./default');
const defaultHtml = renderToHtml(Default);

import Validation from './validation';
const validationSource = require('!!raw-loader!./validation');
const validationHtml = renderToHtml(Validation);

import Disabled from './disabled';
const disabledSource = require('!!raw-loader!./disabled');
const disabledHtml = renderToHtml(Disabled);

import Loading from './loading';
const loadingSource = require('!!raw-loader!./loading');
const loadingHtml = renderToHtml(Loading);

import ReadOnly from './read_only';
const readOnlySource = require('!!raw-loader!./read_only');
const readOnlyHtml = renderToHtml(ReadOnly);

export const FormStatesExample = {
  title: 'Form states',
  sections: [{
    title: 'Default state',
    source: [{
      type: GuideSectionTypes.JS,
      code: defaultSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: defaultHtml,
    }],
    props: {
      EuiCheckboxGroup,
      EuiFieldNumber,
      EuiFieldPassword,
      EuiFieldSearch,
      EuiFieldText,
      EuiRange,
      EuiRadioGroup,
      EuiSelect,
      EuiSwitch,
      EuiTextArea,
      EuiFilePicker,
    },
    demo: <Default />,
  }, {
    title: 'Validation states',
    text: (
      <p>
        Form elements will automatically flex to a max-width of <EuiCode>400px</EuiCode>.
        You can optionally pass the <EuiCode>fullWidth</EuiCode> prop to both individual field
        and row components to expand to their container. This should be done rarely and usually
        you will only need it for isolated controls like search bars and sliders.
      </p>
    ),
    source: [{
      type: GuideSectionTypes.JS,
      code: validationSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: validationHtml,
    }],
    props: {
      EuiForm,
      EuiSelect,
      EuiFormRow,
      EuiTextArea,
      EuiFieldText,
    },
    demo: <Validation />,
  }, {
    title: 'Disabled state',
    text: (
      <p>
        All form elements can be passed a generic <EuiCode>disabled</EuiCode> prop.
        These act the same as their html counterparts.
      </p>
    ),
    source: [{
      type: GuideSectionTypes.JS,
      code: disabledSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: disabledHtml,
    }],
    props: {
      EuiCheckboxGroup,
      EuiFieldNumber,
      EuiFieldPassword,
      EuiFieldSearch,
      EuiFieldText,
      EuiRange,
      EuiRadioGroup,
      EuiSelect,
      EuiSwitch,
      EuiTextArea,
      EuiFilePicker,
    },
    demo: <Disabled />,
  }, {
    title: 'Loading state',
    text: (
      <p>
        Pass <EuiCode>isLoading</EuiCode> onto any field level (text, number, search, select)
        component to put it in a loading state. This can be in combination with any other
        props you attach (like <EuiCode>disabled</EuiCode>).
      </p>
    ),
    source: [{
      type: GuideSectionTypes.JS,
      code: loadingSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: loadingHtml,
    }],
    props: {
      EuiFieldPassword,
      EuiFieldText,
      EuiFormRow,
    },
    demo: <Loading />,
  }, {
    title: 'Read-only state',
    text: (
      <p>
        Add <EuiCode>readOnly</EuiCode> to almost any field level (text, number)
        component to put it in a readonly state. This will just display the content of the
        control and remove any interactions. It is especially handy when using inline forms
        with non-editable fields.
      </p>
    ),
    source: [{
      type: GuideSectionTypes.JS,
      code: readOnlySource,
    }, {
      type: GuideSectionTypes.HTML,
      code: readOnlyHtml,
    }],
    props: {
      EuiFieldPassword,
      EuiFieldText,
      EuiFormRow,
    },
    demo: <ReadOnly />,
  }],
};

