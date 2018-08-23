import { AxisId, getAxisId, getGroupId, GroupId } from './ids';

describe('IDs', () => {
  test('ids should differ depending on entity', () => {
    const axisId1 = getAxisId('axisId1');
    const axisId2 = getAxisId('axisId2');
    const groupId1 = getGroupId('groupId');
    const groupId2 = getGroupId('groupId');
    const axisSeries: Map<AxisId, string> = new Map();
    axisSeries.set(axisId1, 'data1');
    axisSeries.set(axisId2, 'data2');

    const groupSeries: Map<GroupId, string> = new Map();
    groupSeries.set(groupId1, 'data1');
    groupSeries.set(groupId2, 'data2');
    const expectedAxisSeries = [
      [ 'axisId1', 'data1' ],
      [ 'axisId2', 'data2' ],
    ];
    const expectedGroupSeries = [
      [ 'groupId', 'data2' ],
    ];
    expect(expectedAxisSeries).toEqual([...axisSeries]);
    expect(expectedGroupSeries).toEqual([...groupSeries]);
  });
});
