import userStore from "../../strore/user-store";
import { DeleteUserById } from "../../uses-cases/delete-user-by-id";
import { showModal } from "../render-modal/render-modal";
import "./render-table.css";

let table;

const createTabel = () => {
    const table = document.createElement('table');
    const tablesHeaders = document.createElement('thead');
    tablesHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;

    // Cargar registros
    const tableBody = document.createElement('tbody');
    table.append(tablesHeaders, tableBody)
    return table;
}

/**
 * 
 * @param {MouseEvent} event 
 */
const tableSelectListener = (event) => {
    const element = event.target.closest('.select-user');
    if (!element) return;
    //console.log(element)

    const id = element.getAttribute('data-id');
    showModal(id);
}


/**
 * 
 * @param {MouseEvent} event 
 */
const tableDeleteListener = async (event) => {
    const element = event.target.closest('.delete-user');
    if (!element) return;
    //console.log(element)

    const id = element.getAttribute('data-id');
    try {
        await DeleteUserById(id);
        await userStore.reloadPage();
        document.querySelector('#current-page').innerText = userStore.getCurrentPage();
        renderTable()
    } catch (error) {
        console.log(error)
        alert('No se pudo eliminar');
    }
}


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = (element) => {

    const users = userStore.getUsers();

    //Validar si la tabla existe
    if (!table) {
        table = createTabel();
        //insertar la tabla en el elemento
        element.append(table);

        //TODO: Listeners to the table
        table.addEventListener('click', tableSelectListener);
        table.addEventListener('click', tableDeleteListener);
    }

    let tableHTML = '';
    users.forEach(user => {
        tableHTML += `
        <tr>
            <td>${user.id}</td>
            <td>${user.balance}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.isActive}</td>
            <td>
                <a href="#/" class="select-user" data-id=${user.id} >Select</a>
                |
                <a href="#/" class="delete-user" data-id=${user.id} >Delete</a>
            </td>
        </tr>

        `
    });

    table.querySelector('tbody').innerHTML = tableHTML;

}