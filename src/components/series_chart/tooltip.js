import React from 'react';
import { Hint } from 'react-vis';
import PropTypes from 'prop-types';
// import {
//   colors,
//   unit,
//   units,
//   px,
//   borderRadius,
//   fontSize,
//   fontSizes
// } from '../../variables';
// import Legend from '../../Legend/Legend';

// const TooltipElm = styled.div`
//   margin: 0 ${px(unit)};
//   transform: translateY(-50%);
//   border: 1px solid ${colors.gray4};
//   background: ${colors.white};
//   border-radius: ${borderRadius};
//   font-size: ${fontSize};
//   color: ${colors.black};
// `;

// const Header = styled.div`
//   background: ${colors.gray5};
//   border-bottom: 1px solid ${colors.gray4};
//   border-radius: ${borderRadius} ${borderRadius} 0 0;
//   padding: ${px(units.half)};
//   color: ${colors.gray3};
// `;

// const Legends = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: ${px(units.half)};
//   padding: ${px(units.quarter)} ${px(unit)} ${px(units.quarter)}
//     ${px(units.half)};
//   font-size: ${fontSizes.small};
// `;

// const LegendContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin: ${px(units.quarter)} 0;
//   justify-content: space-between;
// `;

// const LegendGray = styled(Legend)`
//   color: ${colors.gray3};
// `;

// const Value = styled.div`
//   color: ${colors.gray2};
//   font-size: ${fontSize};
// `;

// <TooltipElm>
//     <Header>{header || moment(x).format('MMMM Do YYYY, HH:mm')}</Header>
//     <Legends>
//     {tooltipPoints.map((point, i) => (
//         <LegendContainer key={i}>
//         <LegendGray fontSize={fontSize.tiny} radius={units.half} color={point.color} text={point.text} />
//         <Value>{point.value}</Value>
//       </LegendContainer>
//     ))}
//   </Legends>
//   </TooltipElm>;

export default function Tooltip({ tooltipPoints, x, y, ...props }) {
  if (tooltipPoints.length === 0) {
    return null;
  }
  return <Hint {...props} value={{ x, y }} />;
}

Tooltip.propTypes = {
  header: PropTypes.string,
  tooltipPoints: PropTypes.array.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
};

Tooltip.defaultProps = {};
