import {useAuthContext} from "../../contexts/AuthContext";
import {validateUserPermissions} from "../../utils/validateUserPermissions";

type useCanParams = {
    permissions?: string[];
    roles?: string[];
};

export const useCan = ({permissions, roles}: useCanParams) => {
    const {user, isAuthenticated} = useAuthContext()

    if (!isAuthenticated) {
        return false;
    }

    const userHasValidPermissions = validateUserPermissions({
        user,
        permissions,
        roles
    })

    return userHasValidPermissions;
};
