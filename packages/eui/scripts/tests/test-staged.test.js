const { execSync } = require('child_process');
const path = require('path');
const euiRoot = path.resolve(__dirname, '../../'); // NOTE: CI lists the EUI project root as app/ instead of eui/

describe('test-staged.js', () => {
  it('does not have --findRelatedTests regressions due to imports from src/components', () => {
    const outputString = execSync(
      'yarn test-unit --findRelatedTests --listTests src/components/beacon/beacon.tsx',
      { cwd: euiRoot }
    ).toString();
    const output = outputString
      .split('\n')
      .filter((item) => item.endsWith('test.tsx'));

    expect(
      output[0].endsWith('src/components/tour/tour_step.test.tsx')
    ).toBeTruthy();
    expect(
      output[1].endsWith('src/components/beacon/beacon.test.tsx')
    ).toBeTruthy();

    expect(output[2]).toBeUndefined();
  });
});
