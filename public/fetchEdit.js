let authorEdit = document.querySelector("#author-edit")
let descriptionEdit = document.querySelector("#description-edit")
let nameEdit = document.querySelector("#name-edit")

export default function fetchEdit(id) {
    fetch('http://localhost:3000/api/events/' + id, {
            method: "PATCH",
            body: JSON.stringify({
                "name": nameEdit.value,
                "description": descriptionEdit.value,
                "author": authorEdit.value,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

        })
}