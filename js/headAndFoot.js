'use strict';

//----------------header

function generateHeader(){
    document.getElementById('header').innerHTML = `
    <div class="wrapper site-header__wrapper">
    
      <a style='margin-left: 20px' href="index.html">
      <img width='12%' src='images/pngwing.com.png'/></a>
      <nav class="nav">
        <div class="nav__toggle container" aria-expanded="false" >
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        </div>
        <ul class="nav__wrapper">
          <li class="nav__item"><a href="employeesTable.html">View
              Employees</a></li>
          <li class="nav__item"><a href="projectTable.html">View
              Projects</a></li>
          <li class="nav__item"><a href="addEmployee.html">Add New
              Employee</a></li>
          <li class="nav__item"><a href="addProjects.html">Add New
              Project</a></li>
        </ul>
      </nav>
    </div> 
  `


  function wait1Sec(){
      return new Promise(resolve =>{
          setTimeout(()=>{
              resolve('resolved');
          },1000);
          })
      
  }

  async function asyncCall(){
    let navToggle = document.querySelector(".nav__toggle");
    let navWrapper = document.querySelector(".nav__wrapper");
    navToggle.addEventListener("click", function () {
        if (navWrapper.classList.contains("active")) {
        this.setAttribute("aria-expanded", "false");
        this.setAttribute("aria-label", "menu");
        this.classList.toggle("change");
        navWrapper.classList.remove("active");
        } else {
        this.classList.toggle("change");
        navWrapper.classList.add("active");
        this.setAttribute("aria-label", "close menu");
        this.setAttribute("aria-expanded", "true");
    }
  });
  const result = await wait1Sec();
 
}
    asyncCall();
}


//----------footer

function generateFooter(){
    document.getElementById('footer').innerHTML = `
    <div class='footerDiv'>Copyright 2022</div>
    <a class='hyperlinks' target='_blank' href='https://www.linkedin.com/in/vasile-dragos-7b83b3225/'><img class="social-icons" src='images/5282542_linkedin_network_social network_linkedin logo_icon.png'/>Linked-in</a>
    <a class='hyperlinks' target='_blank' href='https://www.facebook.com/vdragos1999'><img class="social-icons" src='images/5282541_fb_social media_facebook_facebook logo_social network_icon.png'/>Facebook</a>
    <a class='hyperlinks' target='_blank' href='https://api.whatsapp.com/send?phone=40721425291'><img class="social-icons" src='images/5282549_call_chat_mobile_whatsapp_whatsapp logo_icon.png'/>Whats App</a>`
}

generateHeader();
generateFooter();