import React, { FunctionComponent, ReactNode } from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../../src/services';
import {
  // EuiDataGridToolBarVisibilityOptions as _EuiDataGridToolBarVisibilityOptions,
  EuiLink,
  EuiCodeBlock,
  EuiBasicTable,
  EuiBasicTableProps,
  EuiSpacer,
} from '../../../../../src/components';

import { EuiDataGridToolBarVisibilityOptions } from '!!prop-loader!../../../../../src/components/datagrid/data_grid_types';

import { getPropsFromComponent } from '../../../services/props/get_props';
import { getDescriptionSmall } from '../../../services/props/get_description';

const gridSnippets = {
  showColumnSelector: `showColumnSelector: {
  allowHide: false;
  allowReorder: false;
}`,
  showDisplaySelector: `showDisplaySelector: {
  allowDensity: false;
  allowRowHeight: false;
}`,
  showSortSelector: 'showSortSelector: false',
  showFullScreenSelector: 'showFullScreenSelector: false',
  additionalControls: `additionalControls: {
  left: <EuiButtonEmpty size="xs" />,
  right: <EuiButtonIcon size="xs" />,
}`,
};

const gridLinks = {
  rowHeightsOptions: '/#/tabular-content/data-grid-row-heights-options',
  gridStyle: '/#/tabular-content/data-grid-styling-and-control',
};

interface BasicItem {
  id: string;
  prop: string;
  type?: any;
  sample?: any;
  link?: any;
}

export const ToolbarPropsTable: FunctionComponent<{}> = ({}) => {
  const { euiTheme } = useEuiTheme();
  const gridProps = getPropsFromComponent(EuiDataGridToolBarVisibilityOptions);
  const gridPropsToExclude = [
    'className',
    // 'data-test-subj',
    // 'aria-label',
    // 'width',
    // 'height',
  ];
  const gridPropsKeys = Object.keys(gridProps)
    .filter((i) => !gridPropsToExclude.includes(i))
    .sort();

  const items: BasicItem[] = gridPropsKeys.map((prop) => {
    return {
      id: prop,
      prop: prop,
      type: gridProps[prop],
      // @ts-ignore TODO
      sample: gridSnippets[prop],
      // @ts-ignore TODO
      link: gridLinks[prop],
    };
  });

  const renderPropDescription = (item: BasicItem) => {
    const description = getDescriptionSmall(item.type || item);

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
        <EuiLink href={item.link}>
          <strong>{item.prop}</strong>
        </EuiLink>
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
          <EuiCodeBlock paddingSize="s" language="tsx" isCopyable>
            {sample}
          </EuiCodeBlock>
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
          {/* {renderSample(item.sample)} */}
        </div>
      ),
      mobileOptions: {
        header: false, // Won't show inline header in mobile view
        width: '100%', // Applies a specific width
      },
    },
  ];

  columns.push({
    field: 'sample',
    name: 'Sample snippet',
    align: 'left',
    valign: 'top',
    render: (sample: ReactNode) => renderSample(sample),
    mobileOptions: {
      header: false, // Won't show inline header in mobile view
      width: '100%', // Applies a specific width
    },
  });

  return (
    // <EuiDataGridToolBarVisibilityOptions  />
    <EuiBasicTable
      css={css`
        margin-bottom: ${euiTheme.size.xxxl};
      `}
      items={items}
      columns={columns}
    />
  );
};
