import { FunctionComponent } from 'react';

import type {
  ExcludableDefaultPlugins,
  DefaultParsingPluginsConfig as DefaultParsingPluginsConfigProps,
  DefaultProcessingPluginsConfig as DefaultProcessingPluginsConfigProps,
} from '../../../../src/components/markdown_editor/plugins/markdown_default_plugins';

import type { EuiMarkdownLinkValidatorOptions as EuiMarkdownLinkValidatorOptionsProps } from '../../../../src/components/markdown_editor';

export const DefaultPluginsConfig: FunctionComponent<{
  exclude?: ExcludableDefaultPlugins;
  parsingConfig?: DefaultParsingPluginsConfigProps;
  processingConfig?: DefaultProcessingPluginsConfigProps;
}> = () => null;

export const DefaultParsingPluginsConfig: FunctionComponent<
  DefaultParsingPluginsConfigProps
> = () => null;

export const DefaultProcessingPluginsConfig: FunctionComponent<
  DefaultProcessingPluginsConfigProps
> = () => null;

export const EuiMarkdownLinkValidatorOptions: FunctionComponent<
  EuiMarkdownLinkValidatorOptionsProps
> = () => null;
