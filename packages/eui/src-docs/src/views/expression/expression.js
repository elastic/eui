import React, { useState } from 'react';

import {
  EuiPopoverTitle,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPopover,
  EuiFieldNumber,
  EuiExpression,
  EuiSelectable,
} from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [example1, setExample1] = useState({
    isOpen: false,
    options: [
      { label: 'count()', checked: 'on' },
      { label: 'average()' },
      { label: 'sum()' },
      { label: 'median()' },
      { label: 'min()' },
      { label: 'max()' },
    ],
    value: 'count()',
  });

  const [example2, setExample2] = useState({
    isOpen: false,
    options: [
      { label: 'Is above', checked: 'on' },
      { label: 'Is below' },
      { label: 'Is exactly' },
    ],
    value: 'Is above',
  });

  const [example3, setExample3] = useState({
    isOpen: false,
    value: 100,
  });

  const expressionPopoverId__1 = useGeneratedHtmlId({
    prefix: 'expressionPopover',
    suffix: 'first',
  });
  const expressionPopoverId__2 = useGeneratedHtmlId({
    prefix: 'expressionPopover',
    suffix: 'second',
  });

  const expressionPopoverId__3 = useGeneratedHtmlId({
    prefix: 'expressionPopover',
    suffix: 'third',
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
    setExample3({
      ...example3,
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
    setExample3({
      ...example3,
      isOpen: false,
    });
  };

  const openExample3 = () => {
    setExample1({
      ...example1,
      isOpen: false,
    });
    setExample2({
      ...example2,
      isOpen: false,
    });
    setExample3({
      ...example3,
      isOpen: true,
    });
  };

  const closeExample1 = () => {
    setExample1({
      ...example1,
      isOpen: false,
    });
  };

  const closeExample2 = () => {
    setExample2({
      ...example2,
      isOpen: false,
    });
  };

  const closeExample3 = () => {
    setExample3({
      ...example3,
      isOpen: false,
    });
  };

  const changeExample1 = (options) => {
    setExample1({
      options: options,
      isOpen: false,
      value: options.filter((option) => option.checked === 'on')[0]?.label,
    });
  };

  const changeExample2 = (options) => {
    setExample2({
      options: options,
      isOpen: false,
      value: options.filter((option) => option.checked === 'on')[0]?.label,
    });
  };

  const changeExample3 = (e) => {
    setExample3({
      ...example3,
      value: e.target.value,
    });
  };

  const renderPopover1 = () => (
    <EuiSelectable
      singleSelection="always"
      options={example1.options}
      onChange={changeExample1}
    >
      {(list) => (
        <div style={{ width: 240 }}>
          <EuiPopoverTitle>When</EuiPopoverTitle>
          {list}
        </div>
      )}
    </EuiSelectable>
  );

  const renderPopover2 = () => (
    <EuiSelectable
      singleSelection="always"
      options={example2.options}
      onChange={changeExample2}
    >
      {(list) => (
        <div style={{ width: 240 }}>
          <EuiPopoverTitle>When</EuiPopoverTitle>
          {list}
        </div>
      )}
    </EuiSelectable>
  );

  return (
    <EuiFlexGroup gutterSize="s">
      <EuiFlexItem grow={false}>
        <EuiPopover
          id={expressionPopoverId__1}
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
          id={expressionPopoverId__2}
          panelPaddingSize="s"
          button={
            <EuiExpression
              description={example2.value}
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

      <EuiFlexItem grow={false}>
        <EuiPopover
          id={expressionPopoverId__3}
          panelPaddingSize="s"
          button={
            <EuiExpression
              description=""
              value={example3.value}
              isActive={example3.isOpen}
              onClick={openExample3}
            />
          }
          isOpen={example3.isOpen}
          closePopover={closeExample3}
          anchorPosition="downLeft"
        >
          <EuiFieldNumber
            compressed
            value={example3.value}
            onChange={changeExample3}
          />
        </EuiPopover>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
