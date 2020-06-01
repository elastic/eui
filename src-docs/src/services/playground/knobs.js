import React from 'react';
import { assertUnreachable, PropTypes, useValueDebounce } from 'react-view';
import {
  EuiSpacer,
  EuiCheckbox,
  EuiRadioGroup,
  EuiFieldText,
  EuiTextArea,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSelect,
} from '../../../../src/components/';

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
      <EuiSpacer />
    </>
  );
};

// const Label = ({ children, tooltip }) => {
//   return (
//     <label>
//       <StatefulTooltip accessibilityType="tooltip" content={tooltip}>
//         <span>{children}</span>
//       </StatefulTooltip>
//     </label>
//   );
// };

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
  enumName,
}) => {
  const [val, set] = useValueDebounce(globalVal, globalSet);
  switch (type) {
    case PropTypes.Ref:
      return (
        <Spacing>
          {/* <Label tooltip={getTooltip(description, type, name)}>{name}</Label> */}
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
    case PropTypes.String:
    case PropTypes.Date:
    case PropTypes.Number:
      return (
        <Spacing>
          {/* <Label tooltip={getTooltip(description, type, name)}>{name}</Label> */}

          <EuiFieldText
            placeholder={placeholder}
            value={val ? val : undefined}
            onChange={e => set(e.target.value)}
            aria-label={description}
          />

          {error && <div>error {error}</div>}
        </Spacing>
      );
    case PropTypes.Boolean:
      //   console.log('data', { description, type, name });

      return (
        <Spacing>
          <EuiCheckbox
            id={name}
            label={name}
            checked={val}
            onChange={e => {
              globalSet(e.target.checked);
            }}
          />
          {error && <div>error {error}</div>}
        </Spacing>
      );
    case PropTypes.Enum:
      const optionsKeys = Object.keys(options);
      const numberOfOptions = optionsKeys.length;

      const valueKey = val || defaultValue;
      //   console.log('selectOptions', selectOptions);
      //   console.log('valueKey', valueKey);
      //   console.log('data', { description, type, name });

      if (numberOfOptions < 6) {
        const flattenedOptions = optionsKeys.map(key => ({
          id: key,
          label: options[key],
        }));

        return (
          <Spacing>
            <EuiRadioGroup
              options={flattenedOptions}
              idSelected={valueKey}
              onChange={id => globalSet(id)}
              name={`Select ${name}`}
              legend={{
                children: <span> {`Select ${name}`}</span>,
              }}
            />{' '}
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
            <EuiSelect
              id={name}
              options={flattenedOptions}
              value={valueKey}
              onChange={e => globalSet(e.target.value)}
              aria-label={`Select ${name}`}
            />{' '}
            {error && <div>error {error}</div>}
          </Spacing>
        );
      }

    case PropTypes.ReactNode:
    case PropTypes.Function:
    case PropTypes.Array:
    case PropTypes.Object:
      // /*
      return (
        <Spacing>
          {/* <Label tooltip={getTooltip(description, type, name)}>{name}</Label>  */}
          <EuiTextArea
            placeholder={placeholder}
            value={val ? val : ''}
            onChange={e => {
              globalSet(e.target.value);
            }}
          />
          {error && <div>error {error}</div>}
        </Spacing>
      );

    //   */
    case PropTypes.Custom:
      return null;
    default:
      console.log('name', name);
      return assertUnreachable();
  }
};

const KnobColumn = ({ state, knobNames, error, set }) => {
  return (
    <EuiFlexItem>
      {knobNames.map(name => (
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
      ))}
    </EuiFlexItem>
  );
};

const Knobs = ({ state, set, error }) => {
  const allKnobNames = Object.keys(state).filter(
    name => state[name].type !== PropTypes.Custom
  );
  const filteredKnobNames = allKnobNames.filter(
    name => state[name].hidden !== true
  );
  const knobNames = filteredKnobNames;
  // const knobNames = showAllKnobs ? allKnobNames : filteredKnobNames;

  const firstGroup = knobNames.slice(0, Math.round(knobNames.length / 2));
  const secondGroup = knobNames.slice(Math.round(knobNames.length / 2));
  return (
    <EuiFlexGroup>
      <KnobColumn
        state={state}
        knobNames={firstGroup}
        set={set}
        error={error}
      />
      <KnobColumn
        state={state}
        knobNames={secondGroup}
        set={set}
        error={error}
      />
    </EuiFlexGroup>
  );
};

export default Knobs;
