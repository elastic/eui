import React, { useState } from 'react';

import {
  EuiPopover,
  EuiPopoverTitle,
  EuiPopoverFooter,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiTextColor,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen1, setIsPopoverOpen1] = useState(false);
  const [isPopoverOpen2, setIsPopoverOpen2] = useState(false);
  const [isPopoverOpen3, setIsPopoverOpen3] = useState(false);

  const onButtonClick1 = () =>
    setIsPopoverOpen1((isPopoverOpen1) => !isPopoverOpen1);
  const closePopover1 = () => setIsPopoverOpen1(false);

  const onButtonClick2 = () =>
    setIsPopoverOpen2((isPopoverOpen2) => !isPopoverOpen2);
  const closePopover2 = () => setIsPopoverOpen2(false);

  const onButtonClick3 = () =>
    setIsPopoverOpen3((isPopoverOpen3) => !isPopoverOpen3);
  const closePopover3 = () => setIsPopoverOpen3(false);

  return (
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <EuiPopover
          button={
            <EuiButton
              iconType="arrowDown"
              iconSide="right"
              onClick={onButtonClick1}
            >
              With title
            </EuiButton>
          }
          isOpen={isPopoverOpen1}
          closePopover={closePopover1}
          anchorPosition="downCenter"
        >
          <EuiPopoverTitle>Hello, I&rsquo;m a popover title</EuiPopoverTitle>
          <div style={{ width: '300px' }}>
            <EuiText size="s">
              <p>
                Selfies migas stumptown hot chicken quinoa wolf green juice,
                mumblecore tattooed trust fund hammock truffaut taxidermy kogi.
              </p>
            </EuiText>
          </div>
        </EuiPopover>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiPopover
          button={
            <EuiButton
              iconType="arrowDown"
              iconSide="right"
              onClick={onButtonClick2}
            >
              With footer
            </EuiButton>
          }
          isOpen={isPopoverOpen2}
          closePopover={closePopover2}
          anchorPosition="upCenter"
        >
          <div style={{ width: '300px' }}>
            <EuiText size="s">
              <p>
                Selfies migas stumptown hot chicken quinoa wolf green juice,
                mumblecore tattooed trust fund hammock truffaut taxidermy kogi.
              </p>
            </EuiText>
          </div>
          <EuiPopoverFooter>
            <EuiTextColor color="subdued">
              Hello, I&rsquo;m a small popover footer caption
            </EuiTextColor>
          </EuiPopoverFooter>
        </EuiPopover>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiPopover
          button={
            <EuiButton
              iconType="arrowDown"
              iconSide="right"
              onClick={onButtonClick3}
            >
              With title and footer button
            </EuiButton>
          }
          isOpen={isPopoverOpen3}
          closePopover={closePopover3}
          anchorPosition="upCenter"
        >
          <EuiPopoverTitle>Hello, I&rsquo;m a popover title</EuiPopoverTitle>
          <div style={{ width: '300px' }}>
            <EuiText size="s">
              <p>
                Selfies migas stumptown hot chicken quinoa wolf green juice,
                mumblecore tattooed trust fund hammock truffaut taxidermy kogi.
              </p>
            </EuiText>
          </div>
          <EuiPopoverFooter>
            <EuiButton fullWidth size="s">
              Manage this thing
            </EuiButton>
          </EuiPopoverFooter>
        </EuiPopover>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
