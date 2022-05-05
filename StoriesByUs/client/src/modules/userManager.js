import { getToken } from "./authManager";

const _apiUrl = "/api/user";

export const getUser = (id) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/byId/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 404) {
        return res.status;
      } else {
        throw new Error(
          "An unknown error occurred while trying to get a story."
        );
      }
    })
  );
};
