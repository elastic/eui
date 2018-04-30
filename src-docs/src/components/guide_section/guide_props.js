import React, { Component } from 'react';

import {
  EuiCode,
  EuiSpacer,
  EuiTable,
  EuiTableBody,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableRow,
  EuiTableRowCell,
  EuiText,
  EuiTextColor,
  EuiTitle,
  EuiLink,
  EuiSelect,
  EuiFieldText
} from '../../../../src/components';

function markup(text) {
  const regex = /(#[a-zA-Z]+)|(`[^`]+`)/g;
  return text.split(regex).map((token, index) => {
    if (!token) {
      return '';
    }
    if (token.startsWith('#')) {
      const id = token.substring(1);
      const onClick = () => {
        document.getElementById(id).scrollIntoView();
      };
      return <EuiLink key={`markup-${index}`} onClick={onClick}>{id}</EuiLink>;
    }
    if (token.startsWith('`')) {
      const code = token.substring(1, token.length - 1);
      return <EuiCode key={`markup-${index}`}>{code}</EuiCode>;
    }
    return token;

  });
}

const humanizeType = type => {
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
        unionValues[unionValues.length - 1] = `or ${unionValues[unionValues.length - 1]}`;

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

export default class GuideProps extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      currentValues: this.getInitialPropValues(),
      currentlyEditingProp: null
    };
  }

  getInitialPropValues() {
    const { defaultProps } = this.props.component;
    const defaultPropKeys = Object.keys(defaultProps);

    return defaultPropKeys.reduce(
      (initialPropValues, propKey) => {
        initialPropValues[propKey] = defaultProps[propKey];
        return initialPropValues;
      },
      {}
    )
  }

  startingEditingProp(propName) {
    this.setState({
      currentlyEditingProp: propName
    });
  }

  setCurrentPropValue = (propName, propValue) => {
    console.log(propValue);
    this.setState({
      currentValues: {
        ...this.state.currentValues,
        [propName]: propValue
      }
    });
  }

  renderEditableProp({ propName, type }) {
    let editableContent;

    const currentValue = this.state.currentValues[propName];
    console.log(type);

    switch (type.name) {
      case 'bool': {
        const options = [
          { value: 'false', text: 'false' },
          { value: 'true', text: 'true' }
        ];
        editableContent = (
          <div>
            <EuiSelect
              options={options}
              value={`${currentValue}`}
              onChange={e => {
                let value = e.target.value;
                if (value === 'true') {
                  value = true;
                } else if (value === 'false') {
                  value = false;
                } else {
                  value = null;
                }
                this.setCurrentPropValue(propName, value);
              }}
              onBlur={() => this.startingEditingProp()}
            />
          </div>
        );
        break;
      }

      case 'enum': {
        const options = type.value.map(({ value }) => ({ value: `${JSON.parse(value)}`, text: `${JSON.parse(value)}` }));
        const selectValue = valueString => {
          // the value comes from the DOM event and is a string, but the raw value may not be a string
          for (let i = 0; i < type.value.length; i++) {
            if (valueString === `${JSON.parse(type.value[i].value)}`) {
              this.setCurrentPropValue(propName, valueString);
              return;
            }
          }
        }
        editableContent = (
          <div>
            <EuiSelect
              options={options}
              value={`${currentValue}`}
              onChange={e => selectValue(e.target.value)}
              onBlur={() => this.startingEditingProp()}
            />
          </div>
        );
        break;
      }

      case 'string':
      case 'node': {
        editableContent = (
          <div>
            <EuiFieldText value={currentValue} onChange={e => this.setCurrentPropValue(propName, e.target.value)}/>
          </div>
        );
        break;
      }

      default:
        editableContent = markup(`no editable setup for type \`${type.name}\``);
    }

    return editableContent;
  }

  renderPropValue({ propName, type }) {
    let value = this.state.currentValues[propName];
    if (value === undefined) value = null;

    let fieldContent;

    if (propName === this.state.currentlyEditingProp) {
      fieldContent = this.renderEditableProp({ propName, type });
    } else {
      fieldContent = (
        <div onClick={() => this.startingEditingProp(propName)}>
          {markup(`\`${JSON.stringify(value)}\``)}
        </div>
      );
    }

    return fieldContent;
  }

  render() {
    const {
      props: { componentName, component },
      state: { currentValues }
    } = this;

    if (!component.__docgenInfo) {
      return;
    }

    const docgenInfo = Array.isArray(component.__docgenInfo) ? component.__docgenInfo[0] : component.__docgenInfo;
    const { _euiObjectType, description, props } = docgenInfo;

    if (!props && !description) {
      return;
    }

    const propNames = Object.keys(props);

    const rows = propNames.map(propName => {
      const {
        description: propDescription,
        required,
        defaultValue,
        type,
      } = props[propName];

      let humanizedName = (
        <strong>{propName}</strong>
      );

      if (required) {
        humanizedName = (
          <span>
            <strong>{humanizedName}</strong> <EuiTextColor color="danger">(required)</EuiTextColor>
          </span>
        );
      }

      const humanizedType = humanizeType(type);

      const typeMarkup = markup(humanizedType);
      const descriptionMarkup = markup(propDescription);
      let defaultValueMarkup = '';
      if (defaultValue) {
        defaultValueMarkup = [ <EuiCode key={`defaultValue-${propName}`}>{defaultValue.value}</EuiCode> ];
        if (defaultValue.comment) {
          defaultValueMarkup.push(`(${defaultValue.comment})`);
        }
      }
      const cells = [
        (
          <EuiTableRowCell key="name" header="Prop">
            {humanizedName}
          </EuiTableRowCell>
        ), (
          <EuiTableRowCell key="type" header="Type">
            <EuiCode>{typeMarkup}</EuiCode>
          </EuiTableRowCell>
        ), (
          <EuiTableRowCell key="defaultValue" header="Default" hideForMobile={!defaultValue}>
            {defaultValueMarkup}
          </EuiTableRowCell>
        ), (
          <EuiTableRowCell key="description" header="Note" isMobileFullWidth={true} hideForMobile={!propDescription}>
            {descriptionMarkup}
          </EuiTableRowCell>
        ), (
          <EuiTableRowCell key="currentValue" header="Current Value">
            {this.renderPropValue({ propName, type })}
          </EuiTableRowCell>
        )
      ];

      return (
        <EuiTableRow key={propName}>
          {cells}
        </EuiTableRow>
      );
    });

    const title = _euiObjectType === 'type' ?
      <EuiCode id={componentName}>{componentName}</EuiCode> :
      <EuiText>{componentName}</EuiText>;

    let descriptionElement;

    if (description) {
      descriptionElement = (
        <div key={`description-${componentName}`}>
          <EuiText>
            <p>{markup(description)}</p>
          </EuiText>
          <EuiSpacer size="m" key={`propsSpacer-${componentName}`} />
        </div>
      );
    }

    let table;
    let example;

    if (rows.length) {
      table = (
        <EuiTable className="guideSectionPropsTable" compressed key={`propsTable-${componentName}`}>
          <EuiTableHeader>
            <EuiTableHeaderCell>
              Prop
            </EuiTableHeaderCell>

            <EuiTableHeaderCell>
              Type
            </EuiTableHeaderCell>

            <EuiTableHeaderCell>
              Default
            </EuiTableHeaderCell>

            <EuiTableHeaderCell>
              Note
            </EuiTableHeaderCell>

            <EuiTableHeaderCell>
              Current Value
            </EuiTableHeaderCell>
          </EuiTableHeader>

          <EuiTableBody>
            {rows}
          </EuiTableBody>
        </EuiTable>
      );

      example = (
        <div key="example">
          <EuiSpacer size="m" />
          {React.createElement(
            component,
            currentValues
          )}
        </div>
      );
    }

    return [
      <EuiSpacer size="m" key={`propsSpacer-${componentName}-1`} />,
      <EuiTitle size="s" key={`propsName-${componentName}`}><h3>{title}</h3></EuiTitle>,
      <EuiSpacer size="s" key={`propsSpacer-${componentName}-2`} />,
      descriptionElement,
      table,
      example
    ];
  }
}
