const baseURL = "https://excited-deer-headscarf.cyclic.app";
document.addEventListener('DOMContentLoaded', () => {
    
  const Big_screen_sreachbar=document.getElementById("search_bar");
  const small_screen_sreachbar=document.querySelector(".input-box");
  Big_screen_sreachbar.style.display="none"
  small_screen_sreachbar.style.display="none"
})
let data=[]

async function orderFetch(){
  try {
    let orderRes= await fetch(`${baseURL}/orders/`,{
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          Authorization:localStorage.getItem("token") ,
      },
    })
    if(orderRes.ok){
        let orderData= await orderRes.json();
        if(orderData.length==0){
              await  Swal.fire({
                icon: 'info',
                text: 'You Have No Order, Redirecting you to Homepage',
              })
              window.location.href = "./index.html"
              ;return;
        }
        // Use Promise.all() to wait for all fetch requests to complete
        await Promise.all(orderData.map(async (item) => {
          for (const orderItem of item.order) {
            let productFetch= await fetch(`${baseURL}/products/${orderItem.productId}`);
            let productData= await productFetch.json();
            data.push(productData)
          }
        }));
        orderFun(data);
    }
  } catch (error) {
    
  }
}
orderFetch()

let order_div = document.getElementById("wrapper");

// ------------------------rendering all orders data---------------------------------------------------  
function orderFun(data){

  order_div.innerHTML=""
  let allData= data.map((item)=>{
      return `<figure data-id=${item._id} class="shop-items-child-div">
    <div class="hover-animation" data-id=${item._id} >
        <img class="img-back" src="${item.image_2}" alt="">
        <img class="img-front" data-id=${item._id} src="${item.image_1}" alt="">
        <div class="product-view-rating-div">
                    <p class="product-view-star" >${item.rating}<span><i class="fa-solid fa-star"></i></span></p>
                    <hr>
                <p class="product-view-total-rating">${Math.floor(Math.random() * 5) + 1}k</p>
            </div>
        </div>
        <figcaption>
        <p>${item.title.substring(0, 22) + "..."}</p>
        <div class="similar-products-price-div">
        <h5>Rs.${item.price}</h5>
        <strike>Rs.${Math.floor(item.price+(item.discount/100)*item.price)}</strike>
        </div>
        <p class="discount">(${item.discount}% OFF)</p>
    </figcaption>
            </figure>`
  })
  order_div.innerHTML=allData.join(" ")
}
