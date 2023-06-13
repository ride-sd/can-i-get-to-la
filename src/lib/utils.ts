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

export function generateDailyOverview(inputData: DataPoint[]): CalendarDataPoint[] {
  const sortedData = [...inputData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const dailyData: CalendarDataPoint[] = [];

  const now = new Date();
  const today = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

  for (let i = 0; i < sortedData.length; i++) {
      const startDate = new Date(sortedData[i].date);
      const endDate = i < sortedData.length - 1 ? new Date(sortedData[i + 1].date) : new Date(today);

      for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
          const dateString = d.toISOString().slice(0, 10);
          dailyData.push({
            date: dateString,
            value: sortedData[i].availability
          });
      }
  }

  return dailyData;
}

export function systemDarkModeToTheme(window: Window): 'light' | 'dark' {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}
