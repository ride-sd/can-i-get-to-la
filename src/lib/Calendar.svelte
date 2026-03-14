<script lang="ts">
    import {
        nonRunningDays,
        totalDays,
        currentlyRunning,
        generateDailyOverview,
    } from "./utils";
    import spreadSheet from "./../data/spreadsheet.json";

    const data = generateDailyOverview(
        spreadSheet,
        new Date(Date.UTC(2025, 0, 1)),
    );
    const canIGoToday = currentlyRunning(data);

    const nonRunning = nonRunningDays(data);
    const total = totalDays(data);
    const nonRunningPercent = Math.floor((nonRunning / total) * 100);

    // Build a lookup map for quick access by date string
    const dataByDate = new Map(data.map((d) => [d.date, d]));

    // Determine which months to show: from the data start through the current month
    const now = new Date();
    const currentYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const dataMonths = [...new Set(data.map((d) => d.date.slice(0, 7)))].sort();
    const firstMonth = dataMonths[0];
    const lastMonth =
        currentYearMonth > dataMonths[dataMonths.length - 1]
            ? currentYearMonth
            : dataMonths[dataMonths.length - 1];

    // Generate all months from first to last
    const months: string[] = [];
    {
        const [startY, startM] = firstMonth.split("-").map(Number);
        const [endY, endM] = lastMonth.split("-").map(Number);
        let y = startY,
            m = startM;
        while (y < endY || (y === endY && m <= endM)) {
            months.push(`${y}-${String(m).padStart(2, "0")}`);
            m++;
            if (m > 12) {
                m = 1;
                y++;
            }
        }
    }

    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

    function monthLabel(yearMonth: string): string {
        const [year, month] = yearMonth.split("-");
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return date.toLocaleString("default", {
            month: "short",
            year: "numeric",
        });
    }

    type CellData = {
        day: number;
        date: string;
        value: number | null;
        future: boolean;
    } | null;

    function buildMonthGrid(yearMonth: string): CellData[] {
        const [year, month] = yearMonth.split("-").map(Number);
        const firstOfMonth = new Date(year, month - 1, 1);
        const startDow = firstOfMonth.getDay();
        const daysInMonth = new Date(year, month, 0).getDate();

        const cells: CellData[] = [];

        // pad leading empty cells
        for (let i = 0; i < startDow; i++) {
            cells.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${yearMonth}-${String(day).padStart(2, "0")}`;
            const entry = dataByDate.get(dateStr);
            const future = dateStr > todayStr;
            cells.push({
                day,
                date: dateStr,
                value: entry ? entry.value : null,
                future,
            });
        }

        return cells;
    }
</script>

<div class="pure-g center">
    {#if canIGoToday}
        <h2 class="response running">YES <small>(however)</small></h2>
    {:else}
        <h2 class="response not-running">NOPE</h2>
    {/if}
</div>

<div class="pure-g center" style="margin-bottom: 2em;">
    <p class="explanation">
        The Amtrak Pacific Surfliner has been interrupted between San Diego and
        Los Angeles for {nonRunning} out of the last {total} days ({nonRunningPercent}%)
    </p>
</div>

<div class="legend">
    <span class="legend-item"
        ><span class="legend-swatch running-day"></span> Running</span
    >
    <span class="legend-item"
        ><span class="legend-swatch not-running-day"></span> Not Running</span
    >
</div>

<div class="year-grid">
    {#each months as month}
        <div class="mini-month">
            <div class="mini-month-label">{monthLabel(month)}</div>
            <div class="day-headers">
                {#each dayLabels as label}
                    <span class="day-header">{label}</span>
                {/each}
            </div>
            <div class="day-grid">
                {#each buildMonthGrid(month) as cell}
                    {#if cell === null}
                        <span class="day-cell empty"></span>
                    {:else if cell.future}
                        <span class="day-cell future">{cell.day}</span>
                    {:else if cell.value !== null && cell.value >= 8}
                        <span
                            class="day-cell running-day"
                            title="{cell.date}: Running">{cell.day}</span
                        >
                    {:else if cell.value !== null}
                        <span
                            class="day-cell not-running-day"
                            title="{cell.date}: Not Running">{cell.day}</span
                        >
                    {:else}
                        <span class="day-cell no-data">{cell.day}</span>
                    {/if}
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>
    .legend {
        display: flex;
        justify-content: center;
        gap: 1.5em;
        margin-bottom: 1.5em;
        font-size: 0.9em;
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 0.4em;
    }

    .legend-swatch {
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 2px;
    }

    .year-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5em;
        max-width: 900px;
        margin: 0 auto 2em;
    }

    .mini-month {
        text-align: center;
    }

    .mini-month-label {
        font-weight: 600;
        font-size: 0.85em;
        margin-bottom: 0.3em;
    }

    .day-headers {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 2px;
        margin-bottom: 2px;
    }

    .day-header {
        font-size: 0.6em;
        color: #999;
        text-align: center;
    }

    .day-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 2px;
    }

    .day-cell {
        aspect-ratio: 1;
        border-radius: 2px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.55em;
        font-weight: 500;
        color: #fff;
    }

    .day-cell.empty {
        background: transparent;
    }

    .running-day {
        background-color: #1a9850;
    }

    .not-running-day {
        background-color: #d73027;
    }

    .future {
        background-color: #ddd;
        color: #999;
    }

    .no-data {
        background-color: #ddd;
        color: #999;
    }

    @media (max-width: 768px) {
        .year-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 400px) {
        .year-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
