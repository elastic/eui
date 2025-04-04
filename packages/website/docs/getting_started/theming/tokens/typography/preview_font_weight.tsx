import { useState, createContext, useContext, useEffect } from 'react';
import { css } from '@emotion/react';
import {
  useEuiTheme,
  htmlIdGenerator,
  EuiRange,
  EuiCodeBlock,
} from '@elastic/eui';

export const FontWeightPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <p
      css={css`
        font-weight: ${euiTheme.font.weight.bold};
      `}
    >
      I am proper bold
    </p>
  );
};

const VariableFontWeightContext = createContext({
  fontWeight: 400,
  setFontWeight: () => {},
});

export const VariableFontWeightPreview = ({ children }) => {
  const [fontWeight, setFontWeight] = useState(400);

  return (
    <VariableFontWeightContext.Provider value={{ fontWeight, setFontWeight }}>
      {children}
    </VariableFontWeightContext.Provider>
  );
};

VariableFontWeightPreview.Range = () => {
  const { euiTheme } = useEuiTheme();
  const { fontWeight, setFontWeight } = useContext(VariableFontWeightContext);
  const onFontWeightChange = (e) => {
    setFontWeight(e.target.value);
  };

  return (
    <EuiRange
      fullWidth
      id={htmlIdGenerator()()}
      min={300}
      max={700}
      step={1}
      value={fontWeight}
      onChange={onFontWeightChange}
      showValue
      aria-label="Font weight"
      showTicks
      ticks={Object.entries(euiTheme.font.weight).map(([name, value]) => ({
        label: name,
        value: Number(value),
      }))}
      css={css`
        .euiRangeTick {
          text-transform: capitalize;
        }
      `}
    />
  );
};

VariableFontWeightPreview.Preview = () => {
  const { fontWeight } = useContext(VariableFontWeightContext);

  return (
    <p
      css={css`
        font-weight: ${fontWeight};
      `}
    >
      The quick brown fox
    </p>
  );
};

VariableFontWeightPreview.Snippet = () => {
  const { euiTheme } = useEuiTheme();
  const { fontWeight } = useContext(VariableFontWeightContext);

  const weight = Object.keys(euiTheme.font.weight).find(
    (key) => euiTheme.font.weight[key] === Number(fontWeight)
  );
  const value = weight ? '${euiTheme.font.weight.' + `${weight}}` : fontWeight;

  return (
    <EuiCodeBlock language="jsx">
      {['css`', `  font-weight: ${value};`, '`'].join('\n')}
    </EuiCodeBlock>
  );
};
