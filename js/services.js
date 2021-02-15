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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timesTampsLnSnapshots: true })
var services = db.collection('Services').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderservices(doc)
    })
})

document.getElementById("selectcity").onchange = () => {
    if (document.getElementById("selectcity").value == "All") {
        db.collection('Services').get().then((snapshot) => {
            document.querySelector("#services-container").innerHTML = "";
            snapshot.docs.forEach(doc => {
                renderservices(doc)
            })
        })
    }
    else {
        db.collection('Services').where("City", "==", document.getElementById("selectcity").value).get().then((snapshot) => {
            document.querySelector("#services-container").innerHTML = "";
            snapshot.docs.forEach(doc => {
                renderservices(doc)
            })
        })

    }
};

function renderservices(doc) {
    var ourcontainer = document.querySelector("#services-container");
    let card = document.createElement('div');
    let img = document.createElement('img');
    let cardbody = document.createElement('div')
    let cardname = document.createElement('h5')
    let cardtext = document.createElement('p')
    let carddiv = document.createElement('div')
    let Landarea = document.createElement('p')
    let budget = document.createElement('p')
    let city = document.createElement('p')
    let numberoffloors = document.createElement('p')

    card.classList.add('card');
    card.classList.add('myservices');
    //card.classList.add('h-100');
    card.classList.add('w-100');
    img.classList.add('card-img-top');
    img.classList.add('card-images');
    cardbody.classList.add('card-body');
    cardname.classList.add('card-title');
    cardtext.classList.add('card-text');
    carddiv.classList.add('col-4');
    carddiv.classList.add('mb-4');

    Landarea.innerHTML = `Landarea : ${doc.data().Landarea}`;
    budget.innerHTML = `Budget : ${doc.data().budget}`;
    city.innerHTML = `City : ${doc.data().City}`;
    numberoffloors.innerHTML = `floors No. : ${doc.data().NumberRole}`;
    img.src = doc.data().servicesImage;
    cardname.innerHTML = doc.data().Name;
    cardtext.innerHTML = doc.data().description;
    cardbody.appendChild(cardname)
    cardbody.appendChild(cardtext)
    cardbody.appendChild(Landarea)
    cardbody.appendChild(budget)
    cardbody.appendChild(numberoffloors)
    cardbody.appendChild(city)
    card.appendChild(img)
    card.appendChild(cardbody)
    carddiv.appendChild(card);
    ourcontainer.appendChild(carddiv);
}