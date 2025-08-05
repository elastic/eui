import { css } from '@emotion/react';
import {
  euiTextTruncate,
  euiTextBreakWord,
  euiNumberFormat,
  useEuiTheme,
  EuiTextAlign,
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiTextColor,
  EuiCode,
  EuiText,
  EuiSpacer,
} from '@elastic/eui';
import {
  euiFontSizeFromScale,
  euiLineHeightFromBaseline,
  euiTextShift,
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
          <EuiText>
            <strong>Without function</strong>
            <EuiSpacer size="s" />
            11317.11
            <EuiSpacer size="s" />
            0040.900
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText
            css={css`
              ${euiNumberFormat(euiTheme)}
            `}
          >
            <strong>With function</strong>
            <EuiSpacer size="s" />
            11317.11
            <EuiSpacer size="s" />
            0040.900
          </EuiText>
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
          <EuiText>
            <strong>Without class</strong>
            <EuiSpacer size="s" />
            11317.11
            <EuiSpacer size="s" />
            0040.900
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText className="eui-textNumber">
            <strong>With class</strong>
            <EuiSpacer size="s" />
            11317.11
            <EuiSpacer size="s" />
            0040.900
          </EuiText>
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

export const FontSizeFromScaleFnPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <EuiFlexGrid columns={3}>
      <EuiFlexItem>
        <EuiText
          css={css`
            font-size: ${euiFontSizeFromScale('s', euiTheme)};
          `}
        >
          <strong>s scale</strong>
          <EuiSpacer size="s" />
          This text uses <EuiCode>euiFontSizeFromScale('s')</EuiCode>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText
          css={css`
            font-size: ${euiFontSizeFromScale('m', euiTheme)};
          `}
        >
          <strong>m scale</strong>
          <EuiSpacer size="s" />
          This text uses <EuiCode>euiFontSizeFromScale('m')</EuiCode>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText
          css={css`
            font-size: ${euiFontSizeFromScale('l', euiTheme)};
          `}
        >
          <strong>l scale</strong>
          <EuiSpacer size="s" />
          This text uses <EuiCode>euiFontSizeFromScale('l')</EuiCode>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGrid>
  );
};

export const LineHeightFromBaselineFnPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <EuiFlexGrid columns={2}>
      <EuiFlexItem>
        <EuiText
          css={css`
            padding: 0.5em 1em;
            font-size: ${euiFontSizeFromScale('m', euiTheme)};
            line-height: 1.5;
            background-color: rgba(255, 0, 0, 0.1);
          `}
        >
          <strong>Regular line-height: 1.5</strong>
          <EuiSpacer size="s" />
          This text uses a regular line-height of 1.5. Notice how it doesn't
          align to the baseline grid.
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText
          css={css`
            padding: 0.5em 1em;
            font-size: ${euiFontSizeFromScale('m', euiTheme)};
            line-height: ${euiLineHeightFromBaseline('m', euiTheme)};
            background-color: rgba(0, 255, 0, 0.1);
          `}
        >
          <strong>Baseline-aligned line-height</strong>
          <EuiSpacer size="s" />
          This text uses <EuiCode>euiLineHeightFromBaseline('m')</EuiCode> to
          align to the baseline grid for consistency.
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGrid>
  );
};

export const TextShiftFnPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <EuiFlexGrid columns={2}>
      <EuiFlexItem>
        <EuiText>
          Without <EuiCode>euiTextShift</EuiCode>
        </EuiText>
        <EuiSpacer size="s" />
        <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiPanel
              paddingSize="s"
              color="subdued"
              css={css`
                cursor: pointer;
                &:hover {
                  font-weight: ${euiTheme.font.weight.bold};
                }
              `}
            >
              Hover me
            </EuiPanel>
          </EuiFlexItem>
          <EuiText size="s"> - Notice layout shift on hover</EuiText>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText>
          With <EuiCode>euiTextShift</EuiCode>
        </EuiText>
        <EuiSpacer size="s" />
        <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiPanel
              paddingSize="s"
              color="subdued"
              data-text="Hover me" // important for euiTextShift
              css={css`
                cursor: pointer;

                ${euiTextShift('bold', 'data-text', euiTheme)}
                &:hover {
                  font-weight: ${euiTheme.font.weight.bold};
                }
              `}
            >
              Hover me
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText size="s"> - No layout shift on hover</EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGrid>
  );
};
