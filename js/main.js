var form = document.getElementById('contact-form');
var submit = document.getElementById('submit_form');
var email_format = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.(?:[a-zA-Z0-9-]+)+$/ ;
var fName;
var lName; 
var email; 
var phone;
var msg;
var modalHeader = document.getElementById('modalHeader');
var modalBody = document.getElementById('modalBody');
var showmodal = document.getElementById('showModal');


submit.onclick = function(e){
    e.preventDefault();
     fName = document.getElementById('FName');
     lName = document.getElementById('LName');
     email = document.getElementById('email');
     phone = document.getElementById('phone');
     msg = document.getElementById('msg');
    var fname_error = false;
    var lname_error = false;
    var phone_error = false;
    var email_error = false;
    var msg_error = false;
    

    if(fName.value.length < 3 ){
        fName.classList.add('is-invalid');
        document.getElementById('FName_err').innerHTML = 'name must be at least 3 characters';
        fname_error = true
    }else{
        fName.classList.remove('is-invalid');
        document.getElementById('FName_err').innerHTML = '';
    }

    if(lName.value.length < 3 ){
        lName.classList.add('is-invalid');
        document.getElementById('LName_err').innerHTML = 'name must be at least 3 characters';
        lname_error = true;
    }else{
        lName.classList.remove('is-invalid');
        document.getElementById('LName_err').innerHTML = '';
    }



    if( !email_format.test(email.value)){
        email.classList.add('is-invalid');
        document.getElementById('email_err').innerHTML = 'email must be valid';
        email_error = true;
    }else{
        email.classList.remove('is-invalid');
        document.getElementById('email_err').innerHTML = ''; 
    }

    if(phone.value.length < 11 ){
        phone.classList.add('is-invalid');
        document.getElementById('phone_err').innerHTML = 'phone must be at least 11 characters';
        phone_error = true;
    }else{
        phone.classList.remove('is-invalid');
        document.getElementById('phone_err').innerHTML = '';
    }

    if(msg.value.length < 5 ){
        msg.classList.add('is-invalid');
        document.getElementById('msg_err').innerHTML = 'message must be at least 5 characters';
        msg_error = true;
    }else{
        msg.classList.remove('is-invalid');
        document.getElementById('msg_err').innerHTML = '';
    }

    if(!fname_error && !lname_error && !email_error && !phone_error && !msg_error){
        submitDataTofirebase(); 
   }
}

function validate(item,num){
    item.style.border = '3px solid red';

    if(item.value.length >= num && item.id !== 'email'){
        item.style.border = 'none';
    }

    if(item.id == 'email'){
        if( email_format.test(item.value)){
            item.style.border = 'none';
        }
    }
}

function submitDataTofirebase(){
    db.collection("Contact-messages").add({
        first_name : fName.value,
        last_name  : lName.value,
        phone      : phone.value,
        email      : email.value,
        message    : msg.value,
        time       : Date.now()
    })
    .then((docRef) => {
        modalHeader.innerHTML = 'Message sent';
        modalBody.innerHTML = 'Thank you we will look it up';
        showmodal.click();
    })
    .catch((error) => {
        modalHeader.innerHTML = 'Error';
        modalBody.innerHTML = 'Something went wrong please Send it again';
        showmodal.click();
    });
}

