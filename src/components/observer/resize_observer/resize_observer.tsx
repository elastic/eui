import { ReactNode } from 'react';

import { EuiObserver } from '../observer';

interface Props {
  children: (ref: (e: HTMLElement | null) => void) => ReactNode;
  onResize: (dimensions: { height: number; width: number }) => void;
}

export class EuiResizeObserver extends EuiObserver<Props> {
  name = 'EuiResizeObserver';

  // Only Chrome and Opera support the `ResizeObserver` API at the time of writing
  hasResizeObserver = typeof window.ResizeObserver !== 'undefined';

  onResize = () => {
    if (this.childNode != null) {
      // Eventually use `clientRect` on the `entries[]` returned natively
      const { height, width } = this.childNode.getBoundingClientRect();
      this.props.onResize({
        height,
        width,
      });
    }
  };

  beginObserve = () => {
    let observerOptions;
    if (this.hasResizeObserver) {
      this.observer = new window.ResizeObserver(this.onResize);
    } else {
      // MutationObserver fallback
      observerOptions = {
        // [MutationObserverInit](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit)
        attributes: true, // Account for style changes from `className` or `style`
        characterData: true, // Account for text content size differences
        childList: true, // Account for adding/removing child nodes
        subtree: true, // Account for deep child nodes
      };
      this.observer = new MutationObserver(this.onResize);
      requestAnimationFrame(this.onResize); // Mimic ResizeObserver behavior of triggering a resize event on init
    }
    // The superclass checks that childNode is not null before invoking
    // beginObserve()
    this.observer.observe(this.childNode!, observerOptions);
  };
}
