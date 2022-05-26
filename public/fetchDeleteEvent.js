export default function fetchDeleteEvent(id) {
    fetch('http://localhost:3000/api/events/' + id, {
            method: "delete",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);


        })
}