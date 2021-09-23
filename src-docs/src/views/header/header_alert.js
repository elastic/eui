import React, { useState } from 'react';

import {
  EuiAvatar,
  EuiBadge,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiHeader,
  EuiHeaderAlert,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiLink,
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiPortal,
  EuiSpacer,
  EuiSwitch,
  EuiText,
  EuiTitle,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

const HeaderUpdates = () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const alerts = [
    {
      title: 'Control access to features',
      text: 'Show or hide applications and features per space in Kibana.',
      action: <EuiLink href="">Learn about feature controls</EuiLink>,
      date: '1 May 2019',
      badge: <EuiBadge>7.1</EuiBadge>,
    },
    {
      title: 'Kibana 7.0 is turning heads',
      text:
        'Simplified navigation, responsive dashboards, dark mode… pick your favorite.',
      action: (
        <EuiLink
          target="_blank"
          external
          href="https://www.elastic.co/blog/kibana-7-0-0-released"
        >
          Read the blog
        </EuiLink>
      ),
      date: '10 April 2019',
      badge: <EuiBadge color="hollow">7.0</EuiBadge>,
    },
    {
      title: 'Enter dark mode',
      text:
        'Kibana now supports the easy-on-the-eyes theme across the entire UI.',
      action: <EuiLink href="">Go to Advanced Settings</EuiLink>,
      date: '10 April 2019',
      badge: <EuiBadge color="hollow">7.0</EuiBadge>,
    },
    {
      title: 'Pixel-perfect Canvas is production ready',
      text: 'Your creative space for visualizing data awaits.',
      action: (
        <EuiLink
          target="_blank"
          external
          href="https://www.elastic.co/webinars/intro-to-canvas-a-new-way-to-tell-visual-stories-in-kibana"
        >
          Watch the webinar
        </EuiLink>
      ),
      date: '26 March 2019',
      badge: <EuiBadge color="hollow">6.7</EuiBadge>,
    },
    {
      title: '6.7 release notes',
      text: 'Stay up-to-date on the latest and greatest features.',
      action: (
        <EuiLink
          target="_blank"
          external
          href="https://www.elastic.co/guide/en/kibana/6.7/release-notes-6.7.0.html"
        >
          Check out the docs
        </EuiLink>
      ),
      date: '26 March 2019',
      badge: <EuiBadge color="hollow">6.7</EuiBadge>,
    },
    {
      title: 'Rollups made simple in Kibana',
      text:
        'Save space and preserve the integrity of your data directly in the UI.',
      action: (
        <EuiLink
          target="_blank"
          external
          href="https://www.elastic.co/blog/how-to-create-manage-and-visualize-elasticsearch-rollup-data-in-kibana"
        >
          Read the blog
        </EuiLink>
      ),
      date: '10 January 2019',
      badge: <EuiBadge color="hollow">6.5</EuiBadge>,
    },
  ];

  const closeFlyout = () => {
    setIsFlyoutVisible(false);
  };

  const closePopover = () => {
    setIsPopoverVisible(false);
  };

  const showFlyout = () => {
    setIsFlyoutVisible(!isFlyoutVisible);
  };

  const showPopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  const bellButton = (
    <EuiHeaderSectionItemButton
      aria-controls="headerFlyoutNewsFeed"
      aria-expanded={isFlyoutVisible}
      aria-haspopup="true"
      aria-label={'Alerts feed: Updates available'}
      onClick={() => showFlyout()}
      notification={true}
    >
      <EuiIcon type="bell" />
    </EuiHeaderSectionItemButton>
  );

  const cheerButton = (
    <EuiHeaderSectionItemButton
      aria-controls="headerPopoverNewsFeed"
      aria-expanded={isPopoverVisible}
      aria-haspopup="true"
      aria-label={"News feed: Updates available'"}
      onClick={showPopover}
      notification={6}
    >
      <EuiIcon type="cheer" />
    </EuiHeaderSectionItemButton>
  );

  const flyout = (
    <EuiPortal>
      <EuiFlyout
        onClose={closeFlyout}
        size="s"
        id="headerFlyoutNewsFeed"
        aria-labelledby="flyoutSmallTitle"
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="s">
            <h2 id="flyoutSmallTitle">What&apos;s new</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          {alerts.map((alert, i) => (
            <EuiHeaderAlert
              key={`alert-${i}`}
              title={alert.title}
              action={alert.action}
              text={alert.text}
              date={alert.date}
              badge={alert.badge}
            />
          ))}
        </EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                iconType="cross"
                onClick={closeFlyout}
                flush="left"
              >
                Close
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiText color="subdued" size="s">
                <p>Version 7.0</p>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlyoutFooter>
      </EuiFlyout>
    </EuiPortal>
  );

  const popover = (
    <EuiPopover
      id="headerPopoverNewsFeed"
      ownFocus
      repositionOnScroll
      button={cheerButton}
      isOpen={isPopoverVisible}
      closePopover={closePopover}
      panelPaddingSize="none"
    >
      <EuiPopoverTitle paddingSize="s">What&apos;s new</EuiPopoverTitle>
      <div style={{ maxHeight: '40vh', overflowY: 'auto', padding: 4 }}>
        <EuiSpacer size="s" />
        {alerts.map((alert, i) => (
          <EuiHeaderAlert
            key={`alert-${i}`}
            title={alert.title}
            action={alert.action}
            text={alert.text}
            date={alert.date}
            badge={alert.badge}
          />
        ))}
      </div>
      <EuiPopoverFooter paddingSize="s">
        <EuiText color="subdued" size="s">
          <p>Version 7.0</p>
        </EuiText>
      </EuiPopoverFooter>
    </EuiPopover>
  );

  return (
    <>
      {bellButton}
      {popover}
      {isFlyoutVisible && flyout}
    </>
  );
};

const HeaderUserMenu = () => {
  const id = htmlIdGenerator()();
  const [isOpen, setIsOpen] = useState(false);

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={id}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={onMenuButtonClick}
    >
      <EuiAvatar name="John Username" size="s" />
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      id={id}
      repositionOnScroll
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="none"
    >
      <div style={{ width: 320 }}>
        <EuiFlexGroup
          gutterSize="m"
          className="euiHeaderProfile"
          responsive={false}
        >
          <EuiFlexItem grow={false}>
            <EuiAvatar name="John Username" size="xl" />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiText>
              <p>John Username</p>
            </EuiText>

            <EuiSpacer size="m" />

            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFlexGroup justifyContent="spaceBetween">
                  <EuiFlexItem grow={false}>
                    <EuiLink>Edit profile</EuiLink>
                  </EuiFlexItem>

                  <EuiFlexItem grow={false}>
                    <EuiLink>Log out</EuiLink>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPopover>
  );
};

export default () => {
  const [position, setPosition] = useState('static');
  const [theme, setTheme] = useState('default');

  return (
    <>
      <EuiFlexGroup alignItems="center" gutterSize="m">
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label={'Make header fixed position'}
            checked={position === 'fixed'}
            onChange={(e) => setPosition(e.target.checked ? 'fixed' : 'static')}
          />
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiSwitch
            label={'Change theme to dark'}
            checked={theme === 'dark'}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'default')}
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiHeader position={position} theme={theme}>
        <EuiHeaderSection grow={false}>
          <EuiHeaderSectionItem border="right">
            <EuiHeaderLogo>Elastic</EuiHeaderLogo>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem>
            <HeaderUpdates />
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
            <HeaderUserMenu />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    </>
  );
};
