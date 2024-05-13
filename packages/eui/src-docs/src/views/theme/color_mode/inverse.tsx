import React, { useState, FC, PropsWithChildren } from 'react';
import {
  EuiThemeProvider,
  useEuiTheme,
  EuiIcon,
  EuiSpacer,
  EuiText,
  EuiCode,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiPopover,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiTitle,
  EuiFlyoutBody,
} from '../../../../../src';

export default () => {
  return (
    <>
      <EuiThemeProvider colorMode="light">
        <ThemedChildren />
      </EuiThemeProvider>
      <EuiSpacer />

      <EuiThemeProvider colorMode="dark">
        <ThemedChildren />
      </EuiThemeProvider>
      <EuiSpacer />

      <EuiThemeProvider colorMode="inverse">
        <ThemedChildren>
          <EuiSpacer size="m" />
          <EuiText>
            <p>
              This panel is in <strong>inverse</strong> mode (the opposite of
              the global color mode), and renders a 3rd level nested theme
              provider that inverses color mode yet again.
            </p>
          </EuiText>
          <EuiSpacer size="m" />

          <EuiThemeProvider
            colorMode="inverse"
            wrapperProps={{ cloneElement: true }}
          >
            <ThemedChildren>
              <EuiText>
                <p>
                  This panel demonstrates the <EuiCode>cloneElement</EuiCode>{' '}
                  property.
                </p>
              </EuiText>
            </ThemedChildren>
          </EuiThemeProvider>
        </ThemedChildren>
      </EuiThemeProvider>
    </>
  );
};

const ThemedChildren: FC<PropsWithChildren> = ({ children, ...rest }) => {
  const { colorMode: _colorMode } = useEuiTheme();
  const colorMode = _colorMode.toLowerCase();
  return (
    <EuiPanel {...rest}>
      <EuiFlexGroup gutterSize="m">
        <EuiFlexItem>
          <EuiText>
            <p>
              <EuiIcon type="faceHappy" /> The colors of this panel and its
              portalled content are in <strong>{colorMode}</strong> mode.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <Popover>
            This popover should render in <strong>{colorMode}</strong> mode.
          </Popover>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <Modal>
            This modal should render in <strong>{colorMode}</strong> mode.
          </Modal>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <Flyout>
            This flyout should render in <strong>{colorMode}</strong> mode.
          </Flyout>
        </EuiFlexItem>
      </EuiFlexGroup>
      {children}
    </EuiPanel>
  );
};

const Popover: FC<PropsWithChildren> = ({ children }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <EuiPopover
      isOpen={isPopoverOpen}
      closePopover={() => setIsPopoverOpen(false)}
      button={
        <EuiButton
          onClick={() => setIsPopoverOpen((isOpen) => !isOpen)}
          fullWidth
          size="s"
        >
          Open popover
        </EuiButton>
      }
      display="block"
    >
      {children}
    </EuiPopover>
  );
};

const Modal: FC<PropsWithChildren> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <EuiButton onClick={() => setIsModalOpen(true)} size="s">
        Open modal
      </EuiButton>
      {isModalOpen && (
        <EuiModal onClose={() => setIsModalOpen(false)}>
          <EuiModalHeader>
            <EuiModalHeaderTitle>Modal title</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiText>
              <p>{children}</p>
            </EuiText>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton onClick={() => setIsModalOpen(false)} fill>
              Close
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}
    </>
  );
};

const Flyout: FC<PropsWithChildren> = ({ children }) => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  return (
    <>
      <EuiButton onClick={() => setIsFlyoutOpen(true)} size="s">
        Open flyout
      </EuiButton>
      {isFlyoutOpen && (
        <EuiFlyout
          ownFocus
          onClose={() => setIsFlyoutOpen(false)}
          aria-labelledby="flyoutTitle"
        >
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="m">
              <h2 id="flyoutTitle">Flyout title</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiText>
              <p>{children}</p>
            </EuiText>
          </EuiFlyoutBody>
        </EuiFlyout>
      )}
    </>
  );
};
