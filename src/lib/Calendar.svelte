<script lang="ts">
  import CalHeatmap from 'cal-heatmap';
  import { onMount } from "svelte";

  import { generateDailyOverview, systemDarkModeToTheme} from './utils';

  const spreadSheet = [
    // {date: "2022-09-30", availability:1, label:"", notes: "https://twitter.com/PacSurfliners/status/1575631564179787776"},
    {date: "2023-01-01", availability:1, label:"", notes: "https://twitter.com/PacSurfliners/status/1575631564179787776"},
    {date: "2023-02-04", availability:8, label:"", notes: "https://twitter.com/PacSurfliners/status/1621206341527437312"},
    {date: "2023-02-06", availability:1, label:"", notes: ""},
    {date: "2023-02-11", availability:8, label:"", notes: ""},
    {date: "2023-02-13", availability:1, label:"", notes: ""},
    {date: "2023-02-18", availability:8, label:"", notes: ""},
    {date: "2023-02-20", availability:1, label:"", notes: ""},
    {date: "2023-02-27", availability:1, label:"", notes: ""},
    {date: "2023-03-04", availability:8, label:"", notes: ""},
    {date: "2023-03-06", availability:1, label:"", notes: ""},
    {date: "2023-03-11", availability:8, label:"", notes: ""},
    {date: "2023-03-13", availability:1, label:"", notes: ""},
    {date: "2023-03-18", availability:8, label:"", notes: ""},
    {date: "2023-03-20", availability:1, label:"", notes: ""},
    {date: "2023-04-01", availability:8, label:"", notes: ""},
    {date: "2023-04-03", availability:1, label:"", notes: ""},
    {date: "2023-04-08", availability:8, label:"", notes: ""},
    {date: "2023-04-10", availability:1, label:"", notes: ""},
    {date: "2023-04-15", availability:8, label:"", notes: ""},
    {date: "2023-04-16", availability:1, label:"", notes: ""},
    {date: "2023-04-17", availability:8, label:"", notes: ""},
    {date: "2023-04-27", availability:1, label:"", notes: ""},
    {date: "2023-05-27", availability:8, label:"", notes: ""},
    {date: "2023-06-05", availability:1, label:"", notes: ""},
  ]

  onMount(async () => {
    const data = generateDailyOverview(spreadSheet)

    console.log(data)

    new CalHeatmap().paint({
      itemSelector: '#cal-heatmap',
      range: 6,
      theme: systemDarkModeToTheme(window),
      scale: { color: { type: 'threshold', scheme: 'rdylgn', domain: [1, 2, 3, 4, 5, 6, 7, 8] } },
      domain: {
        type: 'month',
        padding: [10, 10, 10, 10],
        label: { position: 'top' },
        dynamicDimension: true,
      },
      subDomain: { type: 'xDay', radius: 2, width: 20, height: 20, label: 'D', gutter: 2 },
      date: { start: new Date(2023, 0, 1) },
      data: { source: data, x: 'date', y: 'value', groupY: 'min' },
    })
  })
</script>

<div id="cal-heatmap">
</div>
