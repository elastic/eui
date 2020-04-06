import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { EuiObserver, Observer } from '../observer';

interface Props {
  children: (ref: (e: HTMLElement | null) => void) => ReactNode;
  onResize: (dimensions: { height: number; width: number }) => void;
}

// IE11 and Safari don't support the `ResizeObserver` API at the time of writing
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

  state = {
    height: 0,
    width: 0,
  };

  onResize = () => {
    if (this.childNode != null) {
      // Eventually use `clientRect` on the `entries[]` returned natively
      const { height, width } = this.childNode.getBoundingClientRect();
      // Check for actual resize event
      if (this.state.height === height && this.state.width === width) {
        return;
      }

      this.props.onResize({
        height,
        width,
      });
      this.setState({ height, width });
    }
  };

  beginObserve = () => {
    // The superclass checks that childNode is not null before invoking
    // beginObserve()
    const childNode = this.childNode!;
    this.observer = makeResizeObserver(childNode, this.onResize);
  };
}

const makeCompatibleObserver = (node: Element, callback: () => void) => {
  const observer = new MutationObserver(callback);
  observer.observe(node, mutationObserverOptions);

  window.addEventListener('resize', callback);

  const _disconnect = observer.disconnect.bind(observer);
  observer.disconnect = () => {
    _disconnect();
    window.removeEventListener('resize', callback);
  };

  return observer;
};

const makeResizeObserver = (node: Element, callback: () => void) => {
  let observer: Observer | undefined;
  if (hasResizeObserver) {
    observer = new window.ResizeObserver(callback);
    observer.observe(node);
  } else {
    observer = makeCompatibleObserver(node, callback);
    requestAnimationFrame(callback); // Mimic ResizeObserver behavior of triggering a resize event on init
  }
  return observer;
};

export const useResizeObserver = (container: Element | null) => {
  const [size, _setSize] = useState({ width: 0, height: 0 });

  // _currentDimensions and _setSize are used to only store the
  // new state (and trigger a re-render) when the new dimensions actually differ
  const _currentDimensions = useRef(size);
  const setSize = useCallback(dimensions => {
    if (
      _currentDimensions.current.width !== dimensions.width ||
      _currentDimensions.current.height !== dimensions.height
    ) {
      _currentDimensions.current = dimensions;
      _setSize(dimensions);
    }
  }, []);

  useEffect(() => {
    if (container != null) {
      // ResizeObserver's first call to the observation callback is scheduled in the future
      // so find the container's initial dimensions now
      const boundingRect = container.getBoundingClientRect();
      setSize({
        width: boundingRect.width,
        height: boundingRect.height,
      });

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
