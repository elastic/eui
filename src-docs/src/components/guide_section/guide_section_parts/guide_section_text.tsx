import React, { FunctionComponent, ReactNode } from 'react';
import { EuiSpacer } from '../../../../../src/components/spacer';
import { EuiTitle } from '../../../../../src/components/title';
import { EuiText } from '../../../../../src/components/text';

export const LANGUAGES = ['javascript', 'html'] as const;

type GuideSectionExampleText = {
  title?: ReactNode;
  id?: string;
  children?: ReactNode;
  wrapText?: boolean;
};

export const GuideSectionExampleText: FunctionComponent<GuideSectionExampleText> = ({
  title,
  id,
  children,
  wrapText = true,
}) => {
  let titleNode;

  if (title) {
    titleNode = (
      <>
        <EuiTitle>
          <h2 id={id}>{title}</h2>
        </EuiTitle>
        <EuiSpacer size="m" />
      </>
    );
  }

  let textNode = children;

  if (children && wrapText) {
    textNode = <EuiText>{children}</EuiText>;
  }

  return (
    <>
      {titleNode}
      {textNode}
    </>
  );
};
