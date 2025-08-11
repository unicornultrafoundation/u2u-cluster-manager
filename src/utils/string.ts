export const shortenAddress = (
  str: string = '',
  head: number = 6,
  tail: number = 4,
) => {
  if (!str) return '';
  
  const totalLength = head + tail;
  if (str.length > totalLength) {
    return `${str.substring(0, head)}...${str.substring(str.length - tail)}`;
  } else {
    return str;
  }
};


export function getDayTimestamps(date: Date = new Date()): [number, number] {
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));
  
  return [
    Math.floor(startOfDay.getTime() / 1000), // start timestamp (seconds)
    Math.floor(endOfDay.getTime() / 1000)    // end timestamp (seconds)
  ];
}