let author = document.querySelector("#author")
let naame = document.querySelector("#name")
let description = document.querySelector("#description")
let firstDate = document.querySelector("#first-date")
let secondDate = document.querySelector("#second-date")
let thirdDate = document.querySelector("#third-date")
let fourthDate = document.querySelector("#fourth-date")


export default function fetchPostEvent() {
    fetch('http://localhost:3000/api/events', {
            method: "POST",
            body: JSON.stringify({
                "name": naame.value,
                "description": description.value,
                "author": author.value,
                "dates": [firstDate.value, secondDate.value, thirdDate.value, fourthDate.value],

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