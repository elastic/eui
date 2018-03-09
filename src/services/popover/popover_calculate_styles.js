export function calculatePopoverStyles(wrapperNodeRect, popupNodeRect, position, buffer = 16) {
  const styles = {};

  if (position === 'top') {
    styles.top = wrapperNodeRect.top + window.scrollY - (popupNodeRect.height + buffer);
    styles.left = wrapperNodeRect.left + (wrapperNodeRect.width / 2) - (popupNodeRect.width / 2);
  } else if (position === 'bottom') {
    styles.top = wrapperNodeRect.top + window.scrollY + wrapperNodeRect.height + buffer;
    styles.left = wrapperNodeRect.left + (wrapperNodeRect.width / 2) - (popupNodeRect.width / 2);
  } else if (position === 'right') {
    styles.top = wrapperNodeRect.top + window.scrollY - ((popupNodeRect.height - wrapperNodeRect.height) / 2);
    styles.left = wrapperNodeRect.left + wrapperNodeRect.width + buffer;
  } else if (position === 'left') {
    styles.top = wrapperNodeRect.top + window.scrollY - ((popupNodeRect.height - wrapperNodeRect.height) / 2);
    styles.left = wrapperNodeRect.left - popupNodeRect.width - buffer;
  }

  return styles;
}
