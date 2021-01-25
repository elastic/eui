import React, { useEffect, useRef, useState } from 'react';
import { EuiText, EuiResizableContainer } from '../../../../src/components';
import { fake } from 'faker';

const text = (
  <>
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <p>{fake('{{lorem.paragraphs}}')}</p>
  </>
);

export default () => {
  const dom = useRef();
  const [styles, setStyles] = useState({ display: 'none' });
  useEffect(() => {
    if (!dom.current) return;
    dom.current.innerHTML = 'YOLO';
  });
  useEffect(() => {
    setTimeout(() => setStyles({ display: 'flex' }), 1000);
  }, []);
  return (
    <EuiResizableContainer style={{ ...styles, height: '200px' }}>
      {(EuiResizablePanel, EuiResizableButton) => (
        <>
          <EuiResizablePanel initialSize={50} minSize="30%">
            <EuiText>
              <div>{text}</div>
              <a href="">Hello world</a>
            </EuiText>
          </EuiResizablePanel>

          <EuiResizableButton />

          <EuiResizablePanel initialSize={50} minSize="200px">
            <div ref={dom} />
          </EuiResizablePanel>
        </>
      )}
    </EuiResizableContainer>
  );
};
