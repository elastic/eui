import type { Matcher, MatcherOptions } from '@testing-library/react';
import { queryHelpers } from '@testing-library/react';
declare const queryAllByTestSubject: (container: HTMLElement, id: Matcher, options?: MatcherOptions | undefined) => HTMLElement[];
declare const queryByTestSubject: queryHelpers.QueryBy<[Matcher]>, getAllByTestSubject: queryHelpers.GetAllBy<[Matcher]>, getByTestSubject: queryHelpers.GetBy<[Matcher]>, findAllByTestSubject: queryHelpers.FindAllBy<[Matcher]>, findByTestSubject: queryHelpers.FindBy<[Matcher]>;
export { queryByTestSubject, queryAllByTestSubject, getByTestSubject, getAllByTestSubject, findAllByTestSubject, findByTestSubject, };
