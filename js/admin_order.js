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


// delte item--------
  cross.addEventListener('click',(e)=>{
   
    let id=e.target.parentElement.getAttribute('id');
    db.collection('Orders').doc(id).delete();

  });


   //make button Enable

    if(doc.data().stateOrder==true)
     {

      conform_message.style.display='none';
      
      
    

     }
  

   
     console.log(li);

  // confirmmessage 
  conform_message.addEventListener('click',(e)=>{

          
    let id=e.target.parentElement.getAttribute('id');
    let li = cafelist.querySelector('[id=' + id + ']');
    var t=li.childNodes[0].innerText;
  
    console.log(li);

   db.collection('ConfirmMessage').add({
        TypeBuliding:li.childNodes[0].innerText,
        Email:li.childNodes[1].innerText,
        orderData:li.childNodes[4].innerText,
        message:"the order confirmed the company will contct you soon"
 
      });  

      alert("confirm sucess")
      db.collection('Orders').doc(id).update({
        stateOrder:true
      
          
        });



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
        

        else if (change.type == 'modified'){
          console.log("Modified city: ", change.doc.data());
          let li = cafelist.querySelector('[id=' + change.doc.id + ']');
          var ch=change.doc;
     
          li.childNodes[7].style.display='none';
      }
      
      
      

      });


   });
     

 