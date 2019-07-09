import React from 'react';

import { EuiInnerText } from '../../../../src/components/inner_text';

import {
  EuiBadge,
  EuiCode,
  EuiFlexGroup,
  EuiHighlight,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPanel,
  EuiText,
} from '../../../../src/components';

export default () => (
  <EuiText size="s">
    <h5>Example:</h5>
    <EuiInnerText>
      {(ref, innerText) => (
        <React.Fragment>
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiPanel paddingSize="s" grow={false}>
                <span ref={ref} title={innerText}>
                  Simple string content
                </span>
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGroup>
          <h5 className="eui-displayInlineBlock">Output:</h5>{' '}
          <EuiCode>{innerText}</EuiCode>
        </React.Fragment>
      )}
    </EuiInnerText>

    <EuiHorizontalRule margin="xl" />

    <h5>Example:</h5>
    <EuiInnerText>
      {(ref, innerText) => (
        <React.Fragment>
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiPanel paddingSize="s" grow={false}>
                <span ref={ref} title={innerText}>
                  <EuiHighlight search="content">
                    EuiHighlight content
                  </EuiHighlight>
                  <EuiBadge>with EuiBadge</EuiBadge>
                </span>
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGroup>
          <h5 className="eui-displayInlineBlock">Output:</h5>{' '}
          <EuiCode>{innerText}</EuiCode>
        </React.Fragment>
      )}
    </EuiInnerText>
  </EuiText>
);
