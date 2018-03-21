import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiFieldNumber,
  EuiFieldPassword,
  EuiFieldSearch,
  EuiFieldText,
  EuiTextArea,
  EuiSpacer,
} from '../../../../src/components';

import FieldSearch from './field_search';
const fieldSearchSource = require('!!raw-loader!./field_search');
const fieldSearchHtml = renderToHtml(FieldSearch);

import FieldText from './field_text';
const fieldTextSource = require('!!raw-loader!./field_text');
const fieldTextHtml = renderToHtml(FieldText);

import FieldNumber from './field_number';
const fieldNumberSource = require('!!raw-loader!./field_number');
const fieldNumberHtml = renderToHtml(FieldNumber);

import FieldPassword from './field_password';
const fieldPasswordSource = require('!!raw-loader!./field_password');
const fieldPasswordHtml = renderToHtml(FieldPassword);

import TextArea from './text_area';
const textAreaSource = require('!!raw-loader!./text_area');
const textAreaHtml = renderToHtml(TextArea);

export const FieldControlsExample = {
  title: 'Field controls',
  intro: (
    <Fragment>
      <p>
        These controls allow the user to enter free-form input.
      </p>

      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [{
    title: 'Search field',
    source: [{
      type: GuideSectionTypes.JS,
      code: fieldSearchSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: fieldSearchHtml,
    }],
    props: {
      EuiFieldSearch,
    },
    demo: <FieldSearch />,
  }, {
    title: 'Text field',
    source: [{
      type: GuideSectionTypes.JS,
      code: fieldTextSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: fieldTextHtml,
    }],
    props: {
      EuiFieldText,
    },
    demo: <FieldText />,
  }, {
    title: 'Number field',
    source: [{
      type: GuideSectionTypes.JS,
      code: fieldNumberSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: fieldNumberHtml,
    }],
    props: {
      EuiFieldText,
    },
    demo: <FieldNumber />,
  }, {
    title: 'Password field',
    source: [{
      type: GuideSectionTypes.JS,
      code: fieldPasswordSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: fieldPasswordHtml,
    }],
    props: {
      EuiFieldPassword,
    },
    demo: <FieldPassword />,
  }, {
    title: 'Textarea',
    source: [{
      type: GuideSectionTypes.JS,
      code: textAreaSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: textAreaHtml,
    }],
    props: {
      EuiTextArea,
    },
    demo: <TextArea />,
  }],
};

