<script lang="ts">
  import CalHeatmap from 'cal-heatmap';
  import { onMount } from "svelte";

  import { nonRunningDays, totalDays, currentlyRunning, groupBy, generateDailyOverview, systemDarkModeToTheme} from './utils';
  import spreadSheet from './../data/spreadsheet.json';

  const data = generateDailyOverview(spreadSheet, new Date(Date.UTC(2025, 1, 1)));
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
        date: { start: new Date(`${month}-01T00:00:00+00:00`) },
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

<div class="pure-g center" style="margin-bottom: 3em;">
  <p class="explanation"> The Amtrak Pacific Surfliner has been interrupted between San Diego and Los Angeles for {nonRunning} out of the last {total} days ({nonRunningPercent}%)</p>
  <a href="https://www.ridesd.org/lossan" target="_blank"><button class="button-large pure-button button-success">Let's Do Something About It</button></a>
</div>

<div class="pure-g center">
</div>

<div class="pure-g center">
  {#each months as month}
    <div id="cal-heatmap-{month}">
    </div>
  {/each}
</div>
