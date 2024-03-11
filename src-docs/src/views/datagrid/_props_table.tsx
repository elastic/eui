import React, { FunctionComponent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  EuiCodeBlock,
  EuiBasicTable,
  EuiBasicTableProps,
  EuiSpacer,
} from '../../../../src/components';

import { getPropsFromComponent } from '../../services/props/get_props';
import { getDescription } from '../../services/props/get_description';

export interface BasicItem {
  id: string;
  prop: string;
  type?: any;
  sample?: any;
  link?: any;
}

export const DataGridPropsTable: FunctionComponent<{
  component: any;
  exclude?: string[];
  snippets: any;
  links?: any;
}> = ({ component, exclude, snippets, links }) => {
  const gridProps = getPropsFromComponent(component);
  const gridPropsKeys = Object.keys(gridProps)
    .filter((i) => !exclude?.includes(i))
    .sort();

  // Manually move the cellContext prop after renderCellValue
  const cellContext = gridPropsKeys.splice(
    gridPropsKeys.findIndex((prop) => prop === 'cellContext'),
    1
  )[0];
  if (cellContext) {
    gridPropsKeys.splice(
      gridPropsKeys.findIndex((prop) => prop === 'renderCellValue') + 1,
      0,
      cellContext
    );
  }

  const items: BasicItem[] = gridPropsKeys.map((prop) => {
    return {
      id: prop,
      prop: prop,
      type: gridProps[prop],
      sample: snippets[prop],
      link: links && links[prop],
    };
  });

  const renderPropDescription = (item: BasicItem) => {
    const description = getDescription(item.type || item, { color: 'subdued' });

    if (description) {
      return (
        <>
          <EuiSpacer size="s" />
          {description}
        </>
      );
    }
  };

  const renderProp = (item: BasicItem) => {
    if (item.link) {
      return (
        <Link to={item.link}>
          <strong>{item.prop}</strong>
        </Link>
      );
    } else {
      return <strong>{item.prop}</strong>;
    }
  };

  const renderSample = (sample: BasicItem['sample']) => {
    if (sample) {
      return (
        <div style={{ flexGrow: 1 }}>
          <EuiSpacer />
          {typeof sample === 'string' ? (
            <EuiCodeBlock paddingSize="s" language="js" isCopyable>
              {sample}
            </EuiCodeBlock>
          ) : (
            sample
          )}
        </div>
      );
    }
  };

  const columns: EuiBasicTableProps<BasicItem>['columns'] = [
    {
      field: 'prop',
      name: 'Prop',
      valign: 'top',
      textOnly: false,
      render: (prop: ReactNode, item) => (
        <div>
          {renderProp(item)}
          {renderPropDescription(item)}
        </div>
      ),
      mobileOptions: {
        header: false, // Won't show inline header in mobile view
        width: '100%', // Applies a specific width
      },
    },
    {
      field: 'sample',
      name: 'Sample snippet',
      align: 'left',
      valign: 'top',
      render: (sample: ReactNode) => renderSample(sample),
      mobileOptions: {
        header: false, // Won't show inline header in mobile view
        width: '100%', // Applies a specific width
      },
    },
  ];

  return <EuiBasicTable items={items} columns={columns} />;
};
