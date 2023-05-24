export let baseURL = "http://localhost:8001";

if (import.meta.env.PROD) {
  // set the server url when
  // baseUrl = "https://..."
}

export const apiV1 = baseURL + "/api/v1";
