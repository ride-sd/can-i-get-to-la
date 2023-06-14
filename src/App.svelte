<script lang="ts">
  import "cal-heatmap/cal-heatmap.css";
  import Calendar from './lib/Calendar.svelte'
</script>

<main>
  <div class="pure-g center">
    <h1 class="title">Can I Get to LA Today?</h1>
  </div>

  <Calendar />

  <div class="pure-g center">
    <a href="https://www.ridesd.org/#lossan" target="_blank"><button class="button-xlarge pure-button button-success">Let's Do Something About It</button></a>
  </div>
</main>
