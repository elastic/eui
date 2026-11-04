/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

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
  EuiPanel,
  EuiButtonEmpty,
} from '@elastic/eui';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import Heading from '@theme/Heading';

import { PropTableExtendedTypes } from './extended_types';
import { ProcessedComponent, ProcessedComponentProp } from './definition_types';

export type PropTableProps = {
  definition: ProcessedComponent;
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  showTitle?: boolean;
  parseDescription?: (description: string) => string | undefined;
};

const DESCRIPTION_EXPAND_THRESHOLD = 120;

const getPropId = (prop: ProcessedComponentProp, componentName: string) =>
  `${encodeURIComponent(componentName)}-prop-${prop.name}`;

const isLongDescription = (text?: string) =>
  !!text &&
  (text.length > DESCRIPTION_EXPAND_THRESHOLD || /\n/.test(text.trim()));

const getPropTableStyles = ({ euiTheme }: UseEuiTheme) => ({
  propTable: css`
    // POC: keep end spacing between stacked tables; pull up under TOC heading
    margin-block-start: 0;
    margin-block-end: ${euiTheme.size.xl};
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

    tbody tr:last-child td {
      border-block-end: none;
    }
  `,
  propName: css`
    font-family: ${euiTheme.font.familyCode};
    font-weight: ${euiTheme.font.weight.semiBold};
  `,
  description: css`
    p,
    ul {
      font-size: var(--eui-font-size-s);
    }

    p {
      margin-block-end: var(--eui-size-s);
    }

    p:first-child {
      margin-block-start: 0;
    }

    p:last-child {
      margin-block-end: 0;
    }
  `,
  descriptionPreview: css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;

    /* Nested markdown blocks shouldn't add extra vertical rhythm when clamped */
    .euiMarkdownFormat {
      display: contents;
    }
  `,
  descriptionCell: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${euiTheme.size.xs};
  `,
  expandedDescription: css`
    padding-block: ${euiTheme.size.s};
    padding-inline: ${euiTheme.size.m};
  `,
  required: css`
    font-family: ${euiTheme.font.familyCode};
    color: ${euiTheme.colors.textDanger};
  `,
  typeCell: css`
    font-family: ${euiTheme.font.familyCode};
    word-break: break-word;
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
  tableCell: css`
    vertical-align: text-top;
  `,
});

export const PropTable = ({
  definition,
  headingLevel = 'h3',
  // POC: titles come from remark-injected markdown headings (TOC); default off
  showTitle = false,
  parseDescription,
}: PropTableProps) => {
  const styles = useEuiMemoizedStyles(getPropTableStyles);
  const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState<
    Record<string, ReactNode>
  >({});

  const tableItems = useMemo<Array<ProcessedComponentProp>>(
    () =>
      Object.values(definition.props).sort(
        (a, b) => +(b.isRequired ?? false) - +(a.isRequired ?? false)
      ),
    [definition.props]
  );

  const resolveDescription = useCallback(
    (value: ProcessedComponentProp['description']) =>
      parseDescription ? parseDescription(value) : value,
    [parseDescription]
  );

  const toggleDescription = useCallback(
    (prop: ProcessedComponentProp) => {
      setItemIdToExpandedRowMap((current) => {
        const next = { ...current };
        if (next[prop.name]) {
          delete next[prop.name];
        } else {
          const description = resolveDescription(prop.description);
          next[prop.name] = description ? (
            <div css={styles.expandedDescription}>
              <EuiMarkdownFormat css={styles.description}>
                {description}
              </EuiMarkdownFormat>
            </div>
          ) : null;
        }
        return next;
      });
    },
    [resolveDescription, styles.description, styles.expandedDescription]
  );

  const columns = useMemo<Array<EuiBasicTableColumn<ProcessedComponentProp>>>(
    () => [
      {
        field: 'name',
        name: 'Prop',
        width: '160px',
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
        field: 'type',
        name: 'Type',
        width: '28%',
        render(
          _value: ProcessedComponentProp['type'],
          prop: ProcessedComponentProp
        ) {
          if (!prop.type) {
            return null;
          }

          return (
            <EuiCode css={styles.typeCell} language="ts">
              {prop.type.raw || prop.type.name}
            </EuiCode>
          );
        },
      },
      {
        field: 'defaultValue',
        name: 'Default',
        width: '80px',
        render(
          value: ProcessedComponentProp['defaultValue'],
          prop: ProcessedComponentProp
        ) {
          if (prop.isRequired && !value?.trim().length) {
            return <EuiTextColor css={styles.required}>Required</EuiTextColor>;
          }

          return value ? <EuiCode>{value}</EuiCode> : null;
        },
      },
      {
        field: 'description',
        name: 'Description',
        // POC: explicit width so the transfer from Default is visible (unitless
        // widths are ignored when applied via style)
        width: '40%',
        render(
          value: ProcessedComponentProp['description'],
          prop: ProcessedComponentProp
        ) {
          const description = resolveDescription(value);
          if (!description) {
            return null;
          }

          const long = isLongDescription(description);
          const isExpanded = !!itemIdToExpandedRowMap[prop.name];

          return (
            <div css={styles.descriptionCell}>
              {!isExpanded && (
                <div css={long ? styles.descriptionPreview : undefined}>
                  <EuiMarkdownFormat css={styles.description}>
                    {description}
                  </EuiMarkdownFormat>
                </div>
              )}
              {long && (
                <EuiButtonEmpty
                  size="xs"
                  flush="both"
                  color="primary"
                  onClick={() => toggleDescription(prop)}
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                </EuiButtonEmpty>
              )}
            </div>
          );
        },
      },
    ],
    [
      definition.displayName,
      itemIdToExpandedRowMap,
      resolveDescription,
      styles,
      toggleDescription,
    ]
  );

  const rowProps = useCallback(
    (item: ProcessedComponentProp) => ({
      id: getPropId(item, definition.displayName),
      css: styles.tableRow,
    }),
    [definition.displayName, styles.tableRow]
  );

  const cellProps = useCallback(
    () => ({
      css: styles.tableCell,
    }),
    [styles.tableCell]
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
      <EuiPanel color="plain" hasBorder>
        <EuiBasicTable
          css={styles.table}
          width="100%"
          items={tableItems}
          itemId="name"
          itemIdToExpandedRowMap={itemIdToExpandedRowMap}
          columns={columns}
          rowProps={rowProps}
          cellProps={cellProps}
          compressed
        />
      </EuiPanel>
    </EuiFlexGroup>
  );
};
