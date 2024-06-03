import React, { useState } from 'react';

import {
  EuiPopover,
  EuiPopoverTitle,
  EuiPopoverFooter,
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiCode,
} from '../../../../src';

export default () => {
  const [isPopoverOpen1, setIsPopoverOpen1] = useState(false);
  const [isPopoverOpen2, setIsPopoverOpen2] = useState(false);
  const [isPopoverOpen3, setIsPopoverOpen3] = useState(false);
  const [isPopoverOpen4, setIsPopoverOpen4] = useState(false);
  const [isPopoverOpen5, setIsPopoverOpen5] = useState(false);
  const [isPopoverOpen6, setIsPopoverOpen6] = useState(false);

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

  return (
    <>
      <EuiFlexGroup wrap={true}>
        <EuiFlexItem grow={false}>
          <EuiPopover
            panelPaddingSize="s"
            button={
              <EuiButtonEmpty
                iconType="questionInCircle"
                iconSide="right"
                onClick={onButtonClick2}
              >
                Small panel padding
              </EuiButtonEmpty>
            }
            isOpen={isPopoverOpen2}
            closePopover={closePopover2}
          >
            <EuiPopoverTitle>Hello, I&rsquo;m a popover title</EuiPopoverTitle>
            <EuiText size="s" style={{ width: 300 }}>
              <p>
                Only changing the <EuiCode>panelPaddingSize</EuiCode> will get
                inherited by the title.
              </p>
            </EuiText>
            <EuiPopoverFooter>
              <EuiButton fullWidth size="s">
                Footer button
              </EuiButton>
            </EuiPopoverFooter>
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            panelPaddingSize="none"
            button={
              <EuiButtonEmpty
                iconType="questionInCircle"
                iconSide="right"
                onClick={onButtonClick1}
              >
                No panel padding (none)
              </EuiButtonEmpty>
            }
            isOpen={isPopoverOpen1}
            closePopover={closePopover1}
          >
            <EuiPopoverTitle>Hello, I&rsquo;m a popover title</EuiPopoverTitle>
            <EuiText size="s" style={{ width: 300 }}>
              <p>
                Removing the <EuiCode>panelPaddingSize</EuiCode> completely is
                good for lists that should extend to the edges.
              </p>
            </EuiText>
            <EuiPopoverFooter>
              <EuiButton fullWidth size="s">
                Footer button
              </EuiButton>
            </EuiPopoverFooter>
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiFlexGroup wrap={true}>
        <EuiFlexItem grow={false}>
          <EuiPopover
            button={
              <EuiButtonEmpty
                iconType="questionInCircle"
                iconSide="right"
                onClick={onButtonClick4}
              >
                No title padding (none)
              </EuiButtonEmpty>
            }
            isOpen={isPopoverOpen4}
            closePopover={closePopover4}
          >
            <EuiPopoverTitle paddingSize="none">
              Hello, I&rsquo;m a popover title
            </EuiPopoverTitle>
            <EuiText size="s" style={{ width: 300 }}>
              <p>
                Removing the padding from titles only with{' '}
                <EuiCode>paddingSize</EuiCode> on{' '}
                <strong>EuiPopoverTitle</strong>.
              </p>
            </EuiText>
            <EuiPopoverFooter>
              <EuiButton fullWidth size="s">
                Footer button
              </EuiButton>
            </EuiPopoverFooter>
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            panelPaddingSize="none"
            button={
              <EuiButtonEmpty
                iconType="questionInCircle"
                iconSide="right"
                onClick={onButtonClick3}
              >
                No panel padding with small title padding
              </EuiButtonEmpty>
            }
            isOpen={isPopoverOpen3}
            closePopover={closePopover3}
          >
            <EuiPopoverTitle paddingSize="s">
              Hello, I&rsquo;m a popover title
            </EuiPopoverTitle>
            <EuiText size="s" style={{ width: 300 }}>
              <p>
                You can adjust both the <EuiCode>panelPaddingSize</EuiCode> and
                the <EuiCode>paddingSize</EuiCode> at the same time.
              </p>
            </EuiText>
            <EuiPopoverFooter>
              <EuiButton fullWidth size="s">
                Footer button
              </EuiButton>
            </EuiPopoverFooter>
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiFlexGroup wrap={true}>
        <EuiFlexItem grow={false}>
          <EuiPopover
            button={
              <EuiButtonEmpty
                iconType="questionInCircle"
                iconSide="right"
                onClick={onButtonClick5}
              >
                No footer padding (none)
              </EuiButtonEmpty>
            }
            isOpen={isPopoverOpen5}
            closePopover={closePopover5}
          >
            <EuiPopoverTitle>Hello, I&rsquo;m a popover title</EuiPopoverTitle>
            <EuiText size="s" style={{ width: 300 }}>
              <p>
                Removing the padding from footers only with{' '}
                <EuiCode>paddingSize</EuiCode> on{' '}
                <strong>EuiPopoverFooter</strong>.
              </p>
            </EuiText>
            <EuiPopoverFooter paddingSize="none">
              <EuiButton fullWidth size="s">
                Footer button
              </EuiButton>
            </EuiPopoverFooter>
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            panelPaddingSize="none"
            button={
              <EuiButtonEmpty
                iconType="questionInCircle"
                iconSide="right"
                onClick={onButtonClick6}
              >
                Set each padding individually
              </EuiButtonEmpty>
            }
            isOpen={isPopoverOpen6}
            closePopover={closePopover6}
          >
            <EuiPopoverTitle paddingSize="s">
              Hello, I&rsquo;m a popover title
            </EuiPopoverTitle>
            <EuiText size="s" style={{ width: 300 }}>
              <p>
                For the most reliable padding display, set the{' '}
                <EuiCode>panelPaddingSize</EuiCode> and the{' '}
                <EuiCode>paddingSize</EuiCode> props for each component
                individually.
              </p>
            </EuiText>
            <EuiPopoverFooter paddingSize="s">
              <EuiButton fullWidth size="s">
                Footer button
              </EuiButton>
            </EuiPopoverFooter>
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
