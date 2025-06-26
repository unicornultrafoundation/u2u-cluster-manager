export const getRegionCode = (region: string) => {
  switch (region) {
    case "1":
      return "us-central1";
    case "2":
      return "us-east1";
    case "3":
      return "us-east4";
    case "4":
      return "us-west1";
    case "5":
      return "europe-west1";
    case "6":
      return "europe-west2";
    case "7":
      return "europe-west3";
    case "8":
      return "asia-east1";
    case "9":
      return "asia-northeast1";
    case "10":
      return "asia-southeast1";
    case "11":
      return "australia-southeast1";
    case "12":
      return "southamerica-east1";
    default:
      return "Unknown";
  }
}