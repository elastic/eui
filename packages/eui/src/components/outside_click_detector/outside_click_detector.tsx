/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  Children,
  cloneElement,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  useRef,
  useEffect,
} from 'react';
import { useGeneratedHtmlId } from '../../services/accessibility';

export interface EuiEvent extends Event {
  euiGeneratedBy: string[];
}

export interface EuiOutsideClickDetectorProps {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactElement<any>;
  onOutsideClick: (event: Event) => void;
  isDisabled?: boolean;
  onMouseDown?: (event: ReactMouseEvent) => void;
  onMouseUp?: (event: ReactMouseEvent) => void;
  onTouchStart?: (event: ReactMouseEvent) => void;
  onTouchEnd?: (event: ReactMouseEvent) => void;
}

export const EuiOutsideClickDetector = (
  props: EuiOutsideClickDetectorProps
) => {
  // the id is used to identify which EuiOutsideClickDetector
  // is the source of a click event; as the click event bubbles
  // up and reaches the click detector's child component the
  // id value is stamped on the event. This id is inspected
  // in the document's click handler, and if the id doesn't
  // exist or doesn't match this detector's id, then trigger
  // the outsideClick callback.
  //
  // Taking this approach instead of checking if the event's
  // target element exists in this component's DOM sub-tree is
  // necessary for handling clicks originating from children
  // rendered through React's portals (EuiPortal). The id tracking
  // works because React guarantees the event bubbles through the
  // virtual DOM and executes EuiClickDetector's onClick handler,
  // stamping the id even though the event originates outside
  // this component's reified DOM tree.
  const id = useGeneratedHtmlId();
  const capturedDownIds = useRef<string[]>([]);

  useEffect(() => {
    function onClickOutside(e: Event) {
      const { isDisabled, onOutsideClick } = props;

      if (isDisabled) {
        capturedDownIds.current = [];
        return;
      }

      const event = e as unknown as EuiEvent;

      if (
        (event.euiGeneratedBy && event.euiGeneratedBy.includes(id)) ||
        capturedDownIds.current.includes(id)
      ) {
        capturedDownIds.current = [];
        return;
      }

      capturedDownIds.current = [];
      return onOutsideClick(event);
    }

    document.addEventListener('mouseup', onClickOutside);
    document.addEventListener('touchend', onClickOutside);
    return () => {
      document.removeEventListener('mouseup', onClickOutside);
      document.removeEventListener('touchend', onClickOutside);
    };
  }, [props.isDisabled, props.onOutsideClick]);

  function onChildClick(
    event: ReactMouseEvent,
    cb: (event: ReactMouseEvent) => void
  ) {
    // to support nested click detectors, build an array
    // of detector ids that have been encountered;
    if (event.nativeEvent.hasOwnProperty('euiGeneratedBy')) {
      (event.nativeEvent as unknown as EuiEvent).euiGeneratedBy.push(id);
    } else {
      (event.nativeEvent as unknown as EuiEvent).euiGeneratedBy = [id];
    }
    if (cb) cb(event);
  }

  function onChildMouseDown(event: ReactMouseEvent) {
    onChildClick(event, (e) => {
      const nativeEvent = e.nativeEvent as unknown as EuiEvent;
      capturedDownIds.current = nativeEvent.euiGeneratedBy;
      if (props.onMouseDown) props.onMouseDown(e);
      if (props.onTouchStart) props.onTouchStart(e);
    });
  }

  function onChildMouseUp(event: ReactMouseEvent) {
    onChildClick(event, (e) => {
      if (props.onMouseUp) props.onMouseUp(e);
      if (props.onTouchEnd) props.onTouchEnd(e);
    });
  }

  const child = Children.only(props.children);
  const childProps = {
    ...props.children.props,
    ...{
      onMouseDown: onChildMouseDown,
      onTouchStart: onChildMouseDown,
      onMouseUp: onChildMouseUp,
      onTouchEnd: onChildMouseUp,
    },
  };
  return cloneElement(child, childProps);
};
