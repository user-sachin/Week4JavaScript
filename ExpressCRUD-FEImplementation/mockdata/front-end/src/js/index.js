//Imports
import { getDogs, deleteDog, createDog, putDog } from "./api/dogApi.js"
let dogIDCount = 1;
// Ran when they select an X on a table element, will submit a DELETE request and
// remove them from the table.
function deleteDogFromTableAndDB(event) {
    const element = event.target;
    event.preventDefault();
    deleteDog(element.attributes["data-id"].value);
    const row = element.parentNode.parentNode;
    row
        .parentNode
        .removeChild(row);
    console.log(getDogFromInputs());

}

function putDogFromTableAndDB(event) {
    const element = event.target;
    event.preventDefault();
    putDog(element.attributes["data-id"].value);

    const dogInput = getDogFromInputs();




    if (dogInput.name != "" && dogInput.age != "" && dogInput.species != "") {
        deleteDog(element.attributes["data-id"].value);

        const row = element.parentNode.parentNode;
        row.parentNode.removeChild(row);

        dogInput.id = element.attributes["data-id"].value;
        clearInputs();
        if (isValidDog(dogInput)) {
            Promise
                .resolve(createDog(dogInput))
                .then((newDog) => {
                    document
                        .getElementById("dogDetails")
                        .innerHTML += createTableDataFromDog(newDog);
                    applyDeleteEvents();
                    applyPutEvents();
                });
        }
    }
    else {
        alert("Fill in all fields");
    }

}

//Given an array of dogs, output them all to the table and apply delete events.
function loadDogsToScreen(dogList) {
    //output dogs to table
    let dogsBody = "";
    dogList.forEach((dog) => {
        dogsBody += createTableDataFromDog(dog);
        //dogIDCount++;
    });
    document
        .getElementById("dogDetails")
        .innerHTML = dogsBody;
    applyDeleteEvents();
    applyPutEvents();

}



function applyPutEvents() {
    const putLinks = document.getElementsByClassName("putDog");
    Array.from(putLinks, (link) => {
        link.onclick = putDogFromTableAndDB;
    });
}


// Go through all the elements in the table that have the deleteDog tag, give
// them the event to delete themselves.
function applyDeleteEvents() {
    // find all elements that have the classname "deleteDog" and give them onclick
    // events to delete them.
    const deleteLinks = document.getElementsByClassName("deleteDog");
    Array.from(deleteLinks, (link) => {
        link.onclick = deleteDogFromTableAndDB;
    });
}

//Given a dog object, create HTML for it in the table.
function createTableDataFromDog({ id, name, age, species }) {
    return `
    <tr>
        <td> <a href = "#" data-id="${id}" class="deleteDog"> X </a> </td>
        <td>${name}</td>
        <td>${age}</td>
        <td>${species}</td>
        <td> <a href = "#" data-id="${id}" class="putDog"> Edit </a> </td>
        
    </tr>`;
}

// Get dog inputs from text boxes, then clear the text boxes, check if the inputs
// were all filled, submit a post request, get the result, append result to
// page.
function createAndAppendDog() {
    const dogInput = getDogFromInputs();
    clearInputs();
    if (isValidDog(dogInput)) {
        Promise
            .resolve(createDog(dogInput))
            .then((newDog) => {
                document
                    .getElementById("dogDetails")
                    .innerHTML += createTableDataFromDog(newDog);
                applyDeleteEvents();
                applyPutEvents();
            });
    }
}

//Checks if a dog has all the valid fields
function isValidDog(dog) {
    return dog.name && dog.age && dog.species;
}

//Clears the textboxes
function clearInputs() {
    document
        .getElementById("inputDogName")
        .value = "";
    document
        .getElementById("inputDogAge")
        .value = "";
    document
        .getElementById("inputDogSpecies")
        .value = "";
}

//Returns an object comprised of the data from the textboxes
function getDogFromInputs() {
    return {
        id: dogIDCount++,
        name: document
            .getElementById("inputDogName")
            .value,
        age: document
            .getElementById("inputDogAge")
            .value,
        species: document
            .getElementById("inputDogSpecies")
            .value
    }
}

// Expose the createAndAppendDog function for the button, otherwise it's stuck in
// here because of modules.
window.createAndAppendDog = createAndAppendDog;

//On page load, load all dogs.
window.onload = function () {
    //load dogs into table, including delete events set to each element.
    const dogList = getDogs().then(loadDogsToScreen);
}
