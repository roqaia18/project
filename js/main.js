var form = document.getElementById('contact-form');
var submit = document.getElementById('submit');
var email_format = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.(?:[a-zA-Z0-9-]+)+$/ ;

submit.click = function(e){
    e.preventDefault();
    var fName = document.getElementById('FName');
    var lName = document.getElementById('LName');
    var email = document.getElementById('email');
    var phone = document.getElementById('phone');
    var msg = document.getElementById('msg');
    
    var errors = false ;

    if(fName.value.length < 3 ){
        fName.classList.add('is-invalid');
        document.getElementById('FName_err').innerHTML = 'name must be at least 3 characters';
        errors = true;
    }

    if(lName.value.length < 3 ){
        lName.classList.add('is-invalid');
        document.getElementById('LName_err').innerHTML = 'name must be at least 3 characters';
        errors = true;
    }

    if( !email_format.test(email.value)){
        email.classList.add('is-invalid');
        document.getElementById('email_err').innerHTML = 'email must be valid';
        errors = true;
    }

    if(phone.value.length < 11 ){
        phone.classList.add('is-invalid');
        document.getElementById('phone_err').innerHTML = 'phone must be at least 11 characters';
        errors = true;
    }

    if(msg.value.length < 5 ){
        msg.classList.add('is-invalid');
        document.getElementById('msg_err').innerHTML = 'message must be at least 5 characters';
        errors = true;
    }

    if(!errors){
        form.submit();  
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

