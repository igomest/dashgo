type User = {
  isAdmin: boolean
}

type validateUserPermissionsParams = {
  user: User
  isAdmin: boolean
}

export const validateUserPermissions = ({
  user,
  isAdmin
}: validateUserPermissionsParams) => {
  if (user.isAdmin) {
    return isAdmin
  } else {
    return false
  }
}
