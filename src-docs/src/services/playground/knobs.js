import React from 'react';
import { assertUnreachable, PropTypes, useValueDebounce } from 'react-view';
import {
  EuiSpacer,
  EuiSwitch,
  EuiRadioGroup,
  EuiFieldText,
  // EuiTextArea,
  // EuiFlexGroup,
  EuiCode,
  EuiSelect,
  EuiFieldNumber,
  EuiToolTip,
  EuiTable,
  // EuiTableFooter,
  EuiTableBody,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableRow,
  EuiTableRowCell,
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

const Spacing = ({ children }) => {
  return (
    <>
      <>{children}</>
      {/* <EuiSpacer /> */}
    </>
  );
};

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
  error,
  type,
  defaultValue,
  val: globalVal,
  set: globalSet,
  options = {},
  description,
  placeholder,
  // enumName,
}) => {
  const [val, set] = useValueDebounce(globalVal, globalSet);
  switch (type) {
    case PropTypes.Ref:
      return (
        <Spacing>
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
        </Spacing>
      );

    case PropTypes.Number:
      return (
        <Spacing>
          <Label tooltip={getTooltip(description, type, name)}>{name}</Label>
          <EuiFieldNumber
            placeholder={placeholder}
            value={val ? val : undefined}
            onChange={e => set(e.target.value)}
            aria-label={description}
            compressed
            fullWidth
          />

          {error && <div>error {error}</div>}
        </Spacing>
      );

    case PropTypes.String:
    case PropTypes.Date:
      return (
        <Spacing>
          {/* <Label tooltip={getTooltip(description, type, name)}>{name}</Label> */}

          <EuiFieldText
            placeholder={placeholder}
            value={val ? val : undefined}
            onChange={e => {
              // if (isNaN(e.target.value))
              set(e.target.value);
              // else set(+e.target.value);
            }}
            aria-label={description}
            compressed
            fullWidth
          />

          {error && <div>error {error}</div>}
        </Spacing>
      );
    case PropTypes.Boolean:
      //   console.log('data', { description, type, name });

      return (
        <Spacing>
          <EuiSwitch
            id={name}
            label=""
            checked={val}
            onChange={e => {
              globalSet(e.target.checked);
            }}
            compressed
          />
          {error && <div>error {error}</div>}
        </Spacing>
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
          <Spacing>
            {/* <Label tooltip={getTooltip(description, type, name)}>{name}</Label> */}

            <EuiRadioGroup
              options={flattenedOptions}
              idSelected={valueKey}
              onChange={id => {
                let val = id;
                if (val.includes('__')) val = val.split('__')[0];
                globalSet(val);
              }}
              name={`Select ${name}`}
            />
            {error && <div>error {error}</div>}
          </Spacing>
        );
      } else {
        const flattenedOptions = optionsKeys.map(key => ({
          value: key,
          text: options[key],
        }));

        return (
          <Spacing>
            {/* <Label tooltip={getTooltip(description, type, name)}>{name}</Label> */}

            <EuiSelect
              fullWidth
              id={name}
              options={flattenedOptions}
              value={valueKey}
              onChange={e => {
                globalSet(e.target.value);
              }}
              aria-label={`Select ${name}`}
              compressed
            />
            {error && <div>error {error}</div>}
          </Spacing>
        );
      }

    case PropTypes.ReactNode:
    case PropTypes.Function:
    case PropTypes.Array:
    case PropTypes.Object:
    // return (
    //   <Spacing>
    //     {/* <Label tooltip={getTooltip(description, type, name)}>{name}</Label> */}
    //     <EuiTextArea
    //       placeholder={placeholder}
    //       value={val ? val : ''}
    //       onChange={e => {
    //         globalSet(e.target.value);
    //       }}
    //     />
    //     {error && <div>error {error}</div>}
    //   </Spacing>
    // );

    case PropTypes.Custom:
      return null;
    default:
      console.log('name', name);
      return assertUnreachable();
  }
};

const KnobColumn = ({ state, knobNames, error, set }) => {
  return (
    <>
      {knobNames.map((name, idx) => {
        let humanizedType = '';

        if (
          state[name].custom &&
          state[name].custom.origin &&
          state[name].custom.origin.type
        )
          humanizedType = humanizeType(state[name].custom.origin.type);

        // if (name === 'color') console.log(state[name], name);

        const typeMarkup = (
          <span className="eui-textBreakNormal">{markup(humanizedType)}</span>
        );

        return (
          <EuiTableRow key={name}>
            <EuiTableRowCell key={`prop__${name}-${idx}`} header="Prop" className="playgroundKnobs__rowCell">
              <strong className="eui-textBreakNormal">{name}</strong>
              {state[name].description && (
                <>
                  <br />
                  <>{markup(state[name].description)}</>
                </>
              )}
            </EuiTableRowCell>
            <EuiTableRowCell key={`type__${name}-${idx}`} header="Type">
              <EuiCode>{typeMarkup}</EuiCode>
              {/* typeMarkup */}
            </EuiTableRowCell>
            <EuiTableRowCell key={`default__${name}-${idx}`} header="Default">
              <EuiCode key={`defaultValue-${name}`}>
                <span className="eui-textBreakNormal">
                  {state[name].defaultValue}
                </span>
              </EuiCode>
            </EuiTableRowCell>
            <EuiTableRowCell
              key={`modify__${name}-${idx}`}
              header="Modify"
              textOnly={false}>
              <Knob
                key={name}
                name={name}
                error={error.where === name ? error.msg : null}
                description={state[name].description}
                type={state[name].type}
                val={state[name].value}
                options={state[name].options}
                placeholder={state[name].placeholder}
                set={value => set(value, name)}
                enumName={state[name].enumName}
                defaultValue={state[name].defaultValue}
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
  // const allKnobNames = Object.keys(state).filter(
  //   name => state[name].type !== PropTypes.Custom
  // );
  // const filteredKnobNames = allKnobNames.filter(
  //   name => state[name].hidden !== true
  // );
  const knobNames = Object.keys(state);
  // const knobNames = showAllKnobs ? allKnobNames : filteredKnobNames;

  // const firstGroup = knobNames.slice(0, Math.round(knobNames.length / 2));
  // const secondGroup = knobNames.slice(Math.round(knobNames.length / 2));
  // console.log('state', state);
  // const items = [];

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

      {/* <EuiTableFooter>Footer</EuiTableFooter> */}
    </EuiTable>
  );
};

export default Knobs;
