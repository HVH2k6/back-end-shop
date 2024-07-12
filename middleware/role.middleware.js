const checkPermission = (req, res, next) => {


  if (roleUser) {
    const url = req.originalUrl;
    const permissions = roleUser.permission;

    console.log("URL:", url);
    console.log("Permissions:", permissions);

    if (
      roleUser.name_role === "Admin" ||
      permissions.includes("all") ||
      (url.includes("/admin/product") && permissions.some(permission => /product/.test(permission))) ||
      (url.includes("/admin/category") && permissions.some(permission => /category/.test(permission))) ||
      (url.includes("/admin/user") && permissions.some(permission => /auth/.test(permission))) ||
      (url.includes("/admin/role") && (roleUser.name_role === "Admin" || permissions.includes("all")))
    ) {
      console.log("Permission granted. Proceeding...");
      return next(); // User has permission, proceed to the next middleware
    } else {
      console.log("Permission denied. Redirecting to /not-found");
      return res.redirect("/not-found");
    }
  } else {
    console.log("Role user not found. Redirecting to /not-found");
    return res.redirect("/not-found");
  }
};

module.exports = {
  checkPermission,
};
