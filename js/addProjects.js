'use strict';
const patternName = /^[a-z]+([0-9.,]+)*$/gi;
const patternNumber = /^[0-9]*$/gi;

employeesAllocated();
if (JSON.parse(localStorage.getItem('projectsToBeEdited'))) {
    document.getElementById('name').value = JSON.parse(localStorage.getItem('projectsToBeEdited')).name;
    document.getElementById('startDate').value = JSON.parse(localStorage.getItem('projectsToBeEdited')).startDate;
    document.getElementById('necessaryEmployees').value = JSON.parse(localStorage.getItem('projectsToBeEdited')).necessaryEmployees;
    JSON.parse(localStorage.getItem('projectsToBeEdited')).employeesAllocated.forEach(employee => {
        employee === document.getElementById(employee).id ? document.getElementById(employee).checked = true : document.getElementById(employee).checked = false
    })

    const spans = document.querySelectorAll('span');
    spans.forEach(span => {
        span.innerText = '✓';
        span.style.color = 'green';
    })
    document.getElementById('button').disabled = false;

} else {
    document.addEventListener('onload', defaultStartDate());
}

let navToggle = document.querySelector(".nav__toggle");
let navWrapper = document.querySelector(".nav__wrapper");
navToggle.addEventListener("click", function () {
    if (navWrapper.classList.contains("active")) {
        this.setAttribute("aria-expanded", "false");
        this.setAttribute("aria-label", "menu");
        navWrapper.classList.remove("active");
    } else {
        navWrapper.classList.add("active");
        this.setAttribute("aria-label", "close menu");
        this.setAttribute("aria-expanded", "true");
    }
});

function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function checkInput(inputId, spanId, pattern) {
    if (inputId.value.match(pattern)) {
        document.getElementById('button').disabled = false;
        spanId.innerText = '✓';
        spanId.style.color = 'green';
        inputId.style.border = '';


    } else {
        document.getElementById('button').disabled = true;
        spanId.innerText = 'X';
        inputId.style.border = '3px solid red';
        spanId.style.color = 'red';

    }
}

function defaultStartDate() {
    if (document.getElementById('startDate').value === '') {
        document.getElementById('startDate').value = new Date().toISOString().slice(0, 10);
        document.getElementById('startDateSpan').innerText = '✓';
        document.getElementById('startDateSpan').style.color = 'green';
    }

}

function employeesAllocated() {
    const employeesArr = [];
    let keys = Object.keys(localStorage);

    keys.forEach(key => {
        key.startsWith('Employee') ? employeesArr.push(key) : null
    })
    employeesArr.forEach(employee => {
        let select = document.getElementById('checkBoxes')
        select.innerHTML += `<label for="${employee}">
        <input class="employeesToBeAdded" type="checkbox" id="${employee}" />
        ${employee}</label>`
    })
}


function addNewProject() {
    let employeesToBeAdded = [];
    let employeesToBeDeleted = [];

    document.querySelectorAll('.employeesToBeAdded').forEach(employee => {
        employee.checked ? employeesToBeAdded.push(employee.id) : employeesToBeDeleted.push(employee.id)
    })

    function connectProjectsToEmployees(){
        employeesToBeAdded.forEach(employee => {
            let employeeToBeModified = JSON.parse(localStorage.getItem(employee));
            if (employeeToBeModified.project.includes(`Project ${newProject.name}`) === false) {
                employeeToBeModified.project.push(`Project ${newProject.name}`); 
                localStorage.setItem(employee, JSON.stringify(employeeToBeModified));
          }
          });

          employeesToBeDeleted.forEach(employee => {
            let employeeToBeDeleted = JSON.parse(localStorage.getItem(employee));
            if (employeeToBeDeleted.project.includes(`Project ${newProject.name}`)) {
              let index = employeeToBeDeleted.project.indexOf(`Project ${newProject.name}`);
              employeeToBeDeleted.project.splice(index, 1);
              localStorage.setItem(employee, JSON.stringify(employeeToBeDeleted));
            }
          });
      
      
      }
    let newProject = {

        name: capitalizeString(document.getElementById('name').value),
        startDate: document.getElementById('startDate').value,
        necessaryEmployees: document.getElementById('necessaryEmployees').value,
        employeesAllocated: employeesToBeAdded,

    }
    let projectsToBeEdited = JSON.parse(localStorage.getItem('projectsToBeEdited'));
    let stringifiedProject = JSON.stringify(newProject);
    if (projectsToBeEdited) {
        localStorage.removeItem(`Project ${projectsToBeEdited.name}`);
        localStorage.setItem(`Project ${newProject.name}`, stringifiedProject);
        connectProjectsToEmployees();
    } else {
        let keys = Object.keys(localStorage);
        if (keys.includes(`Project ${newProject.name}`)){
            alert("Cannot have two different projects with the same name")
        } else {
            connectProjectsToEmployees();
            localStorage.setItem(`Project ${newProject.name}`, stringifiedProject);
        }
    }
    localStorage.removeItem('projectToBeEdited');
}