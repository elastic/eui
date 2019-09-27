import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

// For EuiDatePicker, use the French configuration when using en-xa locale
moment.defineLocale('en-xa', moment.localeData('fr')._config);

import { EuiSwitch, EuiFormRow } from '../../../../src/components';

export const GuideLocaleSelector = ({ selectedLocale, onToggleLocale }) => {
  return (
    <EuiFormRow label="Translations for development">
      <EuiSwitch
        label="Activate babelfish"
        checked={selectedLocale === 'en-xa'}
        onChange={() =>
          onToggleLocale(selectedLocale === 'en' ? 'en-xa' : 'en')
        }
      />
    </EuiFormRow>
  );
};

GuideLocaleSelector.propTypes = {
  onToggleLocale: PropTypes.func.isRequired,
  selectedLocale: PropTypes.string.isRequired,
};
