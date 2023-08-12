<script lang="ts">
  import "./calendar.css"
  import "cal-heatmap/cal-heatmap.css";
  import Calendar from './Calendar.svelte'
</script>

<svelte:head>
  <title>Can I Take the Train to LA Today?</title>

  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="title" content="Can I Take the Train to LA Today?" />
  <meta name="description" content="Tracking if the Amtrak Pacific Surfliner is running between San Diego and Los Angeles or if it's falling into the Pacific Ocean 🌊" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Can I Take the Train to LA Today?" />
  <meta property="og:description" content="Tracking if the Amtrak Pacific Surfliner is running between San Diego and Los Angeles or if it's falling into the Pacific Ocean 🌊" />
  <meta property="og:image" content="https://can-i-get-to-la.netlify.app/social_share.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="can-I-train-to-la-today.com" />
  <meta property="twitter:title" content="Can I Take the Train to LA Today?" />
  <meta property="twitter:description" content="Tracking if the Amtrak Pacific Surfliner is running between San Diego and Los Angeles or if it's falling into the Pacific Ocean 🌊" />
  <meta property="twitter:image" content="https://can-i-get-to-la.netlify.app/social_share.png" />
</svelte:head>

<Calendar />
