import React, { useState, useRef } from 'react';

import { EuiToolTip, EuiButton } from '../../../../src';

export default () => {
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const fixedRef = useRef<HTMLButtonElement | null>(null);
  const [isExampleShown, setIsExampleShown] = useState(false);
  const toggleExample = () => {
    setIsExampleShown((isExampleShown) => {
      requestAnimationFrame(() => {
        isExampleShown ? toggleRef.current?.focus() : fixedRef.current?.focus();
      });
      return !isExampleShown;
    });
  };

  return (
    <>
      <EuiButton onClick={toggleExample} buttonRef={toggleRef}>
        Toggle fixed example
      </EuiButton>
      {isExampleShown && (
        <div style={{ position: 'fixed', bottom: 50, right: 50, zIndex: 10 }}>
          <EuiToolTip
            position="top"
            content="This tooltip text scrolls with the fixed example button."
            repositionOnScroll={true}
          >
            <EuiButton fill buttonRef={fixedRef} onClick={toggleExample}>
              Toggle fixed example
            </EuiButton>
          </EuiToolTip>
        </div>
      )}
    </>
  );
};
