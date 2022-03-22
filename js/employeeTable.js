'use strict';

let employeeToBeEdited = '';
const employeesArr = [];
const pattern = /^Employee/g;
let employeeDetails = '';
const tableHead = `<tr>
<th><button id="sortName" onclick="sortTable(compareAlpha, reverseCompareAlpha)">↨</button>Name</th>
<th><button id="sortAge" onclick="sortTable(compareNum, reverseCompareNum)">↨</button>Age</th>
<th><button id="sortProject" onclick="sortTable(compareAlpha, reverseCompareAlpha)">↨</button>Project</th>
<th><button id="sortDateOfBirth" onclick="sortTable(compareDate, reverseCompareDate)">↨</button>Date of Birth</th>
<th><button id="sortDateOfEmployment" onclick="sortTable(compareDateOfEmployment, reverseCompareDateOfEmployment)">↨</button>Date of Employment</th>
<th>Phone Number</th>
<th><button id="sortEmail" onclick="sortTable(compareEmail, reverseCompareEmail)">↨</button>E-mail</th>
</tr>`;

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

  employeesArr.forEach(element => {
    document.getElementById('table').innerHTML += `
    <tr><td>${element.name}</td>
    <td>${element.age}</td>
    <td>${element.project}</td>
    <td>${element.dateOfBirth}</td>
    <td>${element.dateOfEmployment}</td>
    <td>${element.phoneNumber}<a href="tel:${element.phoneNumber}">☎</a></td>
    <td>${element.email}<a href="mailto:${element.email}">📧</a></td>
    <td><button onclick="editEmployee(this)" class="editButtons myButton" value="${element.name}">Edit</button></td> 
    <td><button class="myButton" onclick="deleteEmployee(this)" id="delete" value="${element.name}">Delete</button></td></tr>`
  });

}


function showTable() {

  for (let index = 0; index < localStorage.length; index++) {
    employeeDetails = JSON.parse(localStorage.getItem(localStorage.key(index)));
    localStorage.key(index).match(pattern) ? employeesArr.push(employeeDetails) : '';
  }

  generateTable();

}

function compareAlpha(a, b) {
  if (a.name < b.name) {
    return -1;

  }
  if (a.name > b.name) {
    return 1;
  } else {
    return 0
  }
}

function reverseCompareAlpha(a, b) {
  if (a.name > b.name) {
    return -1;

  }
  if (a.name < b.name) {
    return 1;
  } else {
    return 0
  }

}

function compareNum(a, b) {
  if (a.age < b.age) {
    return -1;

  }
  if (a.age > b.age) {
    return 1;
  } else {
    return 0
  }
}

function reverseCompareNum(a, b) {
  if (a.age > b.age) {
    return -1;

  }
  if (a.age < b.age) {
    return 1;
  } else {
    return 0
  }
}

function compareDate(a, b){
  if (a.dateOfBirth < b.dateOfBirth) {
    return -1;

  }
  if (a.dateOfBirth > b.dateOfBirth) {
    return 1;
  } else {
    return 0
  }
}

function reverseCompareDate(a, b) {
  if (a.dateOfBirth > b.dateOfBirth) {
    return -1;

  }
  if (a.dateOfBirth < b.dateOfBirth) {
    return 1;
  } else {
    return 0
  }
}

function compareDateOfEmployment(a, b){
  if (a.dateOfEmployment < b.dateOfEmployment) {
    return -1;

  }
  if (a.dateOfEmployment > b.dateOfEmployment) {
    return 1;
  } else {
    return 0
  }
}

function reverseCompareDateOfEmployment(a, b) {
  if (a.dateOfEmployment > b.dateOfEmployment) {
    return -1;

  }
  if (a.dateOfEmployment < b.dateOfEmployment) {
    return 1;
  } else {
    return 0
  }
}

function compareEmail(a, b){
  if (a.email < b.email) {
    return -1;

  }
  if (a.email > b.email) {
    return 1;
  } else {
    return 0
  }
}

function reverseCompareEmail(a, b) {
  if (a.email > b.email) {
    return -1;

  }
  if (a.email < b.email) {
    return 1;
  } else {
    return 0
  }
}



function sortTable(sort, reverseSort) {
  if (JSON.stringify(employeesArr) === JSON.stringify(employeesArr.sort(sort))) {
    employeesArr.sort(reverseSort);
  } else {
    employeesArr.sort(sort);

  }

  document.getElementById('table').innerHTML = tableHead;

  generateTable();

}

function deleteEmployee(element){
  let array = [];
  let keys = Object.keys(localStorage);
  keys.forEach(key =>{
    key.startsWith(`Project`) ? array.push(key) : null
  })

  array.forEach(e =>{
    if(JSON.parse(localStorage.getItem(e)).employeesAllocated.includes(`Employee ${element.value}`)){
      let projectToHaveEmployeeDeleted = JSON.parse(localStorage.getItem(e));
      let index = projectToHaveEmployeeDeleted.employeesAllocated.indexOf(`Employee ${element.value}`);
      projectToHaveEmployeeDeleted.employeesAllocated.splice(index, 1);
      localStorage.setItem(`Project ${projectToHaveEmployeeDeleted.name}`, JSON.stringify(projectToHaveEmployeeDeleted))

    }

  })
  localStorage.removeItem(`Employee ${element.value}`);
  location.reload();

}

function editEmployee(element){
  employeeToBeEdited = element.value;
  localStorage.setItem('employeeToBeEdited',localStorage.getItem(`Employee ${employeeToBeEdited}`) )
  window.location.href = 'addEmployee.html';

}

showTable();

//make a separate employee profile-like page with PTOs
//make a project page where you can see details , employees etc
