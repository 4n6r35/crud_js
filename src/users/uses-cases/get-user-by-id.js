import { localhostUserToModel } from '../mappers/localhost-user.mapper';
import { USER } from '../models/user';

/**
 * 
 * @param {String|Number} page
 * @returns {Promise<USER>}
 */

export const getUsersById = async (id) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    const user = localhostUserToModel(data);

    return user;
}