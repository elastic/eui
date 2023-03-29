import React, { useState } from 'react';

import {
  EuiButton,
  EuiContextMenuPanel,
  EuiPopover,
  EuiSelectable,
  EuiSelectableOption,
  EuiHorizontalRule,
  EuiContextMenuItem,
  EuiTitle,
  EuiSpacer,
  EuiPanel,
} from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [isPopoverOpen, setPopover] = useState(false);
  const customContextMenuPopoverId = useGeneratedHtmlId({
    prefix: 'customContextMenuPopover',
  });

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const button = (
    <EuiButton
      size="s"
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}
    >
      Click to show some content
    </EuiButton>
  );

  const [options, setOptions] = useState<EuiSelectableOption[]>([
    {
      label: 'APM',
    },
    {
      label: 'filebeat-*',
    },
    {
      label: 'logs-*',
    },
    {
      label: 'metrics-*',
    },
  ]);

  return (
    <EuiPopover
      id={customContextMenuPopoverId}
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="downLeft"
    >
      <EuiContextMenuPanel>
        <EuiContextMenuItem key="item-1" icon="indexOpen" size="s">
          Add a field to this data view
        </EuiContextMenuItem>
        <EuiContextMenuItem key="item-2" icon="indexSettings" size="s">
          Manage this data view
        </EuiContextMenuItem>

        <EuiHorizontalRule margin="none" />

        <EuiPanel color="transparent" paddingSize="s">
          <EuiTitle size="xxxs">
            <h3>Data views</h3>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiSelectable
            aria-label="Find a data view"
            searchable
            searchProps={{
              compressed: true,
              placeholder: 'Find a data view',
            }}
            options={options}
            onChange={(newOptions) => setOptions(newOptions)}
          >
            {(list, search) => (
              <>
                {search}
                {list}
              </>
            )}
          </EuiSelectable>
        </EuiPanel>
      </EuiContextMenuPanel>
    </EuiPopover>
  );
};
