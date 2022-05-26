let main = document.querySelector('main')

export default function displayAllEvents(data) {
    for (let i = 0; i < data.length; i++) {
        //display author,name and description
        let sectionOfEvent = document.createElement('section')
        main.appendChild(sectionOfEvent)

        sectionOfEvent.id = data[i].id
        sectionOfEvent.className = "section"

        let h2 = document.createElement('h2')
        h2.innerText = data[i].author
        sectionOfEvent.appendChild(h2)

        let h3 = document.createElement('h3')
        sectionOfEvent.appendChild(h3)
        h3.innerText = data[i].name

        let p = document.createElement('p')
        sectionOfEvent.appendChild(p)
        p.innerText = data[i].description

        //create delete button

        let dellete = document.createElement('button')
        sectionOfEvent.appendChild(dellete)
        dellete.innerText = "delete"
        dellete.className = "delete"
        //create edit button

        let edit = document.createElement('button')
        sectionOfEvent.appendChild(edit)
        edit.innerText = "edit"
        edit.className = "edit"

        //table
        let table = document.createElement('table')
        sectionOfEvent.appendChild(table)
        let trDate = document.createElement('tr')
        table.appendChild(trDate)
        let thname = document.createElement('th')
        trDate.appendChild(thname)
        thname.innerText = ""
        // display dates

        let dates = data[i].dates
        for (let j = 0; j < dates.length; j++) {
            let thDate = document.createElement('th')
            trDate.appendChild(thDate)
            thDate.className = "th-date"
            thDate.innerText = dates[j].date
        }
        //display attendees
        for (let n = 0; n < data[i].dates[0].attendees.length; n++) {
            let trMember = document.createElement('tr')
            table.appendChild(trMember)
            let thMember = document.createElement('th')
            trMember.appendChild(thMember)
            thMember.innerText = data[i].dates[0].attendees[n].name
            // display attendees avaibalities
            for (let m = 0; m < data[i].dates.length; m++) {
                let tdD = document.createElement('td')
                trMember.appendChild(tdD)

                if (data[i].dates[m].attendees[n].available === true) {
                    tdD.style.backgroundColor = "green"
                    tdD.innerText = "dispo"
                }
                if (data[i].dates[m].attendees[n].available === false) {
                    tdD.style.backgroundColor = "red"
                    tdD.innerText = "pas dispo"
                }
                if (data[i].dates[m].attendees[n].available === null) {
                    tdD.style.backgroundColor = "grey"
                    tdD.innerText = "je ne sais pas"
                }
            }

        }

        //create add attendes button
        let addButton = document.createElement('button')
        sectionOfEvent.appendChild(addButton)
        addButton.innerText = "add-Attendees"
        addButton.className = "add-Attendees"
        let newtr
        //add attendees button eventlistner
        addButton.addEventListener('click', () => {
            //create new tr
            newtr = document.createElement('tr')
            table.appendChild(newtr)
            let newth = document.createElement('th')
            newtr.appendChild(newth)
            let MemberInput = document.createElement('input')

            let addMember = document.createElement('button')
            addMember.innerText = "add"
            newth.appendChild(addMember)
            newth.appendChild(MemberInput)
            MemberInput.placeholder = "Name"

            for (let x = 0; x < data[i].dates.length; x++) {

                let buttonTd = document.createElement("td")
                newtr.appendChild(buttonTd)
                let select = document.createElement('select')
                select.name = data[i].dates[x].date
                select.id = data[i].id
                buttonTd.appendChild(select)

                let option2 = document.createElement('option')
                let option3 = document.createElement('option')

                option2.text = "false"
                option2.value = "false"

                option3.text = "true"
                option3.value = "true"

                select.appendChild(option3)
                select.appendChild(option2)

            }

            function fetchPostMember() {
                const Allselect = newtr.querySelectorAll("select")
                let id
                let dates = [];
                for (const select of Allselect) {
                    const result = select
                    console.log(result);
                    const date = select.name
                    id = select.id
                    console.log(id);
                    console.log(date);
                    let value
                    if (select.value === "true") {
                        value = true
                    } else if (select.value === "false") {
                        value = false
                    }

                    let newobj = {
                        date: date,
                        available: value
                    }

                    dates.push(newobj)

                }

                let attendName = newth.querySelector('input')

                fetch('http://localhost:3000/api/events/' + id + '/attend', {
                        method: "POST",

                        body: JSON.stringify({
                            "name": attendName.value,
                            "dates": dates

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

            addMember.addEventListener('click', () => {
                fetchPostMember()
                location.reload()

            })



        })


    }
}