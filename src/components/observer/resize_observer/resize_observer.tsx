import { ReactNode, useEffect, useState } from 'react';
import { EuiObserver, Observer } from '../observer';

interface Props {
  children: (ref: (e: HTMLElement | null) => void) => ReactNode;
  onResize: (dimensions: { height: number; width: number }) => void;
}

// Only Chrome and Opera support the `ResizeObserver` API at the time of writing
const hasResizeObserver =
  typeof window !== 'undefined' && typeof window.ResizeObserver !== 'undefined';

const mutationObserverOptions = {
  // [MutationObserverInit](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit)
  attributes: true, // Account for style changes from `className` or `style`
  characterData: true, // Account for text content size differences
  childList: true, // Account for adding/removing child nodes
  subtree: true, // Account for deep child nodes
};

export class EuiResizeObserver extends EuiObserver<Props> {
  name = 'EuiResizeObserver';

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
    // The superclass checks that childNode is not null before invoking
    // beginObserve()
    const childNode = this.childNode!;
    this.observer = makeResizeObserver(childNode, this.onResize);
  };
}

const makeResizeObserver = (node: Element, callback: () => void) => {
  let observer: Observer | undefined;
  if (hasResizeObserver) {
    observer = new window.ResizeObserver(callback);
    observer.observe(node);
  } else {
    observer = new MutationObserver(callback);
    observer.observe(node, mutationObserverOptions);
    requestAnimationFrame(callback); // Mimic ResizeObserver behavior of triggering a resize event on init
  }
  return observer;
};

export const useResizeObserver = (container: Element | null) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (container != null) {
      const observer = makeResizeObserver(container, () => {
        const boundingRect = container.getBoundingClientRect();
        setSize({
          width: boundingRect.width,
          height: boundingRect.height,
        });
      });

      return () => observer.disconnect();
    } else {
      setSize({ width: 0, height: 0 });
    }
  }, [container, setSize]);

  return size;
};
