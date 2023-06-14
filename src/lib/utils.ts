type DataPoint = {
  date: string;
  availability: number;
  label: string;
  notes: string;
}

type CalendarDataPoint = {
  date: string;
  value: number;
}

export function generateDailyOverview(inputData: DataPoint[], start: Date): CalendarDataPoint[] {
  const sortedData = [...inputData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const dailyData: CalendarDataPoint[] = [];

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

  return dailyData
          .filter(dataPoint => dataPoint.date >= start.toISOString().slice(0, 10))
          .filter(dataPoint => dataPoint.date <= today().toISOString().slice(0, 10));
}

export function systemDarkModeToTheme(window: Window): 'light' | 'dark' {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

export function groupBy<T>(arr: T[], fn: (item: T) => any) {
  return arr.reduce<Record<string, T[]>>((prev, curr) => {
      const groupKey = fn(curr);
      const group = prev[groupKey] || [];
      group.push(curr);
      return { ...prev, [groupKey]: group };
  }, {});
}

export function currentlyRunning(data: CalendarDataPoint[]): boolean {
  let dataPoint
  dataPoint = data.find((d) => d.date === today().toISOString().slice(0, 10) )

  if(dataPoint) {
    return isRunning(dataPoint)
  }

  dataPoint = data.slice(-1)

  if(dataPoint) {
    return isRunning(dataPoint)
  }

  return false
}

export function totalDays(data: CalendarDataPoint[]) : integer {
  return data.length;
}

export function nonRunningDays(data: CalendarDataPoint[]) : integer {
  return data.filter((d) => !isRunning(d)).length;
}

function isRunning(dataPoint : CalendarDataPoint) {
  return dataPoint.value >= 8;
}

function today(): Date {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
}
