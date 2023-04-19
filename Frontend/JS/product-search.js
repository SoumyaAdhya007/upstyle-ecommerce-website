import navbar from "../components/header.js"
let div3 = document.getElementById("header");
div3.innerHTML = navbar();
let search=document.getElementById("input");
let baseurl="https://excited-deer-headscarf.cyclic.app";
let producturl=`${baseurl}/products/`
search.addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        let value=document.getElementById("input").value;
        let key="description"
        fetchProducts(key,value)
     console.log(value)   
    }
})
async function fetchProducts(key,value){
    try {
            let res= await fetch(`${producturl}/search?gender=male&${key}=${value}`)
            if(res.ok){
                let data=await res.json();
                dataFuntion(data)
                console.log(data)
            }
        
    } catch (error) {
        console.log(error)
    }
    }
    let dataContainer=document.getElementById("wrapper")
function dataFuntion(data){
    dataContainer.innerHTML="";
   let allData= data.map((item)=>{
        
        return`<figure class="shop-items-child-div">
        <div class="hover-animation" data-id=${item._id} >
            <img class="img-back" src="${item.image_1}" alt="">
            <img class="img-front" data-id=${item._id} src="${item.image_2}" alt="">
            <div class="product-view-rating-div">
                        <p class="product-view-star" >${Math.floor(Math.random() * 5) + 1}<span><i class="fa-solid fa-star"></i></span></p>
                        <hr>
                    <p class="product-view-total-rating">${Math.floor(Math.random() * 5) + 1}k</p>
                </div>
            </div>
            <figcaption>
            <p>${item.description}</p>
            <div class="similar-products-price-div">
            <h5>Rs.${item.price}</h5>
            <strike>Rs. ${item.price+500}</strike>
            <p>(${item.discount}% OFF)</p>
        </div>
        </figcaption>
    </figure>`
    })
    dataContainer.innerHTML=allData.join(" ")
    let img_click = document.querySelectorAll("img");
      for(let btn of img_click){
          btn.addEventListener("click",(event)=>{ 
			let data_id = event.target.dataset.id;

            localStorage.setItem("product-id",data_id)
            window.open('product-view.html', "_blank")
		});
      }
    let details_click = document.querySelectorAll("figcaption");
      for(let btn of details_click){
          btn.addEventListener("click",(event)=>{ 
			let data_id = event.target.dataset.id;

            localStorage.setItem("product-id",data_id)
            window.open('product-view.html', "_blank")

		});
      }

}
let token=localStorage.getItem("token");
document.getElementById("line1").innerText=localStorage.getItem("name")||"Welcome";
if(token){
    document.querySelector(".login").style.display="none"
    if(token){
        document.querySelector(".logout").addEventListener("click",async(e)=>{
            e.preventDefault();
         let res= await   fetch("https://excited-deer-headscarf.cyclic.app/users/logout",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "authorization":token
                }
            })
        let data = await res.json();
        if(data.message=="Logout Sucessfull"){
                alert("log out succussfully");
                localStorage.clear();
                window.location.reload()
                
        }
        })
    }
}else{
    document.querySelector(".login").style.display="block";
    document.querySelector(".logout").style.display="none";
}