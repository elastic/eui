import { css } from '@emotion/react';
import {
  euiTextTruncate,
  euiTextBreakWord,
  euiNumberFormat,
  useEuiTheme,
  EuiTextAlign,
  EuiFlexGrid,
  EuiFlexItem,
  EuiPanel,
  EuiTextColor,
  EuiCode,
} from '@elastic/eui';

const maxWidth = 300;
const longLink =
  'http://www.hithereimalongurl.com/dave_will_just_ramble_on_in_a_long_sentence_like_this/?ok=cool';

export const WrappingTextTruncateFnPreview = () => {
  return (
    <EuiPanel
      color="warning"
      css={css`
        ${euiTextTruncate('300px')}
      `}
      title="This text will not to wrap but truncate beyond the boundaries of the yellow box."
    >
      This text will not to wrap but truncate beyond the boundaries of the
      yellow box.
    </EuiPanel>
  );
};

export const WrappingTextTruncatePreview = () => {
  return (
    <EuiPanel
      color="warning"
      style={{ maxWidth }}
      className="eui-textTruncate"
      title="This text will not to wrap but truncate beyond the boundaries of the yellow box."
    >
      This text will not to wrap but truncate beyond the boundaries of the
      yellow box.
    </EuiPanel>
  );
};

export const WrappingTextBreakWordFnPreview = () => {
  return (
    <EuiPanel
      color="warning"
      style={{ maxWidth }}
      css={css`
        ${euiTextBreakWord()}
      `}
      title="This text will not to wrap but truncate beyond the boundaries of the yellow box."
    >
      This text will wrap like normal but this long link {longLink} will break
      mid-word.
    </EuiPanel>
  );
};

export const WrappingTextBreakWordPreview = () => {
  return (
    <EuiPanel
      color="warning"
      style={{ maxWidth }}
      className="eui-textBreakWord"
    >
      This text will wrap like normal but this long link {longLink} will break
      mid-word.
    </EuiPanel>
  );
};

export const WrappingTextNoWrapPreview = () => {
  return (
    <EuiPanel color="warning" style={{ maxWidth }} className="eui-textNoWrap">
      This text will not wrap and will overflow the boundaries of the yellow
      box.
    </EuiPanel>
  );
};

export const WrappingTextBreakAllPreview = () => {
  return (
    <EuiPanel color="warning" style={{ maxWidth }} className="eui-textBreakAll">
      This text block will wrap, breaking up anything including long URLs{' '}
      {longLink} and run on strings like this
      --------------------------------------------------------------------------.
    </EuiPanel>
  );
};

export const WrappingTextBreakNormalPreview = () => {
  return (
    <EuiPanel
      color="warning"
      style={{ maxWidth }}
      className="eui-textBreakNormal"
    >
      This text block will wrap normally, but will not break long URLs{' '}
      {longLink} but may break run on strings like this
      ---------------------------------------------------------------.
    </EuiPanel>
  );
};

export const NumbersFormatFnPreview = () => {
  const euiTheme = useEuiTheme();

  return (
    <EuiTextAlign textAlign="right">
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <p>
            <strong>Without function</strong>
            <br />
            11317.11
            <br />
            0040.900
          </p>
        </EuiFlexItem>
        <EuiFlexItem>
          <p
            css={css`
              ${euiNumberFormat(euiTheme)}
            `}
          >
            <strong>With function</strong>
            <br />
            11317.11
            <br />
            0040.900
          </p>
        </EuiFlexItem>
      </EuiFlexGrid>
    </EuiTextAlign>
  );
};

export const NumbersFormatPreview = () => {
  return (
    <EuiTextAlign textAlign="right">
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <p>
            <strong>Without class</strong>
            <br />
            11317.11
            <br />
            0040.900
          </p>
        </EuiFlexItem>
        <EuiFlexItem>
          <p className="eui-textNumber">
            <strong>With class</strong>
            <br />
            11317.11
            <br />
            0040.900
          </p>
        </EuiFlexItem>
      </EuiFlexGrid>
    </EuiTextAlign>
  );
};

export const ColorInheritPreview = () => {
  return (
    <EuiTextColor color="danger">
      <EuiCode className="eui-textInheritColor">I am code</EuiCode> that matches
      the EuiTextColor
    </EuiTextColor>
  );
};
