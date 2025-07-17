export const getMachineType = (machineType: string) => {
  switch (machineType) {
    case "1":
      return "Docker";
    case "2":
      return "Kubernetes";
    case "3":
      return "Kvm";
    default:
      return "Unknown";
  }
};