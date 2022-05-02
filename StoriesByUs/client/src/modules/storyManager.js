import { getToken } from "./authManager";

const _apiUrl = "/api/story";

export const getAllStories = () => {
  return getToken().then((token) =>
    fetch(_apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => resp.json())
  );
};
