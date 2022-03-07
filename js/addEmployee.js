'use strict';
const patternName = /^[a-z]+( [a-z]+)*$/gi;
const patternProject = /^[a-z]+([0-9.,]+)*$/gi;
const patternPhoneNumber = /^07\d{8}$/g;;
const patternEmail = /^[a-z0-9]+@+[a-z]+.com|.ro*$/;


projects();
if (JSON.parse(localStorage.getItem('employeeToBeEdited'))) {
  document.getElementById('name').value = JSON.parse(localStorage.getItem('employeeToBeEdited')).name;
  document.getElementById('age').value = JSON.parse(localStorage.getItem('employeeToBeEdited')).age;
  document.getElementById('dateOfBirth').value = JSON.parse(localStorage.getItem('employeeToBeEdited')).dateOfBirth;
  document.getElementById('dateOfEmployment').value = JSON.parse(localStorage.getItem('employeeToBeEdited')).dateOfEmployment;
  document.getElementById('phoneNumber').value = JSON.parse(localStorage.getItem('employeeToBeEdited')).phoneNumber;
  document.getElementById('email').value = JSON.parse(localStorage.getItem('employeeToBeEdited')).email;

  JSON.parse(localStorage.getItem('employeeToBeEdited')).project.forEach(project => {
    project === document.getElementById(project).id ? document.getElementById(project).checked = true : document.getElementById(project).checked = false
  })

  const spans = document.querySelectorAll('span');
  spans.forEach(span => {
    span.innerText = '✓';
    span.style.color = 'green';
  })
  document.getElementById('button').disabled = false;

  

} else {
  document.addEventListener('onload', defaultEmploymentDate());
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

function projects() {
  let projectsArr = [];
  let keys = Object.keys(localStorage);

  keys.forEach(key => {
    key.startsWith('Project') ? projectsArr.push(key) : null
  })
  projectsArr?.forEach(project => {
    let select = document.getElementById('checkBoxes')
    select.innerHTML += `<label for="${project}">
      <input name="checkbox" class="projectsToBeAdded" type="checkbox" id="${project}" />
      ${project}</label>`
  })
}

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

function matchAgeInputs() {

  if (document.getElementById('age').value > 18 && document.getElementById('age').value < 100) {
    document.getElementById('button').disabled = false;
    document.getElementById('ageSpan').innerText = '✓';
    document.getElementById('ageSpan').style.color = 'green';
    document.getElementById('age').style.border = '';
    document.getElementById('dateOfBirth').value = `${new Date().getFullYear() - document.getElementById('age').value}-01-01`;
  }
  if (document.getElementById('age').value === '' || document.getElementById('age').value < 18 || document.getElementById('age').value > 100) {
    document.getElementById('button').disabled = true;
    document.getElementById('ageSpan').innerText = 'X';
    document.getElementById('age').style.border = '3px solid red';
    document.getElementById('ageSpan').style.color = 'red';
    document.getElementById('age').value = '';
  } else {
    document.getElementById('age').value = new Date().getFullYear() - document.getElementById('dateOfBirth').value.slice(0, 4);
  }
}

function matchAgeInputs2() {
  if (document.getElementById('dateOfBirth').value) {
    document.getElementById('age').value = new Date().getFullYear() - document.getElementById('dateOfBirth').value.slice(0, 4);
    document.getElementById('dateOfBirthSpan').innerText = '✓';
    document.getElementById('dateOfBirthSpan').style.color = 'green';
  } else {
    document.getElementById('age').value = '';
  }
}

function defaultEmploymentDate() {
  if (document.getElementById('dateOfEmployment').value === '') {
    document.getElementById('dateOfEmployment').value = new Date().toISOString().slice(0, 10);
    document.getElementById('dateOfEmploymentSpan').innerText = '✓';
    document.getElementById('dateOfEmploymentSpan').style.color = 'green';
  }

}

function addNewEmployee() {

  let projectsToBeAdded = [];
  let projectsToBeDeleted = [];


  document.querySelectorAll('.projectsToBeAdded').forEach(project => {
    project.checked ? projectsToBeAdded.push(project.id) : projectsToBeDeleted.push(project.id)
  })


  function connectEmployeesToProjects() {

    projectsToBeAdded.forEach(project => {
      let projectToBeModified = JSON.parse(localStorage.getItem(project));
      if (projectToBeModified.employeesAllocated.includes(`Employee ${newEmployee.name}`) === false) {
        projectToBeModified.employeesAllocated.push(`Employee ${newEmployee.name}`); 
        localStorage.setItem(project, JSON.stringify(projectToBeModified));
    }
    });

    projectsToBeDeleted.forEach(project => {
      let projectToBeDeleted = JSON.parse(localStorage.getItem(project));
      if (projectToBeDeleted.employeesAllocated.includes(`Employee ${newEmployee.name}`)) {
        let index = projectToBeDeleted.employeesAllocated.indexOf(`Employee ${newEmployee.name}`);
        projectToBeDeleted.employeesAllocated.splice(index, 1);
        localStorage.setItem(project, JSON.stringify(projectToBeDeleted));
      }
    });
  }

  let newEmployee = {

    name: capitalizeString(document.getElementById('name').value),
    age: document.getElementById('age').value,
    project: projectsToBeAdded,
    dateOfBirth: document.getElementById('dateOfBirth').value,
    dateOfEmployment: document.getElementById('dateOfEmployment').value,
    phoneNumber: document.getElementById('phoneNumber').value,
    email: document.getElementById('email').value
  }
  let employeeToBeEdited = JSON.parse(localStorage.getItem('employeeToBeEdited'));
  let stringifiedEmployee = JSON.stringify(newEmployee);
  if (employeeToBeEdited) {
    localStorage.removeItem(`Employee ${employeeToBeEdited.name}`);
    localStorage.setItem(`Employee ${newEmployee.name}`, stringifiedEmployee);
    connectEmployeesToProjects();
  } else {
    let keys = Object.keys(localStorage);
    if (keys.includes(`Employee ${newEmployee.name}`)) {
      alert("Cannot have two different projects with the same name")
    } else {
      connectEmployeesToProjects();

      localStorage.setItem(`Employee ${newEmployee.name}`, stringifiedEmployee);
    }


  }
  localStorage.removeItem('employeeToBeEdited');
}
