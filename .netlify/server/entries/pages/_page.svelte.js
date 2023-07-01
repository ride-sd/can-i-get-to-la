import { c as create_ssr_component, e as escape, a as each, v as validate_component } from "../../chunks/ssr.js";
import "cal-heatmap";
const calHeatmap = "";
function generateDailyOverview(inputData, start) {
  const sortedData = [...inputData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const dailyData = [];
  for (let i = 0; i < sortedData.length; i++) {
    const startDate = new Date(sortedData[i].date);
    const endDate = i < sortedData.length - 1 ? new Date(sortedData[i + 1].date) : today();
    for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().slice(0, 10);
      dailyData.push({
        date: dateString,
        value: sortedData[i].availability
      });
    }
  }
  return dailyData.filter((dataPoint) => dataPoint.date >= start.toISOString().slice(0, 10)).filter((dataPoint) => dataPoint.date <= today().toISOString().slice(0, 10));
}
function groupBy(arr, fn) {
  return arr.reduce((prev, curr) => {
    const groupKey = fn(curr);
    const group = prev[groupKey] || [];
    group.push(curr);
    return { ...prev, [groupKey]: group };
  }, {});
}
function currentlyRunning(data) {
  let dataPoint;
  dataPoint = data.find((d) => d.date === today().toISOString().slice(0, 10));
  if (dataPoint) {
    return isRunning(dataPoint);
  }
  dataPoint = data.slice(-1);
  if (dataPoint) {
    return isRunning(dataPoint);
  }
  return false;
}
function totalDays(data) {
  return data.length;
}
function nonRunningDays(data) {
  return data.filter((d) => !isRunning(d)).length;
}
function isRunning(dataPoint) {
  return dataPoint.value >= 8;
}
function today() {
  const now = /* @__PURE__ */ new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}
const spreadSheet = [
  {
    date: "2022-09-30",
    availability: 1,
    label: "",
    notes: "https://twitter.com/PacSurfliners/status/1575631564179787776"
  },
  {
    date: "2023-02-04",
    availability: 8,
    label: "",
    notes: "https://twitter.com/PacSurfliners/status/1621206341527437312"
  },
  {
    date: "2023-02-06",
    availability: 1,
    label: "",
    notes: ""
  },
  {
    date: "2023-02-11",
    availability: 8,
    label: "",
    notes: ""
  },
  {
    date: "2023-02-13",
    availability: 1,
    label: "",
    notes: ""
  },
  {
    date: "2023-02-18",
    availability: 8,
    label: "",
    notes: ""
  },
  {
    date: "2023-02-20",
    availability: 1,
    label: "",
    notes: ""
  },
  {
    date: "2023-02-27",
    availability: 1,
    label: "",
    notes: ""
  },
  {
    date: "2023-03-04",
    availability: 8,
    label: "",
    notes: ""
  },
  {
    date: "2023-03-06",
    availability: 1,
    label: "",
    notes: ""
  },
  {
    date: "2023-03-11",
    availability: 8,
    label: "",
    notes: ""
  },
  {
    date: "2023-03-13",
    availability: 1,
    label: "",
    notes: ""
  },
  {
    date: "2023-03-18",
    availability: 8,
    label: "",
    notes: ""
  },
  {
    date: "2023-03-20",
    availability: 1,
    label: "",
    notes: ""
  },
  {
    date: "2023-04-01",
    availability: 8,
    label: "",
    notes: ""
  },
  {
    date: "2023-04-03",
    availability: 1,
    label: "",
    notes: ""
  },
  {
    date: "2023-04-08",
    availability: 8,
    label: "",
    notes: ""
  },
  {
    date: "2023-04-10",
    availability: 1,
    label: "",
    notes: ""
  },
  {
    date: "2023-04-15",
    availability: 8,
    label: "",
    notes: ""
  },
  {
    date: "2023-04-16",
    availability: 1,
    label: "",
    notes: ""
  },
  {
    date: "2023-04-17",
    availability: 8,
    label: "",
    notes: ""
  },
  {
    date: "2023-04-27",
    availability: 1,
    label: "",
    notes: ""
  },
  {
    date: "2023-05-27",
    availability: 8,
    label: "",
    notes: ""
  },
  {
    date: "2023-06-05",
    availability: 1,
    label: "",
    notes: ""
  }
];
const Calendar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const data = generateDailyOverview(spreadSheet, new Date(2023, 0, 1));
  const groupedData = groupBy(data, (dataPoint) => dataPoint.date.slice(0, 7));
  const months = Object.keys(groupedData);
  const canIGoToday = currentlyRunning(data);
  const nonRunning = nonRunningDays(data);
  const total = totalDays(data);
  const nonRunningPercent = Math.floor(nonRunning / total * 100);
  return `<div class="pure-g center">${canIGoToday ? `<h2 class="response running" data-svelte-h="svelte-1rgsus2">YES <small>(however)</small></h2>` : `<h2 class="response not-running" data-svelte-h="svelte-8uu7i9">NOPE</h2>`}</div> <div class="pure-g center"><p class="explanation">The Amtrak Pacific Surfliner has been interrupted between San Diego and Los Angeles for ${escape(nonRunning)} out of ${escape(total)} days this year (${escape(nonRunningPercent)}%)</p></div> <div class="pure-g center">${each(months, (month) => {
    return `<div id="${"cal-heatmap-" + escape(month, true)}"></div>`;
  })}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Calendar, "Calendar").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
