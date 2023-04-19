let showmore = document.getElementById("myBtn");
showmore.addEventListener("click", () => {
  console.log("clicked");
  let dots = document.getElementById("tca");
  let moreText = document.getElementById("more");
  let btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Show More &#8675;";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Show Less &#8673;";
    moreText.style.display = "inline";
  }
});
//===================================================
let checkbox = document.getElementById("checkbox");
checkbox.addEventListener("click", () => {
  //   console.log("clicked");

  let position = document.getElementById("pnow");
  let paynow = document.getElementById("paynow");
  if (checkbox.checked == true) {
    paynow.style.display = "inline";
    position.style.textAlign = "center";
    position.style.margin = "auto";
  } else {
    paynow.style.display = "none";
  }
});
//=====================================================
let wallet = document.getElementById("child3");
wallet.addEventListener("click", () => {
  console.log("clicked");
  let modepay = document.getElementById("modepay");
  modepay.style.display = "inline";
  wallet.style.color = "#ff3f6c";
  wallet.style.backgroundColor = "white";
  wallet.style.borderLeft = "5px solid #ff3f6c";
});

let finalamt = document.getElementById("carttotal");
let amt = JSON.parse(localStorage.getItem("totalcartvalue"));
finalamt.innerText = amt;
