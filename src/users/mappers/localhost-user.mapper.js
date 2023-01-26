import { USER } from "../models/user";
/**
 * 
 * @param {Like<USER>} localhostUser 
 * @returns {USER} 
 */
export const localhostUserToModel = (localhostUser) => {

    const {
        avatar,
        balance,
        first_name, 
        gender,
        id,
        isActive,
        last_name,
    } = localhostUser;

    return new USER({
        avatar,
        balance,
        firstName: first_name,
        gender,
        id,
        isActive,
        lastName: last_name,
    });
}
