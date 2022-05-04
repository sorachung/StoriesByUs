import { getToken } from "./authManager";

const _apiUrl = "/api/bookmark";

export const postBookmark = (bookmark) => {
  return getToken().then((token) =>
    fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookmark),
    }).then((resp) => resp.json())
  );
};
