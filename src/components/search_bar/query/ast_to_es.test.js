import { astToEs } from './ast_to_es';
import { AST } from './ast';

describe('astToEs', () => {

  test(`ast - ''`, () => {
    const query = astToEs(AST.create([]));
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'john -sales'`, () => {
    const query = astToEs(AST.create([
      AST.Term.must('john'),
      AST.Term.mustNot('sales'),
    ]));
    expect(query).toMatchSnapshot();
  });

  test(`ast - '-group:es group:kibana -group:beats group:logstash'`, () => {
    const query = astToEs(AST.create([
      AST.Field.mustNot('group', 'es'),
      AST.Field.must('group', 'kibana'),
      AST.Field.mustNot('group', 'beats'),
      AST.Field.must('group', 'logstash')
    ]));
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'is:online group:kibana john'`, () => {
    const query = astToEs(AST.create([
      AST.Is.must('online'),
      AST.Field.must('group', 'kibana'),
      AST.Term.must('john')
    ]));
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'john -doe is:online group:eng group:es -group:kibana -is:active'`, () => {
    const query = astToEs(AST.create([
      AST.Term.must('john'),
      AST.Term.mustNot('doe'),
      AST.Is.must('online'),
      AST.Field.must('group', 'eng'),
      AST.Field.must('group', 'es'),
      AST.Field.mustNot('group', 'kibana'),
      AST.Is.mustNot('active')
    ]));
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'john group:(eng or es) -group:kibana'`, () => {
    const query = astToEs(AST.create([
      AST.Term.must('john'),
      AST.Field.must('group', ['eng', 'es']),
      AST.Field.mustNot('group', 'kibana')
    ]));
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'john group:(eng or "marketing org") -group:"kibana team"`, () => {
    const query = astToEs(AST.create([
      AST.Term.must('john'),
      AST.Field.must('group', ['eng', 'marketing org']),
      AST.Field.mustNot('group', 'kibana team')
    ]));
    expect(query).toMatchSnapshot();
  });

});
