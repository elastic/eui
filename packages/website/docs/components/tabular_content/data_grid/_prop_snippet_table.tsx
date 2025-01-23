import React, { useMemo, FC, ReactNode } from 'react';
import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiMarkdownFormat,
  getDefaultEuiMarkdownPlugins,
  EuiCodeBlock,
  EuiLink,
  EuiSpacer,
} from '@elastic/eui';
import { ProcessedComponent } from '@elastic/eui-docgen';

type DataGridPropSnippetTableProps = {
  propSnippetMap: Record<string, string | ReactNode>;
  linksMap?: Record<string, string>;
  docgen: ProcessedComponent;
};

const { processingPlugins, parsingPlugins } = getDefaultEuiMarkdownPlugins({
  exclude: ['lineBreaks'],
});

const columns: Array<EuiBasicTableColumn<{}>> = [
  {
    name: 'Prop',
    render: ({ propName, propDescription }) => (
      <>
        {propName}
        {propDescription && (
          <>
            <EuiSpacer size="s" />
            <EuiMarkdownFormat
              textSize="s"
              processingPluginList={processingPlugins}
              parsingPluginList={parsingPlugins}
            >
              {propDescription}
            </EuiMarkdownFormat>
          </>
        )}
      </>
    ),
    textOnly: true,
    valign: 'top',
  },
  {
    field: 'snippet',
    name: 'Sample snippet',
    render: (snippet: string | ReactNode) =>
      typeof snippet === 'string' ? (
        <EuiCodeBlock
          fontSize="s"
          paddingSize="s"
          className="eui-fullWidth"
          isCopyable
          language="tsx"
        >
          {snippet}
        </EuiCodeBlock>
      ) : (
        snippet
      ),
    valign: 'top',
  },
];

export const DataGridPropSnippetTable: FC<DataGridPropSnippetTableProps> = ({
  propSnippetMap,
  linksMap,
  docgen,
}) => {
  const items = useMemo(
    () =>
      Object.entries(propSnippetMap).map(([prop, snippet]) => {
        const propLink = linksMap?.[prop];
        const propName = propLink ? (
          <EuiLink href={propLink}>
            <strong>{prop}</strong>
          </EuiLink>
        ) : (
          <strong>{prop}</strong>
        );
        const propDescription = docgen.props[prop]?.description;

        return { propName, propDescription, snippet };
      }),
    [propSnippetMap]
  );

  return <EuiBasicTable items={items} columns={columns} />;
};
