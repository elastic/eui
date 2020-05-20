import React, { HTMLAttributes, useMemo, ElementType } from 'react';
import Diff from 'text-diff';
import classNames from 'classnames';
import { CommonProps } from '../common';

interface Props {
  afterText: string;
  beforeText: string;
  insertComponent?: ElementType;
  deleteComponent?: ElementType;
  sameComponent?: ElementType;
  /**
   * Time in milliseconds. Passing a timeout of value '0' disables the timeout state
   */
  timeout?: number;
}

export type EuiTextDiffProps = CommonProps &
  Props &
  HTMLAttributes<HTMLElement>;

export const useEuiTextDiff = ({
  className,
  insertComponent = 'ins',
  deleteComponent = 'del',
  sameComponent = 'span',
  beforeText = '',
  afterText = '',
  timeout = 0.1,
  ...rest
}: EuiTextDiffProps) => {
  const textDiff = useMemo(() => {
    const diff = new Diff({ timeout }); // options may be passed to constructor

    return diff.main(beforeText, afterText);
  }, [beforeText, afterText, timeout]); // produces diff array

  const classes = classNames('euiTextDiff', className);

  const rendereredHtml = useMemo(() => {
    const html = [];
    if (textDiff)
      for (let i = 0; i < textDiff.length; i++) {
        let Element: ElementType;
        const el = textDiff[i];
        if (el[0] === 0) Element = sameComponent;
        else if (el[0] === -1) Element = deleteComponent;
        else Element = insertComponent;
        html.push(<Element key={i}>{el[1]}</Element>);
      }

    return html;
  }, [textDiff, deleteComponent, insertComponent, sameComponent]); // produces diff array

  return [
    <div className={classes} {...rest}>
      {rendereredHtml}
    </div>,
    textDiff,
  ];
};
