declare module "@elastic/eui" {


  import { ReactNode } from 'react';

  export type EuiCheckboxType = 'inList';

  export interface EuiCheckboxProps {
    id: string,
    checked: boolean,
    onChange: (event: any) => void,
    className?: string,
    label?: ReactNode,
    type?: EuiCheckboxType,
    disabled?: boolean
  }
  export class EuiCheckbox extends React.Component<EuiCheckboxProps, {}>{}

}
