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

export function generatePagination(totalPages: number): (number | string)[] {
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  
  const firstPages = [1, 2, 3]
  const lastPages = [totalPages - 1, totalPages]
  
  return [...firstPages, '...', ...lastPages]
}
