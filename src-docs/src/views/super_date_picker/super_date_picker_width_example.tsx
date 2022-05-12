import React, { useState } from 'react';

import {
  EuiSpacer,
  EuiButtonGroup,
  EuiSwitch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSuperDatePickerProps,
} from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

import SuperDatePickerWidth from './super_date_picker_width';

export default () => {
  const widthButtonGroupPrefix = useGeneratedHtmlId({
    prefix: 'widthButtonGroup',
  });

  const widthButtons: Array<{
    id: string;
    label: EuiSuperDatePickerProps['width'];
  }> = [
    {
      id: `${widthButtonGroupPrefix}__restricted`,
      label: 'restricted',
    },
    {
      id: `${widthButtonGroupPrefix}__full`,
      label: 'full',
    },
    {
      id: `${widthButtonGroupPrefix}__auto`,
      label: 'auto',
    },
  ];

  const [widthIdSelected, setWidthIdSelected] = useState(widthButtons[0].id);

  const onWidthChange = (optionId: React.SetStateAction<string>) => {
    setWidthIdSelected(optionId);
    setWidth(widthButtons.find(({ id }) => id === optionId)!.label);
  };

  const [showCompressed, setShowCompressed] = useState(false);
  const toggleShowCompressed = () => {
    setShowCompressed(!showCompressed);
  };

  const [width, setWidth] = useState<
    EuiSuperDatePickerProps['width'] | undefined
  >();

  return (
    <>
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiButtonGroup
            legend={'Width'}
            name={'width'}
            idSelected={widthIdSelected}
            onChange={onWidthChange}
            options={widthButtons}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiSwitch
            label="Compressed"
            onChange={toggleShowCompressed}
            checked={showCompressed}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <SuperDatePickerWidth width={width} compressed={showCompressed} />
    </>
  );
};
