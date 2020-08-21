import React, { useState, useEffect } from 'react';
import { assertUnreachable, PropTypes } from 'react-view';
import {
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
} from '../../../../src/components/';

import {
  humanizeType,
  markup,
} from '../../components/guide_section/guide_section';

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
          fullWidth>
          <EuiFieldNumber
            placeholder={placeholder}
            value={val ? val : undefined}
            onChange={e => set(e.target.value)}
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
        knobProps.onChange = e => {
          const value = e.target.value;
          if (custom.validator(value)) set(value);
          else set(undefined);
        };
      } else if (custom && custom.sanitize) {
        knobProps = {};
        knobProps.value = val;
        knobProps.onChange = e => {
          const value = e.target.value;
          set(custom.sanitize(value));
        };
      } else {
        knobProps = {};
        knobProps.value = val;
        knobProps.onChange = e => {
          const value = e.target.value;
          set(value);
        };
      }

      return (
        <EuiFormRow
          isInvalid={error && error.length > 0}
          error={error}
          fullWidth
          helpText={custom && custom.helpText}>
          <EuiFieldText
            placeholder={placeholder}
            aria-label={description}
            isInvalid={error && error.length > 0}
            compressed
            fullWidth
            {...knobProps}
          />
        </EuiFormRow>
      );

    case PropTypes.Boolean:
      return (
        <>
          <EuiSwitch
            id={name}
            label=""
            checked={val}
            onChange={e => {
              set(e.target.checked);
            }}
            compressed
          />
          {error && <div>error {error}</div>}
        </>
      );

    case PropTypes.Enum:
      const optionsKeys = Object.keys(options);
      const numberOfOptions = optionsKeys.length;

      let valueKey = val || defaultValue;

      if (numberOfOptions < 1) {
        if (valueKey && !valueKey.includes('__')) {
          valueKey = `${valueKey}__${name}`;
        }
        const flattenedOptions = optionsKeys.map(key => ({
          id: `${key}__${name}`,
          label: options[key],
        }));

        return (
          <>
            <EuiRadioGroup
              options={flattenedOptions}
              idSelected={valueKey}
              onChange={id => {
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
        const flattenedOptions = optionsKeys.map(key => ({
          value: key,
          text: options[key],
        }));

        return (
          <EuiFormRow
            isInvalid={error && error.length > 0}
            error={error}
            fullWidth>
            <EuiSelect
              id={name}
              options={flattenedOptions}
              value={valueKey || defaultValue}
              onChange={e => {
                set(e.target.value);
              }}
              aria-label={`Select ${name}`}
              isInvalid={error && error.length > 0}
              compressed
              fullWidth
            />
          </EuiFormRow>
        );
      }

    case PropTypes.ReactNode:
      if (name === 'children' && !hidden) {
        return (
          <EuiTextArea
            placeholder={placeholder}
            value={val}
            onChange={e => {
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
                  id={name}
                  label={custom.label || ''}
                  checked={typeof val !== 'undefined' && val}
                  onChange={e => {
                    const value = e.target.checked;

                    set(value ? value : undefined);
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

const KnobColumn = ({ state, knobNames, error, set }) => {
  return (
    <>
      {knobNames.map((name, idx) => {
        let humanizedType;

        if (
          state[name].custom &&
          state[name].custom.origin &&
          state[name].custom.origin.type
        )
          humanizedType = humanizeType(state[name].custom.origin.type);

        const typeMarkup = humanizedType && (
          <EuiCode>
            <span className="eui-textBreakNormal">{markup(humanizedType)}</span>
          </EuiCode>
        );

        let humanizedName = (
          <strong className="eui-textBreakNormal">{name}</strong>
        );

        if (
          state[name].custom &&
          state[name].custom.origin &&
          state[name].custom.origin.required
        ) {
          humanizedName = (
            <span>
              {humanizedName}{' '}
              <EuiTextColor color="danger">(required)</EuiTextColor>
            </span>
          );
        }

        let defaultValueMarkup;

        if (
          state[name].custom &&
          state[name].custom.origin &&
          state[name].custom.origin.defaultValue
        ) {
          defaultValueMarkup = (
            <EuiCode key={`defaultValue-${name}`}>
              <span className="eui-textBreakNormal">
                {state[name].custom.origin.defaultValue.value}
              </span>
            </EuiCode>
          );
        }

        return (
          <EuiTableRow key={name}>
            <EuiTableRowCell
              key={`prop__${name}-${idx}`}
              header="Prop"
              className="playgroundKnobs__rowCell">
              {humanizedName}
              {state[name].description && (
                <>
                  <br />
                  <>{markup(state[name].description)}</>
                </>
              )}
            </EuiTableRowCell>
            <EuiTableRowCell
              key={`type__${name}-${idx}`}
              header="Type"
              className="playgroundKnobs__rowCell">
              {typeMarkup}
            </EuiTableRowCell>
            <EuiTableRowCell
              key={`default__${name}-${idx}`}
              header="Default"
              className="playgroundKnobs__rowCell">
              {defaultValueMarkup}
            </EuiTableRowCell>
            <EuiTableRowCell
              key={`modify__${name}-${idx}`}
              header="Modify"
              textOnly={false}
              className="playgroundKnobs__rowCell">
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
                set={value => set(value, name)}
                enumName={state[name].enumName}
                defaultValue={state[name].defaultValue}
                custom={state[name] && state[name].custom}
                state={state}
                orgSet={set}
              />
            </EuiTableRowCell>
          </EuiTableRow>
        );
      })}
    </>
  );
};

const columns = [
  {
    field: 'prop',
    name: 'Prop',
    sortable: true,
    'data-test-subj': 'PropCell',
  },
  {
    field: 'type',
    name: 'Type',
  },
  {
    field: 'default',
    name: 'Default',
  },
  {
    field: 'modify',
    name: 'Modify',
  },
];

const Knobs = ({ state, set, error }) => {
  const knobNames = Object.keys(state);

  return (
    <EuiTable compressed id={'playground__ID'}>
      <EuiTableHeader>
        {columns.map(({ name }, id) => {
          return <EuiTableHeaderCell key={id}>{name}</EuiTableHeaderCell>;
        })}
      </EuiTableHeader>

      <EuiTableBody>
        <KnobColumn
          state={state}
          knobNames={knobNames}
          set={set}
          error={error}
        />
      </EuiTableBody>
    </EuiTable>
  );
};

export default Knobs;
