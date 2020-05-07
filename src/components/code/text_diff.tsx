import React, {
  HTMLAttributes,
  useMemo,
  useEffect,
  StatelessComponent,
} from 'react';
import Diff from 'text-diff';
import classNames from 'classnames';
import { FontSize, PaddingSize } from './code';
import { CommonProps } from '../common';

export const fontSizeToClassNameMap = {
  s: 'euiTextDiff--fontSmall',
  m: 'euiTextDiff--fontMedium',
  l: 'euiTextDiff--fontLarge',
};

export const paddingSizeToClassNameMap: {
  [paddingSize in PaddingSize]: string
} = {
  none: '',
  s: 'euiTextDiff--paddingSmall',
  m: 'euiTextDiff--paddingMedium',
  l: 'euiTextDiff--paddingLarge',
};

export interface EuiTextDiffSharedProps {
  paddingSize?: PaddingSize;

  /**
   * Sets the syntax highlighting for a specific language
   * @see http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html#language-names-and-aliases
   * for options
   */
  language?: string;
  overflowHeight?: number;
  fontSize?: FontSize;
  transparentBackground?: boolean;
  isCopyable?: boolean;
  /**
   * passing a timeout of value '0' disables the timeout state
   */
  timeout?: number;
}

interface Props extends EuiTextDiffSharedProps {
  fontSize: FontSize;
  paddingSize: PaddingSize;
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
  fontSize,
  InsertComponent = 'ins',
  DeletionComponent = 'del',
  NoChangeComponent = 'span',
  paddingSize,
  initialText,
  currentText,
  timeout = 0.1,
  ...rest
}) => {
  const diff = new Diff({ timeout }); // options may be passed to constructor

  const textDiff = useMemo(() => {
    return diff.main(initialText, currentText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialText, currentText, diff]); // produces diff array

  const classes = classNames(
    'euiTextDiff',
    fontSizeToClassNameMap[fontSize],
    paddingSizeToClassNameMap[paddingSize]
  );

  const rendereredHtml = useMemo(() => {
    const html = [];
    if (textDiff)
      for (let i = 0; i < textDiff.length; i++) {
        let Element: StatelessComponent;
        const el = textDiff[i];
        if (el[0] === 0) Element = NoChangeComponent as StatelessComponent;
        else if (el[0] === -1)
          Element = DeletionComponent as StatelessComponent;
        else Element = InsertComponent as StatelessComponent;
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
