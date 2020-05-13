import React, { useState } from 'react';
import { EuiExpression } from '../../../../src/components/expression';
import { EuiToolTip } from '../../../../src/components/tool_tip';
import { EuiPanel } from '../../../../src/components/panel';
import {
  EuiPopoverTitle,
  EuiPopover,
} from '../../../../src/components/popover';
import { EuiSelect } from '../../../../src/components/form/select';

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('products.discount_percentage');

  const closePopover = () => setIsOpen(false);

  const togglePopover = () => setIsOpen(isOpen => !isOpen);

  const changeExample = (e: any) => {
    setValue(e.target.value);
    closePopover();
  };

  const renderPopover = () => (
    <div style={{ zIndex: 200 }}>
      <EuiPopoverTitle>Average of</EuiPopoverTitle>
      <EuiSelect
        compressed
        value={value}
        onChange={e => changeExample(e)}
        options={[
          {
            value: 'products.base_price',
            text: 'products.base_price',
          },
          {
            value: 'products.base_unit_price',
            text: 'products.base_unit_price',
          },
          {
            value: 'products.discount_percentage',
            text: 'products.discount_percentage',
          },
          { value: 'day_of_week_i', text: 'day_of_week_i' },
        ]}
      />
    </div>
  );

  const popOver = (
    <EuiPopover
      button={
        <EuiExpression
          textWrap="truncate"
          style={{ maxWidth: '220px' }}
          description="Average of"
          value={value}
          isActive={isOpen}
          onClick={togglePopover}
        />
      }
      isOpen={isOpen}
      closePopover={closePopover}
      ownFocus
      panelPaddingSize="s"
      anchorPosition="downLeft">
      {renderPopover()}
    </EuiPopover>
  );

  return (
    <div>
      <EuiPanel paddingSize="l" style={{ width: '272px' }}>
        {isOpen ? (
          popOver
        ) : (
          <EuiToolTip content={`AVERAGE OF ${value}`}>{popOver}</EuiToolTip>
        )}
      </EuiPanel>
    </div>
  );
};
