import { CommonProps } from '../common';

import React, { FunctionComponent, HTMLAttributes } from 'react';
import Diff from 'text-diff';
import classNames from 'classnames';
import parse from 'html-react-parser';
import { FontSize, PaddingSize } from './code';

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
  ...rest
}) => {
  const diff = new Diff(); // options may be passed to constructor; see below
  const textDiff = diff.main(initialText, currentText); // produces diff array
  console.log('textDiff', textDiff);
  const dataFormat = () => {
    return [...textDiff].map(el => {
      if (el[0] === 0) {
        return {
          type: 'no change',
          content: el[1],
        };
      }
      if (el[0] === -1) {
        return {
          type: 'delete',
          content: el[1],
        };
      } else {
        return {
          type: 'insert',
          content: el[1],
        };
      }
    });
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

  if (getDataFormat) getDataFormat(dataFormat());

  return (
    <div className={classes} {...rest}>
      {rendereredHtml}
    </div>
  );
};
