import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import tokenClass from './assets/tokenClass.svg';
import tokenProperty from './assets/tokenProperty.svg';
import tokenEnum from './assets/tokenEnum.svg';
import tokenVariable from './assets/tokenVariable.svg';
import tokenMethod from './assets/tokenMethod.svg';
import tokenAnnotation from './assets/tokenAnnotation.svg';
import tokenException from './assets/tokenException.svg';
import tokenInterface from './assets/tokenInterface.svg';
import tokenParameter from './assets/tokenParameter.svg';
import tokenField from './assets/tokenField.svg';
import tokenElement from './assets/tokenElement.svg';
import tokenFunction from './assets/tokenFunction.svg';
import tokenBoolean from './assets/tokenBoolean.svg';
import tokenString from './assets/tokenString.svg';
import tokenArray from './assets/tokenArray.svg';
import tokenNumber from './assets/tokenNumber.svg';
import tokenConstant from './assets/tokenConstant.svg';
import tokenObject from './assets/tokenObject.svg';
import tokenEvent from './assets/tokenEvent.svg';
import tokenKey from './assets/tokenKey.svg';
import tokenNull from './assets/tokenNull.svg';
import tokenStruct from './assets/tokenStruct.svg';
import tokenPackage from './assets/tokenPackage.svg';
import tokenOperator from './assets/tokenOperator.svg';
import tokenEnumMember from './assets/tokenEnumMember.svg';
import tokenTypeRepo from './assets/tokenTypeRepo.svg';
import tokenTypeSymbol from './assets/tokenTypeSymbol.svg';
import tokenTypeFile from './assets/tokenTypeFile.svg';

// Namespaced to prevent conflict with reserved types
const typeToIconMap = {
  tokenClass,
  tokenProperty,
  tokenEnum,
  tokenVariable,
  tokenMethod,
  tokenAnnotation,
  tokenException,
  tokenInterface,
  tokenParameter,
  tokenField,
  tokenElement,
  tokenFunction,
  tokenBoolean,
  tokenString,
  tokenArray,
  tokenNumber,
  tokenConstant,
  tokenObject,
  tokenEvent,
  tokenKey,
  tokenNull,
  tokenStruct,
  tokenPackage,
  tokenOperator,
  tokenEnumMember,
  tokenTypeRepo,
  tokenTypeSymbol,
  tokenTypeFile
};

export const TYPES = Object.keys(typeToIconMap);

const typeToClassMap = {
  tokenClass: 'euiToken--primary',
  tokenProperty: 'euiToken--purple',
  tokenEnum: 'euiToken--blue',
  tokenVariable: 'euiToken--orange',
  tokenMethod: 'euiToken--red euiToken--square',
  tokenAnnotation: 'euiToken--yellow euiToken--square',
  tokenException: 'euiToken--teal',
  tokenInterface: 'euiToken--dark-red',
  tokenParameter: 'euiToken--pink euiToken--square',
  tokenField: 'euiToken--green',
  tokenElement: 'euiToken--purple euiToken--square',
  tokenFunction: 'euiToken--red',
  tokenBoolean: 'euiToken--blue euiToken--square',
  tokenString: 'euiToken--teal euiToken--square',
  tokenArray: 'euiToken--orange euiToken--square',
  tokenNumber: 'euiToken--blue',
  tokenConstant: 'euiToken--primary',
  tokenObject: 'euiToken--purple euiToken--square',
  tokenEvent: 'euiToken--pink',
  tokenKey: 'euiToken--yellow',
  tokenNull: 'euiToken--red euiToken--square',
  tokenStruct: 'euiToken--teal euiToken--square',
  tokenPackage: 'euiToken--green euiToken--square',
  tokenOperator: 'euiToken--pink',
  tokenEnumMember: 'euiToken--orange euiToken--square',
  tokenTypeRepo: 'euiToken--blue euiToken--type',
  tokenTypeSymbol: 'euiToken--teal euiToken--type',
  tokenTypeFile: 'euiToken--gray euiToken--type'
};

export const COLORS = Object.keys(typeToClassMap);

const sizeToClassMap = {
  s: 'euiToken--small',
  m: 'euiToken--medium',
  l: 'euiToken--large',
};

export const SIZES = Object.keys(sizeToClassMap);

export const EuiToken = ({
  type,
  size,
  className,
  ...rest,
}) => {

  const classes = classNames(
    'euiToken',
    sizeToClassMap[size],
    typeToClassMap[type],
    className
  );

  const Svg = typeToIconMap[type] || '';

  return (
    <div
      className={classes}
      {...rest}
    >
      <Svg/>
    </div>
  );
};

EuiToken.propTypes = {
  type: PropTypes.oneOf(TYPES),
  size: PropTypes.oneOf(SIZES),
};

EuiToken.defaultProps = {
  size: 's'
};
