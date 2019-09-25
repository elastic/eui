import React from 'react';
import PropTypes from 'prop-types';

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
