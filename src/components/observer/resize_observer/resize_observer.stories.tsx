/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiPaddingSize } from '../../../global_styling';
import { EuiText } from '../../text';
import { EuiCode } from '../../code';
import { EuiSpacer } from '../../spacer';
import { EuiButton, EuiButtonEmpty } from '../../button';
import { EuiPanel } from '../../panel';
import { EuiResizeObserver, EuiResizeObserverProps } from './resize_observer';

const meta: Meta<EuiResizeObserverProps> = {
  title: 'Utilities/EuiResizeObserver',
  component: EuiResizeObserver,
};

export default meta;
type Story = StoryObj<EuiResizeObserverProps>;

const StatefulPlayground = ({ onResize, ...rest }: EuiResizeObserverProps) => {
  const [paddingSize, setPaddingSize] = useState<EuiPaddingSize>('s');
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const togglePaddingSize = () => {
    setPaddingSize((paddingSize) => (paddingSize === 's' ? 'l' : 's'));
  };

  const addItem = () => {
    setItems((items) => [...items, `Item ${items.length + 1}`]);
  };

  const handleOnResize = ({
    height,
    width,
  }: {
    height: number;
    width: number;
  }) => {
    setHeight(height);
    setWidth(width);
    onResize({ height, width });
  };

  return (
    <>
      <EuiText>
        <p>
          <EuiCode>
            height: {height}; width: {width}
          </EuiCode>
        </p>
      </EuiText>

      <EuiSpacer />

      <EuiButton fill={true} onClick={togglePaddingSize}>
        Toggle container padding
      </EuiButton>

      <EuiSpacer />

      <EuiResizeObserver onResize={handleOnResize} {...rest}>
        {(resizeRef) => (
          <div className="eui-displayInlineBlock" ref={resizeRef}>
            <EuiPanel paddingSize={paddingSize}>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <EuiSpacer size="s" />
              <EuiButtonEmpty onClick={addItem}>add item</EuiButtonEmpty>
            </EuiPanel>
          </div>
        )}
      </EuiResizeObserver>
    </>
  );
};

export const Playground: Story = {
  render: (args) => <StatefulPlayground {...args} />,
};
