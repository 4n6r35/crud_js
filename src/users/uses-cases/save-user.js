import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { userModelToLocalhost } from "../mappers/user-to-localhost.mapper";
import { USER } from "../models/user";


/**
 * @param {Like{USER}} userLike
 */

export const saveUser = async (userLike) => {

    const user = new USER(userLike);
    if (!user.firstName || !user.lastName)
        throw 'First & last name are required';

    const userToSave = userModelToLocalhost(user);
    let userUpdated;
    //TODO: falta mapper
    if (user.id) {
        userUpdated = await updateUser(userToSave);
    } else {
        userUpdated = await createUser(userToSave);
    }

    return localhostUserToModel(userUpdated)
}


/**
 * @param {Like<USER>} user 
 */

const createUser = async (user) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const newUser = await res.json();
    console.log({ newUser });
    return newUser;
}

/**
 * @param {Like<USER>} user 
 */

const updateUser = async (user) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updateUser = await res.json();
    console.log({ updateUser });

    return updateUser;
}


