import {
  EuiFlexGrid,
  EuiCard,
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  useEuiTheme,
} from '@elastic/eui';

const cards = [
  {
    title: 'EuiButton',
    children: <EuiButton fill>Primary action</EuiButton>,
    href: './',
  },
  {
    title: 'EuiButton',
    children: <EuiButton>Secondary action</EuiButton>,
    href: './',
  },
  {
    title: 'EuiButtonEmpty',
    children: <EuiButtonEmpty>Tertiary action</EuiButtonEmpty>,
    href: './empty',
  },
  {
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
      css={{ maxInlineSize: euiTheme.base * 30, marginInline: 'auto' }}
    >
      {cards.map(({ title, children, href }) => (
        <EuiCard
          hasBorder
          href={href}
          image={
            <div
              css={{
                backgroundColor: euiTheme.colors.body,
                padding: euiTheme.size.xl,
              }}
            >
              {children}
            </div>
          }
          title={title}
          titleSize="xs"
        />
      ))}
    </EuiFlexGrid>
  );
};
