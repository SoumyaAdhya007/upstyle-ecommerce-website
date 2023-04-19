// import navbar from "../components/index1.js";
// let div3 = document.getElementById("navbar");
// div3.innerHTML = navbar();
import navbar from "../components/header.js";
let div3 = document.querySelector(".header");
div3.innerHTML = navbar();
document.addEventListener('DOMContentLoaded', () => {
    
  const Big_screen_sreachbar=document.getElementById("search_bar");
  const small_screen_sreachbar=document.querySelector(".input-box");
  Big_screen_sreachbar.style.display="none"
  small_screen_sreachbar.style.display="none"
})


let otp_btn = document.getElementById("login_form");
otp_btn.addEventListener("submit", async(e) => {
  e.preventDefault();
  let mobile = document.getElementById("mobile").value;
  mobile = +mobile;
  let password = document.getElementById("password").value;

  if (mobile == "" || password == "") {
   await swal("all fields are mandatory");
  } else {
    let obj = {
      mobile,
      password,
    };
    login(obj);
  }
});

let login =async(obj)=>{
    let res = await fetch("https://excited-deer-headscarf.cyclic.app/users/login",{
     method:"POST",
     headers:{
         "Content-Type":"application/json"
     },
     body:JSON.stringify(obj)
    });
    let data = await res.json();
    if(res.ok){
     await swal(data.name,"has logged in");
     localStorage.setItem("token",data.token);
     localStorage.setItem("name",data.name);
     localStorage.setItem("email",data.email);
     localStorage.setItem("mobile",data.mobile);
     window.location.href="index.html"
      
    }else{
     await swal(data.message);
    }
 }
 