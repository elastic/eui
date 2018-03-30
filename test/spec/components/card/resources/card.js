import React from 'react';
import ReactDOM from 'react-dom';

import '../../../../../src/theme_k6_light.scss';
import {
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem
} from '../../../../../';


const icons = ['Beats', 'Cloud', 'Xpack', 'Kibana'];

const cardNodes = icons.map(function (item, index) {
  return (
    <EuiFlexItem key={index}>
      <EuiCard
        icon={<EuiIcon size="xxl" type={`logo${item}`} />}
        title={`Elastic ${item}`}
        description="Example of a card's description. Stick to one or two sentences."
        onClick={() => window.alert('Card clicked')}
      />
    </EuiFlexItem>
  );
});

export const FlexGroup = () => (
  <EuiFlexGroup id="cardGroup" gutterSize="l">
    {cardNodes}
  </EuiFlexGroup>
);

ReactDOM.render(<FlexGroup/>, document.getElementById('app'));
