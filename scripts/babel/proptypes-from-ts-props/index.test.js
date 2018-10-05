const path = require('path');
const { transform } = require('babel-core');
const babelOptions = {
  babelrc: false,
  presets: [
    'react',
  ],
  plugins: [
    './scripts/babel/proptypes-from-ts-props',
  ],
  filename: 'somefile.tsx',
};

describe('proptypes-from-ts-props', () => {

  describe('proptype generation', () => {

    describe('basic generation', () => {

      it('imports PropTypes and creates an empty propTypes object on the component', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {};`);
      });

      it('creates the propTypes assignment at the nearest block', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {}
(function() {
  if (true) {
    const FooComponent: React.SFC<IFooProps> = () => {
      return (<div>Hello World</div>);
    }
  }
})();`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

(function () {
  if (true) {
    const FooComponent = () => {
      return React.createElement(
        'div',
        null,
        'Hello World'
      );
    };
    FooComponent.propTypes = {};
  }
})();`);
      });

    });

    describe('primitive propTypes', () => {

      it('understands string props', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: string}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.string.isRequired
};`);
      });

      it('understands number props', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: number}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.number.isRequired
};`);
      });

      it('understands boolean props', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: boolean}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.bool.isRequired
};`);
      });

      it('understands function props', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {
  bar: () => void
}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.func.isRequired
};`);
      });

      it('understands optional props', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar?: number}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.number
};`);
      });

      it('understands mixed props', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {
  bar1: string,
  bar2?: number,
  bar3: (x: number, y: number) => string,
  bar4?: () => void,
  bar5: boolean
}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar1: PropTypes.string.isRequired,
  bar2: PropTypes.number,
  bar3: PropTypes.func.isRequired,
  bar4: PropTypes.func,
  bar5: PropTypes.bool.isRequired
};`);
      });

    });

    describe('enum / oneOf propTypes', () => {

      it('understands an enum of strings', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {flower: 'daisy' | 'daffodil' |  'dandelion'}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return React.createElement(
    "div",
    null,
    "Hello World"
  );
};
FooComponent.propTypes = {
  flower: PropTypes.oneOf(["daisy", "daffodil", "dandelion"]).isRequired
};`);
      });

      it('understands an enum of numbers', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {prime: 2 | 3 | 5 | 7 | 11 | 13}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  prime: PropTypes.oneOf([2, 3, 5, 7, 11, 13]).isRequired
};`);
      });

      it('understands an enum of booleans', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {visible: true | false}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  visible: PropTypes.oneOf([true, false]).isRequired
};`);
      });

      it('understands a mix of primitives', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bool: true | false | 'FileNotFound'}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return React.createElement(
    "div",
    null,
    "Hello World"
  );
};
FooComponent.propTypes = {
  bool: PropTypes.oneOf([true, false, "FileNotFound"]).isRequired
};`);
      });

      it('understands optional enums', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar?: 'hello' | 'world'}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return React.createElement(
    "div",
    null,
    "Hello World"
  );
};
FooComponent.propTypes = {
  bar: PropTypes.oneOf(["hello", "world"])
};`);
      });

    });

    describe('object / shape propTypes', () => {

      it('understands an object of primitive values', () => {
        const result = transform(
          `
import React from 'react';
interface iFoo {name: string, age: number}
interface IFooProps {person: iFoo}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
  }).isRequired
};`);
      });

      it('understands an object of object values', () => {
        const result = transform(
          `
import React from 'react';
interface iBar {name: string}
interface iFoo {name: string, age: number}
interface iFizz {bar: iBar, foo?: iFoo}
interface IFooProps {fizz: iFizz}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  fizz: PropTypes.shape({
    bar: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    foo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired
    })
  }).isRequired
};`);
      });

    });

    describe('intersection types', () => {

      it('intersects multiple types together', () => {
        const result = transform(
          `
import React from 'react';
interface iBar {name: string}
interface iFoo {age: number}
interface IFooProps {fizz: iBar & iFoo}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  fizz: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
  }).isRequired
};`);
      });

      it('intersects overlapping types together', () => {
        const result = transform(
          `
import React from 'react';
interface iBar {name: string}
interface iFoo {name: string, age: number}
interface IFooProps {fizz: iBar & iFoo}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  fizz: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
  }).isRequired
};`);
      });

    });

    describe('union types', () => {

      it('unions primitive types and values', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: string | 5 | 6}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([5, 6])]).isRequired
};`);
      });

      it('unions custom types', () => {
        const result = transform(
          `
import React from 'react';
interface iFoo {foo: string, bar?: number}
type Bar = {name: string, isActive: true | false} 
interface IFooProps {buzz: iFoo | Bar}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  buzz: PropTypes.oneOfType([PropTypes.shape({
    foo: PropTypes.string.isRequired,
    bar: PropTypes.number
  }).isRequired, PropTypes.shape({
    name: PropTypes.string.isRequired,
    isActive: PropTypes.oneOf([true, false]).isRequired
  }).isRequired]).isRequired
};`);
      });

    });

    describe('array / arrayOf propTypes', () => {

      it('understands an Array of strings', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: Array<string>}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};`);
      });

      it('understands an Array of numbers', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: Array<number>}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};`);
      });

      it('understands an Array of booleans', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: Array<boolean>}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired
};`);
      });

      it('understands an Array of functions', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: Array<() => void>}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.arrayOf(PropTypes.func.isRequired).isRequired
};`);
      });

      it('understands an Array of literal values', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: Array<'foo' | 'bar'>}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return React.createElement(
    "div",
    null,
    "Hello World"
  );
};
FooComponent.propTypes = {
  bar: PropTypes.arrayOf(PropTypes.oneOf(["foo", "bar"]).isRequired).isRequired
};`);
      });

      it('understands an Array of mixed literal and non-literal types', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: Array<string | 5 | 6>}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([5, 6])]).isRequired).isRequired
};`);
      });

      it('understands an optional Array of strings and numbers', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar?: Array<string | number>}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]).isRequired)
};`);
      });

      it('understands an Array of a custom type', () => {
        const result = transform(
          `
import React from 'react';
interface FooBar {foo: string, bar?: boolean}
interface IFooProps {bar: Array<FooBar>}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.arrayOf(PropTypes.shape({
    foo: PropTypes.string.isRequired,
    bar: PropTypes.bool
  }).isRequired).isRequired
};`);
      });

    });

    describe('type and interface resolving', () => {

      it('understands inline definitions', () => {
        const result = transform(
          `
import React from 'react';
const FooComponent: React.SFC<{bar: string}> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';
const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.string.isRequired
};`);
      });

      it('understands one level of indirection', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: string}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.string.isRequired
};`);
      });

      it('understands two levels of indirection', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: string}
type FooProps = IFooProps
const FooComponent: React.SFC<FooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  bar: PropTypes.string.isRequired
};`);
      });

      describe('external references', () => {

        describe('non-resolvable', () => {

          it(`doesn't set propTypes if the whole type is un-resolvable`, () => {
            const result = transform(
              `
import React from 'react';
const FooComponent: React.SFC<SomeThing> = () => {
  return (<div>Hello World</div>);
}`,
              babelOptions
            );

            expect(result.code).toBe(`
import React from 'react';
const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};`);
          });

          it('marks un-resolvable types as PropTypes.any', () => {
            const result = transform(
              `
import React from 'react';
const FooComponent: React.SFC<{foo: Foo, bar?: Bar}> = () => {
  return (<div>Hello World</div>);
}`,
              babelOptions
            );

            expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';
const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  foo: PropTypes.any.isRequired,
  bar: PropTypes.any
};`);
          });

          it('ignores types from node modules', () => {
            const result = transform(
              `
import React, { HTMLAttributes } from 'react';
const FooComponent: React.SFC<HTMLAttributes<HTMLDivElement>> = () => {
  return (<div>Hello World</div>);
}`,
              babelOptions
            );

            expect(result.code).toBe(`
import React, { HTMLAttributes } from 'react';
const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};`);
          });

          it('intersection with all unknown types resolves to PropTypes.any', () => {
            const result = transform(
              `
import React from 'react';
interface IFooProps {fizz: iBar & iFoo}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
              babelOptions
            );

            expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  fizz: PropTypes.any.isRequired
};`);
          });

          it('intersection with some unknown types resolves to knwon types', () => {
            const result = transform(
              `
import React from 'react';
interface iBar { name: string, age?: number }
interface IFooProps {fizz: iBar & iFoo}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
              babelOptions
            );

            expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  fizz: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number
  }).isRequired
};`);
          });

        });

        describe('local references', () => {

          it('resolves types from relative imports', () => {
            const result = transform(
              `
import React from 'react';
import { CommonProps } from '../common';
const FooComponent: React.SFC<{foo: Foo, bar?: Bar} & CommonProps> = () => {
  return (<div>Hello World</div>);
}`,
              {
                ...babelOptions,
                plugins: [
                  [
                    './scripts/babel/proptypes-from-ts-props',
                    {
                      fs: {
                        existsSync: () => true,
                        statSync: () => ({ isDirectory: () => false }),
                        readFileSync: () => Buffer.from(`
                          export interface CommonProps {
                            className?: string;
                            'aria-label'?: string;
                            'data-test-subj'?: string;
                          }
                        `)
                      }
                    }
                  ],
                ]
              }
            );

            expect(result.code).toBe(`
import React from 'react';
import PropTypes from "prop-types";
import { CommonProps } from '../common';
const FooComponent = () => {
  return React.createElement(
    "div",
    null,
    "Hello World"
  );
};
FooComponent.propTypes = {
  foo: PropTypes.any.isRequired,
  bar: PropTypes.any,
  className: PropTypes.string,
  "aria-label": PropTypes.string,
  "data-test-subj": PropTypes.string
};`);
          });

          it('resolves to directory index files', () => {
            const result = transform(
              `
import React from 'react';
import { CommonProps } from './common';
const FooComponent: React.SFC<{foo: Foo, bar?: Bar} & CommonProps> = () => {
  return (<div>Hello World</div>);
}`,
              {
                ...babelOptions,
                filename: 'foo.ts',
                plugins: [
                  [
                    './scripts/babel/proptypes-from-ts-props',
                    {
                      fs: {
                        existsSync: () => true,
                        statSync: () => ({ isDirectory: () => true }),
                        readFileSync: filepath => {
                          if (filepath !== path.resolve(process.cwd(), 'common/index.ts')) {
                            throw new Error('Test case should only try to read file unknown/common/index.ts');
                          }

                          return Buffer.from(`
                            export interface CommonProps {
                              className?: string;
                              'aria-label'?: string;
                              'data-test-subj'?: string;
                            }
                          `);
                        }
                      }
                    }
                  ],
                ]
              }
            );

            expect(result.code).toBe(`
import React from 'react';
import PropTypes from "prop-types";
import { CommonProps } from './common';
const FooComponent = () => {
  return React.createElement(
    "div",
    null,
    "Hello World"
  );
};
FooComponent.propTypes = {
  foo: PropTypes.any.isRequired,
  bar: PropTypes.any,
  className: PropTypes.string,
  "aria-label": PropTypes.string,
  "data-test-subj": PropTypes.string
};`);
          });

          it('loads only exported types', () => {
            const result = transform(
              `
import React from 'react';
import { CommonProps } from '../common';
const FooComponent: React.SFC<CommonProps & FooProps> = () => {
  return (<div>Hello World</div>);
}`,
              {
                ...babelOptions,
                plugins: [
                  [
                    './scripts/babel/proptypes-from-ts-props',
                    {
                      fs: {
                        existsSync: () => true,
                        statSync: () => ({ isDirectory: () => false }),
                        readFileSync: () => Buffer.from(`
                          interface FooProps {
                            foo: string
                          }
                          export interface CommonProps {
                            className?: string;
                            'aria-label'?: string;
                            'data-test-subj'?: string;
                          }
                        `)
                      }
                    }
                  ],
                ]
              }
            );

            expect(result.code).toBe(`
import React from 'react';
import PropTypes from "prop-types";
import { CommonProps } from '../common';
const FooComponent = () => {
  return React.createElement(
    "div",
    null,
    "Hello World"
  );
};
FooComponent.propTypes = {
  className: PropTypes.string,
  "aria-label": PropTypes.string,
  "data-test-subj": PropTypes.string
};`);
          });

          it('imported types can also import types', () => {
            const result = transform(
              `
import React from 'react';
import { CommonProps } from './common.ts';
const FooComponent: React.SFC<CommonProps & FooProps> = () => {
  return (<div>Hello World</div>);
}`,
              {
                ...babelOptions,
                plugins: [
                  [
                    './scripts/babel/proptypes-from-ts-props',
                    {
                      fs: {
                        existsSync: () => true,
                        statSync: () => ({ isDirectory: () => false }),
                        readFileSync: filepath => {
                          if (filepath === path.resolve(process.cwd(), 'common.ts')) {
                            return Buffer.from(`
                              import { FooType } from './types.ts';
                              export interface CommonProps {
                                className?: string;
                                'aria-label'?: string;
                                'data-test-subj'?: string;
                                foo: FooType;
                              }
                            `);
                          } else if (filepath === path.resolve(process.cwd(), 'types.ts')) {
                            return Buffer.from(`
                              export type FooType = "Foo" | "Bar" | "Fizz"; 
                            `);
                          }
                        }
                      }
                    }
                  ],
                ]
              }
            );

            expect(result.code).toBe(`
import React from 'react';
import PropTypes from "prop-types";
import { CommonProps } from './common.ts';
const FooComponent = () => {
  return React.createElement(
    "div",
    null,
    "Hello World"
  );
};
FooComponent.propTypes = {
  className: PropTypes.string,
  "aria-label": PropTypes.string,
  "data-test-subj": PropTypes.string,
  foo: PropTypes.oneOf(["Foo", "Bar", "Fizz"]).isRequired
};`);
          });

        });

      });

    });

    describe('supported component declarations', () => {

      it('annotates React.SFC components', () => {
        const result = transform(
          `
import React from 'react';
const FooComponent: React.SFC<{foo: string, bar?: number}> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';
const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  foo: PropTypes.string.isRequired,
  bar: PropTypes.number
};`);
      });

      it('annotates SFC components', () => {
        const result = transform(
          `
import React, { SFC } from 'react';
const FooComponent: SFC<{foo: string, bar?: number}> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React, { SFC } from 'react';
import PropTypes from 'prop-types';
const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  foo: PropTypes.string.isRequired,
  bar: PropTypes.number
};`);
      });

      it('annotates React.Component components', () => {
        const result = transform(
          `
import React from 'react';
class FooComponent extends React.Component<{foo: string, bar?: number}> {
  render() {
    return (<div>Hello World</div>);
  }
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';
class FooComponent extends React.Component {
  render() {
    return React.createElement(
      'div',
      null,
      'Hello World'
    );
  }
}
FooComponent.propTypes = {
  foo: PropTypes.string.isRequired,
  bar: PropTypes.number
};`);
      });

      it('annotates React.PureComponent components', () => {
        const result = transform(
          `
import React from 'react';
class FooComponent extends React.PureComponent<{foo: string, bar?: number}> {
  render() {
    return (<div>Hello World</div>);
  }
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React from 'react';
import PropTypes from 'prop-types';
class FooComponent extends React.PureComponent {
  render() {
    return React.createElement(
      'div',
      null,
      'Hello World'
    );
  }
}
FooComponent.propTypes = {
  foo: PropTypes.string.isRequired,
  bar: PropTypes.number
};`);
      });

      it('annotates Component components', () => {
        const result = transform(
          `
import React, { Component } from 'react';
class FooComponent extends Component<{foo: string, bar?: number}> {
  render() {
    return (<div>Hello World</div>);
  }
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React, { Component } from 'react';
import PropTypes from 'prop-types';
class FooComponent extends Component {
  render() {
    return React.createElement(
      'div',
      null,
      'Hello World'
    );
  }
}
FooComponent.propTypes = {
  foo: PropTypes.string.isRequired,
  bar: PropTypes.number
};`);
      });

      it('annotates PureComponent components', () => {
        const result = transform(
          `
import React, { PureComponent } from 'react';
class FooComponent extends PureComponent<{foo: string, bar?: number}> {
  render() {
    return (<div>Hello World</div>);
  }
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
class FooComponent extends PureComponent {
  render() {
    return React.createElement(
      'div',
      null,
      'Hello World'
    );
  }
}
FooComponent.propTypes = {
  foo: PropTypes.string.isRequired,
  bar: PropTypes.number
};`);
      });

    });

    describe('comments', () => {

      it('copies comments from types to proptypes', () =>   {
        const result = transform(
          `
import React, { SFC } from 'react';
interface FooProps {
  // this is the foo prop
  foo: string,
  /**
   * this is the optional bar prop
   */
  bar?: number
}
const FooComponent: SFC<FooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React, { SFC } from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  // this is the foo prop
  foo: PropTypes.string.isRequired,
  /**
     * this is the optional bar prop
     */bar: PropTypes.number
};`);
      });

      it('copies comments from intersected types', () =>   {
        const result = transform(
          `
import React, { SFC } from 'react';
interface iFoo {
  // this is the foo prop
  foo: string
}
interface iBar {
  /* bar's foo */
  foo: string,
  /**
    * this is the optional bar prop
    */
  bar?: number
}
const FooComponent: SFC<iFoo & iBar> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`
import React, { SFC } from 'react';
import PropTypes from 'prop-types';

const FooComponent = () => {
  return React.createElement(
    'div',
    null,
    'Hello World'
  );
};
FooComponent.propTypes = {
  /* bar's foo */ // this is the foo prop
  foo: PropTypes.string.isRequired,
  /**
      * this is the optional bar prop
      */bar: PropTypes.number
};`);
      });

    });

  });

});
