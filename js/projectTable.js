'use strict';

let projectsToBeEdited = '';
const projectsArr = [];
const pattern = /^Project/g;
let projectDetails = '';
const tableHeadProjects = `<tr>
<th><button id="sortName" onclick="sortTable(compareName, reverseCompareName)">↨</button>Project name</th>
<th><button id="sortStartDate" onclick="sortTable(compareStartDate, reverseCompareStartDate)">↨</button>Start date</th>
<th><button id="sortTime" onclick="sortTable(compareTimeSinceStart, reverseCompareTimeSinceStart)">↨</button>Time since start</th>
<th><button id="sortNecessaryEmployees" onclick="sortTable(compareNecessaryEmployees, reverseCompareNecessaryEmployees)">↨</button>Necessary employees</th>
<th><button id="sortEmployeesAllocated" onclick="sortTable(compareEmployeesAllocated, reverseCompareEmployeesAllocated)">↨</button>Employees allocated</th>
</tr>
<tr>`;

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


function generateTable() {
    projectsArr.forEach((element) => {
    document.getElementById('table').innerHTML += `
    <tr><td>${element.name}</td>
    <td>${element.startDate}</td>
    <td>${element.timeSinceStart}</td>
    <td>${element.necessaryEmployees}</td>
    <td>${element.employeesAllocated}</td>
    <td><button onclick="editProject(this)" class="editButtons" value="${element.name}">Edit</button></td> 
    <td><button onclick="deleteProject(this)" id="delete" value="${element.name}">Delete</button></td></tr>`
  });
}


function showTable() {

  for (let index = 0; index < localStorage.length; index++) {
    projectDetails = JSON.parse(localStorage.getItem(localStorage.key(index)));
    localStorage.key(index).match(pattern) ? projectsArr.push(projectDetails) : '';
  }

  generateTable();

}

function compareName(a, b) {
  if (a.name < b.name) {
    return -1;

  }
  if (a.name > b.name) {
    return 1;
  } else {
    return 0
  }
}

function reverseCompareName(a, b) {
  if (a.name > b.name) {
    return -1;

  }
  if (a.name < b.name) {
    return 1;
  } else {
    return 0
  }

}

function compareStartDate(a, b) {
  if (a.startDate < b.startDate) {
    return -1;

  }
  if (a.startDate > b.startDate) {
    return 1;
  } else {
    return 0
  }
}

function reverseCompareStartDate(a, b) {
  if (a.startDate > b.startDate) {
    return -1;

  }
  if (a.startDate < b.startDate) {
    return 1;
  } else {
    return 0
  }
}

function compareTimeSinceStart(a, b){
  if (a.timeSinceStart < b.timeSinceStart) {
    return -1;

  }
  if (a.timeSinceStart > b.timeSinceStart) {
    return 1;
  } else {
    return 0
  }
}

function reverseCompareTimeSinceStart(a, b) {
  if (a.timeSinceStart > b.timeSinceStart) {
    return -1;

  }
  if (a.timeSinceStart < b.timeSinceStart) {
    return 1;
  } else {
    return 0
  }
}

function compareNecessaryEmployees(a, b){
  if (a.necessaryEmployees < b.necessaryEmployees) {
    return -1;

  }
  if (a.necessaryEmployees > b.necessaryEmployees) {
    return 1;
  } else {
    return 0
  }
}

function reverseCompareNecessaryEmployees(a, b) {
  if (a.necessaryEmployees > b.necessaryEmployees) {
    return -1;

  }
  if (a.necessaryEmployees < b.necessaryEmployees) {
    return 1;
  } else {
    return 0
  }
}

function compareEmployeesAllocated(a, b){
  if (a.employeesAllocated < b.employeesAllocated) {
    return -1;

  }
  if (a.employeesAllocated > b.employeesAllocated) {
    return 1;
  } else {
    return 0
  }
}

function reverseCompareEmployeesAllocated(a, b) {
  if (a.employeesAllocated > b.employeesAllocated) {
    return -1;

  }
  if (a.employeesAllocated < b.employeesAllocated) {
    return 1;
  } else {
    return 0
  }
}



function sortTable(sort, reverseSort) {
  if (JSON.stringify(projectsArr) === JSON.stringify(projectsArr.sort(sort))) {
    projectsArr.sort(reverseSort);
  } else {
    projectsArr.sort(sort);

  }

  document.getElementById('table').innerHTML = tableHeadProjects;

  generateTable();

}

function deleteProject(element){

  let array = [];
  let keys = Object.keys(localStorage);
  keys.forEach(key =>{
    key.startsWith(`Employee`) ? array.push(key) : null
  })

  array.forEach(e =>{
    if(JSON.parse(localStorage.getItem(e)).project.includes(`Project ${element.value}`)){
      let employeeToHaveProjectDeleted = JSON.parse(localStorage.getItem(e));
      let index = employeeToHaveProjectDeleted.project.indexOf(`Project ${element.value}`);
      employeeToHaveProjectDeleted.project.splice(index, 1);
      localStorage.setItem(`Employee ${employeeToHaveProjectDeleted.name}`, JSON.stringify(employeeToHaveProjectDeleted))

    }

  })

  localStorage.removeItem(`Project ${element.value}`);
  location.reload();
}

function editProject(element){
  projectsToBeEdited = element.value;
  localStorage.setItem('projectsToBeEdited',localStorage.getItem(`Project ${projectsToBeEdited}`) )
  window.location.href = 'addProjects.html';

}

showTable();
