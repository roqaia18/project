const cafelist = document.querySelector('#cafe-list');


function getrend(doc) {

    let li = document.createElement('li');
    let Name = document.createElement('span');
    let email = document.createElement('span');
    let message = document.createElement('span');
    let phone = document.createElement('span');




    let cross = document.createElement('div');


    // create button confirm 





    li.setAttribute('id', doc.id);
    Name.textContent = 'Name : ' + doc.data().first_name + '' +doc.data().last_name ;
    email.textContent = 'email : ' + doc.data().email;
    message.textContent = 'message : ' + doc.data().message;
    phone.textContent = 'phone : ' + doc.data().phone;
   
    cross.textContent = 'X';

 
    li.appendChild(Name);
    li.appendChild(email);
    li.appendChild(message);
    li.appendChild(phone);


    li.appendChild(cross);

  

    cafelist.appendChild(li);


    // delte item

    cross.addEventListener('click', (e) => {

        let id = e.target.parentElement.getAttribute('id');
        db.collection('Contact-messages').doc(id).delete();




    });


}

// real -time-lisner


db.collection('Contact-messages').orderBy('phone').onSnapshot((snapshot) => {

    let changes = snapshot.docChanges();

    changes.forEach((change) => {

        if (change.type == 'added') {
            getrend(change.doc);

        }
        else if (change.type == 'removed') {
            let li = cafelist.querySelector('[id=' + change.doc.id + ']');
            cafelist.removeChild(li);
        }





    });


});


