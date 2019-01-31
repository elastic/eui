const rule = require('./i18n');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: 'babel-eslint'
});

const valid = [
  // nothing to validate against
  '<EuiI18n token="euiFooBar.tokenName" default="Some default value"/>',

  // values agree with default string
  `<EuiI18n token="euiFooBar.tokenName" default="{value}, {value2}" values={{ value: 'Hello', value2: 'World' }}/>`,

  // valid tokens
  `<EuiI18n tokens={['euiFooBar.token1', 'euiFooBar.token2']} defaults={['value1', 'value 2']}/>`,

  // token name is used by render prop
  `<EuiI18n token="euiFooBar.tokenName" default="Some default value">
      {tokenName => 'asdf'}
    </EuiI18n>`,
  `<EuiI18n token="euiFooBar.tokenName" default="Some default value">
      {(tokenName) => 'asdf'}
    </EuiI18n>`,

  // token names are used by render prop
  `<EuiI18n tokens={['euiFooBar.token1', 'euiFooBar.token2']} defaults={['value 1', 'value 2']}>
      {([token1, token2]) => 'asdf'}
    </EuiI18n>`,

  // default callback params match values
  `<EuiI18n token="euiFooBar.token" values={{ name: 'John' }} default={({ name }) => name}/>`,
];
const invalid = [
  // token doesn't match file name
  {
    code: '<EuiI18n token="euiFooeyBar.tokenName" default="Some default value"/>',
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'euiFooeyBar.tokenName', tokenNamespace: 'euiFooBar' } }]
  },

  // token doesn't have at least two parts
  {
    code: '<EuiI18n token="euiFooBar" default="Some default value"/>',
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'euiFooBar', tokenNamespace: 'euiFooBar' } }]
  },
  {
    code: '<EuiI18n token="tokenName" default="Some default value"/>',
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'tokenName', tokenNamespace: 'euiFooBar' } }]
  },

  // invalid tokens
  {
    code: `<EuiI18n tokens={['euiFooBar.token1', 'token2']} defaults={['value1', 'value 2']}/>`,
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'token2', tokenNamespace: 'euiFooBar' } }]
  },
  {
    code: `<EuiI18n tokens={['euiFooeyBar.token1', 'euiFooBar.token2']} defaults={['value1', 'value 2']}/>`,
    errors: [{ messageId: 'invalidToken', data: { tokenValue: 'euiFooeyBar.token1', tokenNamespace: 'euiFooBar' } }]
  },
  {
    code: `<EuiI18n tokens={['euiFooBar.token1']} defaults={['value1', 'value 2']}/>`,
    errors: [{ messageId: 'mismatchedTokensAndDefaults', data: { tokenLength: 1, defaultsLength: 2 } }]
  },

  // values not in agreement with default string
  {
    code: `<EuiI18n token="euiFooBar.tokenName" default="{value}, {value2}" values={{ valuee: 'Hello', value2: 'World' }}/>`,
    errors: [{
      messageId: 'mismatchedValues',
      data: {
        expected: 'value, value2',
        provided: 'value2, valuee'
      }
    }]
  },
  {
    code: `<EuiI18n token="euiFooBar.tokenName" default="{valuee}, {value2}" values={{ value: 'Hello', value2: 'World' }}/>`,
    errors: [{
      messageId: 'mismatchedValues',
      data: {
        expected: 'value2, valuee',
        provided: 'value, value2'
      }
    }]
  },

  // token name isn't used by render prop
  {
    code: `<EuiI18n token="euiFooBar.tokenName" default="Some default value">
      {tokenGame => 'asdf'}
    </EuiI18n>`,
    errors: [{
      messageId: 'tokenNamesNotUsedInRenderProp',
      data: {
        tokenNames: 'tokenName',
        paramNames: 'tokenGame',
      }
    }],
  },

  // token names aren't used by render prop
  {
    code: `<EuiI18n tokens={['euiFooBar.token1', 'euiFooBar.token2']} defaults={['value 1', 'value 2']}>
      {([tokener1, token2]) => 'asdf'}
    </EuiI18n>`,
    errors: [{
      messageId: 'tokenNamesNotUsedInRenderProp',
      data: {
        tokenNames: 'token1, token2',
        paramNames: 'token2, tokener1'
      }
    }],
  },

  // default callback params don't match values
  {
    code: `<EuiI18n token="euiFooBar.token" values={{ nare: 'John' }} default={({ name }) => name}/>`,
    errors: [{
      messageId: 'mismatchedValues',
      data: {
        expected: 'name',
        provided: 'nare'
      }
    }]
  },
];

function withFilename(ruleset) {
  return ruleset.map(code => {
    const definition = typeof code === 'string' ? { code } : code;
    definition.filename = 'foo_bar.js';
    return definition;
  });
}

ruleTester.run('i18n', rule, {
  valid: withFilename(valid),
  invalid: withFilename(invalid),
});
