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
          "An unknown error occurred while trying to get a user."
        );
      }
    })
  );
};

export const getCurrentUser = () => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/me`, {
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
          "An unknown error occurred while trying to get the current user."
        );
      }
    })
  );
};

export const editUserBio = (user) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/bio`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.ok) {
        return res.status;
      } else {
        throw new Error(
          "An unknown error occurred while trying to edit a user's bio."
        );
      }
    })
  );
};

export const getCurrentUserType = () => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/type`, {
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
          "An unknown error occurred while trying to get the current user's type."
        );
      }
    });
  });
};

export const deactivateUser = (userId, user) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/deactivate/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.ok) {
        return res.status;
      } else {
        throw new Error(
          "An unknown error occurred while trying to deactivate a user."
        );
      }
    })
  );
};
