import React, { useState } from 'react';

import {
  EuiBadge,
  EuiHighlight,
  EuiSpacer,
  EuiText,
  EuiSwitch,
  EuiSelectable,
  EuiSelectableOption,
} from '../../../../src';

const countryData = [
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'US', name: 'United States', flag: '🇺🇲' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'CG', name: 'Congo', flag: '🇨🇬' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲' },
];

interface OptionData {
  secondaryContent?: string;
}

export default () => {
  const [options, setOptions] = useState<
    Array<EuiSelectableOption<OptionData>>
  >([
    {
      label: 'Country options',
      isGroupLabel: true,
    },
    ...countryData.map(
      (country): EuiSelectableOption => ({
        label: `${country.name}`,
        searchableLabel: `${country.name} ${'I am secondary content, I am!'}`,
        prepend: country.flag,
        append: <EuiBadge>{country.code}</EuiBadge>,
        data: {
          secondaryContent: 'I am secondary content, I am!',
        },
      })
    ),
  ]);

  const renderCountryOption = (
    option: EuiSelectableOption<OptionData>,
    searchValue: string
  ) => {
    return (
      <>
        <EuiHighlight search={searchValue}>{option.label}</EuiHighlight>
        <EuiText size="xs" color="subdued" className="eui-displayBlock">
          <small>
            <EuiHighlight search={searchValue}>
              {option.secondaryContent || ''}
            </EuiHighlight>
          </small>
        </EuiText>
      </>
    );
  };

  const [useCustomContent, setUseCustomContent] = useState(true);
  const [isVirtualized, setIsVirtualized] = useState(true);

  return (
    <>
      <EuiSwitch
        label="Virtualized"
        checked={isVirtualized}
        onChange={(e) => setIsVirtualized(e.target.checked)}
      />
      &emsp;&emsp;
      <EuiSwitch
        label="Custom content"
        checked={useCustomContent}
        onChange={(e) => setUseCustomContent(e.target.checked)}
      />
      <EuiSpacer />
      <EuiSelectable
        aria-label="Selectable example with custom list items"
        searchable
        options={options}
        onChange={(options) => setOptions(options)}
        listProps={{
          isVirtualized,
          rowHeight: useCustomContent ? 50 : undefined,
          showIcons: false,
        }}
        renderOption={useCustomContent ? renderCountryOption : undefined}
        height={240}
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
