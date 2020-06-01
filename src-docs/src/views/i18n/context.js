import React, { useState, Fragment } from 'react';

import {
  EuiContext,
  EuiButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiSpacer,
  EuiI18n,
  EuiI18nNumber,
} from '../../../../src/components';

const mappings = {
  fr: {
    'euiContext.english': 'Anglais',
    'euiContext.french': 'Française',
    'euiContext.greeting': 'Salutations!',
    'euiContext.guestNo': 'Vous êtes invité #',
    'euiContext.question': 'Quel est votre nom?',
    'euiContext.placeholder': 'Jean Dupont',
    'euiContext.action': 'Soumettre',
  },
};

export default () => {
  const [language, setLanguage] = useState('en');

  const i18n = {
    mapping: mappings[language],
    formatNumber: value => new Intl.NumberFormat(language).format(value),
  };

  return (
    <EuiContext i18n={i18n}>
      <div>
        <EuiFlexGroup gutterSize="s" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButton
              fill={language === 'en'}
              onClick={() => setLanguage('en')}>
              <EuiI18n token="euiContext.english" default="English" />
            </EuiButton>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiButton
              fill={language === 'fr'}
              onClick={() => setLanguage('fr')}>
              <EuiI18n token="euiContext.french" default="French" />
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="m" />

        <strong>
          <EuiI18n token="euiContext.greeting" default="Welcome!" />
        </strong>

        <EuiSpacer size="s" />

        <p>
          <EuiI18n token="euiContext.guestNo" default="You are guest #" />
          <EuiI18nNumber value={1582394} />
        </p>

        <EuiSpacer size="m" />

        <EuiI18n
          tokens={[
            'euiContext.question',
            'euiContext.action',
            'euiContext.placeholder',
          ]}
          defaults={['What is your name?', 'Submit', 'John Doe']}>
          {([question, action, placeholder]) => (
            <Fragment>
              <EuiFormRow label={question}>
                <EuiFieldText placeholder={placeholder} />
              </EuiFormRow>

              <EuiSpacer />

              <EuiButton>{action}</EuiButton>
            </Fragment>
          )}
        </EuiI18n>
      </div>
    </EuiContext>
  );
};
