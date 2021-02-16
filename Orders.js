// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAdG9L5kfRQiDtRutsbQHzha0WDGk5F6ho",
    authDomain: "web-firebase-e8885.firebaseapp.com",
    databaseURL: "https://web-firebase-e8885-default-rtdb.firebaseio.com",
    projectId: "web-firebase-e8885",
    storageBucket: "web-firebase-e8885.appspot.com",
    messagingSenderId: "858767393250",
    appId: "1:858767393250:web:97183ae83838c4254579bb",
    measurementId: "G-4FJSL32GKT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timesTampsLnSnapshots: true })




var select = document.forms[0].select;
var hello = select.options[select.selectedIndex].text;
var budget = parseInt(document.getElementById('exampleFormControlSelect1').value) * parseInt(document.getElementById('numoffloors').value) + (parseInt(document.getElementById('area').value) / 2)
document.getElementById('budget').innerHTML = budget;

document.getElementById('exampleFormControlSelect1').onchange = () => {
    var budget = parseInt(document.getElementById('exampleFormControlSelect1').value) * parseInt(document.getElementById('numoffloors').value) + (parseInt(document.getElementById('area').value) / 2)
    document.getElementById('budget').innerHTML = budget;
};
document.getElementById('numoffloors').onchange = () => {
    var budget = parseInt(document.getElementById('exampleFormControlSelect1').value) * parseInt(document.getElementById('numoffloors').value) + (parseInt(document.getElementById('area').value) / 2)
    document.getElementById('budget').innerHTML = budget;
}
document.getElementById('area').onchange = () => {
    var budget = parseInt(document.getElementById('exampleFormControlSelect1').value) * parseInt(document.getElementById('numoffloors').value) + (parseInt(document.getElementById('area').value) / 2)
    document.getElementById('budget').innerHTML = budget;
}


const form = document.querySelector("#orders_form");


form.addEventListener('submit', function (evt) {
    var counter = 0;
    var email = /^\S+(@)\S+(.com)$/;

    if (document.getElementById('location').value === "") {
        evt.preventDefault();
        document.getElementById('location').classList.add('is-invalid');
        counter++;
    }
    else {
        document.getElementById('location').classList.replace('is-invalid', 'is-valid');
    }
    if (document.getElementById('Date').value === "") {
        evt.preventDefault();
        document.getElementById('Date').classList.add('is-invalid');
        counter++;
    }
    else {
        document.getElementById('Date').classList.replace('is-invalid', 'is-valid');

    }
    if (document.getElementById('exampleInputEmail1').value === "" || !email.test(document.getElementById('exampleInputEmail1').value)) {
        evt.preventDefault();
        document.getElementById('exampleInputEmail1').classList.add('is-invalid');
        counter++;

    } else {
        document.getElementById('exampleInputEmail1').classList.replace('is-invalid', 'is-valid');
    }


    if (document.getElementById('numoffloors').value === "") {
        evt.preventDefault();
        document.getElementById('numoffloors').classList.add('is-invalid');
        counter++;

    }
    else {
        document.getElementById('numoffloors').classList.replace('is-invalid', 'is-valid');
    }
    if (document.getElementById('area').value === "") {
        evt.preventDefault();
        document.getElementById('area').classList.add('is-invalid');
        counter++;

    }
    else {
        document.getElementById('area').classList.replace('is-invalid', 'is-valid');

    }
    console.log(counter);
    if (counter == 0) {
        evt.preventDefault();
        db.collection('Orders').add({
            email: form.email.value,
            typeofbuilding: form.select.options[form.select.selectedIndex].text,
            numoffloors: form.floors.value,
            area: form.area.value,
            location: form.location.value,
            date: form.date.value,
            budget: parseInt(document.querySelector("#budget").innerHTML),
            stateOrder:false
        })
        alert('Data Successfully Sent to Realtime Database');
        form.reset();
        document.getElementById('budget').innerHTML = 300;
    }

});