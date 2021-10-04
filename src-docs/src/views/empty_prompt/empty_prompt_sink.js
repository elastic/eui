import React, { Fragment, useState } from 'react';

import {
  EuiEmptyPrompt,
  EuiButton,
  EuiIcon,
  EuiTitle,
  EuiText,
  EuiImage,
  EuiLink,
  EuiPopover,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiSelect,
  EuiSpacer,
  EuiButtonGroup,
  EuiSwitch,
} from '../../../../src/components';

import illustrationLightMode from '../../images/emptyPrompt__illustration.svg';

export default () => {
  const panelColorsArray = [
    'none',
    'primary',
    'success',
    'accent',
    'warning',
    'danger',
    'subdued',
    'plain',
    'transparent',
  ];

  const panelColorsOptions = panelColorsArray.map((name) => {
    if (name === 'none') {
      return {
        value: name,
        text: 'No color override',
      };
    } else {
      return {
        value: name,
        text: name,
      };
    }
  });

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

  const [panelColor, setPanelColor] = useState(panelColorsOptions[0].value);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);
  const [layout, setLayout] = useState('horizontal');
  const [hasPanel, setHasPanel] = useState(true);
  const [hasBorder, setHasBorder] = useState(false);

  const onChangePanelColor = (e) => {
    setPanelColor(e.target.value);
  };

  const onChangeLayout = (optionId) => {
    setLayout(optionId);
  };

  const onChangeHasPanel = (e) => {
    setHasPanel(e.target.checked);
  };

  const onChangeHasBorder = (e) => {
    setHasBorder(e.target.checked);
  };

  const button = (
    <EuiButton onClick={onButtonClick} iconType="controlsVertical" size="s">
      Customize props
    </EuiButton>
  );

  const panelProps = {
    color: hasPanel && panelColor === 'none' ? undefined : panelColor,
    hasBorder: hasPanel ? hasBorder : undefined,
  };

  return (
    <>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiPopover
            panelStyle={{ minWidth: 380 }}
            button={button}
            isOpen={isPopoverOpen}
            closePopover={closePopover}
          >
            <EuiFormRow label="Layout">
              <EuiButtonGroup
                color="primary"
                legend="Change the layout"
                options={layoutOptions}
                idSelected={layout}
                onChange={(id) => onChangeLayout(id)}
              />
            </EuiFormRow>
            <EuiFormRow label="Panel">
              <EuiSwitch
                label="Enable panel"
                checked={hasPanel}
                onChange={(e) => onChangeHasPanel(e)}
              />
            </EuiFormRow>

            <EuiSpacer size="m" />

            <EuiTitle size="xxs">
              <h2>Panel props </h2>
            </EuiTitle>
            <EuiFormRow label="Color">
              <EuiSelect
                options={panelColorsOptions}
                value={panelColor}
                onChange={(e) => onChangePanelColor(e)}
                disabled={!hasPanel}
              />
            </EuiFormRow>
            <EuiFormRow label="Border">
              <EuiSwitch
                label="Enable border"
                checked={hasBorder}
                onChange={(e) => onChangeHasBorder(e)}
              />
            </EuiFormRow>
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="m" />

      <EuiEmptyPrompt
        icon={<EuiImage size="fullWidth" src={illustrationLightMode} />}
        title={<h2>You have no spice</h2>}
        layout={layout}
        hasPanel={hasPanel}
        panelProps={panelProps}
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
