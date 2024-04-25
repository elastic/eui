import { useView } from 'react-view';

// @ts-ignore NOT TS
import { propUtilityForPlayground } from '../../services/playground';

export function getPropsFromComponent(component: any) {
  const docgenInfo = Array.isArray(component.__docgenInfo)
    ? component.__docgenInfo[0]
    : component.__docgenInfo;
  const { props } = docgenInfo;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useView({ props: propUtilityForPlayground(props) });
  return params.knobProps.state;
}
