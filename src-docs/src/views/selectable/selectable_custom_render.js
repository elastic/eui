import React, { useState } from 'react';

import {
  EuiBadge,
  EuiHighlight,
  EuiSpacer,
  EuiTextColor,
  EuiSwitch,
} from '../../../../src/components';
import { EuiSelectable } from '../../../../src/components/selectable';
import { createDataStore } from '../tables/data_store';

export default () => {
  const [useCustomContent, setUseCustomContent] = useState(false);
  const [isVirtualized, setIsVirtualized] = useState(true);

  const countries = createDataStore().countries.map((country) => {
    return {
      label: `${country.name}`,
      searchableLabel: `${country.name} ${'I am secondary content, I am!'}`,
      prepend: country.flag,
      append: <EuiBadge>{country.code}</EuiBadge>,
      showIcons: false,
      data: {
        secondaryContent: 'I am secondary content, I am!',
      },
    };
  });

  countries.unshift({
    label: 'Country options',
    isGroupLabel: true,
  });

  const [options, setOptions] = useState(countries);

  const onChange = (options) => {
    setOptions(options);
  };

  const onCustom = (e) => {
    setUseCustomContent(e.currentTarget.checked);
  };

  const onVirtualized = (e) => {
    setIsVirtualized(e.currentTarget.checked);
  };

  const renderCountryOption = (option, searchValue) => {
    return (
      <>
        <EuiHighlight search={searchValue}>{option.label}</EuiHighlight>
        {/* <br /> */}
        <EuiTextColor style={{ display: 'block' }} color="subdued">
          <small>
            <EuiHighlight search={searchValue}>
              {option.secondaryContent}
            </EuiHighlight>
          </small>
        </EuiTextColor>
      </>
    );
  };

  let listProps = {
    isVirtualized,
  };

  let customProps;
  if (useCustomContent) {
    customProps = {
      height: 240,
      renderOption: renderCountryOption,
    };
    listProps = {
      rowHeight: 50,
      isVirtualized,
    };
  }

  return (
    <>
      <EuiSwitch
        label="Virtualized"
        checked={isVirtualized}
        onChange={onVirtualized}
      />{' '}
      &emsp;
      <EuiSwitch
        label="Custom content"
        checked={useCustomContent}
        onChange={onCustom}
      />
      <EuiSpacer />
      <EuiSelectable
        aria-label="Selectable example with custom list items"
        searchable
        options={options}
        onChange={onChange}
        listProps={listProps}
        {...customProps}
      >
        {(list, search) => (
          <>
            {search}
            {list}
          </>
        )}
      </EuiSelectable>
    </>
  );
};
