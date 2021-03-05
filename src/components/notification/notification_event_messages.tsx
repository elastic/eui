/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
