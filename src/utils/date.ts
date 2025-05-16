// Function to get time of day greeting
export function getTimeOfDay() {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Afternoon";
  } else if (currentHour >= 17 && currentHour < 21) {
    return "Evening";
  } else {
    return "Night";
  }
}

export function getDateFromMilliseconds(milliseconds: string) {
  const date = new Date(Number(milliseconds));
  return date;
}
