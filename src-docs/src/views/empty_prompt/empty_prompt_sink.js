import React, { Fragment, useState } from 'react';

import {
  EuiEmptyPrompt,
  EuiButton,
  EuiIcon,
  EuiTitle,
  EuiText,
  EuiImage,
  EuiLink,
  EuiSpacer,
  EuiButtonGroup,
  EuiSelect,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

import illustration from '../../images/emptyPrompt_illustration.svg';

export default () => {
  const layoutOptions = [
    {
      id: 'horizontal',
      label: 'Horizontal',
    },
    {
      id: 'vertical',
      label: 'Vertical',
    },
  ];

  const colorsArray = [
    'plain',
    'primary',
    'success',
    'accent',
    'warning',
    'danger',
    'subdued',
    'transparent',
  ];

  const colorsOptions = colorsArray.map((name) => {
    return {
      value: name,
      text: name,
    };
  });

  const [color, setColor] = useState(colorsOptions[0].value);
  const [layout, setLayout] = useState('horizontal');

  const onChangeLayout = (optionId) => {
    setLayout(optionId);
  };

  const onChangeColor = (e) => {
    setColor(e.target.value);
  };

  const isVerticalLayout = layout === 'vertical';

  return (
    <>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiButtonGroup
            color="primary"
            legend="Change the layout"
            options={layoutOptions}
            idSelected={layout}
            onChange={(id) => onChangeLayout(id)}
          />
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiSelect
            prepend="Color"
            options={colorsOptions}
            value={color}
            onChange={(e) => onChangeColor(e)}
            compressed
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiEmptyPrompt
        icon={!isVerticalLayout && <EuiImage size="l" src={illustration} />}
        iconType={isVerticalLayout && 'visArea'}
        title={<h2>Create your first visualization</h2>}
        layout={layout}
        color={color}
        body={
          <>
            <p>
              There are no visualizations to display. This tool allows you to
              create a wide range of charts, graphs, maps, and other graphics.
            </p>
            <p>
              The visualizations you create can be easily shared with your
              peers.
            </p>
          </>
        }
        actions={
          <EuiButton color="primary" fill>
            Create visualization
          </EuiButton>
        }
        footer={
          <>
            <EuiTitle size="xxs">
              <h3>Want to learn more?</h3>
            </EuiTitle>
            <EuiText size="s">
              <EuiLink href="#" color="subdued">
                <EuiIcon type="documentation" /> Read documentation
              </EuiLink>
            </EuiText>
          </>
        }
      />
    </>
  );
};
