
// change =>click=> variable ID 
let baseurl="https://excited-deer-headscarf.cyclic.app"
// --------------------------------------------------
let click= document.getElementById("paynow");
// ------------------------------------------------
click.addEventListener("click",buyNow)
async function buyNow(){

try {
  const data={
    "purpose" :  "Upstyle Payment",
    "amount" : localStorage.getItem("totalmrp")||200,
    "buyer_name" :  localStorage.getItem("name")||"Test",
    "email" :  localStorage.getItem("email")||"Test@gmail.com",
    "phone" :  "9007060666",
    "webhook":'/webhook/',
    "redirect_url" :  `${baseurl}/api/bid/callback`,
  }
  console.log(data)
  let res= await fetch(`${baseurl}/api/bid//pay`,{
  method:"POST",
  headers:{
    "Content-Type":"application/json",

  },
  body:JSON.stringify(data)
  })
  if(res.ok){
    await fetch(`${baseurl}/orders/place`,{
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization:localStorage.getItem("token") ,
      },
      
    })
  let url= await res.json()
  console.log(url.msg)
  window.location.href=url.msg
  }else{
    let otp = prompt("Please enter the OTP for reservation"); {
      if (otp == 1234) {
          // alert("Payment Successful")
        //  await swal("Payment Successful", "success")
        await fetch(`${baseurl}/orders/place`,{
          method: "POST",
          headers: {
             "Content-Type": "application/json",
             Authorization:localStorage.getItem("token") ,
          },
          
        })
        await Swal.fire(
          'Thank You',
          'Payment Successful',
          'success'
        )
        window.location.href="index.html"
        return;
        } else {
          // alert("Wrong OTP Try Again")
         await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong OTP Try Again',
          })
      }
  }
  }
} 
catch (error) {
//   let otp = prompt("Please enter the OTP for reservation"); {
//     if (otp == 1234) {
//         // alert("Payment Successful")
//       //  await swal("Payment Successful", "success")
//       await fetch(`${baseurl}/orders/place`,{
//         method: "POST",
//         headers: {
//            "Content-Type": "application/json",
//            Authorization:localStorage.getItem("token") ,
//         },
        
//       })
//       await Swal.fire(
//         'Thank You',
//         'Payment Successful',
//         'success'
//       )
//       window.location.href="index.html"
//       return;
//       } else {
//         // alert("Wrong OTP Try Again")
//        await Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Wrong OTP Try Again',
//         })
//     }
// }
}


 
  // console.log(res.data)
}