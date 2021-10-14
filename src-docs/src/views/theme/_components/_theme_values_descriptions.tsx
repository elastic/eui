import React from 'react';
import { EuiMarkdownFormat } from '../../../../../src';

export function getDescriptionSmall(type: any) {
  if (type?.description) {
    return (
      <EuiMarkdownFormat textSize="xs" color="subdued">
        {type.description}
      </EuiMarkdownFormat>
    );
  }
}

export function getDescription(type: any) {
  if (type?.description) {
    return (
      <EuiMarkdownFormat textSize="s">{type.description}</EuiMarkdownFormat>
    );
  }
}
