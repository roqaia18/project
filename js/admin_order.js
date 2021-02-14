const cafelist=document.querySelector('#cafe-list');
const form=document.querySelector('#add-cafe-form');

function getrend(doc)
{

let li=document.createElement('li');
let typeofbuilding=document.createElement('span');
let email=document.createElement('span');
let location=document.createElement('span');
let numoffloors=document.createElement('span');
let date=document.createElement('span');

let area=document.createElement('span');

let cross=document.createElement('div');


// create button confirm 

let conform_message=document.createElement('Button');




li.setAttribute('id',doc.id);
typeofbuilding.textContent='typeofbuilding : ' +doc.data().typeofbuilding;
email.textContent='email : '+doc.data().email;
location.textContent='location : '+doc.data().location;
numoffloors.textContent='numoffloors : '+doc.data().numoffloors;
date.textContent='date : '+doc.data().date;
area.textContent='area : '+doc.data().area;

cross.textContent='X';

conform_message.innerText="Confirm"
conform_message.style.width="120px"
conform_message.style.height="50px"
li.appendChild(typeofbuilding);
li.appendChild(email);
li.appendChild(location);
li.appendChild(numoffloors);
li.appendChild(date);
li.appendChild(area);

li.appendChild(cross);

li.appendChild(conform_message);

cafelist.appendChild(li);


// delte item

  cross.addEventListener('click',(e)=>{
   
    let id=e.target.parentElement.getAttribute('id');
    db.collection('Orders').doc(id).delete();




  });

 
}

  // real -time-lisner


   db.collection('Orders').orderBy('area').onSnapshot((snapshot)=>{

     let changes=snapshot.docChanges();

      changes.forEach((change)=>{
           
        if(change.type=='added')
        {
            getrend(change.doc);

        }
        else if (change.type == 'removed'){
            let li = cafelist.querySelector('[id=' + change.doc.id + ']');
            cafelist.removeChild(li);
        }

  
      
      

      });


   });
     

 