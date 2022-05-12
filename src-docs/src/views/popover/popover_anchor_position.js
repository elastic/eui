import React, { useState } from 'react';

import {
  EuiPopover,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen1, setIsPopoverOpen1] = useState(false);
  const [isPopoverOpen2, setIsPopoverOpen2] = useState(false);
  const [isPopoverOpen3, setIsPopoverOpen3] = useState(false);
  const [isPopoverOpen4, setIsPopoverOpen4] = useState(false);
  const [isPopoverOpen5, setIsPopoverOpen5] = useState(false);
  const [isPopoverOpen6, setIsPopoverOpen6] = useState(false);
  const [isPopoverOpen7, setIsPopoverOpen7] = useState(false);
  const [isPopoverOpen8, setIsPopoverOpen8] = useState(false);
  const [isPopoverOpen9, setIsPopoverOpen9] = useState(false);
  const [isPopoverOpen10, setIsPopoverOpen10] = useState(false);
  const [isPopoverOpen11, setIsPopoverOpen11] = useState(false);
  const [isPopoverOpen12, setIsPopoverOpen12] = useState(false);

  const onButtonClick1 = () =>
    setIsPopoverOpen1((isPopoverOpen1) => !isPopoverOpen1);
  const closePopover1 = () => setIsPopoverOpen1(false);

  const onButtonClick2 = () =>
    setIsPopoverOpen2((isPopoverOpen2) => !isPopoverOpen2);
  const closePopover2 = () => setIsPopoverOpen2(false);

  const onButtonClick3 = () =>
    setIsPopoverOpen3((isPopoverOpen3) => !isPopoverOpen3);
  const closePopover3 = () => setIsPopoverOpen3(false);

  const onButtonClick4 = () =>
    setIsPopoverOpen4((isPopoverOpen4) => !isPopoverOpen4);
  const closePopover4 = () => setIsPopoverOpen4(false);

  const onButtonClick5 = () =>
    setIsPopoverOpen5((isPopoverOpen5) => !isPopoverOpen5);
  const closePopover5 = () => setIsPopoverOpen5(false);

  const onButtonClick6 = () =>
    setIsPopoverOpen6((isPopoverOpen6) => !isPopoverOpen6);
  const closePopover6 = () => setIsPopoverOpen6(false);

  const onButtonClick7 = () =>
    setIsPopoverOpen7((isPopoverOpen7) => !isPopoverOpen7);
  const closePopover7 = () => setIsPopoverOpen7(false);

  const onButtonClick8 = () =>
    setIsPopoverOpen8((isPopoverOpen8) => !isPopoverOpen8);
  const closePopover8 = () => setIsPopoverOpen8(false);

  const onButtonClick9 = () =>
    setIsPopoverOpen9((isPopoverOpen9) => !isPopoverOpen9);
  const closePopover9 = () => setIsPopoverOpen9(false);

  const onButtonClick10 = () =>
    setIsPopoverOpen10((isPopoverOpen10) => !isPopoverOpen10);
  const closePopover10 = () => setIsPopoverOpen10(false);

  const onButtonClick11 = () =>
    setIsPopoverOpen11((isPopoverOpen11) => !isPopoverOpen11);
  const closePopover11 = () => setIsPopoverOpen11(false);

  const onButtonClick12 = () =>
    setIsPopoverOpen12((isPopoverOpen12) => !isPopoverOpen12);
  const closePopover12 = () => setIsPopoverOpen12(false);

  const noteHeight = (
    <EuiText>
      <p style={{ width: 200 }}>
        For left- or right-aligned popovers, make sure there is sufficient
        content. If the popover height is too short, the arrow positioning will
        appear off.
      </p>
    </EuiText>
  );

  return (
    <div>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiPopover
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={onButtonClick1}
              >
                downLeft
              </EuiButton>
            }
            isOpen={isPopoverOpen1}
            closePopover={closePopover1}
            anchorPosition="downLeft"
          >
            Popover content
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
                downCenter
              </EuiButton>
            }
            isOpen={isPopoverOpen2}
            closePopover={closePopover2}
            anchorPosition="downCenter"
          >
            Popover content
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
                downRight
              </EuiButton>
            }
            isOpen={isPopoverOpen3}
            closePopover={closePopover3}
            anchorPosition="downRight"
          >
            Popover content
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiPopover
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={onButtonClick4}
              >
                upLeft
              </EuiButton>
            }
            isOpen={isPopoverOpen4}
            closePopover={closePopover4}
            anchorPosition="upLeft"
          >
            Popover content
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={onButtonClick5}
              >
                upCenter
              </EuiButton>
            }
            isOpen={isPopoverOpen5}
            closePopover={closePopover5}
            anchorPosition="upCenter"
          >
            Popover content
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={onButtonClick6}
              >
                upRight
              </EuiButton>
            }
            isOpen={isPopoverOpen6}
            closePopover={closePopover6}
            anchorPosition="upRight"
          >
            Popover content
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiPopover
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={onButtonClick7}
              >
                leftUp
              </EuiButton>
            }
            isOpen={isPopoverOpen7}
            closePopover={closePopover7}
            anchorPosition="leftUp"
          >
            {noteHeight}
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={onButtonClick8}
              >
                leftCenter
              </EuiButton>
            }
            isOpen={isPopoverOpen8}
            closePopover={closePopover8}
            anchorPosition="leftCenter"
          >
            Popover content
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={onButtonClick9}
              >
                leftDown
              </EuiButton>
            }
            isOpen={isPopoverOpen9}
            closePopover={closePopover9}
            anchorPosition="leftDown"
          >
            {noteHeight}
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiPopover
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={onButtonClick10}
              >
                rightUp
              </EuiButton>
            }
            isOpen={isPopoverOpen10}
            closePopover={closePopover10}
            anchorPosition="rightUp"
          >
            {noteHeight}
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={onButtonClick11}
              >
                rightCenter
              </EuiButton>
            }
            isOpen={isPopoverOpen11}
            closePopover={closePopover11}
            anchorPosition="rightCenter"
          >
            Popover content
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={onButtonClick12}
              >
                rightDown
              </EuiButton>
            }
            isOpen={isPopoverOpen12}
            closePopover={closePopover12}
            anchorPosition="rightDown"
          >
            {noteHeight}
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
