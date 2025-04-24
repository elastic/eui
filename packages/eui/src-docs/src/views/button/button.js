import React, { useState } from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiSpacer,
  EuiSelect,
  EuiSwitch,
} from '../../../../src/components/';
import { COLORS } from '../../../../src/components/button/button';

export default () => {
  const [disableButton, setDisableButton] = useState(false);
  const [fillButton, setFillButton] = useState(false);
  const [fullButton, setFullButton] = useState(false);
  const [smallButton, setSmallButton] = useState(false);
  const [withIconButton, setWithIconButton] = useState(false);

  // While `accentSecondary` is currently available on the component, it is likely to be removed
  const filteredColors = COLORS.filter((name) => name !== 'accentSecondary');
  const buttonColorsOptions = filteredColors.map((name) => {
    return {
      value: name,
      text: name,
    };
  });

  const [buttonColor, setButtonColor] = useState(buttonColorsOptions[2].value);

  const onChangeButtonColor = (e) => {
    setButtonColor(e.target.value);
  };

  return (
    <div>
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
          <EuiSwitch
            compressed
            label="Fill"
            checked={fillButton}
            onChange={() => setFillButton(!fillButton)}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            compressed
            label="Full width"
            checked={fullButton}
            onChange={() => setFullButton(!fullButton)}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            compressed
            label="Small"
            checked={smallButton}
            onChange={() => setSmallButton(!smallButton)}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            compressed
            label="With icon"
            checked={withIconButton}
            onChange={() => setWithIconButton(!withIconButton)}
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
      <EuiPanel
        className="plain"
        hasBorder
        css={{ width: 400, maxWidth: '100%' }}
      >
        <EuiButton
          color={buttonColor}
          disabled={disableButton}
          fill={fillButton}
          fullWidth={fullButton}
          size={smallButton ? 's' : 'm'}
          iconType={withIconButton ? 'discoverApp' : null}
          onClick={() => {}}
        >
          {!withIconButton ? 'Button' : 'Open in Discover'}
        </EuiButton>
      </EuiPanel>
    </div>
  );
};
