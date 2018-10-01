const { transform } = require('babel-core');
const babelOptions = {
  presets: [
    'react',
  ],
  plugins: [
    './scripts/babel/proptypes-from-ts-props',
  ]
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
    isActive: PropTypes.oneOfType([PropTypes.oneOf([true, false])]).isRequired
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
  bar: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(["foo", "bar"])]).isRequired).isRequired
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
  bar: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({
    foo: PropTypes.string.isRequired,
    bar: PropTypes.bool
  }).isRequired])).isRequired
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

    });

  });

});
