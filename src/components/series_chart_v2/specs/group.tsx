// import * as t from 'io-ts';
// import { inject } from 'mobx-react';
// import React from 'react';
// import { getGroupId, GroupId } from '../commons/ids';
// import { LineSeries } from '../components/line_series';
// import { AreaSeries } from './area_series';
// import { BarSeries } from './bar_series';
// interface GroupSpecProps {
//   id: GroupId;
// }

// class GroupSpec extends React.PureComponent<GroupSpecProps> {
//   public static defaultProps: GroupSpecProps = {
//     id: getGroupId('__default_group__'),
//   };
//   public render() {
//     const { children, id } = this.props;
//     return React.Children.map(children, (child) => {
//       // if (React.isValidElement(child) && acceptedTypes.includes(child.type)) {
//       //   return React.cloneElement(child, { groupId: id });
//       // // }
//     });
//   }
// }

// export const Group = inject('chartStore')(GroupSpec);
