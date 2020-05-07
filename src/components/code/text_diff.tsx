import React, { HTMLAttributes, useMemo, StatelessComponent } from 'react';
import Diff from 'text-diff';
import classNames from 'classnames';
import { CommonProps } from '../common';

export interface EuiTextDiffSharedProps {
  /**
   * Sets the syntax highlighting for a specific language
   * @see http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html#language-names-and-aliases
   * for options
   */
  language?: string;
  overflowHeight?: number;
  transparentBackground?: boolean;
  isCopyable?: boolean;
  /**
   * passing a timeout of value '0' disables the timeout state
   */
  timeout?: number;
}

interface Props extends EuiTextDiffSharedProps {
  currentText: string;
  initialText: string;
  InsertComponent?: StatelessComponent;
  DeletionComponent?: StatelessComponent;
  NoChangeComponent?: StatelessComponent;
}

export type EuiTextDiffProps = CommonProps &
  Props &
  HTMLAttributes<HTMLElement>;

export const useEuiTextDiff: Function = ({
  InsertComponent = 'ins',
  DeletionComponent = 'del',
  NoChangeComponent = 'span',
  initialText = '',
  currentText = '',
  timeout = 0.1,
  ...rest
}) => {
  const diff = new Diff({ timeout }); // options may be passed to constructor

  const textDiff = useMemo(() => {
    return diff.main(initialText, currentText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialText, currentText, diff]); // produces diff array

  const classes = classNames('euiTextDiff');

  const rendereredHtml = useMemo(() => {
    const html = [];
    if (textDiff)
      for (let i = 0; i < textDiff.length; i++) {
        let Element: StatelessComponent;
        const el = textDiff[i];
        if (el[0] === 0)
          Element = (NoChangeComponent as unknown) as StatelessComponent;
        else if (el[0] === -1)
          Element = (DeletionComponent as unknown) as StatelessComponent;
        else Element = (InsertComponent as unknown) as StatelessComponent;
        html.push(<Element key={i}>{el[1]}</Element>);
      }

    return html;
  }, [textDiff, DeletionComponent, InsertComponent, NoChangeComponent]); // produces diff array

  return [
    <div className={classes} {...rest}>
      {rendereredHtml}
    </div>,
    textDiff,
  ];
};
