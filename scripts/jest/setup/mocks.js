jest.mock('../../../src/components/icon', () => {
  const { EuiIcon } = require.requireActual('../../../src/components/icon/icon.testenv');
  return {
    EuiIcon
  };
});
