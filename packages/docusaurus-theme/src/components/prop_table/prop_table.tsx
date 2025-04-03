import {
  EuiBasicTable,
  EuiMarkdownFormat,
  EuiBasicTableColumn,
  EuiTextColor,
  EuiFlexGroup,
  EuiCode,
  UseEuiTheme,
  useEuiMemoizedStyles,
  EuiLink,
} from '@elastic/eui';
import {
  ProcessedComponent,
  ProcessedComponentProp,
} from '@elastic/eui-docgen';
import { useCallback, useMemo } from 'react';
import { css } from '@emotion/react';
import Heading from '@theme/Heading';
import types from '@elastic/eui-docgen/dist/types.json';

import { PropTableExtendedTypes } from './extended_types';

export interface Source {
  fileName: string;
  line: number;
  character: number;
  url: string;
}

export interface Child {
  id: number;
  name: string;
  variant: string;
  kind: number;
  flags: Record<string, unknown>;
  children?: Child[];
  groups?: Group[];
  sources?: Source[];
  type?: {
    type: string;
    types?: { type: string; value?: string }[];
    declaration?: Record<string, unknown>;
    target?: { qualifiedName: string };
    name?: string;
    package?: string;
  };
  defaultValue?: string;
}

export interface Group {
  title: string;
  children: number[];
}

export interface Types {
  schemaVersion: string;
  id: number;
  name: string;
  variant: string;
  kind: number;
  flags: Record<string, unknown>;
  children: Child[];
  groups: Group[];
  packageName: string;
  readme: unknown[];
  symbolIdMap: Record<string, unknown>;
  files: Record<string, unknown>;
}

export interface PropTableProps {
  definition: ProcessedComponent;
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  showTitle?: boolean;
}

const getPropId = (prop: ProcessedComponentProp, componentName: string) =>
  `${encodeURIComponent(componentName)}-prop-${prop.name}`;

const getPropTableStyles = ({ euiTheme }: UseEuiTheme) => ({
  propTable: css`
    margin-block: ${euiTheme.size.xl};
  `,
  header: css`
    // Increased specificity is needed here to override default
    // content heading styles
    && h1,
    && h2,
    && h3,
    && h4,
    && h5,
    && h6 {
      margin-block: 0;
    }
  `,
  table: css`
    vertical-align: top;
  `,
  propName: css`
    font-family: ${euiTheme.font.familyCode};
    font-weight: ${euiTheme.font.weight.semiBold};
  `,
  description: css`
    p:first-child {
      margin-block-start: 0;
    }
  `,
  required: css`
    font-family: ${euiTheme.font.familyCode};
    color: ${euiTheme.colors.textDanger};
  `,
  type: css`
    font-weight: ${euiTheme.font.weight.semiBold};
  `,
  tableNameLink: css`
    display: none;
    margin-inline-start: ${euiTheme.size.xs};
  `,
  tableRow: css`
    scroll-margin-block-start: calc(var(--ifm-navbar-height) + 0.5rem);

    &:hover .propLink {
      display: inline-block;
    }
  `,
});

export const PropTable = ({
  definition,
  headingLevel = 'h3',
  showTitle = true,
}: PropTableProps) => {
  const styles = useEuiMemoizedStyles(getPropTableStyles);

  const tableItems = useMemo<Array<ProcessedComponentProp>>(
    () =>
      Object.values(definition.props).sort(
        (a, b) => +b.isRequired - +a.isRequired
      ),
    [definition.props]
  );

  const columns = useMemo<Array<EuiBasicTableColumn<ProcessedComponentProp>>>(
    () => [
      {
        field: 'name',
        name: 'Prop',
        width: '150',
        render(
          value: ProcessedComponentProp['name'],
          prop: ProcessedComponentProp
        ) {
          return (
            <span css={styles.propName}>
              {value}
              <EuiLink
                href={`#${getPropId(prop, definition.displayName)}`}
                css={styles.tableNameLink}
                className="propLink"
                aria-label={`Direct link to the ${prop.name} prop`}
                title={`Direct link to the ${prop.name} prop`}
              >
                #
              </EuiLink>
            </span>
          );
        },
      },
      {
        field: 'description',
        name: 'Description and type',
        render(
          value: ProcessedComponentProp['description'],
          prop: ProcessedComponentProp
        ) {
          const result = value
            .replace(/{@link (\w+)}/g, (_, componentName) => {
              const componentSource = (types as Types).children.find(
                (item) => item.name === componentName
              )?.sources?.[0];

              if (componentSource) {
                const { fileName, line } = componentSource;
                return `[${componentName}](https://github.com/elastic/eui/tree/main/packages/${fileName}#L${line})`;
              } else {
                return `\`${componentName}\``;
              }
            })
            .trim();

          return (
            <EuiFlexGroup
              direction="column"
              alignItems="flexStart"
              gutterSize="s"
            >
              {result && (
                <EuiMarkdownFormat css={styles.description}>
                  {result}
                </EuiMarkdownFormat>
              )}
              {prop.type && (
                <span css={styles.type}>
                  Type:{' '}
                  <EuiCode language="ts">
                    {prop.type.raw || prop.type.name}
                  </EuiCode>
                </span>
              )}
            </EuiFlexGroup>
          );
        },
      },
      {
        field: 'defaultValue',
        name: 'Default value',
        width: '120',
        render(
          value: ProcessedComponentProp['defaultValue'],
          prop: ProcessedComponentProp
        ) {
          if (prop.isRequired && !value?.trim().length) {
            return <EuiTextColor css={styles.required}>Required</EuiTextColor>;
          }

          return value && <EuiCode>{value}</EuiCode>;
        },
      },
    ],
    []
  );

  const rowProps = useCallback(
    (item: ProcessedComponentProp) => ({
      id: getPropId(item, definition.displayName),
      css: styles.tableRow,
    }),
    [definition.displayName]
  );

  return (
    <EuiFlexGroup
      aria-label={`Component properties table for ${definition.displayName}`}
      gutterSize="s"
      direction="column"
      css={styles.propTable}
    >
      <header css={styles.header}>
        {showTitle && (
          <Heading as={headingLevel} id={definition.displayName}>
            {definition.displayName}
          </Heading>
        )}
        <PropTableExtendedTypes definition={definition} />
      </header>
      <EuiBasicTable
        css={styles.table}
        width="100%"
        items={tableItems}
        columns={columns}
        rowProps={rowProps}
      />
    </EuiFlexGroup>
  );
};
