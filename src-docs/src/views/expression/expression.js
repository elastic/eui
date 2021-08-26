import React, { useState } from 'react';

import {
  EuiPopoverTitle,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPopover,
  EuiSelect,
  EuiFieldNumber,
  EuiExpression,
} from '../../../../src/components';

// Rise the popovers above GuidePageSideNav
const POPOVER_STYLE = { zIndex: '200' };

export default () => {
  const [example1, setExample1] = useState({
    isOpen: false,
    value: 'count()',
  });

  const [example2, setExample2] = useState({
    value: 100,
    description: 'Is above',
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

  const changeExample1 = (event) => {
    setExample1({
      ...example1,
      value: event.target.value,
    });
  };

  const changeExample2Value = (e) => {
    const sanitizedValue = parseInt(e.target.value, 10);
    setExample2({
      ...example2,
      value: isNaN(sanitizedValue) ? '' : sanitizedValue,
    });
  };

  const changeExample2Description = (event) => {
    setExample2({
      ...example2,
      description: event.target.value,
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
          { value: 'median()', text: 'median()' },
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
            value={example2.description}
            onChange={changeExample2Description}
            options={[
              { value: 'Is above', text: 'Is above' },
              { value: 'Is below', text: 'Is below' },
              { value: 'Is exactly', text: 'Is exactly' },
            ]}
          />
        </EuiFlexItem>

        <EuiFlexItem grow={false} style={{ width: 100 }}>
          <EuiFieldNumber
            compressed
            value={example2.value}
            onChange={changeExample2Value}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );

  return (
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
            />
          }
          isOpen={example1.isOpen}
          closePopover={closeExample1}
          panelPaddingSize="s"
          anchorPosition="downLeft"
        >
          {renderPopover1()}
        </EuiPopover>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiPopover
          id="popover2"
          panelPaddingSize="s"
          button={
            <EuiExpression
              description={example2.description}
              value={example2.value}
              isActive={example2.isOpen}
              onClick={openExample2}
            />
          }
          isOpen={example2.isOpen}
          closePopover={closeExample2}
          anchorPosition="downLeft"
        >
          {renderPopover2()}
        </EuiPopover>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
