import React, { useState, useEffect } from 'react';
import { assertUnreachable, PropTypes } from 'react-view';
import { useIsWithinBreakpoints } from '../../../../src/services/hooks';
import {
  EuiTitle,
  EuiCodeBlock,
  EuiSpacer,
  EuiSwitch,
  EuiRadioGroup,
  EuiFieldText,
  EuiCode,
  EuiSelect,
  EuiFieldNumber,
  EuiToolTip,
  EuiTable,
  EuiTableBody,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableRow,
  EuiTableRowCell,
  EuiTextColor,
  EuiTextArea,
  EuiFormRow,
  EuiLink,
  EuiText,
  EuiPanel,
} from '../../../../src/components/';

export const markup = (text) => {
  const regex = /(#[a-zA-Z]+)|(`[^`]+`)/g;
  return text.split('\n').map((token) => {
    const values = token.split(regex).map((token, index) => {
      if (!token) {
        return '';
      }
      if (token.startsWith('#')) {
        const id = token.substring(1);
        const onClick = () => {
          document.getElementById(id).scrollIntoView();
        };
        return (
          <EuiLink key={`markup-${index}`} onClick={onClick}>
            {id}
          </EuiLink>
        );
      }
      if (token.startsWith('`')) {
        const code = token.substring(1, token.length - 1);
        return <EuiCode key={`markup-${index}`}>{code}</EuiCode>;
      }
      if (token.includes('\n')) {
        return token
          .split('\n')
          .map((item) => [item, <br key={`markup-${index}`} />]);
      }
      return token;
    });
    return [...values, <br key="lineBreak" />];
  });
};

export const humanizeType = (type) => {
  if (!type) {
    return '';
  }

  let humanizedType;

  switch (type.name) {
    case 'enum':
      if (Array.isArray(type.value)) {
        humanizedType = type.value.map(({ value }) => value).join(', ');
        break;
      }
      humanizedType = type.value;
      break;

    case 'union':
      if (Array.isArray(type.value)) {
        const unionValues = type.value.map(({ name }) => name);
        unionValues[unionValues.length - 1] = `or ${
          unionValues[unionValues.length - 1]
        }`;

        if (unionValues.length > 2) {
          humanizedType = unionValues.join(', ');
        } else {
          humanizedType = unionValues.join(' ');
        }
        break;
      }
      humanizedType = type.value;
      break;

    default:
      humanizedType = type.name;
  }

  return humanizedType;
};

const getTooltip = (description, type, name) => (
  <span>
    <p>
      <b>{name}</b>: <i>{type}</i>
    </p>
    <p>{description}</p>
  </span>
);

const Label = ({ children, tooltip }) => {
  return (
    <EuiToolTip position="top" content={tooltip}>
      <>
        <span>{children}</span>
        <EuiSpacer size="s" />
      </>
    </EuiToolTip>
  );
};

const Knob = ({
  name,
  error: errorMsg,
  type,
  defaultValue,
  val,
  set,
  options = {},
  description,
  placeholder,
  custom,
  state,
  hidden,
  helpText,
}) => {
  const [error, setError] = useState(errorMsg);

  useEffect(() => {
    if (custom && custom.checkDep) {
      setError(custom.checkDep(val, state));
    }
  }, [state, val, custom]);

  let knobProps = {};
  switch (type) {
    case PropTypes.Ref:
      return (
        <>
          <Label tooltip={getTooltip(description, type, name)}>{name}</Label>
          <a
            href="https://reactjs.org/docs/refs-and-the-dom.html"
            target="_blank"
            style={{
              fontSize: '14px',
              display: 'block',
            }}>
            React Ref documentation
          </a>
          {error && <div>error {error}</div>}
        </>
      );

    case PropTypes.Number:
      return (
        <EuiFormRow
          isInvalid={error && error.length > 0}
          error={error}
          helpText={helpText}
          fullWidth>
          <EuiFieldNumber
            placeholder={placeholder}
            value={val ? val : undefined}
            onChange={(e) => set(e.target.value)}
            aria-label={description}
            compressed
            fullWidth
            isInvalid={error && error.length > 0}
          />
        </EuiFormRow>
      );

    case PropTypes.String:
    case PropTypes.Date:
      if (custom && custom.validator) {
        knobProps = {};
        knobProps.onChange = (e) => {
          const value = e.target.value;
          if (custom.validator(value)) set(value);
          else set(undefined);
        };
      } else if (custom && custom.sanitize) {
        knobProps = {};
        knobProps.value = val;
        knobProps.onChange = (e) => {
          const value = e.target.value;
          set(custom.sanitize(value));
        };
      } else {
        knobProps = {};
        knobProps.value = val;
        knobProps.onChange = (e) => {
          const value = e.target.value;
          set(value);
        };
      }

      return (
        <EuiFormRow
          isInvalid={error && error.length > 0}
          error={error}
          fullWidth
          helpText={
            <>
              {helpText}
              {custom && custom.helpText && (
                <>
                  <br />
                  {custom.helpText}
                </>
              )}
            </>
          }>
          <EuiFieldText
            aria-label={name}
            placeholder={placeholder}
            isInvalid={error && error.length > 0}
            compressed
            fullWidth
            {...knobProps}
          />
        </EuiFormRow>
      );

    case PropTypes.Boolean:
      return (
        <EuiFormRow
          fullWidth
          helpText={helpText}
          isInvalid={error && error.length > 0}
          error={error}>
          <EuiSwitch
            aria-label={name}
            id={name}
            label=""
            checked={val}
            onChange={(e) => {
              set(e.target.checked);
            }}
            compressed
          />
        </EuiFormRow>
      );

    case PropTypes.Enum:
      const optionsKeys = Object.keys(options);
      const numberOfOptions = optionsKeys.length;

      let valueKey = val || defaultValue;

      // When would numberOfOptions ever be less than 1?
      if (numberOfOptions < 1) {
        if (valueKey && !valueKey.includes('__')) {
          valueKey = `${valueKey}__${name}`;
        }
        const flattenedOptions = optionsKeys.map((key) => ({
          id: `${key}__${name}`,
          label: options[key],
        }));

        return (
          <>
            <EuiRadioGroup
              options={flattenedOptions}
              idSelected={valueKey}
              onChange={(id) => {
                let val = id;
                if (val.includes('__')) val = val.split('__')[0];
                set(val);
              }}
              name={`Select ${name}`}
            />
            {error && <div>error {error}</div>}
          </>
        );
      } else {
        const flattenedOptions = optionsKeys.map((key) => ({
          value: key,
          text: options[key],
        }));

        return (
          <EuiFormRow
            isInvalid={error && error.length > 0}
            helpText={helpText}
            error={error}
            fullWidth>
            <EuiSelect
              id={name}
              options={flattenedOptions}
              value={valueKey || defaultValue}
              onChange={(e) => {
                set(e.target.value);
              }}
              aria-label={`Select ${name}`}
              isInvalid={error && error.length > 0}
              compressed
              fullWidth
              hasNoInitialSelection={!valueKey && !defaultValue}
            />
          </EuiFormRow>
        );
      }

    case PropTypes.ReactNode:
      if (!hidden) {
        return (
          <EuiTextArea
            compressed
            placeholder={placeholder}
            value={val}
            onChange={(e) => {
              set(e.target.value);
            }}
          />
        );
      } else return null;

    case PropTypes.Custom:
      if (custom && custom.use) {
        switch (custom.use) {
          case 'switch':
            return (
              <>
                <EuiSwitch
                  aria-label={name}
                  id={name}
                  label={custom.label || ''}
                  checked={typeof val !== 'undefined' && Boolean(val)}
                  onChange={(e) => {
                    const value = e.target.checked;

                    set(value ? custom.value ?? e.target.checked : undefined);
                  }}
                  compressed
                />
              </>
            );
        }
      }

    case PropTypes.Function:
    case PropTypes.Array:
    case PropTypes.Object:
      return null;
    default:
      return assertUnreachable();
  }
};

const KnobColumn = ({ state, knobNames, error, set, isPlayground }) => {
  return knobNames.map((name, idx) => {
    const codeBlockProps = {
      className: 'guideSection__tableCodeBlock',
      paddingSize: 'none',
      language: 'ts',
    };

    /**
     * TS Type
     */
    let humanizedType;

    if (
      state[name].custom &&
      state[name].custom.origin &&
      state[name].custom.origin.type
    )
      humanizedType = humanizeType(state[name].custom.origin.type);

    let typeMarkup;

    if (humanizedType) {
      typeMarkup = humanizedType && (
        <EuiCodeBlock {...codeBlockProps}>{markup(humanizedType)}</EuiCodeBlock>
      );

      const functionMatches = [
        ...humanizedType.matchAll(/\([^=]*\) =>\s\w*\)*/g),
      ];

      const types = humanizedType.split(/\([^=]*\) =>\s\w*\)*/);

      if (functionMatches.length > 0) {
        const elements = [];
        let j = 0;
        for (let i = 0; i < types.length; i++) {
          if (functionMatches[j]) {
            elements.push(<div key={`type-${i}`}>{types[i]}</div>);
            elements.push(
              <div key={`function-${i}`}>{functionMatches[j][0]}</div>
            );
            j++;
          } else {
            elements.push(<div key={`type-${i}`}>{types[i]}</div>);
          }
        }
        typeMarkup = (
          <EuiCodeBlock {...codeBlockProps}>{elements}</EuiCodeBlock>
        );
      }
    }

    /**
     * Prop name
     */
    let humanizedName = <strong className="eui-textBreakNormal">{name}</strong>;

    if (
      state[name].custom &&
      state[name].custom.origin &&
      state[name].custom.origin.required
    ) {
      humanizedName = (
        <>
          {humanizedName} <EuiTextColor color="danger">(required)</EuiTextColor>
        </>
      );
    }

    /**
     * Default value
     */
    let defaultValueMarkup;
    if (
      // !isPlayground &&
      state[name].custom &&
      state[name].custom.origin &&
      state[name].custom.origin.defaultValue
    ) {
      const defaultValue = state[name].custom.origin.defaultValue;
      defaultValueMarkup = (
        <EuiText size="xs">
          {isPlayground && 'Default: '}
          <EuiCode>{defaultValue.value}</EuiCode>
          {defaultValue.comment && (
            <>
              <br />({defaultValue.comment})
            </>
          )}
        </EuiText>
      );
    }

    return (
      <EuiTableRow key={name}>
        <EuiTableRowCell
          key={`prop__${name}-${idx}`}
          header="Prop"
          textOnly={false}
          mobileOptions={{
            header: false,
            fullWidth: true,
          }}>
          <div>
            <EuiTitle size="xxs">
              <span>{humanizedName}</span>
            </EuiTitle>
            {state[name].description && (
              <>
                <EuiSpacer size="xs" />
                <EuiText color="subdued" size="xs">
                  <p>{markup(state[name].description)}</p>
                </EuiText>
              </>
            )}
          </div>
        </EuiTableRowCell>
        <EuiTableRowCell
          key={`type__${name}-${idx}`}
          header="Type"
          textOnly={false}>
          <div>{typeMarkup}</div>
        </EuiTableRowCell>
        <EuiTableRowCell
          key={`modify__${name}-${idx}`}
          header={isPlayground ? 'Modify' : 'Default value'}
          textOnly={false}
          className={isPlayground ? 'playgroundKnobs__rowCell' : undefined}>
          {isPlayground ? (
            <Knob
              key={name}
              name={name}
              error={error.where === name ? error.msg : null}
              description={state[name].description}
              type={state[name].type}
              val={state[name].value}
              hidden={state[name].hidden}
              options={state[name].options}
              placeholder={state[name].placeholder}
              set={(value) => set(value, name)}
              enumName={state[name].enumName}
              defaultValue={state[name].defaultValue}
              custom={state[name] && state[name].custom}
              state={state}
              orgSet={set}
              helpText={defaultValueMarkup}
            />
          ) : (
            defaultValueMarkup
          )}
        </EuiTableRowCell>
      </EuiTableRow>
    );
  });
};

const Knobs = ({ state, set, error, isPlayground = true }) => {
  const isMobile = useIsWithinBreakpoints(['xs', 's']);
  const knobNames = Object.keys(state);

  const columns = [
    {
      field: 'prop',
      name: 'Prop',
    },
    {
      field: 'type',
      name: 'Type',
    },
  ];

  columns.push({
    field: isPlayground ? 'modify' : 'default',
    name: isPlayground ? 'Modify' : 'Default value',
    width: 200,
  });

  return (
    <EuiPanel
      color="transparent"
      paddingSize={isMobile ? 's' : 'none'}
      hasBorder={false}
      hasShadow={false}>
      <EuiTable style={{ background: 'transparent' }}>
        <EuiTableHeader>
          {columns.map(({ name, width }, id) => {
            return (
              <EuiTableHeaderCell width={width} key={id}>
                {name}
              </EuiTableHeaderCell>
            );
          })}
        </EuiTableHeader>

        <EuiTableBody>
          <KnobColumn
            isPlayground={isPlayground}
            state={state}
            knobNames={knobNames}
            set={set}
            error={error}
          />
        </EuiTableBody>
      </EuiTable>
    </EuiPanel>
  );
};

export default Knobs;
