export const convertScheduleData = (data, daysOfWeek) => {
  const dayMapping = {
    [daysOfWeek[0]]: 1,
    [daysOfWeek[1]]: 2,
    [daysOfWeek[2]]: 3,
    [daysOfWeek[3]]: 4,
    [daysOfWeek[4]]: 5,
    [daysOfWeek[5]]: 6,
    [daysOfWeek[6]]: 7,
  };

  const normalizeTime = (value) => {
    const hours = Math.floor((value * 24) / 96);
    const minutes = Math.floor(((value * 24 * 60) / 96) % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const result = { days: [] };

  for (const [dayName, entries] of Object.entries(data)) {
    const day = dayMapping[dayName];
    entries.forEach((entry) => {
      const from = normalizeTime(entry.y);
      let to = normalizeTime(entry.y + entry.h);
      const targetTemperature = parseFloat(entry.temperature, 10);

      if (to === "24:00") {
        to = "23:59";
      }

      result.days.push({
        day,
        from,
        to,
        targetTemperature,
      });
    });
  }

  return result.days;
};
