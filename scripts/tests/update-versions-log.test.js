import {
  updateDocsVersionSwitcher,
  getUpcomingVersion,
} from '../update-versions-log';

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

import pkg from '../../package.json';
jest.mock('../../package.json', () => ({}));
describe('getUpcomingVersion', () => {
  beforeEach(() => {
    pkg.version = '1.2.3';
  });

  describe('main releases', () => {
    test('patch', () => {
      expect(getUpcomingVersion('patch')).toEqual('1.2.4');
    });
    test('minor', () => {
      expect(getUpcomingVersion('minor')).toEqual('1.3.0');
    });
    test('major', () => {
      expect(getUpcomingVersion('major')).toEqual('2.0.0');
    });
  });

  describe('special releases', () => {
    test('new backport', () => {
      expect(getUpcomingVersion('backport')).toEqual('1.2.3-backport.0');
    });
    test('exising backport', () => {
      pkg.version = '1.2.3-backport.0';
      expect(getUpcomingVersion('backport')).toEqual('1.2.3-backport.1');
    });

    test('new prerelease', () => {
      expect(getUpcomingVersion('prerelease')).toEqual('1.2.3-rc.0');
    });
    test('exising prerelease', () => {
      pkg.version = '1.2.3-rc.1';
      expect(getUpcomingVersion('prerelease')).toEqual('1.2.3-rc.2');
    });

    it('increments odd formats', () => {
      pkg.version = '1.2.3-backport-alpha';
      expect(getUpcomingVersion('backport')).toEqual('1.2.3-backport.0');
    });
  });
});
