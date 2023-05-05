export let baseURL = "http://localhost:5000";

if (import.meta.env.PROD) {
  // set the server url when
  // baseUrl = "https://..."
}

export const apiV1 = baseURL + "/api/v1";
