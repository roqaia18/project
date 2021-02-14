const cafelist=document.querySelector('#cafe-list');
const form=document.querySelector('#add-cafe-form');

function getrend(doc)
{

let li=document.createElement('li');
let name=document.createElement('span');
let jobtitle=document.createElement('span');
let Adress=document.createElement('span');
let NationalId=document.createElement('span');
let projectName=document.createElement('span');

let Salary=document.createElement('span');

let cross=document.createElement('div');
let cross_update=document.createElement('p');




li.setAttribute('id',doc.id);
name.textContent='Name : ' +doc.data().Name;
jobtitle.textContent='jobtitle : '+doc.data().jobtitle;
Adress.textContent='Adress : '+doc.data().Adress;
NationalId.textContent='NationalId : '+doc.data().NationalId;
projectName.textContent='projectName : '+doc.data().projectName;
Salary.textContent='Salary : '+doc.data().Salary;

cross.textContent='X';
cross_update.textContent='!';
li.appendChild(name);
li.appendChild(jobtitle);
li.appendChild(Adress);
li.appendChild(NationalId);
li.appendChild(projectName);
li.appendChild(Salary);

li.appendChild(cross);
li.appendChild(cross_update);

cafelist.appendChild(li);


// delte item

  cross.addEventListener('click',(e)=>{
   
    let id=e.target.parentElement.getAttribute('id');
    db.collection('Employee').doc(id).delete();




  });

 




// update data

cross_update.addEventListener('click',(e)=>{
    let id=e.target.parentElement.getAttribute('id');
    var t=document.getElementById(id).childNodes;
    
    console.log(t[4].innerText);
   
    form.Name.value=t[0].innerText;
    form.jobtitle.value=t[1].innerText;
    form.Adress.value=t[2].innerText;
    form.NationalId.value=t[3].innerText;
    form.projectName.value=t[4].innerText;
    form.Salary.value=t[5].innerText;
  

    cross_update.style.display='none';
    let update_btn=document.createElement('p');
    update_btn.textContent='!!'
    li.appendChild(update_btn);

    cafelist.appendChild(li);

    /* update button*/ 

    update_btn.addEventListener('click',(e)=>{

     

        db.collection('Employee').doc(id).update({

          Name:document.forms[0].elements[0].value,
          jobtitle:form.jobtitle.value,
          Adress:form.Adress.value,
          NationalId:form.NationalId.value,
          projectName:form.projectName.value,
          Salary:form.Salary.value,            
            
          });

          update_btn.style.display='none'; 
          cross_update.style.display='inline';
          form.Name.value='';
          form.jobtitle.value='';
          form.Adress.value='';
          form.NationalId.value='';
          form.projectName.value='';
          form. Salary.value='';
        

    });

  

 




  });

}
    // save data

    form.addEventListener('submit',(e)=>{

         e.preventDefault();
         db.collection('Employee').add({

            Name:document.forms[0].elements[0].value,
            jobtitle:form.jobtitle.value,
            Adress:form.Adress.value,
            NationalId:form.NationalId.value,
            projectName:form.projectName.value,
            Salary:form.Salary.value,
      
         });

         form.Name.value='';
         form.jobtitle.value='';
         form.Adress.value='';
         form.NationalId.value='';
         form.projectName.value='';
         form. Salary.value='';
       



    });



  // real -time-lisner


   db.collection('Employee').orderBy('NationalId').onSnapshot((snapshot)=>{

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

  
        else if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
            let li = cafelist.querySelector('[id=' + change.doc.id + ']');
            var ch=change.doc;
       
            li.childNodes[0].textContent='Name :' +ch.data().Name;
            li.childNodes[1].textContent='jobtitle  : ' +ch.data().jobtitle;
            li.childNodes[2].textContent='Adress :' +ch.data().Adress;
            li.childNodes[3].textContent='NationalId :' +ch.data().NationalId;
            li.childNodes[4].textContent='projectName :' +ch.data().projectName;
            li.childNodes[5].textContent='Salary :' +ch.data().Salary;
           

        }
      

      });


   });
     

 