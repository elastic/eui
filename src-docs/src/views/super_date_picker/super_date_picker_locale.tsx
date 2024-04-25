import React, { useState } from 'react';

// NOTE: These explicit imports are required for CodeSandbox and any
// bundler that does not support Moment dynamically loading locales
import 'moment/locale/zh-cn';
import 'moment/locale/ja';
import 'moment/locale/fr';

import {
  EuiButtonGroup,
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiSuperDatePicker,
  OnTimeChangeProps,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

const localeId = htmlIdGenerator('locale');
const locales = [
  { id: localeId(), label: 'en' },
  { id: localeId(), label: 'zh-CN' },
  { id: localeId(), label: 'ja-JP' },
  { id: localeId(), label: 'fr-FR' },
];
const dateFormats = [
  { label: 'MMM D, YYYY @ HH:mm:ss.SSS' },
  { label: 'dddd, MMMM Do YYYY, h:mm:ss a' },
  { label: 'YYYY-MM-DDTHH:mm:ss.SSSZ' },
];

export default () => {
  const [start, setStart] = useState('now-1h');
  const [end, setEnd] = useState('now-15m');
  const onTimeChange = ({ start, end }: OnTimeChangeProps) => {
    setStart(start);
    setEnd(end);
  };

  const [locale, setLocale] = useState<string | undefined>();
  const [localeSelected, setLocaleSelected] = useState(locales[0].id);
  const onLocaleChange = (optionId: React.SetStateAction<string>) => {
    setLocale(locales.find(({ id }) => id === optionId)!.label);
    setLocaleSelected(optionId);
  };

  const [dateFormat, setDateFormat] = useState<string | undefined>();
  const [dateFormatsSelected, setDateFormatsSelected] = useState([
    dateFormats[0],
  ]);
  const onDateFormatChange = (selectedOptions: EuiComboBoxOptionOption[]) => {
    setDateFormat(selectedOptions.length ? selectedOptions[0].label : '');
    setDateFormatsSelected(selectedOptions);
  };
  const onDateFormatCreate = (searchValue: string) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();
    if (!normalizedSearchValue) return;

    setDateFormat(searchValue);
    setDateFormatsSelected([{ label: searchValue }]);
  };

  return (
    <>
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiButtonGroup
            legend={'Locale'}
            options={locales}
            idSelected={localeSelected}
            onChange={onLocaleChange}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiComboBox
            prepend="dateFormat"
            placeholder="Select a dateFormat"
            customOptionText="Add {searchValue} as a dateFormat"
            singleSelection={{ asPlainText: true }}
            options={dateFormats}
            selectedOptions={dateFormatsSelected}
            onChange={onDateFormatChange}
            onCreateOption={onDateFormatCreate}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiSuperDatePicker
        showUpdateButton={false}
        start={start}
        end={end}
        locale={locale}
        dateFormat={dateFormat}
        onTimeChange={onTimeChange}
      />
    </>
  );
};
