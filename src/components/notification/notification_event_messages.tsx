/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState } from 'react';
import { EuiAccordion } from '../accordion';
import { htmlIdGenerator } from '../../services';
import { useEuiI18n } from '../i18n';
import { EuiText } from '../text';

export type EuiNotificationEventMessagesProps = {
  /*
   * An array of strings that get individually wrapped in `<p>` tags
   */
  messages: string[];
  /**
   * A unique, human-friendly name for the event to be used in aria attributes (e.g. "alert-critical-01", "cloud-no-severity-12", etc..).
   */
  eventName: string;
};

export const EuiNotificationEventMessages: FunctionComponent<EuiNotificationEventMessagesProps> = ({
  messages,
  eventName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const messagesLength = messages.length;

  const accordionButtonText = useEuiI18n(
    'euiNotificationEventMessages.accordionButtonText',
    '+ {messagesLength} more',
    { messagesLength: messagesLength - 1 }
  );

  const accordionAriaLabelButtonText = useEuiI18n(
    'euiNotificationEventMessages.accordionAriaLabelButtonText',
    '+ {messagesLength} messages for {eventName}',
    {
      messagesLength: messagesLength - 1,
      eventName,
    }
  );

  const accordionHideText = useEuiI18n(
    'euiNotificationEventMessages.accordionHideText',
    'hide'
  );

  const buttonContentText = isOpen
    ? `${accordionButtonText} (${accordionHideText})`
    : accordionButtonText;

  return (
    <div className="euiNotificationEventMessages">
      {messages && messagesLength === 1 ? (
        <EuiText size="s" color="subdued">
          <p>{messages}</p>
        </EuiText>
      ) : (
        <>
          <EuiText size="s" color="subdued">
            <p>{messages[0]}</p>
          </EuiText>

          <EuiAccordion
            onToggle={setIsOpen}
            buttonProps={{ 'aria-label': accordionAriaLabelButtonText }}
            id={htmlIdGenerator('euiNotificationEventMessagesAccordion')()}
            className="euiNotificationEventMessages__accordion"
            buttonContent={buttonContentText}
            buttonClassName="euiNotificationEventMessages__accordionButton"
            arrowDisplay="none">
            <div className="euiNotificationEventMessages__accordionContent">
              {messages
                .map((notification, index) => (
                  <EuiText size="s" key={index} color="subdued">
                    <p>{notification}</p>
                  </EuiText>
                ))
                .slice(1)}
            </div>
          </EuiAccordion>
        </>
      )}
    </div>
  );
};
