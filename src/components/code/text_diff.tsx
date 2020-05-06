import React, {
  FunctionComponent,
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
  timeout?: number;
  disableTimeout?: boolean;
}

interface DataFormat {
  type: string;
  content: any;
}

interface Props extends EuiTextDiffSharedProps {
  inline?: true;
  fontSize: FontSize;
  paddingSize: PaddingSize;
  currentText: string;
  initialText: string;
  getDataFormat?: (data: DataFormat[]) => void;
  InsertComponent?: StatelessComponent;
  DeletionComponent?: StatelessComponent;
  NoChangeComponent?: StatelessComponent;
}

interface dataFormat {
  content: string;
  type: string;
}

export type EuiTextDiffProps = CommonProps &
  Props &
  HTMLAttributes<HTMLElement>;

export const EuiTextDiff: FunctionComponent<EuiTextDiffProps> = ({
  inline,
  fontSize,
  InsertComponent = 'ins',
  DeletionComponent = 'del',
  NoChangeComponent = 'span',
  paddingSize,
  initialText,
  currentText,
  getDataFormat,
  disableTimeout = false,
  timeout = 0.1,
  ...rest
}) => {
  const diff = useMemo(() => {
    return new Diff({ timeout: disableTimeout ? 0 : timeout }); // options may be passed to constructor; see below
  }, [timeout, disableTimeout]);

  const textDiff = useMemo(() => {
    return diff.main(initialText, currentText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialText, currentText]); // produces diff array

  const dataFormat = () => {
    const result: dataFormat[] = [];
    textDiff.forEach((el: any) => {
      if (el[0] === 0) {
        result.push({
          type: 'no change',
          content: el[1],
        });
      } else if (el[0] === -1) {
        result.push({
          type: 'delete',
          content: el[1],
        });
      } else {
        result.push({
          type: 'insert',
          content: el[1],
        });
      }
    });
    return result;
  };

  const classes = classNames(
    'euiTextDiff',
    fontSizeToClassNameMap[fontSize],
    paddingSizeToClassNameMap[paddingSize]
  );

  const rendereredHtml = [];
  for (let i = 0; i < textDiff.length; i++) {
    let Element: StatelessComponent;
    const el = textDiff[i];
    if (el[0] === 0) Element = NoChangeComponent as StatelessComponent;
    else if (el[0] === -1) Element = DeletionComponent as StatelessComponent;
    else Element = InsertComponent as StatelessComponent;
    rendereredHtml.push(<Element>{el[1]}</Element>);
  }

  useEffect(() => {
    if (getDataFormat) getDataFormat(dataFormat());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDataFormat, textDiff]);

  return (
    <div className={classes} {...rest}>
      {rendereredHtml}
    </div>
  );
};
