import { FunctionComponent, HTMLAttributes, ReactElement } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {
  EuiSplitPanel,
  EuiButtonGroup,
  EuiButtonGroupProps,
  EuiFormRow,
  EuiCodeBlock,
  useEuiTheme,
  CommonProps,
} from '@elastic/eui';

type Configuration = Pick<
  EuiButtonGroupProps,
  'options' | 'idSelected' | 'onChange'
> & { label: string };

type Props = {
  children: ReactElement;
  configuration: Array<Configuration & { nestedConfig?: Configuration[] }>;
  snippet: string;
  wrapperProps?: Omit<HTMLAttributes<HTMLDivElement>, 'color'> & CommonProps;
};

export const ConfigurationDemoWithSnippet: FunctionComponent<Props> = ({
  children,
  configuration,
  snippet,
  wrapperProps,
}) => {
  const { euiTheme } = useEuiTheme();
  return (
    <EuiSplitPanel.Outer hasBorder {...wrapperProps}>
      <EuiSplitPanel.Inner grow={false} className="configurationAndDemo">
        <div className="configuration">
          {configuration.map(
            ({ label, options, idSelected, onChange, nestedConfig }) => (
              <>
                <EuiFormRow label={label} display="columnCompressed">
                  <EuiButtonGroup
                    isFullWidth
                    buttonSize="compressed"
                    legend={label}
                    options={options}
                    idSelected={idSelected}
                    onChange={onChange}
                  />
                </EuiFormRow>
                {nestedConfig &&
                  nestedConfig.map(
                    ({ label, options, idSelected, onChange }) => (
                      <EuiFormRow
                        label={label}
                        display="columnCompressed"
                        css={{
                          euiFormRow__labelWrapper: {
                            paddingInlineStart: euiTheme.size.l,
                          },
                        }}
                      >
                        <EuiButtonGroup
                          isFullWidth
                          buttonSize="compressed"
                          legend={label}
                          options={options}
                          idSelected={idSelected}
                          onChange={onChange}
                        />
                      </EuiFormRow>
                    )
                  )}
              </>
            )
          )}
        </div>
        <div className="demo">
          <BrowserOnly>{() => children}</BrowserOnly>
        </div>
      </EuiSplitPanel.Inner>
      {snippet && (
        <>
          <EuiSplitPanel.Inner
            color="subdued"
            paddingSize="none"
            grow={false}
            css={{ borderBlockStart: euiTheme.border.thin }}
          >
            <EuiCodeBlock
              language="tsx"
              fontSize="m"
              paddingSize="m"
              isCopyable
            >
              {snippet}
            </EuiCodeBlock>
          </EuiSplitPanel.Inner>
        </>
      )}
    </EuiSplitPanel.Outer>
  );
};

export const objectConfigToSnippet = (config: object) => {
  let snippet = JSON.stringify(config, null, 2);
  return snippet.replace(/^[ ]{2,}"[^:\n\r]+(?<!\\)":/gm, (match) =>
    match.replace(/"/g, '')
  );
};
