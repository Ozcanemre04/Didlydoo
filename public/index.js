
let main =document.querySelector('main')
let addEventOverlay=document.querySelector('.add-event-overlay')
let editOverlay=document.querySelector('.edit-overlay')
let author = document.querySelector("#author")
let naame = document.querySelector("#name")
let description = document.querySelector("#description")
let firstDate = document.querySelector("#first-date")
let secondDate = document.querySelector("#second-date")
let thirdDate = document.querySelector("#third-date")
let fourthDate = document.querySelector("#fourth-date")
let editButton=document.querySelector('.edit-button')
let authorEdit=document.querySelector("#author-edit")
let descriptionEdit=document.querySelector("#description-edit")
let nameEdit=document.querySelector("#name-edit")



function fetchApi(){
    fetch('http://localhost:3000/api/events',{
        method:"GET"
    })
    .then(res=>res.json())
    .then(data=>{
     
        findData(data)
    })
}
fetchApi()





function findData(data){
    
    for(let i =0;i<data.length;i++){
        let sectionOfEvent=document.createElement('section')
        main.appendChild(sectionOfEvent)

        sectionOfEvent.id=data[i].id
        sectionOfEvent.className="section"
       
        
        let h2=document.createElement('h2')
        h2.innerText=data[i].author
        sectionOfEvent.appendChild(h2)
     
        
        let h3=document.createElement('h3')
        sectionOfEvent.appendChild(h3)
        h3.innerText=data[i].name
        
        
        let p =document.createElement('p')
        sectionOfEvent.appendChild(p)
        p.innerText=data[i].description
        //table
        let table=document.createElement('table')
        sectionOfEvent.appendChild(table)
        let trDate=document.createElement('tr')
        table.appendChild(trDate)
        let thname=document.createElement('th')
        trDate.appendChild(thname)
        thname.innerText=""
        
        let dates=data[i].dates
        for(let j=0;j<dates.length;j++){
            let thDate=document.createElement('th')
            trDate.appendChild(thDate)
            thDate.className="th-date"
            thDate.innerText=dates[j].date
            
            
            }
        
        for(let n=0;n<data[i].dates[0].attendees.length;n++){
            
            let trMember =document.createElement('tr')
            table.appendChild(trMember)

            let thMember=document.createElement('th')
            trMember.appendChild(thMember)

             thMember.innerText=data[i].dates[0].attendees[n].name
           
            
             for (let m=0;m<data[i].dates.length;m++){
                let tdD=document.createElement('td')
                trMember.appendChild(tdD)

                

                if(data[i].dates[m].attendees[n].available===true){
                    tdD.style.backgroundColor="green"
                    tdD.innerText="dispo"
                }
                if(data[i].dates[m].attendees[n].available===false){
                    tdD.style.backgroundColor="red"
                    tdD.innerText="pas dispo"
                }
                if(data[i].dates[m].attendees[n].available===null){
                    tdD.style.backgroundColor="grey"
                    tdD.innerText="je ne sais pas"
                }
            }

        }
       



        let dellete=document.createElement('button')
        sectionOfEvent.appendChild(dellete)
        dellete.innerText="delete"
        dellete.className="delete"

        let edit=document.createElement('button')
        sectionOfEvent.appendChild(edit)
        edit.innerText="edit"
        edit.className="edit"

        let addButton=document.createElement('button')
        sectionOfEvent.appendChild(addButton)
        addButton.innerText="add-Attendees"
        addButton.className="add-Attendees"


        addButton.addEventListener('click',()=>{
            let newtr=document.createElement('tr')
            table.appendChild(newtr)
            let newth=document.createElement('th')
            newtr.appendChild(newth)
            let MemberInput=document.createElement('input')
            let addMember=document.createElement('button')
            addMember.innerText="add"
            newth.appendChild(addMember)
            newth.appendChild(MemberInput)
            MemberInput.placeholder="Name"
              for(let x=0;x<data[i].dates.length;x++){

                  let buttonTd=document.createElement("td")
                  newtr.appendChild(buttonTd)
                  let select=document.createElement('select')
                  
                  buttonTd.appendChild(select)
                 
                  let option1=document.createElement('option')
                  let option2=document.createElement('option')
                  let option3=document.createElement('option')
                  option1.text="null"
                  option1.value="null"

                  option2.text="false"
                  option2.value="false"


                 
                  
                  option3.text="true"
                  option3.value="true"
                  select.appendChild(option1)
                  select.appendChild(option3)
                  select.appendChild(option2)
                console.log(new Boolean(select.value));
                
                 

                    function fetchPostMember(id){
                       

                        fetch('http://localhost:3000/api/events/'+id+'/attend',{
                            method:"POST",
                            body:JSON.stringify({
                                "name":MemberInput.value,
                               "dates":[{"date":data[i].dates[x].date,
                               "available":new Boolean(select.value),
                            
                            }]
                            

                                
                    
                            }),
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            }
                        })
                        .then(res=>res.json())
                        .then(data=>{
                         console.log(data);
                            
                        })
                    }

                 

                  addMember.addEventListener('click',(e)=>{
                      
                          
                          fetchPostMember(e.target.parentElement.parentElement.parentElement.parentElement.id)
                      
                  })



              }
        })

     
}}







document.querySelector('.add-event-button').addEventListener('click',()=>{
    addEventOverlay.style.display="flex"

})

document.addEventListener('keyup',(e)=>{
if(e.key==="Escape"){
    addEventOverlay.style.display="none"
    editOverlay.style.display="none"
    
}
})
document.querySelector('.add').addEventListener('click',()=>{
    addEventOverlay.style.display='none'
  fetchPost()
})

function fetchPost(){
    fetch('http://localhost:3000/api/events',{
        method:"POST",
        body:JSON.stringify({
            "name":naame.value,
            "description":description.value,
            "author":author.value,
            "dates":[firstDate.value,secondDate.value,thirdDate.value,fourthDate.value],

        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res=>res.json())
    .then(data=>{
     console.log(data);
        
    })
}


function fetchDelete(id){
    fetch('http://localhost:3000/api/events/'+ id,{
        method:"delete",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res=>res.json())
    .then(data=>{
     console.log(data);
     
        
    })
}


document.addEventListener('click', function(e){
    if(e.target && e.target.className== 'delete'){
        fetchDelete(e.target.parentElement.id)

     }
     });

     document.addEventListener('click', function(e){
        if(e.target && e.target.className== 'edit'){
            editOverlay.style.display='flex'
            nameEdit.value=e.target.parentElement.children[1].innerText
            descriptionEdit.value=e.target.parentElement.children[2].innerText
            authorEdit.value=e.target.parentElement.children[0].innerText
            
            document.querySelector('.p').innerHTML=e.target.parentElement.id
    
         }
         });


         editButton.addEventListener('click',(e)=>{
            editOverlay.style.display='none'
            fetchEdit(e.target.parentElement.children[2].innerText);
         })


         function fetchEdit(id){
            fetch('http://localhost:3000/api/events/'+id,{
                method:"PATCH",
                body:JSON.stringify({
                    "name":nameEdit.value,
                    "description":descriptionEdit.value,
                    "author":authorEdit.value,
                    
        
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res=>res.json())
            .then(data=>{
             console.log(data);
                
            })
        }