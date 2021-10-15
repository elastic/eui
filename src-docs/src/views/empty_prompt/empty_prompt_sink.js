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

import illustration from '../../images/emptyPrompt__illustration.svg';

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

  const paddingOptions = [
    {
      value: 'none',
      text: 'none',
    },
    {
      value: 's',
      text: 'small',
    },
    {
      value: 'm',
      text: 'medium',
    },
    {
      value: 'l',
      text: 'large',
    },
  ];

  const [color, setColor] = useState(colorsOptions[0].value);
  const [padding, setPadding] = useState(paddingOptions[3].value);
  const [layout, setLayout] = useState('horizontal');

  const onChangeLayout = (optionId) => {
    setLayout(optionId);
  };

  const onChangeColor = (e) => {
    setColor(e.target.value);
  };

  const onChangePadding = (e) => {
    setPadding(e.target.value);
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

        <EuiFlexItem grow={false}>
          <EuiSelect
            prepend="Padding size"
            options={paddingOptions}
            value={padding}
            onChange={(e) => onChangePadding(e)}
            compressed
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiEmptyPrompt
        icon={!isVerticalLayout && <EuiImage size="l" src={illustration} />}
        iconType={isVerticalLayout && 'visArea'}
        title={<h2>You have no spice</h2>}
        layout={layout}
        paddingSize={padding}
        color={color}
        body={
          <Fragment>
            <p>
              Navigators use massive amounts of spice to gain a limited form of
              prescience. This allows them to safely navigate interstellar
              space, enabling trade and travel throughout the galaxy.
            </p>
            <p>You&rsquo;ll need spice to rule Arrakis, young Atreides.</p>
          </Fragment>
        }
        actions={
          <EuiButton color="primary" fill>
            Harvest spice
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
