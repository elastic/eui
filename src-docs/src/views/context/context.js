import React, { Component, Fragment } from 'react';

import {
  EuiContext,
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiSpacer,
  I18n,
  I18nNumber,
} from '../../../../src/components';

const mappings = {
  fr: {
    greeting: 'Salutations!',
    guestNo: 'Vous êtes invité #',
    question: 'Quel est votre nom?',
    placeholder: 'Jean Dupont',
    action: 'Soumettre',
  },
};

export default class extends Component {
  state = {
    language: 'en',
    name: ''
  }

  setLanguage = (language) => this.setState({ language })

  render() {
    const i18n = {
      mapping: mappings[this.state.language],
      formatNumber: (value) => new Intl.NumberFormat(this.state.language).format(value),
    };

    return (
      <EuiContext i18n={i18n}>
        <div>
          <EuiButtonEmpty onClick={() => this.setLanguage('en')}>English</EuiButtonEmpty>
          <EuiButtonEmpty onClick={() => this.setLanguage('fr')}>French</EuiButtonEmpty>

          <EuiSpacer size="m"/>

          <strong><I18n token="greeting" default="Welcome!"/></strong>

          <EuiSpacer size="s"/>

          <p><I18n token="guestNo" default="You are guest #"/><I18nNumber value={1582394}/></p>

          <EuiSpacer size="m"/>

          <I18n token="question" default="What is your name?">{question => <p>{question}</p>}</I18n>

          <EuiSpacer size="s"/>

          <I18n tokens={['placeholder', 'action']} defaults={['John Doe', 'Submit']}>
            {([placeholder, action]) => (
              <Fragment>
                <EuiFieldText
                  placeholder={placeholder}
                  value={this.state.name}
                /><EuiSpacer size="m" />

                <EuiButton>{action}</EuiButton>
              </Fragment>
            )}
          </I18n>
        </div>
      </EuiContext>
    );
  }
}
