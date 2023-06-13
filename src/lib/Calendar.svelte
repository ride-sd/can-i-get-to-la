<script lang="ts">
  import CalHeatmap from 'cal-heatmap';
  import { onMount } from "svelte";

  import { groupBy, generateDailyOverview, systemDarkModeToTheme} from './utils';
  import spreadSheet from './../data/spreadsheet.json';

  onMount(async () => {
    const data = generateDailyOverview(spreadSheet, new Date(2023, 0, 1));
    const groupedData = groupBy(data, (dataPoint) => dataPoint.date.slice(0, 7))

    console.log(groupedData)

    const baseOptions = {
      range: 1,
      theme: systemDarkModeToTheme(window),
      scale: { color: { type: 'threshold', scheme: 'rdylgn', domain: [1, 2, 3, 4, 5, 6, 7, 8] } },
      domain: {
        type: 'month',
        padding: [10, 10, 10, 10],
        label: { position: 'top' },
        dynamicDimension: true,
      },
      subDomain: { type: 'xDay', radius: 2, width: 20, height: 20, label: 'D', gutter: 2 },
    }

    Object.entries(groupedData).forEach(([month, dataSet]) => {
      const monthOptions = {
        itemSelector: `#cal-heatmap-${month}`,
        date: { start: new Date(`${month}-01T00:00:00`) },
        data: { source: dataSet, x: 'date', y: 'value', groupY: 'min' },
      }

      new CalHeatmap().paint(Object.assign(baseOptions, monthOptions))
    });
  })
</script>

<div class="pure-g">
  <div id="cal-heatmap-2023-01">
  </div>

  <div id="cal-heatmap-2023-02">
  </div>

  <div id="cal-heatmap-2023-03">
  </div>

  <div id="cal-heatmap-2023-04">
  </div>

  <div id="cal-heatmap-2023-05">
  </div>

  <div id="cal-heatmap-2023-06">
  </div>
</div>
