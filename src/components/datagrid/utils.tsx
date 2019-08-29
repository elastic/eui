import tabbable from 'tabbable';

export const getTabbables = (element: Element) => [
  ...tabbable(element),
  ...Array.from(element.querySelectorAll('[tabIndex="-1"]')),
];

export const CELL_CONTENTS_ATTR = 'data-js-cell-contents-container';
