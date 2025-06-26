export const convertTimeToDurationInSeconds = (time: string) => {
  if (time.includes(":")) {
    const [hours, minutes] = time.split(":");
    return Number(hours) * 60 * 60 + Number(minutes) * 60;
  }
  switch (time) {
    case "1d":
      return 1 * 24 * 60 * 60;
    case "3d":
      return 3 * 24 * 60 * 60;
    case "1w":
      return 1 * 7 * 24 * 60 * 60;
    case "2w":
      return 2 * 7 * 24 * 60 * 60;
    case "1m":
      return 1 * 30 * 24 * 60 * 60;
    case "3m":
      return 3 * 30 * 24 * 60 * 60;
    case "6m":
      return 6 * 30 * 24 * 60 * 60;
    case "1y":
      return 365 * 24 * 60 * 60;
    default:
      return 0;
  }
};