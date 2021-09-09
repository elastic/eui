import React, { Fragment, useState } from 'react';
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
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';
import { Comparators } from '../../../../src/services/sort';

import { Options } from './data';
import { createDataStore } from '../tables/data_store';

export default () => {
  const countriesStore = createDataStore().countries.map((country) => {
    return {
      id: country.code,
      label: `${country.name}`,
      append: country.flag,
    };
  });

  const [options, setOptions] = useState(Options);
  const [countries, setCountries] = useState(countriesStore);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const onButtonClick = () => {
    setOptions(options.slice().sort(Comparators.property('checked')));
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const onChange = (options) => {
    setOptions(options);
  };

  const onFlyoutChange = (options) => {
    setCountries(options);
  };

  const closeFlyout = () => {
    setIsFlyoutVisible(false);
  };

  const showFlyout = () => {
    setIsFlyoutVisible(true);
  };

  const button = (
    <EuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Show popover
    </EuiButton>
  );

  return (
    <Fragment>
      <EuiPopover
        id="popover"
        panelPaddingSize="none"
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
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

      <EuiButton onClick={showFlyout}>Show flyout</EuiButton>

      {isFlyoutVisible && (
        <EuiFlyout ownFocus onClose={closeFlyout} aria-labelledby="flyoutTitle">
          <EuiSelectable
            aria-label="Popover example"
            searchable
            options={countries}
            onChange={onFlyoutChange}
            height="full"
          >
            {(list, search) => (
              <Fragment>
                <EuiFlyoutHeader hasBorder>
                  <EuiTitle size="m">
                    <h2 id="flyoutTitle">Be mindful of the flexbox</h2>
                  </EuiTitle>
                  <EuiSpacer />
                  {search}
                </EuiFlyoutHeader>
                <EuiSpacer size="xs" />
                {list}
              </Fragment>
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
          Using <EuiCode language="js">listProps.bordered=true</EuiCode>
        </h4>
      </EuiTitle>

      <EuiSpacer />

      <EuiSelectable
        aria-label="Bordered selectable example"
        options={options}
        onChange={() => {}}
        style={{ width: 300 }}
        listProps={{ bordered: true }}
      >
        {(list) => list}
      </EuiSelectable>
    </Fragment>
  );
};
