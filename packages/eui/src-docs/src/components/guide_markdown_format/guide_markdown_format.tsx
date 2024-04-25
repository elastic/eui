import React, { FunctionComponent } from 'react';
import {
  EuiMarkdownFormat,
  EuiMarkdownFormatProps,
  getDefaultEuiMarkdownProcessingPlugins,
} from '../../../../src/components/markdown_editor';
import { slugify } from '../../../../src/services';

export const GuideMarkdownFormat: FunctionComponent<EuiMarkdownFormatProps> = ({
  children,
  ...rest
}) => {
  const processingPlugins = getDefaultEuiMarkdownProcessingPlugins();
  const rehype2reactConfig = processingPlugins[1][1];

  rehype2reactConfig.components.h2 = ({ children }) => {
    const id = slugify(children[0]);

    return <h2 id={id}>{children}</h2>;
  };

  return (
    <EuiMarkdownFormat
      processingPluginList={processingPlugins}
      className="guideMarkdownFormat"
      textSize="m"
      {...rest}
    >
      {children}
    </EuiMarkdownFormat>
  );
};
