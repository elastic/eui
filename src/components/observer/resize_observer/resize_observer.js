import PropTypes from 'prop-types';

import { EuiObserver } from '../observer';

class EuiResizeObserver extends EuiObserver {
  constructor(...args) {
    super(...args);
    this.name = 'EuiResizeObserver';
    // Only Chrome and Opera support the `ResizeObserver` API at the time of writing
    this.hasResizeObserver = typeof ResizeObserver !== 'undefined';
  }

  onResize = () => {
    if (this.childNode != null) {
      // Eventually use `clientRect` on the `entries[]` returned natively
      const { height, width } = this.childNode.getBoundingClientRect();
      this.props.onResize({
        height,
        width
      });
    }
  }

  beginObserve = () => {
    let observerOptions;
    if (this.hasResizeObserver) {
      this.observer = new ResizeObserver(this.onResize);
    } else {
      // MutationObserver fallback
      observerOptions = {     // [MutationObserverInit](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit)
        attributes: true,     // Account for style changes from `className` or `style`
        characterData: true,  // Account for text content size differences
        childList: true,      // Account for adding/removing child nodes
        subtree: true         // Account for deep child nodes
      };
      this.observer = new MutationObserver(this.onResize);
      requestAnimationFrame(this.onResize); // Mimic ResizeObserver behavior of triggering a resize event on init
    }
    this.observer.observe(this.childNode, observerOptions);
  }
}

EuiResizeObserver.propTypes = {
  children: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
};

export { EuiResizeObserver };
