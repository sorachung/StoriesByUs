import { getToken } from "./authManager";

const _apiUrl = "/api/rating";

export const getAllRatings = () => {
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
          "An unknown error occurred while trying to get ratings."
        );
      }
    })
  );
};
