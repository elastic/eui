import React from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiListGroup,
  EuiListGroupItem,
  EuiPopoverFooter,
  EuiText,
} from '../../../../src/components';

export default ({ value }: { value?: 'string' }) => {
  return (
    <div>
      <EuiText size="s" color="subdued" className="savedQueryManagement__text">
        <p>Save query text and filters that you want to use again.</p>
      </EuiText>
      <div className="savedQueryManagement__listWrapper">
        <EuiListGroup className="savedQueryManagement__list" flush={true}>
          <EuiListGroupItem
            extraAction={{
              color: 'danger',
              iconType: 'trash',
              iconSize: 's',
            }}
            href="#"
            label="Popular shoes in America"
          />
          <EuiListGroupItem
            extraAction={{
              color: 'danger',
              iconType: 'trash',
              iconSize: 's',
            }}
            href="#"
            label="Popular shirts in Canada"
          />
        </EuiListGroup>
      </div>
      {value && (
        <EuiPopoverFooter paddingSize="s">
          <EuiFlexGroup direction="rowReverse" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButton size="s" fill>
                Save
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPopoverFooter>
      )}
    </div>
  );
};
