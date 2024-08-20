import OriginalHeading from '@theme-init/MDXComponents/Heading';
import type HeadingType from '@theme-init/MDXComponents/Heading';
import type { WrapperProps } from '@docusaurus/types';
import { EuiTitle, EuiTitleSize } from '@elastic/eui';
import { FunctionComponent } from 'react';

type Props = WrapperProps<typeof HeadingType>;

const SIZE_TO_LEVEL_MAP: Record<string, EuiTitleSize> = {
  h6: 'xxxs',
  h5: 'xxs',
  h4: 'xs',
  h3: 's',
  h2: 'm',
  h1: 'l',
};

const Heading: FunctionComponent<Omit<Props, 'as'> & { as: string }> = ({
  as,
  ...rest
}): JSX.Element => {
  return (
    <EuiTitle size={SIZE_TO_LEVEL_MAP[as]}>
      <OriginalHeading as={as} {...rest} />
    </EuiTitle>
  );
};

export default Heading;
