

let preloader= document.getElementById("loading");
function loadingFun(){
  preloader.style.display="none"
}
document.addEventListener('DOMContentLoaded', () => {
    
    // -----------------------big display search bar---------------------------------- 
    const search=document.getElementById("input");
    const search_bar=document.getElementById("search-bar");

    // -----------------------small display search bar---------------------------------- 
    const mobile_search=document.querySelector(".search");

    // -------------------search by enter key press----------------------------
    search.addEventListener("keypress",(e)=>{
        if(e.key=="Enter"){
            let value=document.getElementById("input").value;
            let key="types"
            fetchProducts(key,value)
        }
    })
    search_bar.addEventListener("click",(e)=>{
            let value=document.getElementById("input").value;
            let key="types"
            fetchProducts(key,value)
    })
    // -------------------search by clicking on search bar----------------------------

    search_bar.addEventListener("click",(e)=>{
            let value=document.getElementById("input").value;
            let key="types"
            fetchProducts(key,value)
    })
    
    // -------------------search by enter key press----------------------------
    document.getElementById("mobile-input").addEventListener("keypress",(e)=>{
        if(e.key=="Enter"){
            let value=document.getElementById("mobile-input").value;
            let key="types"
            // let 
            console.log(value)
            fetchProducts(key,value)
        }
    })
    mobile_search.addEventListener("click",(e)=>{
        // if(e.key=="Enter"){
            let value=document.getElementById("mobile-input").value;
            let key="types"
            fetchProducts(key,value)
        // }
    })
    // Big_screen_sreachbar.style.display="none"
    // small_screen_sreachbar.style.display="none"
})


// Super Combed Cotton

//  ***********************    Deployed Url *************************

let baseurl="https://excited-deer-headscarf.cyclic.app";
let producturl=`${baseurl}/products/`

const cartadd=`${baseurl}/cart/add`
// const token=localStorage.getItem("token");
// *********************gender key**************************** 
let gender=localStorage.getItem("gender")
// ************************ category key ************************ 
let category=localStorage.getItem("category")
let title;
if(gender==="male"){
    title="MEN"
}
if(gender==="female"){
    title="WOMEN"
}
if(gender==="both"||gender===undefined||gender===null){
    title=""
}
let pageTitle=document.querySelector(".page-header");
pageTitle.innerText=`${title} ${category.toLocaleUpperCase()}`
let dataArr=[]
let sortArr=[]

// ---------------------------products fetch Function -------------------------------------------------------- 

async function fetchProducts(key,value){
    try {
        let res;
        // fetcthing if key and value true 
            if(key && value){
                res= await fetch(`${baseurl}/products/search?gender=${gender}&category=${category}&${key}=${value}`);

            }
            else{
                res= await fetch(`${baseurl}/products/search?gender=${gender}&category=${category}`);

            }
         
            if(res.ok){

                let data=await res.json();
                // soting data in dataArr 
                dataArr=[...data]
                // soting dataArr in sortArr 
                sortArr=dataArr
                // passing data in dataFuntion function 
                dataFuntion(data)
            }
        
    } catch (error) {
        console.log(error)
    }
    }
fetchProducts()


// ---------------------------products Filters fetch Function -------------------------------------------------------- 

async function fetchProductFilters(){
    let filterRes= await fetch(`${producturl}filters?product=${category}`);
    let filterData= await  filterRes.json()
//------------------passing filter data in FilterDataFun function ---------------------------------------------------
    FilterDataFun(filterData)
}
fetchProductFilters()







let brand=undefined;
let color=undefined;
let price=undefined;
let discount=undefined;

let brands_div= document.getElementById("brands-div")
function FilterDataFun(filterData){
    brands_div.innerHTML="";
// ---------------------mapping filter data-------------------------------------------------------------------  
    let brandssData= filterData.brands.map((item)=>{
        return `<div>
        <input value="${item}" type="checkbox" class="size-checkbox" name="brand-filter"
            onclick="brandRange(this)"><label for="">${item}</label>
    </div>
    `
    })
//------------------- join the mapping in brand div--------------------------------------------------------------
    brands_div.innerHTML=brandssData.join(" ")
}
// -------------------------------------------------brand filter function-------------------------------------------------------------- 

function brandRange(checkbox) {
    
    var checkboxes = document.getElementsByName('brand-filter')
    checkboxes.forEach((item) => {
     if (item !== checkbox) {
         item.checked = false;
     }
    });
   let box= true;

//    if checkbox is checked then get the value from brand chekbox the passing value and key=> brand in fetchProducts
    if(checkbox.checked){
        let size_range=document.querySelector('input[name="brand-filter"]:checked').value;
        value=size_range
        key="brand"
        brand=size_range;
        color=undefined;
        price=undefined;
        discount=undefined;
        box = false;
        fetchProducts(key,value);
        console.log(value,key)
        return;

    }
//    if checkbox is unchecked then fetching all data making all viriables undefined

    else{
        // console.log(false);
        brand=undefined
        color=undefined;
        price=undefined;
        discount=undefined;
        fetchProducts();
        return;
    }
}
// -------------------------------------------------price filter function-------------------------------------------------------------- 
function priceRange(checkbox) {
    const checkboxes = document.getElementsByName('price-filter');
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });
  
    let sizeRange = null;
    // ---------------------storing checkedInput value in sizeRange variable------------------------------------------- 
    const checkedInput = document.querySelector('input[name="price-filter"]:checked');
    if (checkedInput) {
        sizeRange = checkedInput.value;
    }
    let data;
  
    switch (sizeRange) {
        // if sizeRange  value is  "3850"  
      case '3850':

        if (brand && color==undefined && discount==undefined) {
          price=sizeRange
          const dataBrand = dataArr.filter(item => item.brand === brand);
          data = dataBrand.filter(item => item.price > 199 && item.price <= 3850);
          sortArr=[...data]
          dataFuntion(data);
          return;

        } else if (color && brand == undefined && discount==undefined) {
          price=sizeRange
          const dataColor = dataArr.filter(item => item.color === color);
          data = dataColor.filter(item => item.price > 199 && item.price <= 3850);
          sortArr=[...data]
          dataFuntion(data);
          return;
        } else if (discount && color==undefined && brand == undefined) {
          price=sizeRange
          const dataDiscount = dataArr.filter(item => item.discount === discount);
          data = dataDiscount.filter(item => item.price > 199 && item.price <= 3850);
          sortArr=[...data]

          dataFuntion(data);

        }
        else if(brand && color && discount){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            const dataDiscount = dataColor.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 199 && item.price <= 3850);
            sortArr=[...data]
            dataFuntion(data);
            return;
        }
        else if(brand && color && discount==undefined){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            data = dataColor.filter(item => item.price > 199 && item.price <= 3850);
            sortArr=[...data]
            dataFuntion(data);
            return;
        }
        else if(brand && discount && color==undefined){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataDiscount = dataBrand.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 199 && item.price <= 3850);
            sortArr=[...data]
            dataFuntion(data);
            return;
        }
        else if(color && discount && brand==undefined){
            price=sizeRange
            const dataColor = dataArr.filter(item => item.color === color);
            const dataDiscount = dataColor.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 199 && item.price <= 3850);
            sortArr=[...data]
            dataFuntion(data);
            return;
        }

         else {
          price=sizeRange
          data = dataArr.filter(item => item.price > 199 && item.price <= 3850);
          sortArr=[...data]
          dataFuntion(data);
          return;

        }
        break;
  
      case '7501':
        // if sizeRange  value is  "7501"  

        if (brand && color==undefined && discount==undefined) {
          price=sizeRange
          const dataBrand = dataArr.filter(item => item.brand === brand);
          data = dataBrand.filter(item => item.price > 3850 && item.price <= 7501);
          sortArr=[...data]

          dataFuntion(data)
            return;
        } else if (color && brand == undefined && discount==undefined) {
          price=sizeRange
          const dataColor = dataArr.filter(item => item.color === color);
          data = dataColor.filter(item => item.price > 3850 && item.price <= 7501);
          sortArr=[...data]
          dataFuntion(data)
          return;

        } else if (discount && color==undefined && brand == undefined) {
          price=sizeRange
          const dataDiscount = dataArr.filter(item => item.discount === discount);
          data = dataDiscount.filter(item => item.price > 3850 && item.price <= 7501);
          sortArr=[...data]
          dataFuntion(data)

        }
        else if(brand && color && discount){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            const dataDiscount = dataColor.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 3850 && item.price <= 7501);
            sortArr=[...data]
            dataFuntion(data);
            return;
        }
        else if(brand && color && discount==undefined){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            data = dataColor.filter(item => item.price > 3850 && item.price <= 7501);
            sortArr=[...data]
            dataFuntion(data);
            return;
        }
        else if(brand && discount && color==undefined){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataDiscount = dataBrand.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 3850 && item.price <= 7501);
            sortArr=[...data]
            dataFuntion(data);
            return;
        }
        else if(color && discount && brand==undefined){
            price=sizeRange
            const dataColor = dataArr.filter(item => item.color === color);
            const dataDiscount = dataColor.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 3850 && item.price <= 7501);
            sortArr=[...data]
            dataFuntion(data);
            return;
        }
         else {
          price=sizeRange
          data = dataArr.filter(item => item.price > 3850 && item.price <= 7501);
          sortArr=[...data]
          dataFuntion(data)
          return;

        }
        break;
      case '11152':
        // if sizeRange  value is  "11152"  

        if (brand && color==undefined && discount==undefined) {
          price=sizeRange
          const dataBrand = dataArr.filter(item => item.brand === brand);
          data = dataBrand.filter(item => item.price > 7501 && item.price <= 11152);
          sortArr=[...data]
          dataFuntion(data)
          return;
        } else if (color && brand == undefined && discount==undefined) {
          price=sizeRange
          const dataColor = dataArr.filter(item => item.color === color);
          data = dataColor.filter(item => item.price > 7501 && item.price <=11152);
          sortArr=[...data]
          dataFuntion(data)
          return;
        } else if (discount && color==undefined && brand == undefined) {
          price=sizeRange
          const dataDiscount = dataArr.filter(item => item.discount === discount);
          data = dataDiscount.filter(item => item.price > 7501 && item.price <= 11152);
          sortArr=[...data]
          dataFuntion(data)
          return;
        } 
        else if(brand && color && discount){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            const dataDiscount = dataColor.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 7501 && item.price <= 11152);
            sortArr=[...data]
            dataFuntion(data);
        }
        else if(brand && color && discount==undefined){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            data = dataColor.filter(item => item.price > 7501 && item.price <= 11152);
            sortArr=[...data]
            dataFuntion(data);
            return;
        }
        else if(brand && discount && color==undefined){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataDiscount = dataBrand.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 7501 && item.price <= 11152);
            sortArr=[...data]
            dataFuntion(data);
            return;
        }
        else if(color && discount && brand==undefined){
            price=sizeRange
            const dataColor = dataArr.filter(item => item.color === color);
            const dataDiscount = dataColor.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 7501 && item.price <= 11152);
            sortArr=[...data]
            dataFuntion(data);
            return;
        }
        else {
          price=sizeRange
          data = dataArr.filter(item => item.price > 7501 && item.price <= 11152);
          sortArr=[...data]
          dataFuntion(data)
          return;
        }
        break;
      case '14803':
        // if sizeRange  value is  "14803"  
        if (brand && color==undefined && discount==undefined) {
          price=sizeRange
          const dataBrand = dataArr.filter(item => item.brand === brand);
          data = dataBrand.filter(item => item.price > 11152 && item.price <= 14803);
          sortArr=[...data]
           dataFuntion(data)
           return;
        } else if (color && brand == undefined && discount==undefined) {
          price=sizeRange
          const dataColor = dataArr.filter(item => item.color === color);
          data = dataColor.filter(item => item.price > 11152 && item.price <= 14803);
          sortArr=[...data]
          dataFuntion(data)
          return;
        } else if (discount && color==undefined && brand == undefined) {
          price=sizeRange
          const dataDiscount = dataArr.filter(item => item.discount === discount);
          data = dataDiscount.filter(item => item.price > 11152 && item.price <= 14803);
          sortArr=[...data]
           dataFuntion(data)
           return;
        }
        else if(brand && color && discount){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            const dataDiscount = dataColor.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 11152 && item.price <= 14803);
            sortArr=[...data]
            dataFuntion(data);
            return;
        }
        else if(brand && color && discount==undefined){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            data = dataColor.filter(item => item.price > 11152 && item.price <= 14803);
            sortArr=[...data]
            dataFuntion(data);
            return;
        }
        else if(brand && discount && color==undefined){
            price=sizeRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataDiscount = dataBrand.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 11152 && item.price <= 14803);
            sortArr=[...data]
            dataFuntion(data);
            return;
        }
        else if(color && discount && brand==undefined){
            price=sizeRange
            const dataColor = dataArr.filter(item => item.color === color);
            const dataDiscount = dataColor.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.price > 11152 && item.price <= 14803);
            sortArr=[...data]
            dataFuntion(data);
            return;
        }
         else {
          price=sizeRange
          data = dataArr.filter(item => item.price > 11152 && item.price <= 14803);
          sortArr=[...data]
           dataFuntion(data)
           return;
        }
        break;
        case null:
    //   default:
        price=undefined;
        if (brand  && color==undefined && discount==undefined) {
            const dataBrand = dataArr.filter(item => item.brand === brand);
            sortArr=[...dataBrand]
            dataFuntion(dataBrand);
            return;
        }
         else if (color && brand == undefined && discount==undefined) {
            const dataColor = dataArr.filter(item => item.color === color);
            sortArr=[...dataColor];
            dataFuntion(dataColor);
            return;
        } 
         else if (discount && color==undefined && brand == undefined) {
            const dataDiscount = dataArr.filter(item => item.discount === discount);
            sortArr=[...dataDiscount];
            dataFuntion(dataDiscount);
            return;
        } 
        else {
            fetchProducts();
            return;
        }
        break;
    }

  }
// -------------------------------------------------color filter function-------------------------------------------------------------- 
function colorRange(checkbox) {
    const checkboxes = document.getElementsByName('color-filter')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })

    let colorRange = null;

    // --------------------sorting color filter value in colorRange variable---------------------------------------  
    const checkedInput = document.querySelector('input[name="color-filter"]:checked');
    if (checkedInput) {
        colorRange = checkedInput.value;
    }
    let data;
    //--------------------- check if colorRange value is true ------------------------------------
    if(colorRange){
        if(brand && price && discount){
            color=colorRange;
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataDiscount = dataBrand.filter(item => item.discount === discount);
            if(price ==3850){
                const dataPrice= dataDiscount.filter(item => item.price > 199 && item.price <= 3850);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==7501){
                const dataPrice= dataDiscount.filter(item => item.price > 3850 && item.price <= 7501);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==11152){
                const dataPrice= dataDiscount.filter(item => item.price > 7501 && item.price <= 11152);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==14803){
                const dataPrice= dataDiscount.filter(item => item.price > 11152 && item.price <= 14803);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
        }
        else if(brand && price && discount==undefined){
            color=colorRange;
            const dataBrand = dataArr.filter(item => item.brand === brand);
            if(price ==3850){
                const dataPrice= dataBrand.filter(item => item.price > 199 && item.price <= 3850);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==7501){
                const dataPrice= dataBrand.filter(item => item.price > 3850 && item.price <= 7501);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==11152){
                const dataPrice= dataBrand.filter(item => item.price > 7501 && item.price <= 11152);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==14803){
                const dataPrice= dataBrand.filter(item => item.price > 11152 && item.price <= 14803);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
        }
        else if(brand && discount && price==undefined){
            color=colorRange;
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataDiscount = dataBrand.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.color=== colorRange);
            sortArr=[...data]
            return  dataFuntion(data);
        }
        else if(discount && price && brand==undefined){
            color=colorRange;
            const dataDiscount = dataArr.filter(item => item.discount === discount);
            if(price ==3850){
                const dataPrice= dataDiscount.filter(item => item.price > 199 && item.price <= 3850);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==7501){
                const dataPrice= dataDiscount.filter(item => item.price > 3850 && item.price <= 7501);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==11152){
                const dataPrice= dataDiscount.filter(item => item.price > 7501 && item.price <= 11152);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==14803){
                const dataPrice= dataDiscount.filter(item => item.price > 11152 && item.price <= 14803);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
        }
        else if(brand && discount==undefined && price==undefined){
              color=colorRange;
              const dataBrand = dataArr.filter(item => item.brand === brand);
              data = dataBrand.filter(item => item.color=== colorRange);
              sortArr=[...data]
              return  dataFuntion(data);
        }
        else if(discount&& price==undefined&& brand==undefined){
            color=colorRange;
            const dataDiscount = dataArr.filter(item => item.discount === discount);
            data = dataDiscount.filter(item => item.color=== colorRange);
            sortArr=[...data]
            return  dataFuntion(data);
        }
        else if(price&& brand==undefined && discount==undefined){
            color=colorRange;
            if(price ==3850){
                const dataPrice= dataArr.filter(item => item.price > 199 && item.price <= 3850);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==7501){
                const dataPrice= dataArr.filter(item => item.price > 3850 && item.price <= 7501);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==11152){
                const dataPrice= dataArr.filter(item => item.price > 7501 && item.price <= 11152);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==14803){
                const dataPrice= dataArr.filter(item => item.price > 11152 && item.price <= 14803);
                data=dataPrice.filter(item => item.color=== colorRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
        }
        
        else{
            color=colorRange;
            data= dataArr.filter((item)=>item.color=== colorRange)
            sortArr=[...data]
            return  dataFuntion(data);
        }
    }
    //--------------------- check if colorRange value is not true ------------------------------------
    else{
        colorRange = undefined;
                if(brand && price && discount){
                    const dataBrand = dataArr.filter(item => item.brand === brand);
                    const dataDiscount = dataBrand.filter(item => item.discount === discount);
                    if(price ==3850){
                        const dataPrice= dataDiscount.filter(item => item.price > 199 && item.price <= 3850);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                else if(price ==7501){
                        const dataPrice= dataDiscount.filter(item => item.price > 3850 && item.price <= 7501);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                else if(price ==11152){
                        const dataPrice= dataDiscount.filter(item => item.price > 7501 && item.price <= 11152);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                else if(price ==14803){
                        const dataPrice= dataDiscount.filter(item => item.price > 11152 && item.price <= 14803);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                }
                else if(brand && discount && price==undefined){
                    const dataBrand = dataArr.filter(item => item.brand === brand);
                    const dataDiscount = dataBrand.filter(item => item.discount === discount);
                    sortArr=[...dataDiscount]
                    dataFuntion(dataDiscount);
                    return;
                }
                else if(brand && price && discount==undefined){
                    const dataBrand = dataArr.filter(item => item.brand === brand);
                    if(price ==3850){
                        const dataPrice= dataBrand.filter(item => item.price > 199 && item.price <= 3850);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==7501){
                        const dataPrice= dataBrand.filter(item => item.price > 3850 && item.price <= 7501);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==11152){
                        const dataPrice= dataBrand.filter(item => item.price > 7501 && item.price <= 11152);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==14803){
                        const dataPrice= dataBrand.filter(item => item.price > 11152 && item.price <= 14803);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                }
                else if(discount && price && brand ==undefined){
                    const dataDiscount = dataArr.filter(item => item.discount === discount);
                    if(price ==3850){
                        const dataPrice= dataDiscount.filter(item => item.price > 199 && item.price <= 3850);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==7501){
                        const dataPrice= dataDiscount.filter(item => item.price > 3850 && item.price <= 7501);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==11152){
                        const dataPrice= dataDiscount.filter(item => item.price > 7501 && item.price <= 11152);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==14803){
                        const dataPrice= dataDiscount.filter(item => item.price > 11152 && item.price <= 14803);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                }
                else if (brand && price==undefined && discount==undefined) {
                    const dataBrand = dataArr.filter(item => item.brand === brand);
                    sortArr=[...dataBrand]
                    dataFuntion(dataBrand);
                    return;
                }
                else if(price && brand == undefined && discount == undefined){
                    if(price ==3850){
                        const dataPrice= dataArr.filter(item => item.price > 199 && item.price <= 3850);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==7501){
                        const dataPrice= dataArr.filter(item => item.price > 3850 && item.price <= 7501);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==11152){
                        const dataPrice= dataArr.filter(item => item.price > 7501 && item.price <= 11152);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                   else if(price ==14803){
                        const dataPrice= dataArr.filter(item => item.price > 11152 && item.price <= 14803);
                        sortArr=[...dataPrice];
                        return  dataFuntion(dataPrice);
                    }
                }
                else if (discount && price==undefined && brand == undefined) {
                    const dataDiscount = dataArr.filter(item => item.discount === discount);
                    sortArr=[...dataDiscount]
                    dataFuntion(dataDiscount);
                    return;
                } 
                else{
                    fetchProducts();
                    return;
                }
                
    }
  }
// -------------------------------------------------discount filter function-------------------------------------------------------------- 

function discountRange(){
 
    let discounteRange = null;
    // --------------------sorting discount filter value in colorRange variable---------------------------------------  

    const checkedInput = document.querySelector('input[name="discount-range"]:checked');
    if (checkedInput) {
        discounteRange = +(checkedInput.value);
    }
    let data;
    // if discounteRange value is true 
    if(discounteRange){
        if(brand && discount==undefined && price==undefined){
            discount=discounteRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            data=dataBrand.filter(item => item.discount === discounteRange)
            sortArr=[...data]
            dataFuntion(data);
            return;
        }
        else if(color&& price==undefined&& brand==undefined){
            discount=discounteRange
            const dataColor = dataArr.filter(item => item.color === color);
            data=dataColor.filter(item => item.discount === discounteRange);
            sortArr=[...data]
            dataFuntion(data);
            return;
        }
        else if(price && brand==undefined && color==undefined){
            discount=discounteRange;
            if(price ==3850){
                const dataPrice= dataArr.filter(item => item.price > 199 && item.price <= 3850);
                data=dataPrice.filter(item => item.discount=== discounteRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==7501){
                const dataPrice= dataArr.filter(item => item.price > 3850 && item.price <= 7501);
                data=dataPrice.filter(item => item.discount=== discounteRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==11152){
                const dataPrice= dataArr.filter(item => item.price > 7501 && item.price <= 11152);
                data=dataPrice.filter(item => item.discount=== discounteRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==14803){
                const dataPrice= dataArr.filter(item => item.price > 11152 && item.price <= 14803);
                data=dataPrice.filter(item => item.discount=== discounteRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
        }
        else if(brand && price && color){
            discount=discounteRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            if(price ==3850){
                const dataPrice= dataColor.filter(item => item.price > 199 && item.price <= 3850);
                data=dataPrice.filter(item => item.discount===discounteRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==7501){
                const dataPrice= dataColor.filter(item => item.price > 3850 && item.price <= 7501);
                data=dataPrice.filter(item => item.discount=== discounteRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==11152){
                const dataPrice= dataColor.filter(item => item.price > 7501 && item.price <= 11152);
                data=dataPrice.filter(item => item.discount=== discounteRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==14803){
                const dataPrice= dataColor.filter(item => item.price > 11152 && item.price <= 14803);
                data=dataPrice.filter(item => item.discount=== discounteRange);
                sortArr=[...data];
                return  dataFuntion(data);
            }
        }
        else if(brand && color && price==undefined){
            discount=discounteRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            const dataColor = dataBrand.filter(item => item.color === color);
            data=dataColor.filter(item => item.discount === discounteRange)
            sortArr=[...data];
            dataFuntion(data);
            return;
        }
        else if(brand && price && color== undefined){
            discount=discounteRange
            const dataBrand = dataArr.filter(item => item.brand === brand);
            if(price ==3850){
                const dataPrice= dataBrand.filter(item => item.price > 199 && item.price <= 3850);
                data=dataPrice.filter(item => item.discount === discounteRange)
                sortArr=[...data];
                dataFuntion(data);
                return;
            }
           else if(price ==7501){
                const dataPrice= dataBrand.filter(item => item.price > 3850 && item.price <= 7501);
                data=dataPrice.filter(item => item.discount === discounteRange)
                sortArr=[...data];
                dataFuntion(data);
                return;
            }
           else if(price ==11152){
                const dataPrice= dataBrand.filter(item => item.price > 7501 && item.price <= 11152);
                data=dataPrice.filter(item => item.discount === discounteRange)
                sortArr=[...data];
                dataFuntion(data);
                return;
            }
           else if(price ==14803){
                const dataPrice= dataBrand.filter(item => item.price > 11152 && item.price <= 14803);
                data=dataPrice.filter(item => item.discount === discounteRange)
                sortArr=[...data];
                dataFuntion(data);
                return;
            }
        }
        else if(color && price && brand == undefined){
            discount=discounteRange
            const dataColor = dataArr.filter(item => item.color === color);
            if(price ==3850){
                const dataPrice= dataColor.filter(item => item.price > 199 && item.price <= 3850);
                data=dataPrice.filter(item => item.discount === discounteRange)
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==7501){
                const dataPrice= dataColor.filter(item => item.price > 3850 && item.price <= 7501);
                data=dataPrice.filter(item => item.discount === discounteRange)
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==11152){
                const dataPrice= dataColor.filter(item => item.price > 7501 && item.price <= 11152);
                data=dataPrice.filter(item => item.discount === discounteRange)
                sortArr=[...data];
                return  dataFuntion(data);
            }
           else if(price ==14803){
                const dataPrice= dataColor.filter(item => item.price > 11152 && item.price <= 14803);
                data=dataPrice.filter(item => item.discount === discounteRange)
                sortArr=[...data];
                return  dataFuntion(data);
            }
        }
    // if discounteRange value is not true 

        else{
            discount=discounteRange;
            data=dataArr.filter(item => item.discount === discounteRange);
            sortArr=[...data]
            dataFuntion(data);
            return;
        }
    }
}

// -------------------------------------sorting function--------------------------------------------------------- 
function sortFilter() {
    let select = document.getElementById('filter');
    let option = select.options[select.selectedIndex];
   let sortValue = option.value;
//    sorting the sortArr  price from high to low 
    if(sortValue==="HighToLow"){
        sortArr.sort((a,b)=>b.price-a.price)
        dataFuntion(sortArr)
        return;
    }
//    sorting the sortArr price from to low to high
    else if(sortValue==="LowToHigh"){
        sortArr.sort((a,b)=>a.price-b.price)
        dataFuntion(sortArr)
        return;
    }
//    sorting the sortArr rating from to high to low

    else if(sortValue==="top"){
        sortArr.sort((a,b)=>b.rating-a.rating)
        dataFuntion(sortArr)
    }
//    sorting the sortArr dicount above 50% 
    else if(sortValue==="50"){
       let TopDiscountArr= sortArr.filter((item)=>item.discount>= +sortValue)
        dataFuntion(TopDiscountArr)
        return;
    }
}




// ---------------------------------------------products fetching------------------------------------------------------------------------- 
let dataContainer=document.getElementById("wrapper")
function dataFuntion(data){
    dataContainer.innerHTML="";
   let allData= data.map((item)=>{
        
        return`<figure data-id=${item._id} class="shop-items-child-div">
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
    dataContainer.innerHTML=allData.join(" ")

    // -------------------------------------on shop-items-child-div div click redirect to product view page------------------------------------------------------ 

    let details_click = document.querySelectorAll(".shop-items-child-div");
      for(let btn of details_click){
          btn.addEventListener("click",(event)=>{ 
			let data_id = event.target.dataset.id;

            localStorage.setItem("product-id",data_id)
            window.location.href='product-view.html'

		});
      }

}
