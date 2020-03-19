import React, { useState } from 'react';

import {
  EuiOverlayMask,
  EuiButton,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';

const expressionList = ['😂', '🤣', '😤', '😭', '🐀', '💚'];
const colorList = [
  'rgba(46, 204, 113,0.8)',
  'rgba(39, 174, 96,0.8)',
  'rgba(241, 196, 15,0.8)',
  'rgba(243, 156, 18,0.8)',
  'rgba(230, 126, 34,0.8)',
  'rgba(149, 165, 166,0.8)',
];

const rand = () => Math.floor(Math.random() * 6);

export default () => {
  const [modalOpen, changeModal] = useState(false);
  const [selectedModal, selectModal] = useState(1);

  const toggleModal = modal => {
    if (modal) selectModal(modal);
    changeModal(!modalOpen);
  };

  if (modalOpen) {
    const fixChild = (
      <React.Fragment>
        <EuiText>
          <h1> {expressionList[rand()]} &nbsp;&nbsp;</h1>
        </EuiText>
        <EuiButton onClick={() => toggleModal()}>
          Close Overlay {expressionList[rand()]}
        </EuiButton>
      </React.Fragment>
    );

    if (selectedModal === 2) {
      return (
        <EuiOverlayMask style={`background:${colorList[rand()]}`}>
          {fixChild}
        </EuiOverlayMask>
      );
    }

    return <EuiOverlayMask> {fixChild} </EuiOverlayMask>;
  }

  return (
    <React.Fragment>
      <EuiButton onClick={() => toggleModal(1)}>
        Open Simple Overlay {expressionList[rand()]}
      </EuiButton>
      <EuiSpacer size="xxl" />
      <EuiButton onClick={() => toggleModal(2)}>
        Open Random Background Overlay {expressionList[rand()]}
      </EuiButton>
    </React.Fragment>
  );
};
