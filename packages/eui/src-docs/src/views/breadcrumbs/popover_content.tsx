import React, { useState } from 'react';

import {
  EuiBreadcrumbs,
  EuiBreadcrumb,
  EuiPopoverTitle,
  EuiPopoverFooter,
  EuiContextMenuPanel,
  EuiSelectable,
  EuiSelectableOption,
  EuiAvatar,
  EuiButton,
  EuiContextMenuItem,
} from '../../../../src';

export default () => {
  const [spaces, setSpaces] = useState<EuiSelectableOption[]>([
    {
      label: 'My space',
      checked: 'on',
      prepend: <EuiAvatar type="space" size="s" name="My space" />,
    },
    {
      label: "Jim's space",
      prepend: <EuiAvatar type="space" size="s" name="Jim" />,
    },
    {
      label: "Pam's space",
      prepend: <EuiAvatar type="space" size="s" name="Pam" />,
    },
    {
      label: "Michael's space",
      prepend: <EuiAvatar type="space" size="s" name="Michael" />,
    },
    {
      label: "Assistant Manager Dwight's space",
      prepend: <EuiAvatar type="space" size="s" name="Dwight" />,
    },
  ]);

  const breadcrumbs: EuiBreadcrumb[] = [
    {
      text: 'My deployment',
      // Passing a render function allows closing the breadcrumb popover from within your content
      popoverContent: (closePopover) => {
        const onClick = (e: React.MouseEvent) => {
          e.preventDefault();
          closePopover();
        };
        return (
          <>
            <EuiPopoverTitle paddingSize="s">
              Select a deployment
            </EuiPopoverTitle>
            <EuiContextMenuPanel
              size="s"
              items={[
                <EuiContextMenuItem key="A" href="#" onClick={onClick}>
                  Go to Deployment A
                </EuiContextMenuItem>,
                <EuiContextMenuItem key="B" href="#" onClick={onClick}>
                  Go to Deployment B
                </EuiContextMenuItem>,
                <EuiContextMenuItem key="C" href="#" onClick={onClick}>
                  Go to all deployments
                </EuiContextMenuItem>,
              ]}
            />
          </>
        );
      },
      popoverProps: { panelPaddingSize: 'none' },
    },
    {
      text: spaces.find((space) => space.checked === 'on')!.label,
      popoverContent: (
        <EuiSelectable
          singleSelection="always"
          options={spaces}
          onChange={(newOptions) => setSpaces(newOptions)}
          searchable
          searchProps={{ placeholder: 'Filter spaces', compressed: true }}
          aria-label="Space switcher"
          emptyMessage="No spaces available"
          noMatchesMessage="No spaces found"
        >
          {(list, search) => (
            <>
              <EuiPopoverTitle paddingSize="s">Select a space</EuiPopoverTitle>
              <EuiPopoverTitle paddingSize="s">{search}</EuiPopoverTitle>
              {list}
              <EuiPopoverFooter paddingSize="s">
                <EuiButton fullWidth size="s" iconType="gear">
                  Manage all spaces
                </EuiButton>
              </EuiPopoverFooter>
            </>
          )}
        </EuiSelectable>
      ),
      popoverProps: { panelPaddingSize: 'none' },
    },
    {
      text: 'Home',
    },
  ];

  return <EuiBreadcrumbs breadcrumbs={breadcrumbs} />;
};
