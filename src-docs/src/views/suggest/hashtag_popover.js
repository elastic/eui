import React, { useState } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiListGroup,
  EuiListGroupItem,
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiText,
} from '../../../../src/components';

export default (props) => {
  const [isPopoverOpen, setPopover] = useState(false);

  const togglePopover = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const hashtagButton = (
    <EuiButtonEmpty
      onClick={togglePopover}
      size="xs"
      iconType="arrowDown"
      aria-label="Saved Queries popover"
      iconSide="right"
    >
      <EuiIcon type="number" />
    </EuiButtonEmpty>
  );

  return (
    <EuiPopover
      id="popover"
      button={hashtagButton}
      isOpen={isPopoverOpen}
      anchorPosition="downLeft"
      panelPaddingSize="none"
      closePopover={closePopover}
    >
      <EuiPopoverTitle paddingSize="s">SAVED QUERIES</EuiPopoverTitle>
      <div>
        <EuiText
          size="s"
          color="subdued"
          className="savedQueryManagement__text"
        >
          <p>Save query text and filters that you want to use again.</p>
        </EuiText>
        <div className="savedQueryManagement__listWrapper">
          <EuiListGroup className="savedQueryManagement__list" flush={true}>
            <EuiListGroupItem
              extraAction={{
                color: 'danger',
                iconType: 'trash',
                iconSize: 's',
              }}
              href="#"
              label="Popular shoes in America"
            />
            <EuiListGroupItem
              extraAction={{
                color: 'danger',
                iconType: 'trash',
                iconSize: 's',
              }}
              href="#"
              label="Popular shirts in Canada"
            />
          </EuiListGroup>
        </div>
        {props.value !== '' ? (
          <EuiPopoverFooter paddingSize="s">
            <EuiFlexGroup direction="rowReverse" alignItems="center">
              <EuiFlexItem grow={false}>
                <EuiButton size="s" fill>
                  Save
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPopoverFooter>
        ) : undefined}
      </div>
    </EuiPopover>
  );
};
