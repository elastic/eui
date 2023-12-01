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
  EuiSelectable,
  EuiSelectableOptionsListProps,
  EuiSelectableOption,
  EuiPanel,
  EuiIcon,
  EuiText,
} from '../../../../src';

export default () => {
  const [options, setOptions] = useState<EuiSelectableOption[]>([
    {
      label:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ispum',
      checked: 'on',
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
      prepend: <EuiIcon type="alert" color="warning" aria-label="Note!" />,
      label:
        'This option has `textWrap` and `truncationProps` settings that will override the parent',
      textWrap: 'truncate',
      truncationProps: {
        truncation: 'start',
        truncationOffset: 5,
      },
    },
  ]);

  type TextWrap = NonNullable<EuiSelectableOptionsListProps['textWrap']>;
  const [textWrap, setTextWrap] = useState<TextWrap>('truncate');
  const [truncation, setTruncation] = useState<EuiTextTruncationTypes>('end');
  const [truncationOffset, setTruncationOffset] = useState(0);
  const offsetId = useGeneratedHtmlId();

  return (
    <>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiTitle size="xxs">
            <h3>Text wrap</h3>
          </EuiTitle>
          <EuiSpacer size="xs" />
          <EuiButtonGroup
            legend="Text wrap"
            idSelected={textWrap}
            onChange={(id) => setTextWrap(id as TextWrap)}
            options={[
              { id: 'truncate', label: 'truncate' },
              { id: 'wrap', label: 'wrap' },
            ]}
            color="primary"
          />
        </EuiFlexItem>
        {textWrap === 'wrap' && (
          <EuiFlexItem grow={false} css={{ alignSelf: 'center' }}>
            <EuiText color="danger" size="s">
              <EuiIcon type="alert" /> Wrapping text requires disabling
              virtualization. We do not recommend this for large (50+) amounts
              of options.
            </EuiText>
          </EuiFlexItem>
        )}
        {textWrap === 'truncate' && (
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
        )}
        {textWrap === 'truncate' &&
          (truncation === 'start' || truncation === 'end') && (
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
      <EuiPanel
        paddingSize="s"
        style={{ inlineSize: 400, resize: 'horizontal', overflow: 'auto' }}
      >
        <EuiSelectable
          searchable={true}
          options={options}
          onChange={(updatedOptions) => setOptions(updatedOptions)}
          height={100}
          listProps={{
            isVirtualized: textWrap !== 'wrap',
            textWrap,
            truncationProps: {
              truncation,
              truncationOffset,
            },
          }}
        >
          {(list, search) => (
            <>
              {search}
              {list}
            </>
          )}
        </EuiSelectable>
      </EuiPanel>
    </>
  );
};
