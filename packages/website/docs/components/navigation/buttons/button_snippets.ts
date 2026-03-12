/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// EuiButton snippet (main configurable example)
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

// EuiButtonEmpty snippet
export const buttonEmptySnippet = (): string => {
  return `<EuiButtonEmpty onClick={() => {}}>
  Empty button
</EuiButtonEmpty>

<EuiButtonEmpty size="s" onClick={() => {}}>
  Small empty button
</EuiButtonEmpty>

<EuiButtonEmpty size="xs" onClick={() => {}}>
  Extra small empty button
</EuiButtonEmpty>`;
};

// EuiButtonIcon configurable snippet
export interface ButtonIconSnippetState {
  color?: string;
  display?: string;
  size?: string;
  iconSize?: string;
  disabled?: boolean;
}

export const buttonIconSnippet = (state: ButtonIconSnippetState): string => {
  const props: string[] = [];

  if (state.color && state.color !== 'primary') {
    props.push(`color="${state.color}"`);
  }
  if (state.display && state.display !== 'empty') {
    props.push(`display="${state.display}"`);
  }
  if (state.size && state.size !== 'xs') {
    props.push(`size="${state.size}"`);
  }
  if (state.iconSize && state.iconSize !== 'm') {
    props.push(`iconSize="${state.iconSize}"`);
  }
  if (state.disabled) {
    props.push('disabled');
  }
  props.push('iconType="documentation"');
  props.push('aria-label="Open documentation"');
  props.push('onClick={() => {}}');

  const propsString = '\n  ' + props.join('\n  ') + '\n';

  return `<EuiButtonIcon${propsString}/>`;
};

// EuiButtonIcon simple examples snippet
export const buttonIconSimpleSnippet = (): string => {
  return `<EuiButtonIcon
  display="base"
  iconType="lensApp"
  size="m"
  aria-label="Lens"
/>

<EuiButtonIcon
  iconType="trash"
  aria-label="Delete"
  color="danger"
/>`;
};

// Button as link snippet
export const buttonAsLinkSnippet = (): string => {
  return `<EuiButton href="/path/to/page">
  Button with href
</EuiButton>

<EuiButtonEmpty href="/path/to/page">
  Empty button with href
</EuiButtonEmpty>`;
};

// Color semantic buttons snippet
export const buttonColorSemanticSnippet = (): string => {
  return `<EuiButton color="danger">Danger</EuiButton>
<EuiButton color="warning">Warning</EuiButton>
<EuiButton color="success">Success</EuiButton>`;
};

// Text color variant snippet
export const buttonTextColorSnippet = (): string => {
  return `<EuiButton color="text">Text color button</EuiButton>

<EuiButtonIcon
  color="text"
  display="base"
  iconType="pencil"
  size="m"
  aria-label="Edit"
/>`;
};

// Flush prop snippet
export const buttonFlushSnippet = (): string => {
  return `<EuiButtonEmpty flush="left">Flush left</EuiButtonEmpty>

<EuiButtonEmpty flush="right">Flush right</EuiButtonEmpty>`;
};

// Disabled state snippet
export interface DisabledSnippetState {
  disabled?: boolean;
}

export const buttonDisabledSnippet = (state: DisabledSnippetState): string => {
  const props: string[] = [];
  if (state.disabled) {
    props.push('disabled');
  }
  props.push('fill');

  const propsString = '\n  ' + props.join('\n  ') + '\n';
  const content = state.disabled ? 'Disabled' : 'Button';

  return `<EuiButton${propsString}>
  ${content}
</EuiButton>`;
};

// Disabled and focusable snippet
export const buttonDisabledFocusableSnippet = (state: DisabledSnippetState): string => {
  const props: string[] = [];
  if (state.disabled) {
    props.push('disabled');
    props.push('hasAriaDisabled');
  }
  props.push('fill');

  const propsString = '\n  ' + props.join('\n  ') + '\n';
  const content = state.disabled ? 'Custom disabled' : 'Button';

  return `<EuiButton${propsString}>
  ${content}
</EuiButton>`;
};

// Loading state snippet
export interface LoadingSnippetState {
  isLoading?: boolean;
}

export const buttonLoadingSnippet = (state: LoadingSnippetState): string => {
  const props: string[] = [];
  if (state.isLoading) {
    props.push('isLoading');
  }
  props.push('fill');

  const propsString = '\n  ' + props.join('\n  ') + '\n';
  const content = state.isLoading ? 'Loading...' : 'Button';

  return `<EuiButton${propsString}>
  ${content}
</EuiButton>`;
};

// Toggle button snippet
export const toggleButtonSnippet = (): string => {
  return `<EuiButton onClick={() => setIsOn(!isOn)}>
  {isOn ? 'Toggled' : 'Toggle me'}
</EuiButton>

<EuiButtonIcon
  aria-label={isPlaying ? 'Pause' : 'Play'}
  iconType={isPlaying ? 'pause' : 'play'}
  onClick={() => setIsPlaying(!isPlaying)}
/>`;
};

// Toggle button with isSelected snippet
export const toggleButtonSelectedSnippet = (): string => {
  return `<EuiButton
  isSelected={isOn}
  fill={isOn}
  iconType={isOn ? 'starFillSpace' : 'starPlusEmpty'}
  onClick={() => setIsOn(!isOn)}
>
  Toggle me
</EuiButton>

<EuiButtonIcon
  display={isOn ? 'base' : 'empty'}
  aria-label="Autosave"
  iconType="save"
  aria-pressed={isOn}
  color={isOn ? 'success' : 'text'}
  onClick={() => setIsOn(!isOn)}
/>`;
};
