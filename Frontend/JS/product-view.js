
document.addEventListener('DOMContentLoaded', () => {
    
    const Big_screen_sreachbar=document.getElementById("search_bar");
    const small_screen_sreachbar=document.querySelector(".input-box");
    Big_screen_sreachbar.style.display="none"
    small_screen_sreachbar.style.display="none"
})

// *********************gender key**************************** 
let gender=localStorage.getItem("gender")
// ************************ category key ************************ 
let category=localStorage.getItem("category")

const baseurl="https://excited-deer-headscarf.cyclic.app";
const product_view=`${baseurl}/products/search?gender=${gender}&category=${category}`
const cartadd=`${baseurl}/cart/add`
const cartFetch=`${baseurl}/cart`
const preloader= document.getElementById("loading");
const token=localStorage.getItem("token");

//  calulating delivary date 
let today = new Date();
let fiveDaysLater = new Date(today.getTime() + (10 * 24 * 60 * 60 * 1000)); 

let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let dayOfWeek = daysOfWeek[fiveDaysLater.getDay()];
let monthOfYear = monthsOfYear[fiveDaysLater.getMonth()];
let dateOfMonth = fiveDaysLater.getDate();

const product_Id=localStorage.getItem("product-id")

// -------------------------loading function--------------------------------------  
function loadingFun(){
    preloader.style.display="none"
}

let go_to_bag=document.querySelector(".cart-go");


//  --------------  product fecting funtion ------------------------------------------------------------

async function checkFetch(){
    try {
        let res = await fetch(`${cartFetch}/${product_Id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization:token ,
            },
        })

        let msg=await res.json()
//  -------------- product rendering function ------------------------------------------------------------
        
async function productfetch() {
    try {
        let res = await fetch(`${baseurl}/products/${product_Id}`);
        if (res.ok) {
            let dataPro = await res.json();
            // dataArr = [...dataPro]
            productFun(dataPro)

        }
    } catch (error) {
        console.log(error)
    }
}
productfetch();
let container = document.querySelector("#product-view-div")


//--------------- if product already in bag then rendering all data and only showing go to bag button -------------------------------
        if(msg.message=="Product already in cart"){
                // let container = document.querySelector("#product-view-div")
                let add_to_bag=document.querySelector(".add-to-cart-btn")
                
                function productFun(dataPro) {
                container.innerHTML=""
                
                    let productData =
                    `<div class="product-view-img-div">
                    <div class="product-view-img"><img class="gallery-item" src="${dataPro.image_1}" alt=""></div>
                    <div class="product-view-img"><img class="gallery-item" src="${dataPro.image_2}" alt=""></div>
                    <div class="product-view-img"><img class="gallery-item" src="${dataPro.image_3}" alt=""></div>
                    <div class="product-view-img"><img class="gallery-item" src="${dataPro.image_4}" alt=""></div>
                    <div class="product-view-img"><img class="gallery-item" src="${dataPro.image_5}" alt=""></div>
                    <div class="product-view-img"><img class="gallery-item" src="${dataPro.image_6}" alt=""></div>
                    </div>
                
                <div class="wraper">
                    <div class="product-box"> 
                        <div class="all-images">
                            <div class="small-images">
                                <img src="${dataPro.image_1}"
                                    onclick="clickimg(this)">
                                <img src="${dataPro.image_2}"
                                    onclick="clickimg(this)">
                                <img src="${dataPro.image_3}"
                                    onclick="clickimg(this)">
                                <img src="${dataPro.image_4}"
                                    onclick="clickimg(this)">
                            </div>
                            <div class="main-images">
                                <img src="${dataPro.image_1}"
                                    id="imagebox">
                            </div>
                        </div>
                    </div>
                </div>    
                <div class="product-view-details-div">
                    <h1 class="product-view-heading">${dataPro.brand}</h1>
                    <h3 class="product-view-category-heading">${dataPro.title}</h3>
                    <div class="product-view-rating-div">
                            <p class="product-view-star" >${dataPro.rating} <span><i class="fa-solid fa-star"></i></span></p>
                            <hr>
                        <p class="product-view-total-rating">${Math.floor(Math.random() * 5) + 1}k reviews</p>
                    </div>
                    <div class="product-view-price-div">
                        <h1 class="product-view-price">₹${dataPro.price}</h1>
                        <h3 class="product-view-real-price">MRP <strike> ₹${Math.floor(dataPro.price+(dataPro.discount/100)*dataPro.price)}</strike></h3>
                    </div>
                    <p class="product-view-tax-p">inclusive of all taxes</p>
                    <div class="product-view-size-chart">
                        <div class="product-view-size-heading">
                            <p>SELECT SIZE</p>
                            <p>SIZE CHART <span><i class="fa-solid fa-arrow-up-right-from-square"></i></span></p>
                        </div>
                        <div class="size-options">
                            <button id="S" class="sizeBtn" onclick='sizeFun(this)'>S</button>
                            <button id="M" class="sizeBtn" onclick='sizeFun(this)'>M</button>
                            <button id="L" class="sizeBtn" onclick='sizeFun(this)'>L</button>
                            <button id="XL" class="sizeBtn" onclick='sizeFun(this)' >XL</button>
                        </div>
                    </div>
                    <div class="product-view-btn-div">
                        <a class="cart-go" href="./cart_page.html"><button class="go-to-cart-btn">GO TO BAG <i class="fa-solid fa-arrow-right-long"></i></button></a>
                        <button class="wishlist-btn" data-id=${dataPro._id}> <i class="fa-regular fa-heart"></i> WISHLIST</button>
                    </div>
                    <div class="product-view-delivery-div">
                        <p class="delivery-details-heading">DELIVERY DETAILS</p>
                        <div class="product-view-delivery-flex-div">
                            <div><img src="./Payment-Img/fast-delivery.png" alt=""> <p>Get it by ${dayOfWeek} ${monthOfYear} ${dateOfMonth}</p></div>
                            <div><img src="./Payment-Img/cash-on-delivery.png" alt=""> <p>Pay on delivery available</p></div>
                            <div><img src="./Payment-Img/easy-return.png" alt=""> <p>Easy 30 days return & exchange available</p></div>
                        </div>
                    </div>
                    <p class="ori">100% Original Products</p>
                    <div class="product-view-offer-div">
                        <h4>BEST OFFERS <span><i class="fa-solid fa-tag"></i></span></h4>
                        <p class="best-price-p" >Best Price: <span class="best-price">Rs. 562</span></p>
                        <ul>
                            <li>Applicable on: Orders above Rs. 799 (only on first purchase)</li>
                            <li>Coupon code: MYNTRA200</li>
                            <li>Coupon Discount: Rs. 187 off (check cart for final savings)</li>
                            <p>View Eligible Products</p>
                            <h4>EMI option available</h4>
                            <li>EMI starting from Rs.35/month</li>
                            <p>View Plan</p>
                        </ul>
                    </div>
                    <div class="product-view-more-details-div">
                        <h3>PRODUCT DETAILS</h3>
                        <p>${dataPro.color} ${dataPro.category}</p>
                        <p>Solid</p>
                        <p>Regular length</p>
                        <p>Polo collar</p>
                        <p>Button closure</p>
                        <h3>Size & Fit</h3>
                        <p>Regular Fit</p>
                        <p>The model (height 6') is wearing a size M</p>
                        <h3>Material & Care</h3>
                        <p>60% Cotton, 40% Polyester</p>
                        <p>Machine Wash</p>
                    </div>
                </div>
                <div class="modal fade" id="gallery-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img src="${dataPro.image_1}" class="modal-img" alt="modal img">
                        </div>
                        </div>
                    </div>
                    </div>`;
              
                container.innerHTML = productData;
              }
        }
//--------------- if product is not in bag then rendering all data and showing add to bag button -------------------------------

        else{
            function productFun(dataPro) {
                container.innerHTML=""
              
                let productData =
                  `<div class="product-view-img-div">
                   <div class="product-view-img"><img class="gallery-item" src="${dataPro.image_1}" alt=""></div>
                   <div class="product-view-img"><img class="gallery-item" src="${dataPro.image_2}" alt=""></div>
                   <div class="product-view-img"><img class="gallery-item" src="${dataPro.image_3}" alt=""></div>
                   <div class="product-view-img"><img class="gallery-item" src="${dataPro.image_4}" alt=""></div>
                   <div class="product-view-img"><img class="gallery-item" src="${dataPro.image_5}" alt=""></div>
                   <div class="product-view-img"><img class="gallery-item" src="${dataPro.image_6}" alt=""></div>
               </div>
               
               <div class="wraper">
                   <div class="product-box"> 
                       <div class="all-images">
                           <div class="small-images">
                               <img src="${dataPro.image_1}"
                                   onclick="clickimg(this)">
                               <img src="${dataPro.image_2}"
                                   onclick="clickimg(this)">
                               <img src="${dataPro.image_3}"
                                   onclick="clickimg(this)">
                               <img src="${dataPro.image_4}"
                                   onclick="clickimg(this)">
                           </div>
                           <div class="main-images">
                               <img src="${dataPro.image_1}"
                                   id="imagebox">
                           </div>
                       </div>
                   </div>
               </div>    
               <div class="product-view-details-div">
                   <h1 class="product-view-heading">${dataPro.brand}</h1>
                   <h3 class="product-view-category-heading">${dataPro.title}</h3>
                   <div class="product-view-rating-div">
                           <p class="product-view-star" >${Math.floor(Math.random() * 5) + 1} <span><i class="fa-solid fa-star"></i></span></p>
                           <hr>
                       <p class="product-view-total-rating">${Math.floor(Math.random() * 5) + 1}k reviews</p>
                   </div>
                   <div class="product-view-price-div">
                       <h1 class="product-view-price">₹${dataPro.price}</h1>
                       <h3 class="product-view-real-price">MRP <strike> ₹${dataPro.price+500}</strike></h3>
                   </div>
                   <p class="product-view-tax-p">inclusive of all taxes</p>
                   <div class="product-view-size-chart">
                       <div class="product-view-size-heading">
                           <p>SELECT SIZE</p>
                           <p>SIZE CHART <span><i class="fa-solid fa-arrow-up-right-from-square"></i></span></p>
                       </div>
                       <div class="size-options">
                           <button id="S" class="sizeBtn" onclick='sizeFun(this)'>S</button>
                           <button id="M" class="sizeBtn" onclick='sizeFun(this)'>M</button>
                           <button id="L" class="sizeBtn" onclick='sizeFun(this)'>L</button>
                           <button id="XL" class="sizeBtn" onclick='sizeFun(this)' >XL</button>
                       </div>
                   </div>
                   <div class="product-view-btn-div">
                       <button class="add-to-cart-btn" data-id=${dataPro._id} ><i class="fa-solid fa-bag-shopping"></i> ADD TO BAG</button>
                       <a class="cart-go" href="./cart_page.html"><button class="go-to-cart-btn">GO TO BAG <i class="fa-solid fa-arrow-right-long"></i></button></a>
                       <button class="wishlist-btn" data-id=${dataPro._id}> <i class="fa-regular fa-heart"></i> WISHLIST</button>
                   </div>
                   <div class="product-view-delivery-div">
                       <p class="delivery-details-heading">DELIVERY DETAILS</p>
                       <div class="product-view-delivery-flex-div">
                           <div><img src="./Payment-Img/fast-delivery.png" alt=""> <p>Get it by ${dayOfWeek} ${monthOfYear} ${dateOfMonth}</p></div>
                           <div><img src="./Payment-Img/cash-on-delivery.png" alt=""> <p>Pay on delivery available</p></div>
                           <div><img src="./Payment-Img/easy-return.png" alt=""> <p>Easy 30 days return & exchange available</p></div>
                       </div>
                   </div>
                   <p class="ori">100% Original Products</p>
                   <div class="product-view-offer-div">
                       <h4>BEST OFFERS <span><i class="fa-solid fa-tag"></i></span></h4>
                       <p class="best-price-p" >Best Price: <span class="best-price">Rs. 562</span></p>
                       <ul>
                           <li>Applicable on: Orders above Rs. 799 (only on first purchase)</li>
                           <li>Coupon code: MYNTRA200</li>
                           <li>Coupon Discount: Rs. 187 off (check cart for final savings)</li>
                           <p>View Eligible Products</p>
                           <h4>EMI option available</h4>
                           <li>EMI starting from Rs.35/month</li>
                           <p>View Plan</p>
                       </ul>
                   </div>
                   <div class="product-view-more-details-div">
                       <h3>PRODUCT DETAILS</h3>
                       <p>${dataPro.color} ${dataPro.category}</p>
                       <p>Solid</p>
                       <p>Regular length</p>
                       <p>Polo collar</p>
                       <p>Button closure</p>
                       <h3>Size & Fit</h3>
                       <p>Regular Fit</p>
                       <p>The model (height 6') is wearing a size M</p>
                       <h3>Material & Care</h3>
                       <p>60% Cotton, 40% Polyester</p>
                       <p>Machine Wash</p>
                   </div>
               </div>
               <div class="modal fade" id="gallery-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                   <div class="modal-dialog modal-dialog-centered modal-lg">
                     <div class="modal-content">
                       <div class="modal-header">
                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                       </div>
                       <div class="modal-body">
                          <img src="${dataPro.image_1}" class="modal-img" alt="modal img">
                       </div>
                     </div>
                   </div>
                 </div>`;
              
                container.innerHTML = productData;
                let add_to_bag=document.querySelector(".add-to-cart-btn");
                let wishlist_btn= document.querySelector(".wishlist-btn");
                let go_to_bag=document.querySelector(".cart-go");
                go_to_bag.style.display="none"

            // --------------------------------  add to cart function -------------------------------------------- 
                        add_to_bag.addEventListener("click",async (event)=>{ 
                          let data_id = event.target.dataset.id;
                              try {
            // -----------------------------------add to bag post---------------------------------------------------- 
                                  let res = await fetch(`${cartadd}/${data_id}`, {
                                      method: "POST",
                                      headers: {
                                          "Content-Type": "application/json",
                                          Authorization:token ,
                                      },
                                  })
                                  let msg=await res.json()
                                  if (msg.message=="Product added to cart") {
                                      Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Added To bag',
                                        showConfirmButton: false,
                                        timer: 1500
                                      })
                                      event.target.style.display="none"
                                      go_to_bag.style.display="block"
                                      return;
                                  }
                                  if(msg.message=="Access Denied"||msg.message=="jwt malformed"){
                                    return  await  Swal.fire({
                                        position: 'top-end',
                                        icon: 'warning',
                                        title: 'Please log in or create an account to add this item to your bag.',
                                        showConfirmButton: false,
                                        timer: 1500
                                      })
                                  }
                                  if(msg.message=="Product already in cart"){
                                      return  await  Swal.fire({
                                        position: 'top-end',
                                        icon: 'warning',
                                        title: 'Product already in your bag.',
                                        showConfirmButton: false,
                                        timer: 1500
                                      })
                                  }
                              }
                              catch (error) {
                                  console.log(error)
                              }
                        })
                      wishlist_btn.addEventListener("click",()=>{
                        Swal.fire('Wishlist Option will be coming soon')
                      })
              }
        }
    } catch (error) {
        console.log({err:error})
    }
}
checkFetch()
//   ------------------bootstrap image model Animation function------------------------------------- 

document.addEventListener("click",function (e){
    if(e.target.classList.contains("gallery-item")){
          const src = e.target.getAttribute("src");
          document.querySelector(".modal-img").src = src;
          const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
          myModal.show();
    }
  })
//   ------------------small screen image changeing Animation function------------------------------------- 

  function clickimg(smallImg) {
    let fullImg = document.getElementById("imagebox");
    fullImg.src = smallImg.src
}


// ----------------size select function--------------------------------------------------------

function sizeFun(el){

    let buttons = document.querySelectorAll('.sizeBtn');
    let value;
    buttons.forEach(b => {
      if (b === el) {
              value=b.textContent;
              b.style.border = '#ff446d';
              b.style.color = '#ff446d';
            } else {
              
              b.style.border= '';
              b.style.color = '';
            }
          });
          
        }

//  -=------------ similar products fetching------------------------------------------------------------
async function fetchProducts(){
    try {
            let res= await fetch(`${product_view}`);
            if(res.ok){
                let data=await res.json();
                dataFuntion(data)
            }
        
    } catch (error) {
        console.log(error)
    }
    }
    fetchProducts()


//  -------------- similar products rendering------------------------------------------------------------


let dataContainer=document.getElementById("similar-products-div")
function dataFuntion(data){
    dataContainer.innerHTML="";

   let allData= data.map((item)=>{
        
        return`<div class="similar-products" data-id=${item._id}>
        <div class="similar-products-img-div">
            <img src="${item.image_1}" data-id=${item._id} alt="">
            <div class="similar-products-rating-div">
                <p class="similar-products-star" >${item.rating} <span><i class="fa-solid fa-star"></i></span></p>
                <hr>
            <p class="similar-products-rating">${Math.floor(Math.random() * 5) + 1}k reviews</p>
            </div>
            <div class="similar-products-details-div" >
                <h3 >${item.brand}</h3>
                <p >${item.title.substring(0, 30) + "..."}</p>
                <div class="similar-products-price-div" >
                    <h3 >Rs.${item.price}</h3>
                    <strike >Rs. ${item.price+500}</strike>
                    </div>
                    <p class="discount">(${item.discount}% OFF)</p>
            </div>
        </div>
        </div>`
    }).slice(1, 6);
    dataContainer.innerHTML=allData.join(" ")
    let img_click = document.querySelectorAll(".similar-products");
      for(let btn of img_click){
          btn.addEventListener("click",(event)=>{ 
			let data_id = event.target.dataset.id;

            localStorage.setItem("product-id",data_id)
            window.location.href="product-view.html"
		});
      }
   
}

 