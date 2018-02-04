import { astToES } from './ast_to_es';
import { ast } from './ast';

describe('astToES', () => {

  test(`ast - ''`, () => {
    const query = astToES(ast([]));
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'john -sales'`, () => {
    const query = astToES(ast([
      { type: 'default', occur: 'must', value: 'john' },
      { type: 'default', occur: 'must_not', value: 'sales' }
    ]));
    expect(query).toMatchSnapshot();
  });

  test(`ast - '-group:es group:kibana -group:beats group:logstash'`, () => {
    const query = astToES(ast([
      { type: 'field', field: 'group', occur: 'must_not', value: 'es' },
      { type: 'field', field: 'group', occur: 'must', value: 'kibana' },
      { type: 'field', field: 'group', occur: 'must_not', value: 'beats' },
      { type: 'field', field: 'group', occur: 'must', value: 'logstash' }
    ]));
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'is:online group:kibana john'`, () => {
    const query = astToES(ast([
      { type: 'is', flag: 'online', applied: true },
      { type: 'field', field: 'group', occur: 'must', value: 'kibana' },
      { type: 'default', occur: 'must', value: 'john' }
    ]));
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'john -doe is:online group:eng group:es -group:kibana -is:active'`, () => {
    const query = astToES(ast([
      { type: 'default', occur: 'must', value: 'john' },
      { type: 'default', occur: 'must_not', value: 'doe' },
      { type: 'is', flag: 'online', applied: true },
      { type: 'field', field: 'group', occur: 'must', value: 'eng' },
      { type: 'field', field: 'group', occur: 'must', value: 'es' },
      { type: 'field', field: 'group', occur: 'must_not', value: 'kibana' },
      { type: 'is', flag: 'active', applied: false }
    ]));
    expect(query).toMatchSnapshot();
  });

});
