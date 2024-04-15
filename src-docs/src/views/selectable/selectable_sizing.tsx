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
  type EuiSelectableOption,
  type EuiSelectableProps,
  EuiSpacer,
  EuiTitle,
  EuiInputPopover,
} from '../../../../src';

const OPTIONS: EuiSelectableOption[] = [
  { label: 'Titan' },
  { label: 'Enceladus' },
  { label: 'Mimas', checked: 'on' },
  { label: 'Dione' },
  { label: 'Iapetus' },
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
];

export default () => {
  const [options, setOptions] = useState<EuiSelectableOption[]>(OPTIONS);
  const onChange = (options: EuiSelectableOption[]) => {
    setOptions(options);
  };

  return (
    <>
      <SelectablePopover options={options} onChange={onChange} />
      <EuiSpacer />

      <SelectableFlyout options={options} onChange={onChange} />
      <EuiSpacer />

      <EuiTitle size="xxs">
        <h4>In an input popover</h4>
      </EuiTitle>
      <EuiSpacer size="s" />
      <SelectableInputPopover />
      <EuiSpacer />

      <EuiTitle size="xxs">
        <h4>
          Using <EuiCode language="js">listProps.bordered=true</EuiCode> and{' '}
          <EuiCode language="js">
            listProps.paddingSize=&quot;none&quot;
          </EuiCode>
        </h4>
      </EuiTitle>
      <EuiSpacer size="s" />
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

const SelectablePopover = (
  props: Pick<EuiSelectableProps, 'options' | 'onChange'>
) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { options, onChange } = props;

  return (
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
        aria-label="Selectable + popover example"
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
  );
};

const SelectableFlyout = (
  props: Pick<EuiSelectableProps, 'options' | 'onChange'>
) => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const { options, onChange } = props;

  return (
    <>
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
            aria-label="Selectable + flyout example"
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
    </>
  );
};

const SelectableInputPopover = () => {
  const [options, setOptions] = useState<EuiSelectableOption[]>(OPTIONS);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSearching, setIsSearching] = useState(true);

  return (
    <EuiSelectable
      aria-label="Selectable + input popover example"
      options={options}
      onChange={(newOptions, event, changedOption) => {
        setOptions(newOptions);
        setIsOpen(false);

        if (changedOption.checked === 'on') {
          setInputValue(changedOption.label);
          setIsSearching(false);
        } else {
          setInputValue('');
        }
      }}
      singleSelection
      searchable
      searchProps={{
        value: inputValue,
        onChange: (value) => {
          setInputValue(value);
          setIsSearching(true);
        },
        onKeyDown: (event) => {
          if (event.key === 'Tab') return setIsOpen(false);
          if (event.key !== 'Escape') return setIsOpen(true);
        },
        onClick: () => setIsOpen(true),
        onFocus: () => setIsOpen(true),
      }}
      isPreFiltered={isSearching ? false : { highlightSearch: false }} // Shows the full list when not actively typing to search
      listProps={{
        css: { '.euiSelectableList__list': { maxBlockSize: 200 } },
      }}
    >
      {(list, search) => (
        <EuiInputPopover
          closePopover={() => setIsOpen(false)}
          disableFocusTrap
          closeOnScroll
          isOpen={isOpen}
          input={search!}
          panelPaddingSize="none"
        >
          {list}
        </EuiInputPopover>
      )}
    </EuiSelectable>
  );
};
