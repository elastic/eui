import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { translateUsingPseudoLocale } from '../../../src/services/string/pseudo_locale_translator';

// For testing/demoing EuiDatePicker, process moment's `en` locale config into a babelfished version
const enConfig = moment.localeData('en')._config;
moment.defineLocale('en-xa', {
  ...enConfig,
  months: enConfig.months.map(translateUsingPseudoLocale),
  monthsShort: enConfig.monthsShort.map(translateUsingPseudoLocale),
  weekdays: enConfig.weekdays.map(translateUsingPseudoLocale),
  weekdaysMin: enConfig.weekdaysMin.map(translateUsingPseudoLocale),
  weekdaysShort: enConfig.weekdaysShort.map(translateUsingPseudoLocale),
});
// Reset default moment locale after using `defineLocale`
moment.locale('en');

import { EuiSwitch, EuiTextColor } from '../../../../src/components';

export const GuideLocaleSelector = ({ selectedLocale, onToggleLocale }) => {
  return (
    <EuiSwitch
      compressed
      label={<EuiTextColor color="ghost">Babelfish</EuiTextColor>}
      checked={selectedLocale === 'en-xa'}
      onChange={() => onToggleLocale(selectedLocale === 'en' ? 'en-xa' : 'en')}
    />
  );
};

GuideLocaleSelector.propTypes = {
  onToggleLocale: PropTypes.func.isRequired,
  selectedLocale: PropTypes.string.isRequired,
};
