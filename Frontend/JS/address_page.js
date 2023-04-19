let totalitem = document.querySelector("#pricedetail span");

//if cart length is 1 then inserts item otherwise items
totalitem.innerHTML = `${4} Items`; //make it dynamic

let finalamt = document.getElementById("totalamount");
let amt = JSON.parse(localStorage.getItem("totalcartvalue"));
finalamt.innerText = `Rs. ${amt} /-`;

let totalmrp = document.getElementById("totalmrp");
let totalamt = JSON.parse(localStorage.getItem("totalmrp"));
totalmrp.innerText = `Rs. ${totalamt} /-`;

let totaldiscount = document.getElementById("discountmrp");
let totaldsc = JSON.parse(localStorage.getItem("discount"));
totaldiscount.innerText = `Rs. ${totaldsc} /-`;

let addbtn = document.getElementById("addbutton");
addbtn.addEventListener("click", async () => {
  let user_address = {
    name: document.getElementById("name").value,
    mobile: document.getElementById("mobile").value,
    pin: document.getElementById("pin").value,
    house: document.getElementById("house").value,
    locality: document.getElementById("local").value,
    city: document.getElementById("incity").value,
    state: document.getElementById("instate").value,
  
  };

  if(user_address.name===""){
    return await swal("Please Fill Your Name Correctly");
  }
  if(user_address.mobile.length!=10){
    return await swal("Please Enter 10 Digit Mobile Number");
  }
  if(user_address.pin.length!=6){
    return await swal("Please Enter Pincode Correctly");
  }
  if(user_address.house===""){
    return await swal("Please Fill Your House Details Correctly");
  }
  if(user_address.locality===""){
    return await swal("Please Fill Your Locality / Town Details Correctly");
  }
  if(user_address.city===""){
    return await swal("Please Fill Your City Name Correctly");
  }
  if(user_address.state===""){
    return await swal("Please Fill Your State Name Correctly");
  }
  console.log(user_address);
  let address = await fetch(`https://excited-deer-headscarf.cyclic.app/address/add`, {
    method: "POST",
    body: JSON.stringify(user_address),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  let res = await address.json();
  console.log("msggg", res);
  // swal("address added");
  setTimeout(() => {
    window.location.href = "./payment_page.html";
  }, 500);
});
