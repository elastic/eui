/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext } from 'react';
import { EuiMarkdownEditorUiPlugin } from './markdown_types';

interface MarkdownPosition {
  start: { line: number; column: number; offset: number };
  end: { line: number; column: number; offset: number };
}

export interface ContextShape {
  openPluginEditor: (plugin: EuiMarkdownEditorUiPlugin) => void;
  replaceNode(position: MarkdownPosition, next: string): void;
}

export const EuiMarkdownContext = createContext<ContextShape>({
  openPluginEditor: () => {},
  replaceNode() {},
});
