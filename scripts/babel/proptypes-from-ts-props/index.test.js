const path = require('path');
const { transform } = require('@babel/core');
const babelOptions = {
  babelrc: false,
  presets: [
    '@babel/typescript',
  ],
  plugins: [
    './scripts/babel/proptypes-from-ts-props',
  ],
  filename: 'somefile.tsx',
};
const babelPlugin = require('./index');

beforeEach(() => babelPlugin.clearImportCache());

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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

(function () {
  if (true) {
    const FooComponent = () => {
      return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

    describe('function propTypes', () => {

      it('understands function props on interfaces', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {
  foo(): ReactElement;
  bar?(arg: number): string;
  fizz: Function;
  buzz?: (arg: boolean) => string;
}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.func.isRequired,
  bar: PropTypes.func,
  fizz: PropTypes.func.isRequired,
  buzz: PropTypes.func
};`);
      });

      it('understands function props on types', () => {
        const result = transform(
          `
import React from 'react';
type FooProps = {
  foo(): ReactElement;
  bar?(arg: number): string;
  fizz: Function;
  buzz?: (arg: boolean) => string;
}
const FooComponent: React.SFC<FooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.func.isRequired,
  bar: PropTypes.func,
  fizz: PropTypes.func.isRequired,
  buzz: PropTypes.func
};`);
      });

    });

    describe('enum / oneOf propTypes', () => {

      describe('union type', () => {

        it('understands a union of strings', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {flower: 'daisy' | 'daffodil' |  'dandelion'}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  flower: PropTypes.oneOf(["daisy", "daffodil", "dandelion"]).isRequired
};`);
        });

        it('understands a union of numbers', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {prime: 2 | 3 | 5 | 7 | 11 | 13}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  prime: PropTypes.oneOf([2, 3, 5, 7, 11, 13]).isRequired
};`);
        });

        it('understands a union of booleans', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {visible: true | false}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  bool: PropTypes.oneOf([true, false, "FileNotFound"]).isRequired
};`);
        });

        it('understands optional unions', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {bar?: 'hello' | 'world'}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  bar: PropTypes.oneOf(["hello", "world"])
};`);
        });

      });

      describe('enum', () => {

        it('understands enum of strings', () => {
          const result = transform(
            `
import React from 'react';
enum Foo {
  bar = 'BAR',
  baz = 'BAZ',
};
interface IFooProps {foo: Foo}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";
var Foo;

(function (Foo) {
  Foo["bar"] = "BAR";
  Foo["baz"] = "BAZ";
})(Foo || (Foo = {}));

;

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.oneOf(["BAR", "BAZ"]).isRequired
};`);
        });

        it('understands enum of numbers', () => {
          const result = transform(
            `
import React from 'react';
enum Foo {
  bar = 3,
  baz = 54,
};
interface IFooProps {foo: Foo}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";
var Foo;

(function (Foo) {
  Foo[Foo["bar"] = 3] = "bar";
  Foo[Foo["baz"] = 54] = "baz";
})(Foo || (Foo = {}));

;

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.oneOf([3, 54]).isRequired
};`);
        });

        it('understands a mix of primitives', () => {
          const result = transform(
            `
import React from 'react';
enum Foo {
  bar = 'BAR',
  baz = 5,
  buzz = false,
};
interface IFooProps {foo: Foo}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";
var Foo;

(function (Foo) {
  Foo["bar"] = "BAR";
  Foo[Foo["baz"] = 5] = "baz";
  Foo[Foo["buzz"] = false] = "buzz";
})(Foo || (Foo = {}));

;

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.oneOf(["BAR", 5, false]).isRequired
};`);
        });

        it('understands optional enums', () => {
          const result = transform(
            `
import React from 'react';
enum Foo {
  bar = 'BAR',
  baz = 'BAZ',
};
interface IFooProps {foo?: Foo}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";
var Foo;

(function (Foo) {
  Foo["bar"] = "BAR";
  Foo["baz"] = "BAZ";
})(Foo || (Foo = {}));

;

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.oneOf(["BAR", "BAZ"])
};`);
        });

      });

      describe('keyof typeof', () => {

        it('understands keyof typeof', () => {
          const result = transform(
            `
import React from 'react';
const FooMap = {
  foo: 'bar',
  fizz: 'buzz',
};
interface IFooProps {foo: keyof typeof FooMap}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";
const FooMap = {
  foo: 'bar',
  fizz: 'buzz'
};

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.oneOf(["foo", "fizz"]).isRequired
};`);
        });

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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

    describe('React component & element propTypes', () => {

      describe('element propType', () => {

        it('understands React.Component', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {foo: React.Component}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.element.isRequired
};`);
        });

        it('understands Component', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {foo: Component}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.element.isRequired
};`);
        });

        it('understands React.ReactElement<P>', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {foo: React.ReactElement<any>}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.element.isRequired
};`);
        });

        it('understands ReactElement<P>', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {foo: ReactElement<any>}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.element.isRequired
};`);
        });

        it('understands React.ComponentClass', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {foo: React.ComponentClass}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.element.isRequired
};`);
        });

        it('understands ComponentClass', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {foo: ComponentClass}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.element.isRequired
};`);
        });

        it('understands React.SFC', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {foo: React.SFC}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.element.isRequired
};`);
        });

        it('understands SFC', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {foo: SFC}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.element.isRequired
};`);
        });

      });

      describe('node propType', () => {

        it('understands React.ReactNode', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {foo: React.ReactNode}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.node.isRequired
};`);
        });

        it('understands ReactNode', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {foo: ReactNode}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.node.isRequired
};`);
        });

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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  fizz: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
  }).isRequired
};`);
      });

      it('intersects extended interfaces', () => {
        const result = transform(
          `
import React from 'react';
interface iFoo {foo: string}
interface iBar {bar?: number}
interface iBuzz extends iFoo, iBar {buzz: boolean}
const FooComponent: React.SFC<iBuzz> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  buzz: PropTypes.bool.isRequired,
  foo: PropTypes.string.isRequired,
  bar: PropTypes.number
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

      it('intersects ExclusiveUnion arguments', () => {
        const result = transform(
          `
import React from 'react';
export type ExclusiveUnion<T, U> = any;
interface BaseProps { asdf: boolean }
interface IFooProps extends BaseProps {d: number, foo?: string}
interface IBarProps extends BaseProps {d: string, foo: string, bar: string}
const FooComponent: React.SFC<ExclusiveUnion<IFooProps, IBarProps>> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  d: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]).isRequired,
  foo: PropTypes.oneOfType([PropTypes.string, PropTypes.string.isRequired]),
  asdf: PropTypes.bool.isRequired,
  bar: PropTypes.string
};`);
      });

      it('intersects overlapping string enums in ExclusiveUnion', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {type: 'foo', value: string}
interface IBarProps {type: 'bar', value: number}
const FooComponent: React.SFC<ExclusiveUnion<IFooProps, IBarProps>> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  type: PropTypes.oneOfType([PropTypes.oneOf(["foo"]), PropTypes.oneOf(["bar"])]),
  value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]).isRequired
};`);
      });

      it('treats null and undefined as literals', () => {
        const result = transform(
          `
import React from 'react';
interface IFooProps {bar: 'five' | null | undefined}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  bar: PropTypes.oneOf(["five", null, undefined]).isRequired
};`);
      });

    });

    describe('array / arrayOf propTypes', () => {

      describe('Array<T>', () => {
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

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  bar: PropTypes.arrayOf(PropTypes.shape({
    foo: PropTypes.string.isRequired,
    bar: PropTypes.bool
  }).isRequired).isRequired
};`);
        });
      });

      describe('T[]', () => {
        it('understands an Array of strings', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {bar: string[]}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  bar: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};`);
        });

        it('understands an Array of numbers', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {bar: number[]}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  bar: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};`);
        });

        it('understands an Array of booleans', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {bar: boolean[]}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  bar: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired
};`);
        });

        it('understands an Array of functions', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {bar: (() => void)[]}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  bar: PropTypes.arrayOf(PropTypes.func.isRequired).isRequired
};`);
        });

        it('understands an Array of literal values', () => {
          const result = transform(
            `
import React from 'react';
type BarType = 'foo' | 'bar'
interface IFooProps {bar: BarType[]}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  bar: PropTypes.arrayOf(PropTypes.oneOf(["foo", "bar"]).isRequired).isRequired
};`);
        });

        it('understands an Array of mixed literal and non-literal types', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {bar: (string | 5 | 6)[]}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  bar: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([5, 6])]).isRequired).isRequired
};`);
        });

        it('understands an optional Array of strings and numbers', () => {
          const result = transform(
            `
import React from 'react';
interface IFooProps {bar?: (string | number)[]}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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
interface IFooProps {bar: FooBar[]}
const FooComponent: React.SFC<IFooProps> = () => {
  return (<div>Hello World</div>);
}`,
            babelOptions
          );

          expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  bar: PropTypes.arrayOf(PropTypes.shape({
    foo: PropTypes.string.isRequired,
    bar: PropTypes.bool
  }).isRequired).isRequired
};`);
        });
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

            expect(result.code).toBe(`import React from 'react';

const FooComponent = () => {
  return <div>Hello World</div>;
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

            expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

            expect(result.code).toBe(`import React from 'react';

const FooComponent = () => {
  return <div>Hello World</div>;
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

            expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  fizz: PropTypes.any.isRequired
};`);
          });

          it('intersection with some unknown types resolves to known types', () => {
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

            expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

            expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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
                filename: 'foo.tsx',
                plugins: [
                  [
                    './scripts/babel/proptypes-from-ts-props',
                    {
                      fs: {
                        existsSync: () => true,
                        statSync: () => ({ isDirectory: () => true }),
                        readFileSync: filepath => {
                          if (filepath !== path.resolve(process.cwd(), `common${path.sep}index.ts`)) {
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

            expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

            expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

            expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  className: PropTypes.string,
  "aria-label": PropTypes.string,
  "data-test-subj": PropTypes.string,
  foo: PropTypes.oneOf(["Foo", "Bar", "Fizz"]).isRequired
};`);
          });

          it('imported types can import types from other locations', () => {
            const result = transform(
              `
import React from 'react';
import { Foo } from './types/foo.ts';
const FooComponent: React.SFC<Foo> = () => {
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
                          if (filepath === path.resolve(process.cwd(), 'types', 'foo.ts')) {
                            return Buffer.from(`
                              import { IFoo } from '../interfaces/foo.ts';
                              export type Foo = IFoo;
                            `);
                          } else if (filepath === path.resolve(process.cwd(), 'interfaces', 'foo.ts')) {
                            return Buffer.from(`
                              export interface IFoo { bar: string }
                            `);
                          }
                        }
                      }
                    }
                  ],
                ]
              }
            );

            expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  bar: PropTypes.string.isRequired
};`);
          });

          it('resolves object keys used in keyof typeof', () => {
            const result = transform(
              `
import React from 'react';
import { commonKeys, commonKeyTypes } from '../common';
const FooComponent: React.SFC<{foo: keyof typeof commonKeys, bar?: commonKeyTypes}> = () => {
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
                          export const commonKeys = {
                            s: 'small',
                            'l': 'large',
                          };
                          
                          export type commonKeyTypes = keyof typeof commonKeys;
                        `)
                      }
                    }
                  ],
                ]
              }
            );

            expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.oneOf(["s", "l"]).isRequired,
  bar: PropTypes.oneOf(["s", "l"])
};`);
          });

          it('resolves types exported without an import', () => {
            const result = transform(
              `
import React from 'react';
import { Foo } from '../foo';
const FooComponent: React.SFC<{foo: Foo}> = () => {
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
                          if (filepath.endsWith(`${path.sep}foo`)) {
                            return Buffer.from(`
                              export { Foo } from './Foo';
                            `);
                          }

                          if (filepath.endsWith(`${path.sep}Foo`)) {
                            return Buffer.from(`
                              export type Foo = string;
                            `);
                          }

                          throw new Error(`Test tried to import from ${filepath}`);
                        }
                      }
                    }
                  ],
                ]
              }
            );

            expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.string.isRequired
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.string.isRequired,
  bar: PropTypes.number
};`);
      });

      it('annotates FunctionComponent components', () => {
        const result = transform(
          `
import React, { FunctionComponent } from 'react';
const FooComponent: FunctionComponent<{foo: string, bar?: number}> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.string.isRequired,
  bar: PropTypes.number
};`);
      });

      it('annotates indirected FunctionComponent components', () => {
        const result = transform(
          `
import React, { FunctionComponent } from 'react';
type FooType = FunctionComponent<{foo: string, bar?: number}>;
const FooComponent: FooType = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  foo: PropTypes.string.isRequired,
  bar: PropTypes.number
};`);
      });

      it('annotates React.FunctionComponent components', () => {
        const result = transform(
          `
import React from 'react';
const FooComponent: React.FunctionComponent<{foo: string, bar?: number}> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

class FooComponent extends React.Component {
  render() {
    return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

class FooComponent extends React.PureComponent {
  render() {
    return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React, { Component } from 'react';
import PropTypes from "prop-types";

class FooComponent extends Component {
  render() {
    return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React, { PureComponent } from 'react';
import PropTypes from "prop-types";

class FooComponent extends PureComponent {
  render() {
    return <div>Hello World</div>;
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  // this is the foo prop
  foo: PropTypes.string.isRequired,

  /**
     * this is the optional bar prop
     */
  bar: PropTypes.number
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

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  /* bar's foo */
  // this is the foo prop
  foo: PropTypes.string.isRequired,

  /**
      * this is the optional bar prop
      */
  bar: PropTypes.number
};`);
      });

    });

    describe('self-referencing types', () => {

      it(`doesn't explode on self-referencing interfaces`, () => {
        const result = transform(
          `
import React, { SFC } from 'react';
interface FooProps {
  label: string;
  children?: FooProps[];
}
const FooComponent: SFC<FooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.any.isRequired)
};`);
      });

      it(`doesn't explode on self-referencing types`, () => {
        const result = transform(
          `
import React, { SFC } from 'react';
type FooProps = {
  label: string;
  children?: FooProps[];
}
const FooComponent: SFC<FooProps> = () => {
  return (<div>Hello World</div>);
}`,
          babelOptions
        );

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";

const FooComponent = () => {
  return <div>Hello World</div>;
};

FooComponent.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.any.isRequired)
};`);
      });

    });

    describe('forwardRef', () => {
      it('attaches proptypes to components returned by forwardRef', () => {
        const result = transform(
          `
import React, { forwardRef } from 'react';
interface FooProps {
  foo: string;
  bar?: number;
}
const FooComponent = forwardRef<HTMLDivElement, FooProps>(() => {
  return (<div>Hello World</div>);
})`,
          babelOptions
        );

        expect(result.code).toBe(`import React, { forwardRef } from 'react';
import PropTypes from "prop-types";
const FooComponent = forwardRef(() => {
  return <div>Hello World</div>;
});
FooComponent.propTypes = {
  foo: PropTypes.string.isRequired,
  bar: PropTypes.number
};`);
      });

      it('attaches proptypes to components returned by React.forwardRef', () => {
        const result = transform(
          `
import React from 'react';
interface FooProps {
  foo: string;
  bar?: number;
}
const FooComponent = React.forwardRef<HTMLDivElement, FooProps>(() => {
  return (<div>Hello World</div>);
})`,
          babelOptions
        );

        expect(result.code).toBe(`import React from 'react';
import PropTypes from "prop-types";
const FooComponent = React.forwardRef(() => {
  return <div>Hello World</div>;
});
FooComponent.propTypes = {
  foo: PropTypes.string.isRequired,
  bar: PropTypes.number
};`);
      });
    });

  });

  describe('remove types from exports', () => {
    it('removes sole type export from ExportNamedDeclaration', () => {
      const result = transform(
        `
type Foo = string;
export { Foo };
`,
        babelOptions
      );

      expect(result.code).toBe(`export {};`);
    });

    it('removes multiple type export from ExportNamedDeclaration', () => {
      const result = transform(
        `
type Foo = string;
type Bar = number | Foo;
export { Foo, Bar };
`,
        babelOptions
      );

      expect(result.code).toBe(`export {};`);
    });

    it('removes type exports from ExportNamedDeclaration, leaving legitimate exports', () => {
      const result = transform(
        `
type Foo = string;
type Bar = Foo | boolean;
const A = 500;
const B = { bar: A };
export { Foo, A, Bar, B };
`,
        babelOptions
      );

      expect(result.code).toBe(`const A = 500;
const B = {
  bar: A
};
export { A, B };`);
    });

    it('removes type exports from ExportNamedDeclaration with a source', () => {
      const result = transform(
        `
export { Foo, A } from './foo';
`,
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
                    if (filepath.endsWith(`${path.sep}foo`)) {
                      return Buffer.from(`
                        export type Foo = string;
                      `);
                    }

                    throw new Error(`Test tried to import from ${filepath}`);
                  }
                }
              }
            ],
          ]
        }
      );

      expect(result.code).toBe(`export { A } from './foo';`);
    });

    it('removes type exports from ExportNamedDeclaration when the imported name differs from the exported one', () => {
      const result = transform(
        `
export { Foo as Bar, A as B } from './foo';
`,
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
                    if (filepath.endsWith(`${path.sep}foo`)) {
                      return Buffer.from(`
                        export const A = 5;
                        export type Foo = string;
                      `);
                    }

                    throw new Error(`Test tried to import from ${filepath}`);
                  }
                }
              }
            ],
          ]
        }
      );

      expect(result.code).toBe(`export { A as B } from './foo';`);
    });

    it('removes type export statements', () => {
      const result = transform(
        `
export type Foo = string;
`,
        babelOptions
      );

      expect(result.code).toBe('');
    });

    it('removes 3rd-party type exports', () => {
      const result = transform(
        `
export { DraggableLocation, Draggable, DragDropContextProps } from 'react-beautiful-dnd';
`,
        babelOptions
      );

      expect(result.code).toBe(
        `export { Draggable } from 'react-beautiful-dnd';`
      );
    });
  });

});
