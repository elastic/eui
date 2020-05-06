import React, {
  FunctionComponent,
  HTMLAttributes,
  useMemo,
  useState,
  useEffect,
} from 'react';
import Diff from 'text-diff';
import classNames from 'classnames';
import parse from 'html-react-parser';
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
  onTimeOut?: (text: string) => void;
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
  showDeletion?: boolean;
  getDataFormat?: (data: DataFormat[]) => void;
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
  paddingSize,
  initialText,
  currentText,
  showDeletion = true,
  getDataFormat,
  disableTimeout = true,
  onTimeOut,
  timeout = 0.1,
  ...rest
}) => {
  const [initText, setInitialText] = useState(initialText);

  const diff = new Diff(); // options may be passed to constructor; see below
  const textDiff = useMemo(() => {
    return diff.main(initText, currentText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initText, currentText]); // produces diff array

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
  let htmlString = diff.prettyHtml(textDiff);

  if (!showDeletion) {
    htmlString = htmlString.replace(/<del>[A-z]*<\/del>/g, '');
  }
  const rendereredHtml = parse(htmlString);

  useEffect(() => {
    if (!disableTimeout && onTimeOut) {
      const timer = setTimeout(() => {
        onTimeOut(currentText);
        setInitialText(currentText);
      }, +timeout * 1000);

      return () => {
        clearTimeout(timer);
      };
    }

    if (getDataFormat) getDataFormat(dataFormat());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDataFormat, textDiff]);

  return (
    <div className={classes} {...rest}>
      {rendereredHtml}
    </div>
  );
};
