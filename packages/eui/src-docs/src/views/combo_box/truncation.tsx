import React, { useState } from 'react';

import {
  useGeneratedHtmlId,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonGroup,
  EuiFieldNumber,
  EuiTextTruncationTypes,
  EuiTitle,
  EuiSpacer,
  EuiComboBox,
  EuiComboBoxOptionOption,
} from '../../../../src';

const options: EuiComboBoxOptionOption[] = [
  {
    label:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ispum',
  },
  {
    label:
      'Phasellus enim turpis, molestie ut nisi ut, suscipit tristique libero',
  },
  {
    label: 'Ut sagittis interdum nisi, pellentesque laoreet arcu blandit a',
  },
  {
    label: 'Fusce sed viverra nisl',
  },
  {
    label: 'Donec maximus est justo, eget semper lorem lacinia nec',
  },
  {
    label: 'Vestibulum lobortis ipsum sit amet tellus scelerisque vestibulum',
  },
  {
    label: 'This combobox option has an individual `truncationProps` override',
    // Option `truncationProps` will override EuiComboBox `truncationProps`
    truncationProps: {
      truncation: 'start',
      truncationOffset: 5,
    },
  },
];

export default () => {
  const [selectedOptions, setSelected] = useState<EuiComboBoxOptionOption[]>(
    []
  );
  const onChange = (selectedOptions: EuiComboBoxOptionOption[]) => {
    setSelected(selectedOptions);
  };

  const [truncation, setTruncation] = useState<EuiTextTruncationTypes>('end');
  const [truncationOffset, setTruncationOffset] = useState(0);
  const offsetId = useGeneratedHtmlId();

  return (
    <>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiTitle size="xxs">
            <h3>Truncation type</h3>
          </EuiTitle>
          <EuiSpacer size="xs" />
          <EuiButtonGroup
            legend="Truncation type"
            idSelected={truncation}
            onChange={(id) => setTruncation(id as EuiTextTruncationTypes)}
            options={[
              { id: 'start', label: 'start ' },
              { id: 'end', label: 'end' },
              { id: 'startEnd', label: 'startEnd' },
              { id: 'middle', label: 'middle' },
            ]}
            color="primary"
          />
        </EuiFlexItem>
        {(truncation === 'start' || truncation === 'end') && (
          <EuiFlexItem grow={false}>
            <EuiTitle size="xxs">
              <h3 id={offsetId}>Truncation offset</h3>
            </EuiTitle>
            <EuiSpacer size="xs" />
            <EuiFieldNumber
              aria-labelledby={offsetId}
              value={truncationOffset}
              onChange={(e) => setTruncationOffset(Number(e.target.value))}
              compressed
            />
          </EuiFlexItem>
        )}
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiComboBox
        placeholder="Select options"
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChange}
        isClearable={true}
        truncationProps={{
          truncation,
          truncationOffset,
        }}
      />
    </>
  );
};
