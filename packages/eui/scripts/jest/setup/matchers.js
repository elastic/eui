const setupEuiMatchers =
  require('../../../src/test/rtl/matchers.ts').setupEuiMatchers;
const setupEuiEnzymeMatchers =
  require('../../../src/test/enzyme/enzyme_matchers.ts').setupEuiEnzymeMatchers;

setupEuiMatchers();
setupEuiEnzymeMatchers();
