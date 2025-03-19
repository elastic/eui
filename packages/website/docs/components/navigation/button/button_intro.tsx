import {
  EuiFlexGrid,
  EuiCard,
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiPanel,
  useEuiTheme,
} from '@elastic/eui';

const cards = [
  {
    id: 1,
    title: 'EuiButton',
    children: <EuiButton fill>Primary action</EuiButton>,
    href: './basic',
  },
  {
    id: 2,
    title: 'EuiButton',
    children: <EuiButton>Secondary action</EuiButton>,
    href: './basic',
  },
  {
    id: 3,
    title: 'EuiButtonEmpty',
    children: <EuiButtonEmpty>Tertiary action</EuiButtonEmpty>,
    href: './empty',
  },
  {
    id: 4,
    title: 'EuiButtonIcon',
    children: (
      <EuiButtonIcon
        display="base"
        size="m"
        iconType="refresh"
        aria-label="Button icon example with refresh icon"
      />
    ),
    href: './icon',
  },
];

export default () => {
  const { euiTheme } = useEuiTheme();
  return (
    <EuiFlexGrid
      columns={2}
      gutterSize="m"
    >
      {cards.map(({ id, title, children, href }) => (
        <EuiCard
          key={id}
          hasBorder
          href={href}
          image={
            <EuiPanel color="transparent" borderRadius="none">
              <EuiPanel color="subdued">
                {children}
              </EuiPanel>
            </EuiPanel>
          }
          title={title}
          titleSize="xs"
        />
      ))}
    </EuiFlexGrid>
  );
};
