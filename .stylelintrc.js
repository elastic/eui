module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  rules: {
    'number-leading-zero': 'never',
    'color-hex-case': 'upper',
  },
  ignoreFiles: [
    'generator-eui/**/*.scss',
    'src/global_styling/react_date_picker/**/*.scss',
    'src/themes/amsterdam/global_styling/react_date_picker/**/*.scss',
    'src/components/date_picker/react-datepicker/**/*.scss',
  ],
};
