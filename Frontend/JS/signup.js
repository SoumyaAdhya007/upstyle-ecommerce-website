// import navbar from "../components/index1.js"
// let div3 = document.getElementById("navbar");
// div3.innerHTML = navbar();
import navbar from "../components/header.js";
let div3 = document.querySelector(".header");
div3.innerHTML = navbar();
document.addEventListener("DOMContentLoaded", () => {
  const Big_screen_sreachbar = document.getElementById("search_bar");
  const small_screen_sreachbar = document.querySelector(".input-box");
  Big_screen_sreachbar.style.display = "none";
  small_screen_sreachbar.style.display = "none";
});

let signup_btn = document.getElementById("signup_form");
signup_btn.addEventListener("submit", async (e) => {
  e.preventDefault();
  let first_name = document.getElementById("first_name").value;
  let last_name = document.getElementById("last_name").value;
  let mobile = document.getElementById("mobile").value;
  mobile = parseInt(mobile);
  let email = document.getElementById("email").value;
  let gender = document.getElementById("gender").value;
  let password = document.getElementById("password").value;
  if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*['@', '$', '#']).*$/.test(password)
  ) {
    await swal(
      "should contains a lowercase, uppercase, number and any of the special characters"
    );
  } else {
    let obj = {
      first_name,
      last_name,
      mobile,
      email,
      gender,
      password,
    };
    console.log(obj);
    signup(obj);
  }
});
let signup = async (obj) => {
  let res = await fetch("https://excited-deer-headscarf.cyclic.app/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  let data = await res.json();
  if (res.ok) {
    await swal(data.message);
    window.location.href = "login.html";
  } else {
    await swal(data.message);
  }
};
