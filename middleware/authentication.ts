export default defineNuxtRouteMiddleware(async (to, from) => {
  const { getUserData } = useUser();

  if (process.client) {
    // Get the token from sessionStorage
    const token = sessionStorage.getItem("currentUser");

    // If no token is found, redirect to the login page (avoid redirect loop)
    if (!token && to.path !== "/") {
      return navigateTo("/");
    } else {
      try {
        // Fetch user data using the token
        const userData = await getUserData(token);

        // If userData is null, redirect to the login page (avoid redirect loop)
        if (!userData && to.path !== "/") {
          return navigateTo("/");
        }

        // Check the role of the user and redirect accordingly (avoid redirect loop)
        if (
          userData.role.role_name === "Admin" &&
          to.path !== "/Admin/MasterScreenPage"
        ) {
          return navigateTo("/Admin/MasterScreenPage");
        } else if (
          userData.role.role_name !== "Admin" &&
          to.path !== "/Biro/ListAnnouncementPage"
        ) {
          return navigateTo("/Biro/ListAnnouncementPage");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (to.path !== "/") {
          return navigateTo("/");
        }
      }
    }
  }
});
