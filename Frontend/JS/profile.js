document.addEventListener('DOMContentLoaded', () => {
    
  const Big_screen_sreachbar=document.getElementById("search_bar");
  const small_screen_sreachbar=document.querySelector(".input-box");
  Big_screen_sreachbar.style.display="none"
  small_screen_sreachbar.style.display="none"
})
 
 function loginCheck(){
  let token=localStorage.getItem("token")
  let mobile =localStorage.getItem("mobile")
  if(!token || !mobile){

    window.location.href="signup.html"
  }
}
loginCheck()



const baseURL = "https://excited-deer-headscarf.cyclic.app";

let profileDiv=document.getElementById("profile-div");
async function myProfileFun(){
// ----------------------------fetching user details------------------------------------------ 
    let res= await fetch(`${baseURL}/users/userdetails`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:localStorage.getItem("token") ,
        },
    body:JSON.stringify({mobile:localStorage.getItem("mobile")})

    })
    let data= await res.json();
// --------------------------rendering user details-----------------------------------------------------  
    let item=data
    let render=`<div class="profile-container">
    <div class="main-body">
    <div class="row">
    <div class="col-lg-4">
    <div class="card">
    <div class="card-body">
    <div class="d-flex flex-column align-items-center text-center">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm2fmKVxObx6S1S87K3_FwX35IIwAPqgGs0A&usqp=CAU" alt="Admin" class="rounded-circle p-1 bg-primary" width="110">
    <div class="mt-3">
    <h4>${item.first_name} ${item.last_name}</h4>
    </div>
    </div>
    <hr class="my-4">
    
    </div>
    </div>
    </div>
    <div class="col-lg-8">
    <div class="card">
    <div class="card-body">
    <div class="row mb-3">
    <div class="col-sm-3">
    <h6 class="mb-0">First Name</h6>
    </div>
    <div class="col-sm-9 text-secondary">
    <input type="text" class="form-control" value="${item.first_name}">
    </div>
    </div>
    <div class="row mb-3">
    <div class="col-sm-3">
    <h6 class="mb-0">Last Name</h6>
    </div>
    <div class="col-sm-9 text-secondary">
    <input type="text" class="form-control" value="${item.last_name}">
    </div>
    </div>
    <div class="row mb-3">
    <div class="col-sm-3">
    <h6 class="mb-0">Email</h6>
    </div>
    <div class="col-sm-9 text-secondary">
    <input type="text" class="form-control" value="${item.email}">
    </div>
    </div>
    <div class="row mb-3">
    <div class="col-sm-3">
    <h6 class="mb-0">Mobile</h6>
    </div>
    <div class="col-sm-9 text-secondary">
    <input type="text" class="form-control" value="+91 ${item.mobile}">
    </div>
    </div>
    <div class="row mb-3">
    <div class="col-sm-3">
    <h6 class="mb-0">Gender</h6>
    </div>
    <div class="col-sm-9 text-secondary">
    <input type="text" class="form-control" value="${item.gender}">
    </div>
    </div>
    <div class="row">
    <div class="col-sm-3"></div>
    <div class="col-sm-9 text-secondary">
    <input type="button" style="background: #7e0814;" id="logout" class="btn btn-primary px-4" value="Logout">
    <input type="button" style="background: #064fda;" id="orders" class="btn btn-primary px-4" value="View Orders">
    </div>
    </div>
    </div>
    </div>
    <div class="row">
    <div class="col-sm-12">
    <div class="card">`

    profileDiv.innerHTML=render;


    // ----------------------logout button------------------------------------------- 
    let logout=document.getElementById("logout");
    logout.addEventListener("click",async ()=>{
        console.log("Ho gaya")
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then( async(willDelete) => {
            if (willDelete) {
             await swal("You Are Logging Out", {
                icon: "success",
              });
              localStorage.clear()
              window.location.href="index.html"
            } else {
             await swal("Thanks for staying with us!");
            }
          });
    })
    let orders=  document.getElementById("orders");
    orders.addEventListener("click",()=>{
      window.location.href="orders.html"
    })
}
myProfileFun()
