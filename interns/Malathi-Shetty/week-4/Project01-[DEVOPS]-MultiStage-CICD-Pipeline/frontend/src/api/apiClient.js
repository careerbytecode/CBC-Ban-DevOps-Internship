const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const body = await response.text();
    console.error("Expected JSON but got:", body);
    throw new Error("Backend returned HTML instead of JSON");
  }

  return response.json();
}

export default apiRequest;