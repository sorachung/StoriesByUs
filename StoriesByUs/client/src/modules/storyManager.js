import { getToken } from "./authManager";

const _apiUrl = "/api/story";

export const getAllStories = () => {
  return getToken().then((token) =>
    fetch(_apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get stories."
        );
      }
    })
  );
};

export const getStoriesByGenre = (genreId) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/genre/${genreId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get stories by genre."
        );
      }
    })
  );
};
