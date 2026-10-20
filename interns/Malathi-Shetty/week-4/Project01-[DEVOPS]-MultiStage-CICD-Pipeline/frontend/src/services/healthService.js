import apiRequest from "../api/apiClient";

async function getHealthStatus() {
  return apiRequest("/health");
}

export { getHealthStatus };