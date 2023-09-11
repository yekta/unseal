export function getRelativeDate(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date);
  }
  const now = new Date();
  const secondsDiff = Math.round((now.getTime() - date.getTime()) / 1000);

  if (secondsDiff < 60) {
    if (secondsDiff <= 0) return "now";
    return `${secondsDiff}s`;
  }

  const minutesDiff = Math.floor(secondsDiff / 60);
  if (minutesDiff < 60) {
    return `${minutesDiff}m`;
  }

  const hoursDiff = Math.floor(minutesDiff / 60);
  if (hoursDiff < 24) {
    return `${hoursDiff}h`;
  }

  const dayOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", dayOptions).format(date);
}
