/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export interface ButtonSnippetState {
  color?: string;
  fill?: boolean;
  fullWidth?: boolean;
  size?: string;
  iconType?: string | null;
  disabled?: boolean;
}

export const buttonSnippet = (state: ButtonSnippetState): string => {
  const props: string[] = [];

  if (state.color && state.color !== 'primary') {
    props.push(`color="${state.color}"`);
  }
  if (state.fill) {
    props.push('fill');
  }
  if (state.fullWidth) {
    props.push('fullWidth');
  }
  if (state.size === 's') {
    props.push('size="s"');
  }
  if (state.iconType) {
    props.push(`iconType="${state.iconType}"`);
  }
  if (state.disabled) {
    props.push('disabled');
  }
  props.push('onClick={() => {}}');

  const content = state.iconType ? 'Open in Discover' : 'Button';
  const propsString = props.length > 0 ? '\n  ' + props.join('\n  ') + '\n' : '';

  return `<EuiButton${propsString}>
  ${content}
</EuiButton>`;
};
