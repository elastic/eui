import React, { useState, Fragment } from 'react';

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
  const countries = createDataStore().countries.map(country => {
    return {
      id: country.code,
      label: `${country.name}`,
      prepend: country.flag,
      append: <EuiBadge>{country.code}</EuiBadge>,
    };
  });

  countries.unshift({
    label: 'Country options',
    isGroupLabel: true,
  });

  const [options, setOptions] = useState(countries);
  const [useCustomContent, setUseCustomContent] = useState(countries);

  const onChange = options => {
    setOptions(options);
  };

  const onCustom = e => {
    setUseCustomContent(e.currentTarget.checked);
  };

  const renderCountryOption = (option, searchValue) => {
    return (
      <Fragment>
        <EuiHighlight search={searchValue}>{option.label}</EuiHighlight>
        <br />
        <EuiTextColor color="subdued">
          <small>I am secondary content, I am!</small>
        </EuiTextColor>
      </Fragment>
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
    <Fragment>
      <EuiSwitch
        label="Custom content with no icons"
        checked={useCustomContent}
        onChange={onCustom}
      />

      <EuiSpacer />

      <EuiSelectable
        searchable
        options={options}
        onChange={onChange}
        {...customProps}>
        {(list, search) => (
          <Fragment>
            {search}
            {list}
          </Fragment>
        )}
      </EuiSelectable>
    </Fragment>
  );
};
