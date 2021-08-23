import React, { useState, Fragment } from 'react';

import {
  EuiCheckableCard,
  EuiSpacer,
  EuiRadioGroup,
  EuiTitle,
  EuiFormFieldset,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const radioName = htmlIdGenerator()();
  const [radio, setRadio] = useState('radio2');
  const [nestedRadio, setNestedRadio] = useState('nestedRadio1');

  const nestedRadios = [
    {
      id: 'nestedRadio1',
      label: 'Nested option one',
    },
    {
      id: 'nestedRadio2',
      label: 'Nested option two',
    },
    {
      id: 'nestedRadio3',
      label: 'Nested option three',
    },
  ];

  return (
    <Fragment>
      <EuiFormFieldset
        legend={{
          children: (
            <EuiTitle size="xs">
              <span>Checkable card radio group with legend</span>
            </EuiTitle>
          ),
        }}
      >
        <EuiCheckableCard
          id={htmlIdGenerator()()}
          label="Option one"
          name={radioName}
          value="radio1"
          checked={radio === 'radio1'}
          onChange={() => setRadio('radio1')}
        />

        <EuiSpacer size="m" />

        <EuiCheckableCard
          id={htmlIdGenerator()()}
          label="Option two"
          name={radioName}
          value="radio2"
          checked={radio === 'radio2'}
          onChange={() => setRadio('radio2')}
        >
          <EuiRadioGroup
            options={nestedRadios}
            idSelected={nestedRadio}
            onChange={(nestedRadio) => setNestedRadio(nestedRadio)}
            disabled={radio !== 'radio2'}
          />
        </EuiCheckableCard>

        <EuiSpacer size="m" />

        <EuiCheckableCard
          id={htmlIdGenerator()()}
          label="Option three (disabled)"
          name={radioName}
          value="radio3"
          checked={radio === 'radio3'}
          onChange={() => setRadio('radio3')}
          disabled
        />
      </EuiFormFieldset>
    </Fragment>
  );
};
