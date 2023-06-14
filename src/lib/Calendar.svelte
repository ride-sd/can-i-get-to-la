<script lang="ts">
  import CalHeatmap from 'cal-heatmap';
  import { onMount } from "svelte";

  import { nonRunningDays, totalDays, currentlyRunning, groupBy, generateDailyOverview, systemDarkModeToTheme} from './utils';
  import spreadSheet from './../data/spreadsheet.json';

  const data = generateDailyOverview(spreadSheet, new Date(2023, 0, 1));
  const groupedData = groupBy(data, (dataPoint) => dataPoint.date.slice(0, 7))

  const months = Object.keys(groupedData);
  const canIGoToday = currentlyRunning(data);

  const nonRunning = nonRunningDays(data);
  const total = totalDays(data);

  const nonRunningPercent = Math.floor((nonRunning / total) * 100);

  onMount(async () => {
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

<div class="pure-g center">
  {#if canIGoToday}
    <h2 class="response running"> YES <small>(however)</small></h2>
  {:else}
    <h2 class="response not-running"> NOPE </h2>
 {/if}
</div>

<div class="pure-g center">
  <p class=""> The Pacific Surfliner has been interrupted between Sand Diego and Los Angeles for {nonRunning} out of {total} days this year ({nonRunningPercent}%)</p>
</div>

<div class="pure-g center">
  {#each months as month}
    <div id="cal-heatmap-{month}">
    </div>
  {/each}
</div>

<div class="pure-g center">
  <button class="button-xlarge pure-button button-success">Let's Do Something About It</button>
</div>

