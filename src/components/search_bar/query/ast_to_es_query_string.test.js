import { AST } from './ast';
import moment from 'moment/moment';
import { dateValue } from './date_value';
import { Granularity } from './date_format';
import { astToEsQueryString } from './ast_to_es_query_string';

describe('astToEsQueryString', () => {
  test(`ast - '*'`, () => {
    const query = astToEsQueryString(AST.create([]));
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'john -sales'`, () => {
    const query = astToEsQueryString(
      AST.create([AST.Term.must('john'), AST.Term.mustNot('sales')])
    );
    expect(query).toMatchSnapshot();
  });

  test(`ast - '-group:es group:kibana -group:beats group:logstash'`, () => {
    const query = astToEsQueryString(
      AST.create([
        AST.Field.mustNot.eq('group', 'es'),
        AST.Field.must.eq('group', 'kibana'),
        AST.Field.mustNot.eq('group', 'beats'),
        AST.Field.must.eq('group', 'logstash'),
      ])
    );
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'is:online group:kibana john'`, () => {
    const query = astToEsQueryString(
      AST.create([
        AST.Is.must('online'),
        AST.Field.must.eq('group', 'kibana'),
        AST.Term.must('john'),
      ])
    );
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'john -doe is:online group:eng group:es -group:kibana -is:active'`, () => {
    const query = astToEsQueryString(
      AST.create([
        AST.Term.must('john'),
        AST.Term.mustNot('doe'),
        AST.Is.must('online'),
        AST.Field.must.eq('group', 'eng'),
        AST.Field.must.eq('group', 'es'),
        AST.Field.mustNot.eq('group', 'kibana'),
        AST.Is.mustNot('active'),
      ])
    );
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'john group:(eng or es) -group:kibana'`, () => {
    const query = astToEsQueryString(
      AST.create([
        AST.Term.must('john'),
        AST.Field.must.eq('group', ['eng', 'es']),
        AST.Field.mustNot.eq('group', 'kibana'),
      ])
    );
    expect(query).toMatchSnapshot();
  });

  test(`ast - 'john group:(eng or "marketing org") -group:"kibana team"`, () => {
    const query = astToEsQueryString(
      AST.create([
        AST.Term.must('john'),
        AST.Field.must.eq('group', ['eng', 'marketing org']),
        AST.Field.mustNot.eq('group', 'kibana team'),
      ])
    );
    expect(query).toMatchSnapshot();
  });

  test(`ast - count>3`, () => {
    const query = astToEsQueryString(
      AST.create([AST.Field.must.gt('count', 3)])
    );
    expect(query).toMatchSnapshot();
  });

  test(`ast - -count<=4 size<5 age>=3 -number>9`, () => {
    const query = astToEsQueryString(
      AST.create([
        AST.Field.mustNot.lte('count', 4),
        AST.Field.must.lt('size', 5),
        AST.Field.must.gte('age', 3),
        AST.Field.mustNot.gt('number', 9),
      ])
    );
    expect(query).toMatchSnapshot();
  });

  test(`ast - date>='2004-03-22'`, () => {
    const query = astToEsQueryString(
      AST.create([
        AST.Field.must.gte(
          'date',
          dateValue(moment.utc('2004-03-22'), Granularity.DAY)
        ),
      ])
    );
    expect(query).toMatchSnapshot();
  });

  test(`ast - date:'2004-03' -date<'2004-03-10'`, () => {
    const query = astToEsQueryString(
      AST.create([
        AST.Field.must.eq(
          'date',
          dateValue(moment.utc('2004-03'), Granularity.MONTH)
        ),
        AST.Field.mustNot.lt(
          'date',
          dateValue(moment.utc('2004-03-10'), Granularity.DAY)
        ),
      ])
    );
    expect(query).toMatchSnapshot();
  });

  test(`ast - date>'2004-02' -otherDate>='2004-03-10'`, () => {
    const query = astToEsQueryString(
      AST.create([
        AST.Field.must.gt(
          'date',
          dateValue(moment.utc('2004-02'), Granularity.MONTH)
        ),
        AST.Field.mustNot.gte(
          'date',
          dateValue(moment.utc('2004-03-10'), Granularity.DAY)
        ),
      ])
    );
    expect(query).toMatchSnapshot();
  });

  test('ast - (name:john OR name:fred)', () => {
    const query = astToEsQueryString(
      AST.create([
        AST.Group.must([
          AST.Field.must.eq('name', 'john'),
          AST.Field.must.eq('name', 'fred'),
        ]),
      ])
    );
    expect(query).toBe('+(name:john name:fred)');
  });

  test('ast - name:john (is:enrolled OR Teacher)', () => {
    const query = astToEsQueryString(
      AST.create([
        AST.Field.must.eq('name', 'john'),
        AST.Group.must([AST.Is.must('enrolled'), AST.Term.must('Teacher')]),
      ])
    );
    expect(query).toBe('+name:john +(enrolled:true Teacher)');
  });
});
