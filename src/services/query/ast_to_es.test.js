import { astToEs } from './ast_to_es';
import { Ast } from './ast';

describe('astToEs', () => {
  test(`ast - ''`, () => {
    const query = astToEs(Ast.create([]));
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'john -sales'`, () => {
    const query = astToEs(Ast.create([
      Ast.Term.must('john'),
      Ast.Term.mustNot('sales'),
    ]));
    expect(query).toMatchSnapshot();
  });

  test(`ast - '-group:es group:kibana -group:beats group:logstash'`, () => {
    const query = astToEs(Ast.create([
      Ast.Field.mustNot('group', 'es'),
      Ast.Field.must('group', 'kibana'),
      Ast.Field.mustNot('group', 'beats'),
      Ast.Field.must('group', 'logstash')
    ]));
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'is:online group:kibana john'`, () => {
    const query = astToEs(Ast.create([
      Ast.Is.must('online'),
      Ast.Field.must('group', 'kibana'),
      Ast.Term.must('john')
    ]));
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'john -doe is:online group:eng group:es -group:kibana -is:active'`, () => {
    const query = astToEs(Ast.create([
      Ast.Term.must('john'),
      Ast.Term.mustNot('doe'),
      Ast.Is.must('online'),
      Ast.Field.must('group', 'eng'),
      Ast.Field.must('group', 'es'),
      Ast.Field.mustNot('group', 'kibana'),
      Ast.Is.mustNot('active')
    ]));
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'john group:(eng or es) -group:kibana'`, () => {
    const query = astToEs(Ast.create([
      Ast.Term.must('john'),
      Ast.Field.must('group', ['eng', 'es']),
      Ast.Field.mustNot('group', 'kibana')
    ]));
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'john group:(eng or "marketing org") -group:"kibana team"`, () => {
    const query = astToEs(Ast.create([
      Ast.Term.must('john'),
      Ast.Field.must('group', ['eng', 'marketing org']),
      Ast.Field.mustNot('group', 'kibana team')
    ]));
    expect(query).toMatchSnapshot();
  });
});
