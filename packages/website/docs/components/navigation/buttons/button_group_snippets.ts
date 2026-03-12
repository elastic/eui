/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const buttonGroupSnippet = (): string => {
  return `<EuiButtonGroup
  legend="Button group legend"
  options={[
    { id: 'option1', label: 'Option one' },
    { id: 'option2', label: 'Option two' },
    { id: 'option3', label: 'Option three' },
  ]}
  idSelected={selectedId}
  onChange={(id) => setSelectedId(id)}
/>`;
};

export const buttonGroupMultiSnippet = (): string => {
  return `<EuiButtonGroup
  legend="Multi-select button group"
  type="multi"
  options={options}
  idToSelectedMap={selectedMap}
  onChange={(id) => toggleSelection(id)}
  color="primary"
/>`;
};

export const buttonGroupIconSnippet = (): string => {
  return `<EuiButtonGroup
  legend="Text align"
  options={[
    { id: 'left', label: 'Align left', iconType: 'editorAlignLeft' },
    { id: 'center', label: 'Align center', iconType: 'editorAlignCenter' },
    { id: 'right', label: 'Align right', iconType: 'editorAlignRight' },
  ]}
  idSelected={selectedId}
  onChange={(id) => setSelectedId(id)}
  isIconOnly
/>`;
};

export const buttonGroupCompressedSnippet = (): string => {
  return `<EuiButtonGroup
  legend="Compressed button group"
  options={options}
  idSelected={selectedId}
  onChange={(id) => setSelectedId(id)}
  buttonSize="compressed"
  isFullWidth
/>`;
};
