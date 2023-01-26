import userStore from "../../strore/user-store";
import { renderTable } from "../render-table/render-table";
import './render-button.css'


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = (element) => {
    const nextButton = document.createElement('button');
    nextButton.innerText = `Next >`;

    const prevButton = document.createElement('button');
    prevButton.innerText = `< Prev`;

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page'
    currentPageLabel.innerText = userStore.getCurrentPage();

    element.append(prevButton, currentPageLabel, nextButton);

    nextButton.addEventListener('click', async () => {
        await userStore.loadNextPage();
        currentPageLabel.innerText = userStore.getCurrentPage();
        renderTable(element);
    });

    prevButton.addEventListener('click', async () => {
        await userStore.loadPreviousPage();
        currentPageLabel.innerText = userStore.getCurrentPage();
        renderTable(element);
    });
}



