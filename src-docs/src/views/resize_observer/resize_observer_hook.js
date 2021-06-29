import React, { useRef, useState } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiCode,
  EuiIcon,
  EuiPanel,
  EuiSpacer,
  EuiText,
  useResizeObserver,
} from '../../../../src/components';

export const ResizeObserverHookExample = () => {
  const hasResizeObserver = typeof ResizeObserver !== 'undefined';
  const [paddingSize, setPaddingSize] = useState('s');
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const togglePaddingSize = () => {
    setPaddingSize((paddingSize) => (paddingSize === 's' ? 'l' : 's'));
  };

  const addItem = () => {
    setItems((items) => [...items, `Item ${items.length + 1}`]);
  };

  const resizeRef = useRef();
  const dimensions = useResizeObserver(resizeRef.current);

  return (
    <div>
      <EuiText>
        {hasResizeObserver ? (
          <p>
            <EuiIcon type="checkInCircleFilled" color="success" /> Browser
            supports ResizeObserver API.
          </p>
        ) : (
          <p>
            <EuiIcon type="crossInACircleFilled" color="danger" /> Browser does
            not support ResizeObserver API. Using MutationObserver.
          </p>
        )}
        <p>
          <EuiCode>{`height: ${dimensions.height}; width: ${dimensions.width}`}</EuiCode>
        </p>
      </EuiText>

      <EuiSpacer />

      <EuiButton fill={true} onClick={togglePaddingSize}>
        Toggle container padding
      </EuiButton>

      <EuiSpacer />

      <div className="eui-displayInlineBlock" ref={resizeRef}>
        <EuiPanel className="eui-displayInlineBlock" paddingSize={paddingSize}>
          <ul>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <EuiSpacer size="s" />
          <EuiButtonEmpty onClick={addItem}>add item</EuiButtonEmpty>
        </EuiPanel>
      </div>
    </div>
  );
};
