import React, { useState } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonGroup,
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
  ]);

  type TextWrap = NonNullable<EuiSelectableOptionsListProps['textWrap']>;
  const [textWrap, setTextWrap] = useState<TextWrap>('truncate');

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
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiPanel paddingSize="s" style={{ inlineSize: 400 }}>
        <EuiSelectable
          searchable={true}
          options={options}
          onChange={(updatedOptions) => setOptions(updatedOptions)}
          listProps={{
            isVirtualized: textWrap !== 'wrap',
            textWrap,
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
