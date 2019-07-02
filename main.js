// your code here, it may be worth it to ensure this file only runs AFTER the dom has loaded.

// fetch('http://localhost:3000/api/v1/calorie_entries')
// .then(res => res.json())
// .then(obj => console.log(obj))

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/api/v1/calorie_entries')
  .then(res => res.json())
  .then(slapAllItems)
})

// -------------------------------------- GRAB ELEMENTS
const caloriesList = document.querySelector("#calories-list");
const newCalorieForm = document.querySelector('#new-calorie-form');
const caloriesInput =  newCalorieForm.querySelector("input");
const notesArea = newCalorieForm.querySelector("textarea");
const addCalorieButton = newCalorieForm.querySelector("button");



// ---------------------------------------EVENT LISTENERS
newCalorieForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchToCreate()
  // fetch()
  // debugger
  console.log(e);
})
// ---------------------------------------FETCH LOGIC

function fetchToCreate() {
  fetch('http://localhost:3000/api/v1/calorie_entries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      api_v1_calorie_entry: {
        'calorie': caloriesInput.value ,
        'note': notesArea.value
      }
    })
  })
  .then(res => res.json())
  .then(addCalorieLi)
}

// --------------------------------SLAP ON DOM
function addCalorieLi(data){
    let newThing = document.createElement("li")
    newThing.innerHTML += `<li dataid=${data.id} class="calories-list-item">
          <div class="uk-grid">
            <div class="uk-width-1-6">
              <strong>${data.calorie}</strong>
              <span>kcal</span>
            </div>
            <div class="uk-width-4-5">
              <em class="uk-text-meta">${data.note}</em>
            </div>
          </div>
          <div class="list-item-menu">
            <a class="edit-button" uk-icon="icon: pencil" uk-toggle="target: #edit-form-container"></a>
            <a class="delete-button" uk-icon="icon: trash"></a>
          </div>
        </li>`
        caloriesList.prepend(newThing)
}

function slapAllItems(items){
  items.reverse()
  items.forEach( data => {
    caloriesList.innerHTML += `<li dataid=${data.id} class="calories-list-item">
          <div class="uk-grid">
            <div class="uk-width-1-6">
              <strong>${data.calorie}</strong>
              <span>kcal</span>
            </div>
            <div class="uk-width-4-5">
              <em class="uk-text-meta">${data.note}</em>
            </div>
          </div>
          <div class="list-item-menu">
            <a class="edit-button" uk-icon="icon: pencil" uk-toggle="target: #edit-form-container"></a>
            <a class="delete-button" uk-icon="icon: trash"></a>
          </div>
        </li>`

  })
}

// <li class="calories-list-item">
//   <div class="uk-grid">
//     <div class="uk-width-1-6">
//       <strong>400</strong>
//       <span>kcal</span>
//     </div>
//     <div class="uk-width-4-5">
//       <em class="uk-text-meta">Lorem ipsum dolores, some other filler text that I cannot rememeber the rest
//         of...</em>
//     </div>
//   </div>
//   <div class="list-item-menu">
//     <a class="edit-button" uk-icon="icon: pencil" uk-toggle="target: #edit-form-container"></a>
//     <a class="delete-button" uk-icon="icon: trash"></a>
//   </div>
// </li>
