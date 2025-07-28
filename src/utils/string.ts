export const shortenAddress = (
  str: string = "",
  head: number = 6,
  tail: number = 4,
) => {
  if (!str) return "";
  
  const totalLength = head + tail;
  if (str.length > totalLength) {
    return `${str.substring(0, head)}...${str.substring(str.length - tail)}`;
  } else {
    return str;
  }
};