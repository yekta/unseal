export function getGroupLabelByDate(date: Date): string {
  const now = new Date();
  const differenceInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysInThisMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();
  const weekDay = now.getDay();

  if (differenceInDays === 0) return "Today";
  if (differenceInDays === 1) return "Yesterday";
  if (differenceInDays < weekDay) return "This week";
  if (differenceInDays < daysInThisMonth) return "This month";
  if (date.getFullYear() === now.getFullYear())
    return date.toLocaleString("default", { month: "long" });
  return `${date.toLocaleString("default", {
    month: "long",
  })}, ${date.getFullYear()}`;
}
