import React, { useEffect, useState } from 'react';

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

export default () => {
  const first = 'First';
  const second = 'Second';
  const [thing, setThing] = useState(first);
  const [[thing2, type], setThingAndType] = useState([first, 'span']);
  useEffect(() => {
    setTimeout(() => {
      const newThing = thing === second ? first : second;
      const newType = type === 'div' ? 'span' : 'div';
      setThing(newThing);
      setThingAndType([newThing, newType]);
    }, 5000);
  }, [thing, type]);

  return (
    <EuiText size="s">
      <p>
        <strong>Example:</strong>
      </p>
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
            <p className="eui-displayInlineBlock">
              <strong>Output:</strong>
            </p>{' '}
            <EuiCode>{innerText}</EuiCode>
          </React.Fragment>
        )}
      </EuiInnerText>

      <EuiHorizontalRule margin="xl" />

      <p>
        <strong>Example with complex children:</strong>
      </p>
      <EuiInnerText>
        {(ref, innerText) => (
          <React.Fragment>
            <EuiFlexGroup>
              <EuiFlexItem grow={false}>
                <EuiPanel paddingSize="s" grow={false}>
                  <span ref={ref} title={innerText}>
                    <EuiHighlight search="content">
                      EuiHighlight content
                    </EuiHighlight>{' '}
                    <EuiBadge>with EuiBadge</EuiBadge>
                  </span>
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup>
            <p className="eui-displayInlineBlock">
              <strong>Output:</strong>
            </p>{' '}
            <EuiCode>{innerText}</EuiCode>
          </React.Fragment>
        )}
      </EuiInnerText>

      <EuiHorizontalRule margin="xl" />

      <p>
        <strong>Example with updating content:</strong>
      </p>
      <EuiInnerText>
        {(ref, innerText) => (
          <React.Fragment>
            <EuiFlexGroup>
              <EuiFlexItem grow={false}>
                <EuiPanel paddingSize="s" grow={false}>
                  <span ref={ref} title={innerText}>
                    {thing}
                  </span>
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup>
            <p className="eui-displayInlineBlock">
              <strong>Output:</strong>
            </p>{' '}
            <EuiCode>{innerText}</EuiCode>
          </React.Fragment>
        )}
      </EuiInnerText>

      <EuiHorizontalRule margin="xl" />

      <p>
        <strong>Example with updating element:</strong>
      </p>
      <EuiInnerText>
        {(ref, innerText) => (
          <React.Fragment>
            <EuiFlexGroup>
              <EuiFlexItem grow={false}>
                <EuiPanel paddingSize="s" grow={false}>
                  {React.createElement(
                    type,
                    {
                      ref,
                      title: innerText,
                    },
                    thing2
                  )}
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup>
            <p className="eui-displayInlineBlock">
              <strong>Output:</strong>
            </p>{' '}
            <EuiCode>{innerText}</EuiCode>
          </React.Fragment>
        )}
      </EuiInnerText>
    </EuiText>
  );
};
