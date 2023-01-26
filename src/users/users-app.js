
import { renderAddButton } from "./presentacion/render-add-button/render-add-button";
import { renderButtons } from "./presentacion/render-buttons/render-button";
import { renderModal } from "./presentacion/render-modal/render-modal";
import { renderTable } from "./presentacion/render-table/render-table";
import usersStore from "./strore/user-store";
import { saveUser } from "./uses-cases/save-user";

/**
 * 
 * @param {HTMLDivElement} element 
 */

export const UserApp = async (element) => {
    element.innerHTML = 'Loading...';
    await usersStore.loadNextPage();
    element.innerHTML = ''

    renderTable(element);
    renderButtons(element);
    renderAddButton(element);
    renderModal(element, async (userLike) => {
        const user = await saveUser(userLike);
        usersStore.oneUsersChange(user);
        renderTable();
    });

}
