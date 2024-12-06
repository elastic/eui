const { collateChangelogFiles } = require('../update-changelog');

// Mock files
jest.mock('fs', () => ({
  readFileSync: jest.fn(() => ''),
  writeFileSync: jest.fn(),
}));
jest.mock('glob', () => ({
  sync: jest.fn(() => ['123.md', '456.md', '987.md']),
}));
const fs = require('fs');
const glob = require('glob');

describe('collateChangelogFiles', () => {
  it('handles features without headings', () => {
    fs.readFileSync.mockReturnValue('- Added new feature');
    const { changelog } = collateChangelogFiles();

    expect(changelog).toMatchInlineSnapshot(`
      "- Added new feature ([#123](https://github.com/elastic/eui/pull/123))
      - Added new feature ([#456](https://github.com/elastic/eui/pull/456))
      - Added new feature ([#987](https://github.com/elastic/eui/pull/987))"
    `);
  });

  it('handles headings', () => {
    fs.readFileSync.mockReturnValue(
      '**Bug fixes**\n- Fixed something\n\n**Breaking changes**\n\n- Removed something'
    );
    const { changelog } = collateChangelogFiles();

    expect(changelog).toMatchInlineSnapshot(`
      "**Bug fixes**

      - Fixed something ([#123](https://github.com/elastic/eui/pull/123))
      - Fixed something ([#456](https://github.com/elastic/eui/pull/456))
      - Fixed something ([#987](https://github.com/elastic/eui/pull/987))

      **Breaking changes**

      - Removed something ([#123](https://github.com/elastic/eui/pull/123))
      - Removed something ([#456](https://github.com/elastic/eui/pull/456))
      - Removed something ([#987](https://github.com/elastic/eui/pull/987))"
    `);
  });

  it('handles custom headings', () => {
    fs.readFileSync.mockReturnValue('**Custom heading**\nHello world!');
    const { changelog } = collateChangelogFiles();

    expect(changelog).toMatchInlineSnapshot(`
      "**Custom heading**

      Hello world! ([#123](https://github.com/elastic/eui/pull/123))
      Hello world! ([#456](https://github.com/elastic/eui/pull/456))
      Hello world! ([#987](https://github.com/elastic/eui/pull/987))"
    `);
  });

  it('does not misinterpret inline bolding as headings', () => {
    fs.readFileSync.mockReturnValue(
      '**Breaking change**\n\n- Removed **very important** feature'
    );
    const { changelog } = collateChangelogFiles();

    expect(changelog).toMatchInlineSnapshot(`
      "**Breaking change**

      - Removed **very important** feature ([#123](https://github.com/elastic/eui/pull/123))
      - Removed **very important** feature ([#456](https://github.com/elastic/eui/pull/456))
      - Removed **very important** feature ([#987](https://github.com/elastic/eui/pull/987))"
    `);
  });

  it('combines different types of files together', () => {
    fs.readFileSync
      .mockReturnValueOnce(
        '**Bug fixes**\n\n- Fixed one thing\n- Fixed two things'
      )
      .mockReturnValueOnce(
        '\n- Added something\n**Bug fixes**\n- Fixed another thing\n'
      )
      .mockReturnValueOnce(
        '**Breaking changes**\n\n\n- Removed something\n\n\n**Bug fixes**\n\n\n- Fixed yet another thing'
      );
    const { changelog } = collateChangelogFiles();

    expect(changelog).toMatchInlineSnapshot(`
      "- Added something ([#456](https://github.com/elastic/eui/pull/456))

      **Bug fixes**

      - Fixed one thing ([#123](https://github.com/elastic/eui/pull/123))
      - Fixed two things ([#123](https://github.com/elastic/eui/pull/123))
      - Fixed another thing ([#456](https://github.com/elastic/eui/pull/456))
      - Fixed yet another thing ([#987](https://github.com/elastic/eui/pull/987))

      **Breaking changes**

      - Removed something ([#987](https://github.com/elastic/eui/pull/987))"
    `);
  });

  it('throws an error when the upcoming changelogs directory is empty', () => {
    glob.sync.mockReturnValueOnce([]);
    expect(() => collateChangelogFiles()).toThrow(
      /No upcoming changelog files/
    );
  });
});
