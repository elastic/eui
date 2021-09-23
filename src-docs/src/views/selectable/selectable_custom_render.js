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

  const countries = createDataStore().countries.map((country) => {
    return {
      label: `${country.name}`,
      searchableLabel: `${country.name} ${'I am secondary content, I am!'}`,
      prepend: country.flag,
      append: <EuiBadge>{country.code}</EuiBadge>,
      showIcons: false,
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

  const renderCountryOption = (option, searchValue) => {
    return (
      <>
        <EuiHighlight search={searchValue}>{option.label}</EuiHighlight>
        <br />
        <EuiTextColor color="subdued">
          <small>
            <EuiHighlight search={searchValue}>
              I am secondary content, I am!
            </EuiHighlight>
          </small>
        </EuiTextColor>
      </>
    );
  };

  let customProps;
  if (useCustomContent) {
    customProps = {
      height: 240,
      renderOption: renderCountryOption,
      listProps: {
        rowHeight: 50,
        showIcons: false,
      },
    };
  }

  return (
    <>
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
