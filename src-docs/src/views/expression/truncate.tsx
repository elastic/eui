import React, { useState } from 'react';

import {
  EuiPopoverTitle,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPopover,
  EuiSelect,
  // EuiFieldNumber,
  EuiExpression,
} from '../../../../src/components';

// Rise the popovers above GuidePageSideNav
const POPOVER_STYLE = { zIndex: '200' };

export default () => {
  const [example1, setExample1] = useState({
    isOpen: false,
    value: 'min()',
  });

  const [example2, setExample2] = useState({
    isOpen: false,
    value: 'products.discount_percentage',
  });

  const openExample1 = () => {
    setExample1({
      ...example1,
      isOpen: true,
    });
    setExample2({
      ...example2,
      isOpen: false,
    });
  };

  const closeExample1 = () => {
    setExample1({
      ...example1,
      isOpen: false,
    });
  };

  const openExample2 = () => {
    setExample1({
      ...example1,
      isOpen: false,
    });
    setExample2({
      ...example2,
      isOpen: true,
    });
  };

  const closeExample2 = () => {
    setExample2({
      ...example2,
      isOpen: false,
    });
  };

  const changeExample1 = (e: any) => {
    setExample1({
      ...example1,
      value: e.target.value,
    });
    // closeExample1();
  };

  const changeExample2 = (e: any) => {
    setExample2({
      ...example2,
      value: e.target.value,
    });
  };

  const renderPopover1 = () => (
    <div style={POPOVER_STYLE}>
      <EuiPopoverTitle>When</EuiPopoverTitle>
      <EuiSelect
        compressed
        value={example1.value}
        onChange={changeExample1}
        options={[
          { value: 'count()', text: 'count()' },
          { value: 'average()', text: 'average()' },
          { value: 'sum()', text: 'sum()' },
          { value: 'min()', text: 'min()' },
          { value: 'max()', text: 'max()' },
        ]}
      />
    </div>
  );

  const renderPopover2 = () => (
    <div style={POPOVER_STYLE}>
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem grow={false} style={{ width: 150 }}>
          <EuiSelect
            compressed
            value={example2.value}
            onChange={changeExample2}
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
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );

  return (
    <div style={{ width: 300 }}>
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem grow={false}>
          <EuiPopover
            id="popover1"
            button={
              <EuiExpression
                description="when"
                value={example1.value}
                isActive={example1.isOpen}
                onClick={openExample1}
                textWrap="truncate"
              />
            }
            isOpen={example1.isOpen}
            closePopover={closeExample1}
            ownFocus
            panelPaddingSize="s"
            anchorPosition="downLeft">
            {renderPopover1()}
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem style={{ maxWidth: 220 }}>
          <EuiPopover
            id="popover2"
            panelPaddingSize="s"
            button={
              <EuiExpression
                description="of"
                value={example2.value}
                isActive={example2.isOpen}
                onClick={openExample2}
                textWrap="truncate"
              />
            }
            isOpen={example2.isOpen}
            closePopover={closeExample2}
            ownFocus
            anchorPosition="downLeft">
            {renderPopover2()}
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
