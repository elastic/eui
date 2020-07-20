import React, { useState } from 'react';

import {
  EuiPopover,
  EuiPopoverTitle,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen1, setIsPopoverOpen1] = useState(false);
  const [isPopoverOpen2, setIsPopoverOpen2] = useState(false);
  const [isPopoverOpen3, setIsPopoverOpen3] = useState(false);
  const [isPopoverOpen4, setIsPopoverOpen4] = useState(false);

  const onButtonClick1 = () =>
    setIsPopoverOpen1(isPopoverOpen1 => !isPopoverOpen1);
  const closePopover1 = () => setIsPopoverOpen1(false);

  const onButtonClick2 = () =>
    setIsPopoverOpen2(isPopoverOpen2 => !isPopoverOpen2);
  const closePopover2 = () => setIsPopoverOpen2(false);

  const onButtonClick3 = () =>
    setIsPopoverOpen3(isPopoverOpen3 => !isPopoverOpen3);
  const closePopover3 = () => setIsPopoverOpen3(false);

  const onButtonClick4 = () =>
    setIsPopoverOpen4(isPopoverOpen4 => !isPopoverOpen4);
  const closePopover4 = () => setIsPopoverOpen4(false);

  return (
    <EuiFlexGroup wrap={true}>
      <EuiFlexItem grow={false}>
        <EuiPopover
          ownFocus
          button={
            <EuiButton
              iconType="arrowDown"
              iconSide="right"
              onClick={onButtonClick2}>
              Title and small padding
            </EuiButton>
          }
          isOpen={isPopoverOpen2}
          closePopover={closePopover2}
          anchorPosition="upCenter"
          panelPaddingSize="s">
          <EuiPopoverTitle>Hello, I&rsquo;m a popover title</EuiPopoverTitle>
          <div style={{ width: '300px' }}>
            <EuiText>
              <p>Popover content</p>
            </EuiText>
          </div>
        </EuiPopover>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiPopover
          ownFocus
          button={
            <EuiButton
              iconType="arrowDown"
              iconSide="right"
              onClick={onButtonClick1}>
              Title and default padding (m)
            </EuiButton>
          }
          isOpen={isPopoverOpen1}
          closePopover={closePopover1}
          anchorPosition="upCenter">
          <EuiPopoverTitle>Hello, I&rsquo;m a popover title</EuiPopoverTitle>
          <div style={{ width: '300px' }}>
            <EuiText>
              <p>Popover content</p>
            </EuiText>
          </div>
        </EuiPopover>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiPopover
          ownFocus
          button={
            <EuiButton
              iconType="arrowDown"
              iconSide="right"
              onClick={onButtonClick4}>
              Title and large padding
            </EuiButton>
          }
          isOpen={isPopoverOpen4}
          closePopover={closePopover4}
          anchorPosition="upCenter"
          panelPaddingSize="l">
          <EuiPopoverTitle>Hello, I&rsquo;m a popover title</EuiPopoverTitle>
          <div style={{ width: '300px' }}>
            <EuiText>
              <p>Popover content</p>
            </EuiText>
          </div>
        </EuiPopover>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiPopover
          ownFocus
          button={
            <EuiButton
              iconType="arrowDown"
              iconSide="right"
              onClick={onButtonClick3}>
              Title and no padding
            </EuiButton>
          }
          isOpen={isPopoverOpen3}
          closePopover={closePopover3}
          anchorPosition="upCenter"
          panelPaddingSize="none">
          <EuiPopoverTitle>As the title, I keep my padding</EuiPopoverTitle>
          <div style={{ width: '300px' }}>
            <EuiText>
              <p>Popover content</p>
            </EuiText>
          </div>
        </EuiPopover>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
