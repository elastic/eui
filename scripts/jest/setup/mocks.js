jest.mock('./../../../src/components/icon', () => {
  const { EuiIcon } = require('./../../../src/components/icon/icon.testenv');
  return { EuiIcon };
});

jest.mock('./../../../src/services/accessibility', () => {
  const a11y = jest.requireActual('./../../../src/services/accessibility');
  const {
    htmlIdGenerator,
    useGeneratedHtmlId,
  } = require('./../../../src/services/accessibility/html_id_generator.testenv');
  return { ...a11y, htmlIdGenerator, useGeneratedHtmlId };
});
