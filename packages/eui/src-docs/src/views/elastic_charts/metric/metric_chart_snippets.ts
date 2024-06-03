export const singleValueSnippet = `<Chart>
  <Metric
    id="metricId"
    data={[[
      {
         color: '#8CB2CD',
         title: 'Current Year Revenue',
         subtitle: 'Rigid.co',
         extra: <span>Last year <strong>$12.3k</strong></span>,
         value: 2310000,
         valueFormatter: (v) => \`\$\${(v/1000).toFixed(2)}k\`
      }
    ]]}
  >
<Chat/>`;

export const progressBarSnippet = `<Chart>
  <Metric
    id="metricId"
    data={[[
      {
        color: '#A2CB9F'
        title: 'CPU Usage',
        subtitle: 'eui.co',
        extra: <span>last 10 min <strong>18.3%</strong></span>,
        value: 34.2,
        valueFormatter: (v) => \`\${v}%\`,
        domainMax: 100,
        progressBarDirection: LayoutDirection.Vertical
      }
    ]]}
  >
<Chat/>`;

export const trendSnippet = `<Chart>
  <Metric
    id="metricId"
    data={[[
      {
        color: '#6ECCB1'
        title: 'Number of visitors',
        subtitle: 'eui.co',
        extra: <span>Unique visitors</span>,
        value: 240,
        valueFormatter: (v) => \`\${v}k\`,
        trend: Array.from({ length: 10 }).map((d,i) => ({ x: i, y: Math.random()*100000 }))
      }
    ]]}
  >
<Chat/>`;

export const gridRowSnippet = `<Chart>
  <Metric
    id="metricId"
    data={[
      [
        {
          color: '#F1D86F',
          title: 'CPU Usage',
          value: 34.2,
          domainMax: 100,
          progressBarDirection: LayoutDirection.Vertical,
          valueFormatter: (v) => \`\${v}%\`
        },
        {
          color: '#FF7E62',
          title: 'Memory Usage',
          value: 59.5,
          domainMax: 100,
          progressBarDirection: LayoutDirection.Vertical,
          valueFormatter: (v) => \`\${v}%\`
        },
        {
          color: '#6ECCB1',
          title: 'Swap Usage',
          value: 21.0,
          domainMax: 100,
          progressBarDirection: LayoutDirection.Vertical,
          valueFormatter: (v) => \`\${v.toFixed(1)}%\`
        },
      ],
    ]}
  />
</Chart>`;

export const gridColumnSnippet = `<Chart>
  <Metric
    id="metricId"
    data={[
      [
        {
          color: '#F1D86F',
          title: 'CPU Usage',
          value: 34.2,
          domainMax: 100,
          progressBarDirection: LayoutDirection.Vertical,
          valueFormatter: (v) => \`\${v}%\`
        },
        {
          color: '#FF7E62',
          title: 'Memory Usage',
          value: 59.5,
          domainMax: 100,
          progressBarDirection: LayoutDirection.Vertical,
          valueFormatter: (v) => \`\${v}%\`
        },
        {
          color: '#6ECCB1',
          title: 'Swap Usage',
          value: 21.0,
          domainMax: 100,
          progressBarDirection: LayoutDirection.Vertical,
          valueFormatter: (v) => \`\${v.toFixed(1)}%\`
        },
      ],
    ]}
  />
</Chart>`;

export const gridSnippet = `<Chart>
  <Metric
    id="metricId"
    data={[
    {
      color: '#3c3c3c',
      title: 'CPU Usage',
      subtitle: 'Overall percentage',
      icon: () => <EuiIcon type={'compute'} />,
      value: NaN,
      valueFormatter: (v) => \`\${v}%\`,
      trend: [{x:1, y:1}, {x:2, y: 0.5}, {x: 3, y: 0.7}],
      trendShape: 'area'
    },
    {
      color: '#5e5e5e',
      title: 'Disk I/O',
      subtitle: 'Read',
      icon: () => <EuiIcon type={'sortUp'} />,
      value: 12.57,
      valueFormatter: (d) => \`\${d} Mb/s\`,
      domainMax: 100,
      progressBarDirection: LayoutDirection.Horizontal,
      extra: <span>max <b>100Mb/s</b></span>
    },
    {
      color: '#FF7E62',
      title: 'Memory Usage',
      subtitle: 'Overall percentage',
      value: 33.57,
      valueFormatter: (d) => \`\${d} %\`,
      trend: [{x:1, y:1}, {x:2, y: 0.5}, {x: 3, y: 0.7}],
      trendShape: 'area'
    },
    undefined,
    {
      color: '#F1D86F',
      title: 'Login Page Error rate',
      subtitle: 'percent',
      extra:  <span>last month avg <b>2.3%</b></span>,
      value: 1.57,
      valueFormatter: (d) => \`\${d}%\`,
      trend: [{x:1, y:1}, {x:2, y: 0.5}, {x: 3, y: 0.7}],
      trendShape: 'area'
    }
  ],
  [
    {
      color: '#6DCCB1',
      title: '21d7f8b7-92ea-41a0-8c03-0db0ec7e11b9',
      subtitle: 'Cluster CPU Usage',
      value: 24.85,
      valueFormatter: (d) => \`\${d}%\`,
      trend: [{x:1, y:1}, {x:2, y: 0.5}, {x: 3, y: 0.7}],
      trendShape: 'area'
    },
    {
      color: '#5e5e5e',
      title: 'Disk I/O',
      subtitle: 'Write',
      icon: () => <EuiIcon type={'sortDown'} />,
      value: 41.12,
      valueFormatter: (d) => \`\${d} Mb/s\`,
      domainMax: 100,
      progressBarDirection: LayoutDirection.Horizontal,
      extra: <span>max <b>100Mb/s</b></span>
    },
    {
      color: '#FFBDAF',
      title: 'Inbound Traffic',
      subtitle: 'Network eth0',
      extra: <span>last <b>5m</b></span>,
      icon: () => <EuiIcon type={'sortUp'} />,
      value: 3.57,
      valueFormatter: (d) => \`\${d}KBps\`
    },
    undefined,
    {
      color: '#F1D86F',
      title: 'Cart page Error rate',
      subtitle: 'percent',
      extra: <span>last month avg <b>3.4%</b></span>,
      value: 4.21,
      valueFormatter: (d) => \`\${d}%\`,
      trend: osTrend,
      trendShape: 'area'
    },
  ]}
  />
</Chart>`;
