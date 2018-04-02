import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiCode,
  EuiSpacer,
  EuiTable,
  EuiTableBody,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableRow,
  EuiTableRowCell,
  EuiTextColor,
  EuiSwitch,
  EuiSelect,
  EuiFieldText,
  EuiCodeBlock,
} from '../../../../src/components';

import { unquote, markup, humanizeType } from '../../services/string/prop_types';

export class GuideSectionPlayground extends Component {
  static propTypes = {
    className: PropTypes.string,
    component: PropTypes.func,
    demo: PropTypes.node,
  }

  constructor(props) {
    super(props);

    let allProps = undefined;
    const compProps = {};

    if (this.props.component.__docgenInfo) {
      const docgenInfo = Array.isArray(this.props.component.__docgenInfo) ? this.props.component.__docgenInfo[0] : this.props.component.__docgenInfo;
      const { props } = docgenInfo;
      allProps = props ? props : undefined;

      if (allProps) {
        const propNames = Object.keys(allProps);
        const addingValues = propNames.map(name => { // eslint-disable-line no-unused-vars
          const value = allProps[name].defaultValue ? this.props.component.defaultProps[name] : undefined;
          compProps[name] = value;
        });
      }
    }

    this.state = {
      allProps: allProps,
      compProps: compProps
    }

    if (this.state.allProps.onClick) {
      this.state.simulateOnClick === false;
    }

    //console.table(this.state.compProps);
  }

  onSwitchChange = e => {
    const compProps = { ...this.state.compProps }
    compProps[e.target.id] = e.target.checked;
    this.setState({ compProps });
  };

  onSelectChange = e => {
    const compProps = { ...this.state.compProps }
    compProps[e.target.id] = e.target.value;
    this.setState({ compProps });
  };

  onStringChange = e => {
    const compProps = { ...this.state.compProps }
    compProps[e.target.id] = e.target.value;
    this.setState({ compProps });
  };

  onSimulateChange = e => {
    const compProps = { ...this.state.compProps }
    compProps[e.target.id] = e.target.checked ? () => {} : undefined;
    this.setState({
      compProps,
      simulateOnClick: e.target.checked,
    });
  };

  controlType = (type, propName) => {
    if (!type || (type.name === "node")) {
      return '';
    }

    let control;

    switch (type.name) {
      case 'bool':
        control = (
          <EuiSwitch
            id={propName}
            label={this.state.compProps[propName].toString()}
            checked={this.state.compProps[propName]}
            onChange={this.onSwitchChange}
          />
        );
        break;

      case 'enum':
        if (Array.isArray(type.value)) {
          const options = type.value.map(function(item) {
            return {
              value: unquote(item.value),
              text: unquote(item.value),
            }
          });

          control = (
            <EuiSelect
              className="euiGuideSectionPlayground__input"
              id={propName}
              options={options}
              value={this.state.compProps[propName]}
              onChange={this.onSelectChange}
            />
          )
          break;
        }
        break;

      case 'string':
        control = (
          <EuiFieldText
            className="euiGuideSectionPlayground__input"
            placeholder={propName}
            id={propName}
            value={this.state.compProps[propName]}
            onChange={this.onStringChange}
          />
        )
        break;

      case 'union':
        if (Array.isArray(type.value)) {
          const unionValues = type.value.map(({ name }) => name);
          unionValues[unionValues.length - 1] = `or ${unionValues[unionValues.length - 1]}`;

          if (unionValues.length > 2) {
            //humanizedType = unionValues.join(', ');
          } else {
            //humanizedType = unionValues.join(' ');
          }
          break;
        }
        control = "union";
        break;

      case 'func':
        if (propName === "onClick") {
          control = (
            <EuiSwitch
              id={propName}
              label="simulate"
              checked={this.state.simulateOnClick}
              onChange={this.onSimulateChange}
            />
          );
        }
        break;

      default:
        control = type.name;
    }

    return control;
  };

  renderPropsForcomponent = () => {

    const propNames = Object.keys(this.state.allProps);

    const rows = propNames.map(propName => {
      const {
        description: propDescription,
        required,
        defaultValue,
        type,
      } = this.state.allProps[propName];

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

      let defaultValueMarkup = '';
      if (defaultValue) {
        defaultValueMarkup = [ <EuiCode key={`defaultValue-${propName}`}>{defaultValue.value}</EuiCode> ];
        if (defaultValue.comment) {
          defaultValueMarkup.push(`(${defaultValue.comment})`);
        }
      }

      const cells = [
        (
          <EuiTableRowCell key="name">
            {humanizedName}
            {propDescription ? (
              <span>
                <br />
                {markup(propDescription)}
              </span>
            ) : undefined}
          </EuiTableRowCell>
        ), (
          <EuiTableRowCell key="type">
            <EuiCode>{markup(humanizedType)}</EuiCode>
          </EuiTableRowCell>
        ), (
          <EuiTableRowCell key="defaultValue">
            {defaultValueMarkup}
          </EuiTableRowCell>
        ), (
          <EuiTableRowCell key="edit">
            {this.controlType(type, propName)}
          </EuiTableRowCell>
        )
      ];

      return (
        <EuiTableRow key={propName}>
          {cells}
        </EuiTableRow>
      );
    });

    let table;

    if (rows.length) {
      table = (
        <EuiTable className="euiGuideSectionPlayground__table">
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
              Modify
            </EuiTableHeaderCell>
          </EuiTableHeader>

          <EuiTableBody>
            {rows}
          </EuiTableBody>
        </EuiTable>
      );
    }

    return table;
  }

  renderCodeBlock = () => {
    let modifiedProps = '';

    const buildProps = Object.keys(this.state.compProps) // eslint-disable-line no-unused-vars
      .filter(prop => this.state.compProps[prop] !== undefined)
      .filter(prop => !this.state.allProps[prop].defaultValue || unquote(this.state.allProps[prop].defaultValue.value) !== this.state.compProps[prop].toString())
      .map(prop => {
        console.log(this.state.compProps[prop]);
        switch (typeof this.state.compProps[prop]) {
          case 'string':
            modifiedProps += `\n  ${prop}=${JSON.stringify(this.state.compProps[prop])}`;
            return;
          default:
            modifiedProps += `\n  ${prop}={${this.state.compProps[prop]}}`;
            return;
        }
      });

    if (this.state.allProps.children) {

      if (modifiedProps) {
        modifiedProps = `${modifiedProps}\n>\n`
      } else {
        modifiedProps = '>\n';
      }

      return `<${this.props.component.name}` + modifiedProps + `  {children}\n</${this.props.component.name}>`;

    } else {

      if (modifiedProps) {
        modifiedProps = `${modifiedProps}\n/>`
      } else {
        modifiedProps = ' />';
      }

      return `<${this.props.component.name}` + modifiedProps;
    }

  }

  render() {
    const {
      className,
      component,  // eslint-disable-line no-unused-vars
      demo,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiGuideSectionPlayground',
      'guideRule__example',
      'guideRule__example--frame',
      className
    );

    const newCompProps = {};
    if (this.state.compProps) {
      const propNames = Object.keys(this.state.compProps);
      const addingValues = propNames.map(name => {  // eslint-disable-line no-unused-vars
        newCompProps[name] = this.state.compProps[name];
      });
    }

    const newElem = React.cloneElement(
      demo,
      newCompProps,
      demo.props.children,
    );

    return (
      <div
        className={classes}
        {...rest}
      >

        <div className="guideRule__example__panel">
          {newElem}
        </div>

        <EuiCodeBlock
          language="html"
          style={{ maxHeight: 400 }}
        >
          {this.renderCodeBlock()}
        </EuiCodeBlock>

        <EuiSpacer />

        {this.renderPropsForcomponent()}
      </div>
    );
  }
}
