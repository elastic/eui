import React, { useState, Fragment } from 'react';

import {
  EuiCheckableCard,
  EuiSpacer,
  EuiRadioGroup,
  EuiTitle,
  EuiFormFieldset,
  useGeneratedHtmlId,
} from '../../../../src';

export default () => {
  const radioGroupId = useGeneratedHtmlId({ prefix: 'radioGroup' });
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

  const checkableCardId__1 = useGeneratedHtmlId({
    prefix: 'checkableCard',
    suffix: 'first',
  });
  const checkableCardId__2 = useGeneratedHtmlId({
    prefix: 'checkableCard',
    suffix: 'second',
  });
  const checkableCardId__3 = useGeneratedHtmlId({
    prefix: 'checkableCard',
    suffix: 'third',
  });

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
          id={checkableCardId__1}
          label="Option one"
          name={radioGroupId}
          value="radio1"
          checked={radio === 'radio1'}
          onChange={() => setRadio('radio1')}
        />

        <EuiSpacer size="m" />

        <EuiCheckableCard
          id={checkableCardId__2}
          label="Option two"
          name={radioGroupId}
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
          id={checkableCardId__3}
          label="Option three (disabled)"
          name={radioGroupId}
          value="radio3"
          checked={radio === 'radio3'}
          onChange={() => setRadio('radio3')}
          disabled
        />
      </EuiFormFieldset>
    </Fragment>
  );
};
