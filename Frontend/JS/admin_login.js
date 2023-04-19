let otp_btn=document.getElementById("otp_btn");
otp_btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let mobile=document.getElementById("mobile").value;
    mobile= +mobile
    let password=document.getElementById("password").value;
    
    if(mobile==""||password==""){
        alert("all fields are mandatory");
    }else{
        let obj={
            mobile,password
        }
        // console.log(obj)
       login(obj)
    }
    
    
});
let login =async(obj)=>{
    let res = await fetch("https://excited-deer-headscarf.cyclic.app/admin/login",{
     method:"POST",
     headers:{
         "Content-Type":"application/json"
     },
     body:JSON.stringify(obj)
    });
    let data = await res.json();
    if(res.ok){
        console.log(data)
       await swal("Admin has logged in");
        localStorage.setItem("admin_token",data.token);
        window.location.href="admin_orders.html"
        return;
      
    }else{
    //  alert(data.message);
     swal(data.message);
    }
 }
 