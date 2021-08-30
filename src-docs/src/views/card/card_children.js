import React from 'react';

import {
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiCodeBlock,
  EuiRadioGroup,
  EuiText,
  EuiButton,
  EuiCode,
} from '../../../../src/components';

const radios = [
  {
    id: 'radios0',
    label: 'Option one',
  },
  {
    id: 'radios1',
    label: 'Option two',
  },
  {
    id: 'radios2',
    label: 'Option three',
    disabled: true,
  },
];

export default () => {
  return (
    <EuiFlexGroup gutterSize="l">
      <EuiFlexItem>
        <EuiCard
          textAlign="left"
          title="Lists"
          description={
            <span>
              Wrap a lists with <strong>EuiText size=&quot;s&quot;</strong> to
              match the description text.
            </span>
          }
        >
          <EuiText size="s">
            <ul>
              <li>Bullet 1</li>
              <li>Bullet 2</li>
              <li>Bullet 3</li>
            </ul>
          </EuiText>
        </EuiCard>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          textAlign="left"
          title="Form controls"
          footer={
            <EuiFlexGroup justifyContent="flexEnd">
              <EuiFlexItem grow={false}>
                <EuiButton size="s" fill>
                  Send
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          }
        >
          <EuiRadioGroup
            options={radios}
            idSelected={radios[0].id}
            onChange={() => {}}
            compressed
          />
        </EuiCard>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard
          textAlign="left"
          title="Just about anything"
          description={
            <span>
              Just be sure not to add any <EuiCode>onClick</EuiCode> handler to
              the card if the children are also interactable.
            </span>
          }
        >
          <EuiCodeBlock language="html" paddingSize="s">
            {'<yoda>Hello, young Skywalker</yoda>'}
          </EuiCodeBlock>
        </EuiCard>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
