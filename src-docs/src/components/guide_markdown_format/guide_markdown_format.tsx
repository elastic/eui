import React, { FunctionComponent } from 'react';
import {
  EuiMarkdownFormat,
  getDefaultEuiMarkdownProcessingPlugins,
} from '../../../../src/components/markdown_editor';
import { EuiText } from '../../../../src/components/text';
import { EuiTitle } from '../../../../src/components/title';
import { slugify } from '../../../../src/services';

export type GuideMarkdownFormatProps = {
  children: any;
};

export const GuideMarkdownFormat: FunctionComponent<GuideMarkdownFormatProps> = ({
  children,
}) => {
  const processingPlugins = getDefaultEuiMarkdownProcessingPlugins();
  const rehype2reactConfig = processingPlugins[1][1];

  rehype2reactConfig.components.h2 = ({ children }) => {
    const id = slugify(children[0]);

    return (
      <EuiTitle>
        <h2 id={id}>{children}</h2>
      </EuiTitle>
    );
  };

  rehype2reactConfig.components.p = ({ children }) => (
    <EuiText grow={false}>{children}</EuiText>
  );

  return (
    <EuiMarkdownFormat processingPluginList={processingPlugins}>
      {children}
    </EuiMarkdownFormat>
  );
};
