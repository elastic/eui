declare module "@elastic/eui" {

  export interface EuiFieldSearchProps {
    name?: string,
    id?: string,
    placeholder?: string,
    value?: string,
    isInvalid?: boolean,
    fullWidth?: boolean,
    isLoading?: boolean,
    [key: string]: any
  }
  export class EuiFieldSearch extends React.Component<EuiFieldSearchProps, {}>{}

}
