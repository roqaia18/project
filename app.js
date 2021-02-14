const cafelist = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

function getrend(doc) {

  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  let Landareaa = document.createElement('span');
  let duration = document.createElement('span');
  let description = document.createElement('span');

  let NumberRole = document.createElement('span');
  let budget = document.createElement('span');
  let cross = document.createElement('div');



  li.setAttribute('data-id', doc.id);
  name.textContent = 'title : ' + doc.data().Name;
  city.textContent = 'Location : ' + doc.data().City;
  Landareaa.textContent = 'Landareaa : ' + doc.data().Landarea;
  duration.textContent = 'duration ' + doc.data().duration;
  description.textContent = 'description : ' + doc.data().description;
  budget.textContent = 'budget : ' + doc.data().budget;
  NumberRole.textContent = 'NumberRole : ' + doc.data().NumberRole
  cross.textContent = 'X';

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(Landareaa);
  li.appendChild(duration);
  li.appendChild(description);
  li.appendChild(budget);
  li.appendChild(NumberRole);
  li.appendChild(cross);

  cafelist.appendChild(li);


  // delte item

  cross.addEventListener('click', (e) => {

    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('Services').doc(id).delete();



  });



}

















// real -time-lisner


db.collection('Services').orderBy('City').onSnapshot((snapshot) => {

  let changes = snapshot.docChanges();

  changes.forEach((change) => {

    if (change.type == 'added') {
      getrend(change.doc);

    }
    else if (change.type == 'removed') {
      let li = cafelist.querySelector('[data-id=' + change.doc.id + ']');
      cafelist.removeChild(li);
    }




  });


});


// upload Images 
//declare variables
var ImageName = "hassan";
var ImageUrl;
var files = [];
var reader;

document.getElementById('select').onclick = function (e) {


  var input = document.createElement('input');
  input.type = 'file';


  input.onchange = e => {

    files = e.target.files;
    reader = new FileReader();
    console.log(files[0].name)
    ImageName = files[0].name;
    reader.onload = function () {

      // document.getElementById("Imgasrc").value = reader.result;
      //  console.log(reader.result);

      document.getElementById('changebutton').style.backgroundColor = 'green';

      document.getElementById('changebutton').innerHTML = "uploading"


    }

    reader.readAsDataURL(files[0])


  }

  input.click();


};

//upload Images function











form.addEventListener('submit', (e) => {


  e.preventDefault();
  let promise = new Promise(function(resolve, reject) {
 // upload to firebase storage
 var uploadtask = firebase.storage().ref('Images/' + ImageName + ".png").put(files[0])

 uploadtask.on('state_changed', function (snapshot) {


 },

   // error
   function (error) {

     alert('error in saving the image')

   },

   //submit image link to database
   function () {

     uploadtask.snapshot.ref.getDownloadURL().then(function (url) {

       ImageUrl = url

       resolve(1)

       //document.forms[0].elements[7].value=ImageUrl;

     }

     );


   });


    });

    promise.then(function(result) {
    console.log("Testing multiple then calls");

 db.collection('Services').add({

    Name: document.forms[0].elements[0].value,
    City: form.City.value,
    Landarea: form.Landarea.value,
    duration: form.duration.value,
    description: form.description.value,
    budget: form.budget.value,
    NumberRole: form.NumberRole.value,
    servicesImage:ImageUrl
   // servicesImage: document.forms[0].elements[7].value = ImageUrl,

  });

  console.log(ImageUrl);

  form.Name.value = '';
  form.City.value = '';
  form.Landarea.value = '';
  form.duration.value = '';
  form.description.value = '';
  form.budget.value = '';
  form.NumberRole.value = '';
  document.getElementById('changebutton').style.backgroundColor ='#075264';

  document.getElementById('changebutton').innerHTML = "Notuploading"

    
     
    });
 
 



});







