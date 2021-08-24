import React from 'react';
import { EuiPanel } from '../../../../src/components/panel';
import { EuiBadge } from '../../../../src/components/badge';
import { EuiButtonIcon } from '../../../../src/components/button';
import { EuiIcon } from '../../../../src/components/icon';

const CircleIndicator = ({ name }) => (
  <span className="guideDemo__notificationEventCircleIndicator">{name}</span>
);

export default () => {
  return (
    <EuiPanel paddingSize="s" style={{ maxWidth: '540px' }}>
      <div className="guideDemo__notificationEvent">
        <div className="guideDemo__notificationEventTopRow">
          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="A" />
            <EuiButtonIcon
              iconType="dot"
              className="euiNotificationEventReadButton"
              aria-hidden="true"
            />
          </div>

          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="B" />
            <EuiIcon
              type="logoElastic"
              className="guideDemo__notificationEventIcon"
            />
          </div>

          <div className="guideDemo__notificationEventBadge  guideDemo__notificationEventHighlight">
            <CircleIndicator name="C" />
            <EuiBadge
              className="euiNotificationEventMeta__badge"
              color="hollow"
            >
              type: severity
            </EuiBadge>
          </div>

          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="D" />
            time
          </div>

          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="E" />
            <EuiButtonIcon
              aria-hidden="true"
              iconType="boxesVertical"
              color="subdued"
            />
          </div>
        </div>
        <div className="guideDemo__notificationEventSections">
          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="F" /> <span>title</span>
          </div>
          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="G" /> <span>messages</span>
          </div>
          <div className="guideDemo__notificationEventHighlight">
            <CircleIndicator name="G" /> <span>primaryAction</span>
          </div>
        </div>
      </div>
    </EuiPanel>
  );
};
