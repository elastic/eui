import React, { useState } from 'react';
import {
  EuiButton,
  EuiCode,
  EuiFlyout,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiSelectable,
  EuiSelectableOption,
  EuiSpacer,
  EuiTitle,
} from '../../../../src';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const [options, setOptions] = useState<EuiSelectableOption[]>([
    { label: 'Titan' },
    { label: 'Enceladus' },
    { label: 'Mimas', checked: 'on' },
    { label: 'Dione' },
    { label: 'Iapetus', checked: 'on' },
    { label: 'Phoebe' },
    { label: 'Rhea' },
    { label: 'Pandora' },
    { label: 'Tethys' },
    { label: 'Hyperion' },
    { label: 'Pan' },
    { label: 'Atlas' },
    { label: 'Prometheus' },
    { label: 'Janus' },
    { label: 'Epimetheus' },
    { label: 'Amalthea' },
    { label: 'Thebe' },
    { label: 'Io' },
    { label: 'Europa' },
    { label: 'Ganymede' },
    { label: 'Callisto' },
    { label: 'Himalia' },
    { label: 'Phobos' },
    { label: 'Deimos' },
    { label: 'Puck' },
    { label: 'Miranda' },
    { label: 'Ariel' },
    { label: 'Umbriel' },
    { label: 'Titania' },
    { label: 'Oberon' },
    { label: 'Despina' },
    { label: 'Galatea' },
    { label: 'Larissa' },
    { label: 'Triton' },
    { label: 'Nereid' },
    { label: 'Charon' },
    { label: 'Styx' },
    { label: 'Nix' },
    { label: 'Kerberos' },
    { label: 'Hydra' },
  ]);
  const onChange = (options: EuiSelectableOption[]) => {
    setOptions(options);
  };

  return (
    <>
      <EuiPopover
        panelPaddingSize="none"
        button={
          <EuiButton
            iconType="arrowDown"
            iconSide="right"
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            Show popover
          </EuiButton>
        }
        isOpen={isPopoverOpen}
        closePopover={() => setIsPopoverOpen(false)}
      >
        <EuiSelectable
          searchable
          searchProps={{
            placeholder: 'Filter list',
            compressed: true,
          }}
          options={options}
          onChange={onChange}
        >
          {(list, search) => (
            <div style={{ width: 240 }}>
              <EuiPopoverTitle paddingSize="s">{search}</EuiPopoverTitle>
              {list}
              <EuiPopoverFooter paddingSize="s">
                <EuiButton size="s" fullWidth>
                  Manage this list
                </EuiButton>
              </EuiPopoverFooter>
            </div>
          )}
        </EuiSelectable>
      </EuiPopover>

      <EuiSpacer />

      <EuiButton onClick={() => setIsFlyoutVisible(true)}>
        Show flyout
      </EuiButton>

      {isFlyoutVisible && (
        <EuiFlyout
          ownFocus
          onClose={() => setIsFlyoutVisible(false)}
          aria-labelledby="selectableFlyout"
        >
          <EuiSelectable
            aria-label="Popover example"
            searchable
            options={options}
            onChange={onChange}
            height="full"
          >
            {(list, search) => (
              <>
                <EuiFlyoutHeader hasBorder>
                  <EuiTitle size="m">
                    <h2 id="selectableFlyout">Be mindful of the flexbox</h2>
                  </EuiTitle>
                  <EuiSpacer />
                  {search}
                </EuiFlyoutHeader>
                <EuiSpacer size="xs" />
                {list}
              </>
            )}
          </EuiSelectable>
          <EuiSpacer size="xs" />
          <EuiFlyoutFooter>
            <EuiButton fill>Some extra action</EuiButton>
          </EuiFlyoutFooter>
        </EuiFlyout>
      )}

      <EuiSpacer />

      <EuiTitle size="xxs">
        <h4>
          Using <EuiCode language="js">listProps.bordered=true</EuiCode> and{' '}
          <EuiCode language="js">
            listProps.paddingSize=&quot;none&quot;
          </EuiCode>
        </h4>
      </EuiTitle>

      <EuiSpacer />

      <EuiSelectable
        aria-label="Bordered selectable example"
        options={options}
        onChange={onChange}
        style={{ width: 300 }}
        listProps={{ bordered: true, paddingSize: 'none' }}
      >
        {(list) => list}
      </EuiSelectable>
    </>
  );
};
