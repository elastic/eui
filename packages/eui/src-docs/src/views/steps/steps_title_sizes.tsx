import React, { useState } from 'react';

import {
  EuiButtonGroup,
  EuiCode,
  EuiSpacer,
  EuiSteps,
  EuiTitle,
} from '../../../../src/components';
import { EuiStepInterface } from '../../../../src/components/steps/step';

const firstSetOfSteps: EuiStepInterface[] = [
  {
    title: 'Step 1',
    children: (
      <p>
        Both step title and circle indicators will adjust in size based on the{' '}
        <EuiCode>titleSize</EuiCode> prop
      </p>
    ),
  },
  {
    title: 'Step 2',
    children: (
      <p>
        Both step title and circle indicators will adjust in size based on the{' '}
        <EuiCode>titleSize</EuiCode> prop
      </p>
    ),
  },
];

const sizeButtons = [
  {
    id: 'xxs',
    label: 'XXSmall',
  },
  {
    id: 'xs',
    label: 'XSmall',
  },
  {
    id: 's',
    label: 'Small',
  },
  {
    id: 'm',
    label: 'Medium',
  },
];

type StepSizes = NonNullable<EuiStepInterface['titleSize']>;

export default () => {
  const [titleSize, setTitleSize] = useState<StepSizes>('m');

  const sizeOnChange = (optionId: StepSizes) => {
    setTitleSize(optionId);
  };

  return (
    <>
      <EuiTitle size="xxs">
        <h3>Step Size</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiButtonGroup
        legend="Horizontal step size toggle"
        options={sizeButtons}
        idSelected={titleSize}
        onChange={(id) => sizeOnChange(id as StepSizes)}
      />
      <EuiSpacer size="m" />
      <EuiSteps titleSize={titleSize} steps={firstSetOfSteps} />
    </>
  );
};
