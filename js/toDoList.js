'use strict';
const notesArr = [];


function showNotes(){
let keys = Object.keys(localStorage)
let i = keys.length
    while(i--){
        keys[i].startsWith("note") ? notesArr.push(JSON.parse(localStorage.getItem(keys[i]))) : null
    }
    notesArr.forEach((note, index) =>{
        document.getElementById("tasks").innerHTML += `<div class='divs'>
        <label for='label-${index}'>
        <input id='label-${index}' type='checkbox'  onclick='onClick(this)'/>
        <span class='spans'></span>
          <h2>${note}</h2>   
        </label>
        </div>
        `
    })
}

function addNote(){
    localStorage.setItem(`note ${JSON.stringify(document.getElementById("notesInput").value)}`, JSON.stringify(document.getElementById("notesInput").value))
    window.location.reload();
}

function onClick(input){
    if(input.checked){
        input.nextElementSibling.style.background = "url('images/icons8-check-32.png') no-repeat center center";
        input.parentElement.parentElement.style.textDecoration = "line-through";
        input.parentElement.style.color = "white";
        input.parentElement.style.opacity = "0.5";
        document.getElementById("loading").classList.remove("overlayHidden");
        document.getElementById("loading").classList.add("overlay");

        removeNote(input);

    }
}

function delay(){
    return new Promise(resolve =>{
        setTimeout(()=>{
            resolve('deleted');
        }, 600);
        })
}
async function removeNote(input){
    const result = await delay();
    let keys = Object.keys(localStorage)
    keys.map(key =>{
        JSON.parse(localStorage.getItem(key)) === input.nextElementSibling.nextElementSibling.innerText 
        ? localStorage.removeItem(key) : null })
    window.location.reload();

}

showNotes();
