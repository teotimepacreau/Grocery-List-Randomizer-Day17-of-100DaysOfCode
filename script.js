console.log('connecté !');
//I.METHOD


//DISCOVERING FORMDATA : each input must have a name attribute in order to work
const form = document.querySelector('#add-item');
console.log(form)

const body = document.querySelector('body')

const data = new FormData(form);
console.log(data)

//FIRST THE FORMDATA OBJECT DOES NOT GIVE ANY VALUES IT GIVES ONLY PROTO, TO GET VALUES FROM IT YOU HAVE TO LOOP TRHOUGH IT : because The FormData object is an iterable

//LOOP THROUGH EACH ENTRY OF DATA IN ORDER TO SEE VALUES

for (let entry of data) {
    console.log(entry)
}

//SOLUTION TO GET VALUE : FORMDATA RETURN THE VALUE OF THE FIELDS THAT MATCH THE NAME OF THE INPUT
const title = data.get('title');
console.log(title)

//II. Let users add item to the list
let list = document.querySelector('#items');

function addToList (item) {

    // Create a list item
    let li = document.createElement('li');
    li.textContent = item;
    li.innerHTML += `
    <i class="ph ph-basket"></i>`

    // Add it to the list
    list.append(li);

    //V.LOCALSTORAGE
    localStorage.setItem('randomize', list.innerHTML)
}


function addItem (event) {

    // Stop the form from reloading the page
    event.preventDefault();

    // Get the item and capitalize first letter
    let formData = new FormData(form);
    let item = formData.get('item');
    item =
    item.charAt(0).toUpperCase()
  + item.slice(1)

    // If there's no item, bail
    if (!item) return;

    // Otherwise, add item to the list
    addToList(item);

    // Clear the form
    form.reset();

    //IV. ADD NOTIF
    // Je crée un élément de toute pièce
    const notification = document.createElement('div');
    console.log(notification);

    //Je lui donne un style
    notification.classList.add('toast'); //-> penser à créer une class .toast dans le CSS 
    // J'insère du contenu texte
    notification.innerText = "Item added";
    console.log(notification);

    // J'accroche la div à un élément dans la page pour qu'elle puisse s'afficher grâce à la propriété .appendChild : variableParent.appendChild(variableEnfant);
    body.appendChild(notification);

    // J'ajoute un timer pour que les notifs partent au bout d'un temps défini
    setTimeout(function(){
        notification.remove();
    }, 2000);



}




//III. Pick a random item from the list
const pick = document.querySelector('#pick');
console.log(pick)

const chosen = document.querySelector('#chosen');
console.log(chosen)

function pickItem () {

    const allEntries = document.querySelectorAll('li');
    console.log(allEntries);


    let allEntriesToArray = Array.from(allEntries);
    console.log(allEntriesToArray)

    let picked = allEntriesToArray[Math.floor(Math.random()*allEntriesToArray.length)];
    console.log(picked)
    let textPicked = picked.textContent;
    console.log(textPicked)
    chosen.innerHTML = `
    🎉${textPicked}
    `
    chosen.classList.add('active')
}




//V.1 When a user visits the app, any previous items they added to their list should be automatically reloaded into the app.

function loadList () {
    let saved = localStorage.getItem('randomize');
    if(!saved) {
        return
    }
    list.innerHTML = saved
}

//V.2 A details and summary element has been added to the UI. In it is a button with an ID of #clear. When the user clicks it, all items should be removed from the list, and should not show back up if the app is reloaded.
const trash = document.querySelector('#clear')

function clear() {
    localStorage.removeItem('randomize');
    list.innerHTML = '';
    let clearWrap = trash.closest('details');
    clearWrap.removeAttribute('open');
}

//Run the loadList function when the page loads
loadList()
//eventListeners
// Listen for submit events on the form
form.addEventListener('submit', addItem);
pick.addEventListener('click', pickItem);
trash.addEventListener('click', clear);