import { ReactElement } from 'react';
import { queries, RenderOptions, Screen } from '@testing-library/react';
import * as dataTestSubjQueries from './data_test_subj_queries';
/**
 * Custom render() fn with EuiProvider and query helpers
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 * @see https://testing-library.com/docs/react-testing-library/setup#add-custom-queries
 */
declare const customRender: (ui: ReactElement, { queries: renderQueries, ...options }?: RenderOptions) => import("@testing-library/react").RenderResult<{
    getByLabelText: typeof queries.getByLabelText;
    getAllByLabelText: typeof queries.getAllByLabelText;
    queryByLabelText: typeof queries.queryByLabelText;
    queryAllByLabelText: typeof queries.queryAllByLabelText;
    findByLabelText: typeof queries.findByLabelText;
    findAllByLabelText: typeof queries.findAllByLabelText;
    getByPlaceholderText: typeof queries.getByPlaceholderText;
    getAllByPlaceholderText: typeof queries.getAllByPlaceholderText;
    queryByPlaceholderText: typeof queries.queryByPlaceholderText;
    queryAllByPlaceholderText: typeof queries.queryAllByPlaceholderText;
    findByPlaceholderText: typeof queries.findByPlaceholderText;
    findAllByPlaceholderText: typeof queries.findAllByPlaceholderText;
    getByText: typeof queries.getByText;
    getAllByText: typeof queries.getAllByText;
    queryByText: typeof queries.queryByText;
    queryAllByText: typeof queries.queryAllByText;
    findByText: typeof queries.findByText;
    findAllByText: typeof queries.findAllByText;
    getByAltText: typeof queries.getByAltText;
    getAllByAltText: typeof queries.getAllByAltText;
    queryByAltText: typeof queries.queryByAltText;
    queryAllByAltText: typeof queries.queryAllByAltText;
    findByAltText: typeof queries.findByAltText;
    findAllByAltText: typeof queries.findAllByAltText;
    getByTitle: typeof queries.getByTitle;
    getAllByTitle: typeof queries.getAllByTitle;
    queryByTitle: typeof queries.queryByTitle;
    queryAllByTitle: typeof queries.queryAllByTitle;
    findByTitle: typeof queries.findByTitle;
    findAllByTitle: typeof queries.findAllByTitle;
    getByDisplayValue: typeof queries.getByDisplayValue;
    getAllByDisplayValue: typeof queries.getAllByDisplayValue;
    queryByDisplayValue: typeof queries.queryByDisplayValue;
    queryAllByDisplayValue: typeof queries.queryAllByDisplayValue;
    findByDisplayValue: typeof queries.findByDisplayValue;
    findAllByDisplayValue: typeof queries.findAllByDisplayValue;
    getByRole: typeof queries.getByRole;
    getAllByRole: typeof queries.getAllByRole;
    queryByRole: typeof queries.queryByRole;
    queryAllByRole: typeof queries.queryAllByRole;
    findByRole: typeof queries.findByRole;
    findAllByRole: typeof queries.findAllByRole;
    getByTestId: typeof queries.getByTestId;
    getAllByTestId: typeof queries.getAllByTestId;
    queryByTestId: typeof queries.queryByTestId;
    queryAllByTestId: typeof queries.queryAllByTestId;
    findByTestId: typeof queries.findByTestId;
    findAllByTestId: typeof queries.findAllByTestId;
    queryByTestSubject: import("@testing-library/react").QueryBy<[import("@testing-library/react").Matcher]>;
    queryAllByTestSubject: (container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions | undefined) => HTMLElement[];
    getByTestSubject: import("@testing-library/react").GetBy<[import("@testing-library/react").Matcher]>;
    getAllByTestSubject: import("@testing-library/react").GetAllBy<[import("@testing-library/react").Matcher]>;
    findAllByTestSubject: import("@testing-library/react").FindAllBy<[import("@testing-library/react").Matcher]>;
    findByTestSubject: import("@testing-library/react").FindBy<[import("@testing-library/react").Matcher]>;
}, HTMLElement, HTMLElement>;
export { customRender as render };
/**
 * Custom screen util with EUI query helpers
 *
 * @see https://testing-library.com/docs/queries/about/#screen
 * @see https://github.com/testing-library/dom-testing-library/issues/516
 */
declare const customScreen: Screen<typeof queries & typeof dataTestSubjQueries>;
export { customScreen as screen };
