import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiSpacer,
} from '../../../../src/components';

const HeaderUpdates = forwardRef(
  ({ showNotification, notificationsNumber }, ref) => {
    const bellRef = useRef();
    const cheerRef = useRef();

    // we're passing passing the `triggerAnimation` callbacks to the `headerUpdatesRef` child components that we want to animate
    const animate = useCallback(() => {
      bellRef.current?.triggerAnimation();
      cheerRef.current?.triggerAnimation();
    }, []);

    // we're using the `useImperativeHandle` which allows the child to expose a function to the parent
    // this way we can trigger the animations on both child components: `bellRef` and `cheerRef`
    useImperativeHandle(
      ref,
      () => ({
        animate,
      }),
      [animate]
    );

    const bellButton = (
      <EuiHeaderSectionItemButton
        ref={bellRef}
        aria-label={`News feed: ${
          showNotification ? 'Updates available' : 'No updates'
        }`}
        notification={showNotification}>
        <EuiIcon type="bell" />
      </EuiHeaderSectionItemButton>
    );

    const cheerButton = (
      <EuiHeaderSectionItemButton
        ref={cheerRef}
        aria-label={`News feed: ${
          showNotification ? 'Updates available' : 'No updates'
        }`}
        notification={showNotification && notificationsNumber}>
        <EuiIcon type="cheer" />
      </EuiHeaderSectionItemButton>
    );

    return (
      <>
        {bellButton}
        {cheerButton}
      </>
    );
  }
);
HeaderUpdates.displayName = 'HeaderUpdates';

export default () => {
  const [showNotification, setShowNotification] = useState(false);
  const headerUpdatesRef = useRef();
  const [notificationsNumber, setNotificationsNumber] = useState(0);

  const notify = () => {
    if (!showNotification) {
      setNotificationsNumber(1);
      setShowNotification(true);
    } else {
      setNotificationsNumber(notificationsNumber + 1);
    }

    headerUpdatesRef.current?.animate();
  };

  return (
    <>
      <EuiFlexGroup alignItems="center" gutterSize="m">
        <EuiFlexItem grow={false}>
          <EuiButton size="s" onClick={notify}>
            Notify & animate
          </EuiButton>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButton
            size="s"
            color="warning"
            onClick={() => {
              setShowNotification(false);
              setNotificationsNumber(0);
            }}>
            Reset
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiHeader
        sections={[
          {
            items: [<EuiHeaderLogo>Elastic</EuiHeaderLogo>],
            borders: 'none',
          },
          {
            items: [
              <HeaderUpdates
                ref={headerUpdatesRef}
                showNotification={showNotification}
                setShowNotification={() => setShowNotification()}
                notificationsNumber={notificationsNumber}
              />,
            ],
            borders: 'none',
          },
        ]}
      />
    </>
  );
};
