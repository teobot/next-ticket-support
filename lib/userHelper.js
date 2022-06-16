export const hasPermission = (user, permission) => {
  // always allow super users

  if (!user || !user?.user) return false;

  if (!user?.user.permissions) return false;

  if (user?.user.permissions.isSuper) return true;

  return user?.user.permissions[permission];
};

export const updateUserPermissions = async (user, permissions) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
