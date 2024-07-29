import { EuiBasicTable, EuiMarkdownFormat, EuiBasicTableColumn, EuiTextColor, EuiCode } from '@elastic/eui';
import { ProcessedComponent, ProcessedComponentProp } from '@elastic/eui-docgen';
import { useMemo } from 'react';

export interface PropTableProps {
  definition: ProcessedComponent;
  propHeadingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const PropTable = ({
  definition,
  propHeadingLevel: PropHeadingLevel = 'h3',
}: PropTableProps) => {
  const tableItems = useMemo<Array<ProcessedComponentProp>>(
    () => Object.values(definition.props),
    [definition.props],
  );

  const columns = useMemo<Array<EuiBasicTableColumn<ProcessedComponentProp>>>(
    () => ([
      {
        field: 'name',
        name: 'Prop',
        render(value: ProcessedComponentProp['name']) {
          return (
            <PropHeadingLevel>{value}</PropHeadingLevel>
          );
        },
      },
      {
        field: 'description',
        name: 'Description and Type',
        render(value: ProcessedComponentProp['description'], prop: ProcessedComponentProp) {
          return (
            <div>
              {value?.trim() && (
                <EuiMarkdownFormat>{value}</EuiMarkdownFormat>
              )}
              {prop.type && (
                <>
                  Type: <EuiCode>{prop.type.name}</EuiCode>
                </>
              )}
            </div>
          );
        }
      },
      {
        field: 'defaultValue',
        name: 'Default value',
        render(value: ProcessedComponentProp['defaultValue'], prop: ProcessedComponentProp) {
          if (prop.isRequired) {
            return <EuiTextColor>Required</EuiTextColor>
          }

          const finalValue = (!!value && typeof value === 'object' &&
            (value as object).hasOwnProperty('value'))
              ? (value as { value: string; }).value
              : '';

          return !!finalValue && <EuiCode>{finalValue}</EuiCode>;
        },
      }
    ]),
    [],
  );

  return (
    <div>
      <EuiBasicTable width="100%" items={tableItems} columns={columns} compressed />
    </div>
  );
};
