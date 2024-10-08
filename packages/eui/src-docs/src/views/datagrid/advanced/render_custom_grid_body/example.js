import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EuiSplitPanel,
  EuiFlexGroup,
  EuiCode,
  EuiSwitch,
  EuiSpacer,
  EuiLink,
} from '../../../../../../src/components';

import { GuideSectionTypes } from '../../../../components';
import { GuideSectionCodeTypesMap } from '../../../../components/guide_section/guide_section';
import { GuideSectionExampleTabs } from '../../../../components/guide_section/guide_section_parts/guide_section_tabs';

import { EuiDataGridCustomBodyProps } from '!!prop-loader!../../../../../../src/components/datagrid/data_grid_types';

import VirtualizedBody from './virtualized_body';
const virtualizedSource = require('!!raw-loader!./virtualized_body');

import UnvirtualizedBody from './unvirtualized_body';
const unvirtualizedSource = require('!!raw-loader!./unvirtualized_body');

const dataGridSource = require('!!raw-loader!./data_grid');
const dataSource = require('!!raw-loader!./data_columns_cells');

export const ConditionalDemo = () => {
  const [virtualized, setVirtualized] = useState(false);
  const [autoHeight, setAutoHeight] = useState(true);

  return (
    <EuiSplitPanel.Outer hasBorder>
      <EuiSplitPanel.Inner color="subdued">
        <EuiFlexGroup alignItems="center">
          <EuiSwitch
            label="Custom virtualization"
            checked={virtualized}
            onChange={() => setVirtualized(!virtualized)}
          />
          <EuiSwitch
            label="Constrained grid height"
            checked={virtualized ? false : !autoHeight}
            disabled={virtualized}
            onChange={() => setAutoHeight(!autoHeight)}
          />
        </EuiFlexGroup>
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner>
        {virtualized ? (
          <VirtualizedBody />
        ) : (
          <UnvirtualizedBody autoHeight={autoHeight} />
        )}
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner color="subdued" paddingSize="none">
        <GuideSectionExampleTabs
          tabs={[
            {
              type: GuideSectionTypes.TSX,
              name: '1',
              displayName: 'Body component',
              code: virtualized ? virtualizedSource : unvirtualizedSource,
            },
            {
              type: GuideSectionTypes.TSX,
              name: '2',
              displayName: 'Cell components',
              code: dataSource,
            },
            {
              type: GuideSectionTypes.TSX,
              name: '3',
              displayName: 'Data grid component',
              code: dataGridSource,
            },
            {
              ...GuideSectionCodeTypesMap.PROPS,
              props: { EuiDataGridCustomBodyProps },
            },
          ]}
        />
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  );
};

export const DataGridCustomBodyExample = {
  title: 'Custom body renderer',
  text: (
    <>
      <p>
        For <strong>extremely</strong> advanced use cases, the{' '}
        <EuiCode>renderCustomGridBody</EuiCode> prop may be used to take
        complete control over rendering the grid body. This may be useful for
        scenarios where the default{' '}
        <Link to="/tabular-content/data-grid#virtualization">virtualized</Link>{' '}
        rendering is not desired, or where custom row layouts (e.g., the
        full-width row details cell below) are required.
      </p>
      <p>
        Please note that this prop is meant to be an{' '}
        <strong>escape hatch</strong>, and should only be used if you know
        exactly what you are doing. Once a custom renderer is used, you are in
        charge of ensuring the grid has all the correct semantic and aria labels
        required by the{' '}
        <EuiLink
          href="https://www.w3.org/WAI/ARIA/apg/patterns/grid"
          target="_blank"
        >
          data grid spec
        </EuiLink>
        , and that keyboard focus and navigation still work in an accessible
        manner.
      </p>
    </>
  ),
  children: (
    <>
      <EuiSpacer />
      <ConditionalDemo />
    </>
  ),
};
