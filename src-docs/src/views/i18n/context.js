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
  useEuiI18n,
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

const ContextConsumer = () => {
  return (
    <div>
      <strong>
        <EuiI18n token="euiContext.greeting" default="Welcome!" />
      </strong>

      <EuiSpacer size="s" />

      <p>
        <EuiI18n token="euiContext.guestNo" default="You are guest #" />
        <EuiI18nNumber value={1582394} />
      </p>

      <EuiSpacer size="m" />

      <Fragment>
        <EuiFormRow
          label={useEuiI18n('euiContext.question', 'What is your name?')}
        >
          <EuiFieldText
            placeholder={useEuiI18n('euiContext.placeholder', 'John Doe')}
          />
        </EuiFormRow>

        <EuiSpacer />

        <EuiButton>{useEuiI18n('euiContext.action', 'Submit')}</EuiButton>
      </Fragment>
    </div>
  );
};

export default () => {
  const [language, setLanguage] = useState('en');

  const i18n = {
    mapping: mappings[language],
    formatNumber: (value) => new Intl.NumberFormat(language).format(value),
  };

  return (
    <>
      <EuiFlexGroup gutterSize="s" alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiButton fill={language === 'en'} onClick={() => setLanguage('en')}>
            <EuiI18n token="euiContext.english" default="English" />
          </EuiButton>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButton fill={language === 'fr'} onClick={() => setLanguage('fr')}>
            <EuiI18n token="euiContext.french" default="French" />
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="m" />

      <EuiContext i18n={i18n}>
        <ContextConsumer />
      </EuiContext>
    </>
  );
};
