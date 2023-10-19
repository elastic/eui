import updateDocsVersionSwitcher from '../update-versions-log';

// Mock files
jest.mock('fs', () => ({
  readFileSync: jest.fn(() => ''),
  writeFileSync: jest.fn(),
}));
const fs = require('fs');
jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));
const { execSync } = require('child_process');

describe('updateDocsVersionSwitcher', () => {
  const mockInput = `{
  "euiVersions": [
    "3.0.0",
    "2.0.0",
    "1.0.0"
  ]
}`;
  const expectedOutput = `{
  "euiVersions": [
    "4.0.0",
    "3.0.0",
    "2.0.0",
    "1.0.0"
  ]
}`;

  beforeEach(() => jest.clearAllMocks());

  it('appends a new version to the top of the array list', () => {
    fs.readFileSync.mockReturnValue(mockInput);

    updateDocsVersionSwitcher('4.0.0');

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('versions.json'),
      expectedOutput
    );
    expect(execSync).toHaveBeenCalledWith(
      expect.stringMatching(/^git add .+versions\.json$/)
    );
  });

  it('throws an error if the version is missing', () => {
    expect(() => updateDocsVersionSwitcher('')).toThrow('Missing version');
  });

  it('throws an error the version is already at the start of the versions array', () => {
    fs.readFileSync.mockReturnValue(mockInput);
    expect(() => updateDocsVersionSwitcher('3.0.0')).toThrow(
      'Current version has already been logged'
    );
  });

  it('throws an error if the JSON data is somehow malformed', () => {
    fs.readFileSync.mockReturnValue('{}');
    expect(() => updateDocsVersionSwitcher('4.0.0')).toThrow(
      'Invalid JSON data'
    );
  });
});
