export default () => {
  const createUser = async (user) => {
    const result = await $fetch("/api/user/createUser", {
      method: "POST",
      body: {
        us_username: user.us_username,
        us_password: user.us_password,
        us_role_id: user.role_id,
      },
    });
    return result;
  };
  const createRole = async (role) => {
    const result = await $fetch("/api/user/createRole", {
      method: "POST",
      body: {
        role_name: role.role_name,
      },
    });
    return result;
  };
  const deleteRole = async (role) => {
    const result = await $fetch("/api/user/deleteRole", {
      method: "DELETE",
      body: {
        role_id: role.role_id,
      },
    });
    return result;
  };
  const getUser = async () => {
    const result = await $fetch("/api/user/getUser");
    return result;
  };
  const getRole = async () => {
    const result = await $fetch("/api/user/getRole");
    return result;
  };
  const loginUser = async (user) => {
    const result = await $fetch("/api/user/loginUser", {
      method: "POST",
      body: {
        us_username: user.us_username,
        us_password: user.us_password,
      },
    });
    if (result) {
      sessionStorage.setItem("currentUser", result);
    }
    return result;
  };
  const getUserData = async (token) => {
    const result = await $fetch("/api/user/verifyToken", {
      method: "POST",
      body: {
        token: token,
      },
    });
    return result;
  };
  const deleteUser = async (user) => {
    const result = await $fetch("/api/user/deleteUser", {
      method: "DELETE",
      body: {
        us_username: user.us_username,
      },
    });
    return result;
  };
  const editUser = async (user) => {
    const result = await $fetch("/api/user/editUser", {
      method: "POST",
      body: {
        us_username: user.us_username,
        us_password: user.us_password,
        us_role_id: user.role_id,
      },
    });
    return result;
  };
  return {
    createUser,
    getUser,
    loginUser,
    deleteUser,
    getRole,
    createRole,
    deleteRole,
    editUser,
    getUserData,
  };
};
