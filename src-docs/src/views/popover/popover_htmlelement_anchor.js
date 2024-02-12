import React, { useState, useEffect } from 'react';

import { createRoot } from 'react-dom/client';

import { EuiWrappingPopover } from '../../../../src/components';

const PopoverApp = (props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    props.anchor.addEventListener('click', onButtonClick);
    return () => props.anchor.removeEventListener('click', onButtonClick);
  }, [props.anchor]);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  return (
    <EuiWrappingPopover
      button={props.anchor}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
    >
      <div>Normal JSX content populates the popover.</div>
    </EuiWrappingPopover>
  );
};

export default () => {
  useEffect(() => {
    const thisAnchor = document.querySelector('#popoverAnchorButton');

    // `container` can be created here or use an existing DOM element
    // the popover DOM is positioned independently of where the container exists
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<PopoverApp anchor={thisAnchor} />);

    // Without the setTimeout, React will error about attempting to synchronously unmount
    return () => setTimeout(() => root.unmount());
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
  <button id="popoverAnchorButton" class="EuiButtonEmpty EuiButtonEmpty--primary">
    <span class="EuiButtonEmpty__content">This is an HTML button</span>
  </button>
        `,
      }}
    />
  );
};
