import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCheckbox,
  EuiCheckboxGroup,
  EuiRadio,
  EuiRadioGroup,
  EuiRange,
  EuiSelect,
  EuiSwitch,
  EuiSpacer,
} from '../../../../src/components';

import Checkbox from './checkbox';
const checkboxSource = require('!!raw-loader!./checkbox');
const checkboxHtml = renderToHtml(Checkbox);

import CheckboxGroup from './checkbox_group';
const checkboxGroupSource = require('!!raw-loader!./checkbox_group');
const checkboxGroupHtml = renderToHtml(CheckboxGroup);

import Radio from './radio';
const radioSource = require('!!raw-loader!./radio');
const radioHtml = renderToHtml(Radio);

import RadioGroup from './radio_group';
const radioGroupSource = require('!!raw-loader!./radio_group');
const radioGroupHtml = renderToHtml(RadioGroup);

import Range from './range';
const rangeSource = require('!!raw-loader!./range');
const rangeHtml = renderToHtml(Range);

import Select from './select';
const selectSource = require('!!raw-loader!./select');
const selectHtml = renderToHtml(Select);

import Switch from './switch';
const switchSource = require('!!raw-loader!./switch');
const switchHtml = renderToHtml(Switch);

export const FieldSelectionExample = {
  title: 'Selection controls',
  intro: (
    <Fragment>
      <p>
        These controls allow the user to select input from a set of values.
      </p>

      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [{
    title: 'Checkbox',
    source: [{
      type: GuideSectionTypes.JS,
      code: checkboxSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: checkboxHtml,
    }],
    props: {
      EuiCheckbox,
    },
    demo: <Checkbox />,
  }, {
    title: 'Checkbox group',
    source: [{
      type: GuideSectionTypes.JS,
      code: checkboxGroupSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: checkboxGroupHtml,
    }],
    props: {
      EuiCheckboxGroup,
    },
    demo: <CheckboxGroup />,
  }, {
    title: 'Radio',
    source: [{
      type: GuideSectionTypes.JS,
      code: radioSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: radioHtml,
    }],
    props: {
      EuiRadio,
    },
    demo: <Radio />,
  }, {
    title: 'Radio group',
    source: [{
      type: GuideSectionTypes.JS,
      code: radioGroupSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: radioGroupHtml,
    }],
    props: {
      EuiRadio,
    },
    demo: <RadioGroup />,
  }, {
    title: 'Range',
    source: [{
      type: GuideSectionTypes.JS,
      code: rangeSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: rangeHtml,
    }],
    props: {
      EuiRange,
    },
    demo: <Range />,
  }, {
    title: 'Select',
    source: [{
      type: GuideSectionTypes.JS,
      code: selectSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: selectHtml,
    }],
    props: {
      EuiSelect,
    },
    demo: <Select />,
  }, {
    title: 'Switch',
    source: [{
      type: GuideSectionTypes.JS,
      code: switchSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: switchHtml,
    }],
    props: {
      EuiSwitch,
    },
    demo: <Switch />,
  }],
};

