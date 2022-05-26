let addEventOverlay = document.querySelector('.add-event-overlay')
let editOverlay = document.querySelector('.edit-overlay')

let editButton = document.querySelector('.edit-button')
let authorEdit = document.querySelector("#author-edit")
let descriptionEdit = document.querySelector("#description-edit")
let nameEdit = document.querySelector("#name-edit")


import fetchPostEvent from "./fetchPostEvent"
import displayAllEvents from "./displayAllEvents"

import fetchDeleteEvent from "./fetchDeleteEvent"
import fetchEdit from "./fetchEdit"

function fetchApi() {
    fetch('http://localhost:3000/api/events', {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {

            displayAllEvents(data)
        })
}
fetchApi()

document.querySelector('.add-event-button').addEventListener('click', () => {
    addEventOverlay.style.display = "flex"

})

document.addEventListener('keyup', (e) => {
    if (e.key === "Escape") {
        addEventOverlay.style.display = "none"
        editOverlay.style.display = "none"

    }
})
document.querySelector('.add').addEventListener('click', () => {
    addEventOverlay.style.display = 'none'
    fetchPostEvent()
    location.reload()
})

//delete
document.addEventListener('click', function (e) {
    if (e.target && e.target.className == 'delete') {
        fetchDeleteEvent(e.target.parentElement.id)
        location.reload()

    }
});
//edit
document.addEventListener('click', function (e) {
    if (e.target && e.target.className == 'edit') {
        editOverlay.style.display = 'flex'
        nameEdit.value = e.target.parentElement.children[1].innerText
        descriptionEdit.value = e.target.parentElement.children[2].innerText
        authorEdit.value = e.target.parentElement.children[0].innerText

        document.querySelector('.p').innerHTML = e.target.parentElement.id

    }
});


editButton.addEventListener('click', (e) => {
    editOverlay.style.display = 'none'
    fetchEdit(e.target.parentElement.children[2].innerText);
    location.reload()
})