import React, { useState } from 'react';

import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiSelect,
  EuiSpacer,
  EuiSwitch,
  EuiTitle,
} from '../../../../src/components';
import { COLORS } from '../../../../src/components/button/button';

const DISPLAY_TYPES = ['empty', 'base', 'fill'];
const DISPLAY_SIZES = ['xs', 's', 'm'];
const ICON_SIZES = ['s', 'm', 'l', 'xl', 'xxl', 'original'];

export default () => {
  const buttonColorsOptions = COLORS.map((name) => {
    return {
      value: name,
      text: name,
    };
  });
  const displayTypeOptions = DISPLAY_TYPES.map((name) => {
    return {
      value: name,
      text: name,
    };
  });
  const displaySizeOptions = DISPLAY_SIZES.map((name) => {
    return {
      value: name,
      text: name,
    };
  });
  const iconSizeOptions = ICON_SIZES.map((name) => {
    return {
      value: name,
      text: name,
    };
  });
  const [disableButton, setDisableButton] = useState(false);
  const [displayType, setDisplayType] = useState(displayTypeOptions[0].value);
  const [displaySize, setDisplaySize] = useState(displaySizeOptions[0].value);
  const [iconSize, setIconSize] = useState(iconSizeOptions[1].value);
  const [buttonColor, setButtonColor] = useState(buttonColorsOptions[3].value);

  const onChangeDisplayType = (e) => {
    setDisplayType(e.target.value);
  };

  const onChangeDisplaySize = (e) => {
    setDisplaySize(e.target.value);
  };

  const onChangeIconSize = (e) => {
    setIconSize(e.target.value);
  };

  const onChangeButtonColor = (e) => {
    setButtonColor(e.target.value);
  };

  return (
    <>
      <EuiFlexGroup gutterSize="m" alignItems="center" wrap={true}>
        <EuiFlexItem grow={false}>
          <EuiSelect
            prepend="Color"
            options={buttonColorsOptions}
            value={buttonColor}
            onChange={(e) => onChangeButtonColor(e)}
            compressed
            aria-label="Button colors"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSelect
            prepend="Display"
            options={displayTypeOptions}
            value={displayType}
            onChange={(e) => onChangeDisplayType(e)}
            compressed
            aria-label="Button display styles"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSelect
            prepend="Size"
            options={displaySizeOptions}
            value={displaySize}
            onChange={(e) => onChangeDisplaySize(e)}
            compressed
            aria-label="Button sizes"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSelect
            prepend="Icon size"
            options={iconSizeOptions}
            value={iconSize}
            onChange={(e) => onChangeIconSize(e)}
            compressed
            aria-label="Icon in button sizes"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            compressed
            label="Disabled"
            checked={disableButton}
            onChange={() => setDisableButton(!disableButton)}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiTitle size="xxs">
        <h3>Icon button</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiButtonIcon
        color={buttonColor}
        display={displayType}
        size={displaySize}
        iconSize={iconSize}
        disabled={disableButton}
        onClick={() => {}}
        iconType="documentation"
        aria-label="Open documentation"
      />
      <EuiSpacer />
      <EuiPanel type="plain" hasBorder css={{ display: 'inline-block' }}>
        <EuiTitle size="xxxs">
          <h4>Icons inherit button color</h4>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiFlexGroup responsive={false} gutterSize="s" alignItems="flexStart">
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              display="base"
              iconType="lensApp"
              size="m"
              aria-label="Lens"
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              display="base"
              iconType="warning"
              size="s"
              color="warning"
              aria-label="Warning"
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconType="dashboardApp"
              aria-label="Dashboard"
              color="text"
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconType="trash"
              aria-label="Delete"
              color="danger"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </>
  );
};
