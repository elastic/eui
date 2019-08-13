import React, { Component, Fragment } from 'react';

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

export default class extends Component {
  state = {
    language: 'en',
  };

  setLanguage = language => this.setState({ language });

  render() {
    const i18n = {
      mapping: mappings[this.state.language],
      formatNumber: value =>
        new Intl.NumberFormat(this.state.language).format(value),
    };

    return (
      <EuiContext i18n={i18n}>
        <div>
          <EuiFlexGroup gutterSize="s" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButton
                fill={this.state.language === 'en'}
                onClick={() => this.setLanguage('en')}>
                <EuiI18n token="euiContext.english" default="English" />
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton
                fill={this.state.language === 'fr'}
                onClick={() => this.setLanguage('fr')}>
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
            tokens={['euiContext.question', 'euiContext.action']}
            defaults={['What is your name?', 'Submit']}>
            {([question, action]) => (
              <Fragment>
                <EuiFormRow label={question}>
                  <EuiI18n token="euiContext.placeholder" default="John Doe">
                    {placeholder => <EuiFieldText placeholder={placeholder} />}
                  </EuiI18n>
                </EuiFormRow>

                <EuiSpacer />

                <EuiButton>{action}</EuiButton>
              </Fragment>
            )}
          </EuiI18n>
        </div>
      </EuiContext>
    );
  }
}
