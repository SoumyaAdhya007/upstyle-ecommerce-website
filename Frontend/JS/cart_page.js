async function loginCheck(){
  let token=localStorage.getItem("token")
  if(!token){
   await Swal.fire({
      icon: 'error',
      title: 'You Are Not Logged In',
      text: 'Please Login to Access Bag.',
    })
    window.location.href="signup.html"
  }
}
loginCheck()

let total = 0;
let totalMRP = 0;

let items_in_cart = document.querySelector("#cart_items");
let flag = false;

let discount = 0;

let totalmrp = document.getElementById("itm_total");

let priceDiscount = document.getElementById("ttl_dsc1");

let subTotal = document.getElementById("ttl");

let totalSaving = document.getElementById("ttl_dsc");
//=================code for append========================================
let append = (el) => {
  discount += 99;
  // items_in_cart.innerHTML = null;
  // data.forEach((el) => {
  let id = el._id;
  let n = 1;
  //creating a div for each and every products added in the cart
  let div = document.createElement("div");
  div.setAttribute("id", "items");

  //================image in divleft=====================================
  let divleft = document.createElement("div");
  divleft.setAttribute("id", "photo_div");

  let img = document.createElement("img");
  img.setAttribute("id", "itemincart");
  img.src = el.url;

  divleft.append(img);
  //===================details in divright=================================
  let divright = document.createElement("div");
  divright.setAttribute("id", "details_div");
  //=====================brand in div1=====================================
  let div1 = document.createElement("div");
  div1.setAttribute("id", "name_div");

  let name = document.createElement("p");
  name.innerText = el.name;

  div1.append(name);
  //=================description in div2====================================
  let div2 = document.createElement("div");
  div2.setAttribute("id", "desc_div");

  let desc = document.createElement("p");
  desc.innerText = el.description.substring(0, 20) + "...";

  div2.append(desc);
  //=================mrp in div3============================================

  let div3 = document.createElement("div");
  div3.setAttribute("id", "mrp_div");

  let MRP = document.createElement("p");
  MRP.innerText = "MRP";

  let MRPprice = document.createElement("p");
  MRPprice.innerText = `Rs. ${+el.price + 99}.00/-`;
  totalMRP = totalMRP + (+el.price + 99);
  localStorage.setItem("totalcartvalue", JSON.stringify(totalMRP - discount));
  localStorage.setItem("totalmrp", JSON.stringify(totalMRP));
  localStorage.setItem("discount", JSON.stringify(discount));
  MRPprice.style.textDecoration = "line-through";

  div3.append(MRP, MRPprice);
  //================sell price in div4================================

  let div4 = document.createElement("div");
  div4.setAttribute("id", "sell_div");
  let Sell_price = document.createElement("p");
  Sell_price.innerText = "Sell Price";

  let price = document.createElement("p");
  price.innerText = `Rs. ${+el.price}.00/-`;
  total = total + +el.price;

  div4.append(Sell_price, price);

  //=================remove add in div5================================
  let div5 = document.createElement("div");
  div5.setAttribute("id", "addremove");

  let div5l = document.createElement("div");
  div5l.setAttribute("id", "remove");

  let remove = document.createElement("img");
  remove.src = "https://img.1mg.com/images/delete_icon.svg";
  remove.style.cursor = "pointer";
  div5l.append(remove);

  remove.addEventListener("click",  () => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${el.name} is removed from your bag`,
      showConfirmButton: false,
      timer: 1500
    })
    del_cart_Data(id);
  });

  let div5r = document.createElement("div");
  div5r.setAttribute("id", "add");

  let div5r1 = document.createElement("div");
  let minus = document.createElement("img");
  minus.src =
    "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/512/external-glyph-shapes-tanah-basah-glyph-tanah-basah-32.png";
  minus.style.width = "15px";

  minus.style.cursor = "pointer";
  div5r1.append(minus);

  minus.addEventListener("click", () => {
    n--;

    if (flag == false) {
      price.innerText = `Rs. ${+el.price * n}.00/-`;
      MRPprice.innerText = `Rs. ${(+el.price + 99) * n}.00/-`;

      totalMRP = totalMRP - (+el.price + 99);
      localStorage.setItem(
        "totalcartvalue",
        JSON.stringify(totalMRP - discount)
      );
      //setting the total mrp in local storage=====================================
      localStorage.setItem("totalmrp", JSON.stringify(totalMRP));

      totalmrp.innerText = `Rs. ${totalMRP}/-`;
      discount = discount - 99;
      localStorage.setItem("discount", JSON.stringify(discount));
      priceDiscount.innerText = `- Rs. ${discount}/-`;
      subTotal.innerText = `Rs. ${totalMRP - discount}.00/-`;
      totalSaving.innerText = `Rs. ${discount}/-`;
    } else {
      price.innerText = `Rs. ${+el.price * n}.00/-`;
      MRPprice.innerText = `Rs. ${(+el.price + 99) * n}.00/-`;

      totalMRP = totalMRP - (+el.price + 99);
      localStorage.setItem(
        "totalcartvalue",
        JSON.stringify(totalMRP - discount)
      );
      localStorage.setItem("totalmrp", JSON.stringify(totalMRP));

      totalmrp.innerText = `Rs. ${totalMRP}/-`;
      discount = discount - 99;
      localStorage.setItem("discount", JSON.stringify(discount));
      priceDiscount.innerText = `- Rs. ${discount}/-`;
      subTotal.innerText = `Rs. ${totalMRP - discount - 200}.00/-`;
      totalSaving.innerText = `Rs. ${discount + 200}/-`;
    }
    if (n >= 1) {
      p2.innerText = n;
    } else if (n == 0) {
      //if n==0 then that product will be deleted from cart list
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${el.name} is removed from your bag`,
        showConfirmButton: false,
        timer: 1500
      })
      del_cart_Data(id);
    }
  });

  let div5r2 = document.createElement("div");
  let p2 = document.createElement("h3");
  p2.innerText = n;
  div5r2.append(p2);

  let div5r3 = document.createElement("div");
  let plus = document.createElement("img");
  plus.src = "https://img.icons8.com/tiny-glyph/512/plus-math.png";
  plus.style.width = "15px";
  plus.style.cursor = "pointer";
  div5r3.append(plus);

  plus.addEventListener("click", () => {
    n++;
    if (n <= 10) {
      p2.innerText = n;
    }
    if (n > 10) {
      n = 10;
   return  Swal.fire({
        icon: 'warning',
        text: "You Can't Add More Than 10 Products of Same Type!!! ",
      })
    }
    if (flag == false) {
      price.innerText = `Rs. ${+el.price * n}.00/-`;

      MRPprice.innerText = `Rs. ${(+el.price + 99) * n}.00/-`;
      total = total + +el.price * n;
      totalMRP = totalMRP + (+el.price + 99);
      localStorage.setItem(
        "totalcartvalue",
        JSON.stringify(totalMRP - discount)
      );
      localStorage.setItem("totalmrp", JSON.stringify(totalMRP));

      discount = discount + 99;
      localStorage.setItem("discount", JSON.stringify(discount));
      totalmrp.innerText = `Rs. ${totalMRP}/-`;

      priceDiscount.innerText = `- Rs. ${discount}/-`;

      subTotal.innerText = `Rs. ${totalMRP - discount}.00/-`;

      totalSaving.innerText = `Rs. ${discount}/-`;
    } else {
      price.innerText = `Rs. ${+el.price * n}.00/-`;

      MRPprice.innerText = `Rs. ${(+el.price + 99) * n}.00/-`;
      total = total + +el.price * n;
      totalMRP = totalMRP + (+el.price + 99);
      localStorage.setItem(
        "totalcartvalue",
        JSON.stringify(totalMRP - discount)
      );
      localStorage.setItem("totalmrp", JSON.stringify(totalMRP));

      discount = discount + 99;
      localStorage.setItem("discount", JSON.stringify(discount));
      totalmrp.innerText = `Rs. ${totalMRP}/-`;

      priceDiscount.innerText = `- Rs. ${discount}/-`;

      subTotal.innerText = `Rs. ${totalMRP - discount - 200}.00/-`;

      totalSaving.innerText = `Rs. ${discount + 200}/-`;
      //===================================
    }
  });
  div5r.append(div5r1, div5r2, div5r3);
  div5.append(div5l, div5r);
  divright.append(div1, div2, div3, div4, div5);
  div.append(divleft, divright);
  items_in_cart.append(div);
  // });
  //======these four line is written here just to initiate the price,discount etc========================
  totalmrp.innerText = `Rs. ${totalMRP}/-`;
  priceDiscount.innerText = `- Rs. ${discount}/-`;
  subTotal.innerText = `Rs. ${totalMRP - discount}.00/-`;
  totalSaving.innerText = `Rs. ${discount}/-`;
  //==============================================

  //====here i am using a redeem coupon feature with some coupon code======================================
  let redeem = document.getElementById("coupon");
  redeem.addEventListener("click", () => {
    if (flag == false) {
      if (totalMRP > 2000) {
        console.log("clicked");
        let val = prompt("Enter Promo Code");
        // console.log(val);
        if (val == "upstyle200") {
          flag = true;
          //if flaf==true it means that user can't take advantage of coupon more than one
          totalmrp.innerText = `Rs. ${totalMRP}/-`;
          priceDiscount.innerText = `- Rs. ${discount}/-`;
          subTotal.innerText = `Rs. ${totalMRP - discount - 200}.00/-`;
          localStorage.setItem(
            "totalcartvalue",
            JSON.stringify(totalMRP - discount - 200)
          );
          //after applying coupon code and getting discount, we are storing the totalprice and totaldiscount in localstorage=======
          localStorage.setItem("totalmrp", JSON.stringify(totalMRP));
          localStorage.setItem("discount", JSON.stringify(discount + 200));

          totalSaving.innerText = `Rs. ${discount + 200}/-`;
        } else {
          alert("Please Enter Valid Coupan code");
        }
      } else {
        alert("Your Cart Value of Total Items Should Be More Than Rs. 2000/-");
      }
    } else {
      alert("\u{274C} You have already applied for coupon");
    }
  });
};
//========================================

function get_cart_data() {
  const url = "https://excited-deer-headscarf.cyclic.app";
  const fetchCart = async () => {
    const res = await fetch(`${url}/cart`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.ok) {
      const data = await res.json();
      // console.log("gygy", data);
      if (data.length == 0) {
        // alert("Cart is empty\u{1F6D2}\nRedirecting you to Homepage");
      await  Swal.fire({
          icon: 'info',
          // title: 'Oops...',
          text: 'Bag is empty\u{1F6D2}\nRedirecting you to Homepage',
          // footer: '<a href="">Why do I have this issue?</a>'
        })
        window.location.href = "./index.html";
      } else {
        //after fetching data we are storing all the data in array "arr" and arr will be appended in frontend page
        // let arr = [];
        data.map(async (item) => {
          // console.log(item.productId);
          let productRes = await fetch(`${url}/products/${item.productId}`);
          let product = await productRes.json();

          // console.log("xxxxxxxxxx", product);

          let obj = {};

          obj._id = product._id;
          obj.name = product.brand;
          obj.description = product.title;
          obj.price = product.price;
          obj.url = product.image_1;
          console.log("obj", obj);
          // arr.push(obj);
          // we are invoking the append function here
          // console.log("arrrrrr", arr);
          append(obj);
        });
      }
    }
  };
  fetchCart();
}
get_cart_data();
//===============delete function================
async function del_cart_Data(id) {
  await fetch(`https://excited-deer-headscarf.cyclic.app/cart/remove/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  document.location.reload();
}
