import { ShallowWrapper, ReactWrapper } from 'enzyme';
export { requiredProps } from './required_props';

declare module '@elastic/eui' {
  export function findTestSubject<T extends ShallowWrapper | ReactWrapper> (
    mountedComponent: T,
    testSubjectSelector: string
  ): ReturnType<T["find"]>;
}
