var tBody = document.getElementById('table-body');

db.collection("Contact-messages").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
       // console.log(`${doc.id} => ${doc.data().email}`);
       var tr = document.createElement('tr');

       var id = document.createElement('th');
        id.setAttribute('scope','row');
        id.innerHTML = doc.id;
        tr.appendChild(id);

       var fName = document.createElement('td');
            fName.setAttribute('scope','col');
            fName.innerHTML = doc.data().first_name;
            tr.appendChild(fName);

       var lName = document.createElement('td');
            lName.setAttribute('scope','col');
            lName.innerHTML = doc.data().last_name;
            tr.appendChild(lName);

       var phone = document.createElement('td');
            phone.setAttribute('scope','col');
            phone.innerHTML = doc.data().phone;
            tr.appendChild(phone);

       var email = document.createElement('td');
            email.setAttribute('scope','col');
            email.innerHTML = doc.data().email;
            tr.appendChild(email);

       var message = document.createElement('td');
            message.setAttribute('scope','col');
            message.innerHTML = doc.data().message;
            tr.appendChild(message);

        var time = document.createElement('td');
            time.setAttribute('scope','col');
            time.innerHTML = (new Date(doc.data().time)).toLocaleString();
            tr.appendChild(time);

        tBody.appendChild(tr);
        
    });
});